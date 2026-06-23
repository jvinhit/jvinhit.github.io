import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderPostOg } from '~/lib/og-image';

/**
 * Per-post Open Graph image, rendered at build time as `/og/<slug>.png`.
 *
 * Each post gets a branded card with its own title so social shares are
 * visually distinct (better CTR) instead of all reusing `/og-default.png`.
 */
export const prerender = true;

export const getStaticPaths = (async () => {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}) satisfies GetStaticPaths;

export async function GET(context: APIContext): Promise<Response> {
  const title = (context.props as { title: string }).title;
  const png = await renderPostOg(title);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
