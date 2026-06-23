import sharp from 'sharp';
import { SITE } from './site-config';

/**
 * Shared Open Graph image renderer.
 *
 * Social platforms (Facebook, X, LinkedIn, Slack…) don't render SVG og:images,
 * so we rasterize a branded SVG → PNG with `sharp` at build time. Both the
 * site-wide default card (`/og-default.png`) and per-post cards
 * (`/og/<slug>.png`) share this module so the brand frame stays in one place.
 *
 * 1200×630 is the canonical OG/Twitter `summary_large_image` size.
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const ACCENT = '#c8ff00';
const BG = '#0a0a0a';
const SURFACE = '#111111';
const BORDER = '#2a2a2a';
const FG = '#e5e5e5';
const FG_MUTED = '#8a8a8a';

/** Escape text before interpolating into the SVG markup. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Naive word-wrap so text fits the canvas at a fixed char budget per line. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    } else {
      current = candidate;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);

  const consumed = lines.join(' ').split(/\s+/).length;
  if (consumed < words.length && lines.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1]}…`;
  }
  return lines;
}

/** Shared dark card frame + accent bar; callers fill the body. */
function frame(body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${BG}"/>
  <rect x="24" y="24" width="${OG_WIDTH - 48}" height="${OG_HEIGHT - 48}" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2" rx="16"/>
  <rect x="80" y="96" width="64" height="8" fill="${ACCENT}" rx="4"/>
  ${body}
</svg>`;
}

const SITE_URL = SITE.url.replace(/^https?:\/\//, '');

async function toPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/** Site-wide default card: brand name + tagline. */
export async function renderDefaultOg(): Promise<Buffer> {
  const tagline = wrap(`${SITE.author.title} · ${SITE.description}`, 52, 3);
  const taglineSpans = tagline
    .map(
      (line, i) =>
        `<text x="80" y="${360 + i * 46}" fill="${FG_MUTED}" font-family="monospace" font-size="30">${esc(line)}</text>`
    )
    .join('');

  const body = `<text x="80" y="160" fill="${FG_MUTED}" font-family="monospace" font-size="28">${esc(SITE.handle)}</text>
  <text x="78" y="280" fill="${FG}" font-family="monospace" font-size="120" font-weight="700">${esc(SITE.name)}</text>
  ${taglineSpans}
  <text x="80" y="556" fill="${ACCENT}" font-family="monospace" font-size="26">${esc(SITE_URL)}</text>`;

  return toPng(frame(body));
}

/**
 * Per-post card: post title as the hero. Title font size steps down as the
 * title gets longer so long headlines still fit four lines on the canvas.
 */
export async function renderPostOg(title: string): Promise<Buffer> {
  const fontSize = title.length > 90 ? 48 : title.length > 55 ? 58 : 70;
  const maxChars = Math.floor((OG_WIDTH - 160) / (fontSize * 0.58));
  const lineHeight = Math.round(fontSize * 1.18);
  const lines = wrap(title, maxChars, 4);

  // Vertically center the title block in the body area (below the eyebrow).
  const blockHeight = lines.length * lineHeight;
  const startY = Math.round((OG_HEIGHT - blockHeight) / 2) + fontSize;
  const titleSpans = lines
    .map(
      (line, i) =>
        `<text x="80" y="${startY + i * lineHeight}" fill="${FG}" font-family="monospace" font-size="${fontSize}" font-weight="700">${esc(line)}</text>`
    )
    .join('\n  ');

  const body = `<text x="80" y="160" fill="${FG_MUTED}" font-family="monospace" font-size="28">${esc(`${SITE.handle} · article`)}</text>
  ${titleSpans}
  <text x="80" y="556" fill="${ACCENT}" font-family="monospace" font-size="26">${esc(SITE_URL)}</text>`;

  return toPng(frame(body));
}
