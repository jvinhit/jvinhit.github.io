import type { APIContext } from 'astro';
import sharp from 'sharp';
import { SITE } from '~/lib/site-config';

/**
 * Default Open Graph image, rendered at build time.
 *
 * BaseLayout points `og:image` / `twitter:image` at `/og-default.png` for every
 * page that doesn't supply its own. Social platforms (Facebook, X, LinkedIn,
 * Slack…) don't render SVG og:images, so we rasterize a branded SVG → PNG with
 * sharp here instead of shipping a hand-made binary asset.
 *
 * 1200×630 is the canonical OG/Twitter `summary_large_image` size.
 */
export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;

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

/** Naive word-wrap so the tagline fits the canvas at a fixed char budget. */
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

export async function GET(_context: APIContext): Promise<Response> {
  const tagline = wrap(SITE.author.title + ' · ' + SITE.description, 52, 3);
  const taglineSpans = tagline
    .map(
      (line, i) =>
        `<text x="80" y="${360 + i * 46}" fill="${FG_MUTED}" font-family="monospace" font-size="30">${esc(line)}</text>`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2" rx="16"/>
  <rect x="80" y="96" width="64" height="8" fill="${ACCENT}" rx="4"/>
  <text x="80" y="160" fill="${FG_MUTED}" font-family="monospace" font-size="28">${esc(SITE.handle)}</text>
  <text x="78" y="280" fill="${FG}" font-family="monospace" font-size="120" font-weight="700">${esc(SITE.name)}</text>
  ${taglineSpans}
  <text x="80" y="556" fill="${ACCENT}" font-family="monospace" font-size="26">${esc(SITE.url.replace(/^https?:\/\//, ''))}</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
