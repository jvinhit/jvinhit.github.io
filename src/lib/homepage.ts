import type { CollectionEntry } from 'astro:content';
import { isSeriesPost, SERIES } from '~/lib/series';

type Post = CollectionEntry<'posts'>;

export interface HomepageFeed {
  posts: Post[];
  initialCount: number;
}

/**
 * Ghim đúng một bài tuyển chọn của mỗi series lên homepage.
 *
 * `posts` phải được sort theo thứ tự homepage trước. Thứ tự đó được giữ cho
 * nhóm bài ghim; nếu một pick bị draft/xóa, bài ưu tiên cao nhất còn publish
 * của series sẽ được dùng làm fallback để homepage không mất đại diện.
 */
export function buildHomepageFeed(
  posts: Post[],
  minimumInitial = 5
): HomepageFeed {
  const postsById = new Map(posts.map((post) => [post.id, post]));
  const selectedIds = new Set<string>();

  for (const [seriesId, meta] of Object.entries(SERIES)) {
    const configuredPick = postsById.get(meta.homepagePick);
    const selected =
      configuredPick?.data.series === seriesId && isSeriesPost(configuredPick)
        ? configuredPick
        : posts.find(
            (post) => post.data.series === seriesId && isSeriesPost(post)
          );

    if (selected) selectedIds.add(selected.id);
  }

  const initialPosts = posts.filter((post) => selectedIds.has(post.id));
  const targetInitialCount = Math.min(
    Math.max(0, minimumInitial),
    posts.length
  );

  for (const post of posts) {
    if (initialPosts.length >= targetInitialCount) break;
    if (selectedIds.has(post.id)) continue;
    selectedIds.add(post.id);
    initialPosts.push(post);
  }

  const remainingPosts = posts.filter((post) => !selectedIds.has(post.id));

  return {
    posts: [...initialPosts, ...remainingPosts],
    initialCount: initialPosts.length,
  };
}
