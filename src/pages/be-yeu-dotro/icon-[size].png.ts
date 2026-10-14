import type { APIContext } from 'astro';
import {
  PREGNANCY_ICON_SIZES,
  renderPregnancyIcon,
} from '~/lib/pregnancy-icon';

/**
 * `/be-yeu-dotro/icon-<180|192|512>.png` — icon màn hình chính của khu thai
 * kỳ, render ở build time (cùng pattern với `og-default.png.ts`).
 */
export const prerender = true;

export function getStaticPaths() {
  return PREGNANCY_ICON_SIZES.map((size) => ({
    params: { size: String(size) },
  }));
}

export async function GET({ params }: APIContext): Promise<Response> {
  const size = Number(params.size);
  const png = await renderPregnancyIcon(size);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}
