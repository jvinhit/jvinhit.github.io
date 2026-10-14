import { withBase } from '~/lib/site-config';

/**
 * Web app manifest CHỈ cho khu `/be-yeu-dotro/` (spec 009): `scope` khóa ở
 * đường dẫn này nên app cài lên màn hình chính không "nuốt" blog hay love
 * board; chỉ PregnancyLayout gắn <link rel="manifest"> tới file này.
 *
 * Đi qua withBase() để đúng cả khi deploy dưới BASE_PATH.
 */
export const prerender = true;

export function GET(): Response {
  const root = withBase('/be-yeu-dotro/');
  const icon = (size: number) => withBase(`/be-yeu-dotro/icon-${size}.png`);
  const manifest = {
    id: root,
    name: 'Bé yêu nhà mình',
    short_name: 'Bé yêu',
    description: 'Theo dõi thai kỳ, nhật ký và lịch khám của nhà mình.',
    lang: 'vi',
    start_url: root,
    scope: root,
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f3faf6',
    theme_color: '#f3faf6',
    icons: [
      { src: icon(192), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: icon(512), sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: icon(192),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: icon(512),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
