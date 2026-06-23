import type { APIContext } from 'astro';
import { renderDefaultOg } from '~/lib/og-image';

/**
 * Default Open Graph image, rendered at build time.
 *
 * BaseLayout points `og:image` / `twitter:image` at `/og-default.png` for every
 * page that doesn't supply its own. The brand frame + rasterization live in
 * `~/lib/og-image` so per-post cards (`/og/<slug>.png`) stay consistent.
 */
export const prerender = true;

export async function GET(_context: APIContext): Promise<Response> {
  const png = await renderDefaultOg();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
