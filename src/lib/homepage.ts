import type { CollectionEntry } from 'astro:content';
import { isSeriesPost } from '~/lib/series';

type Post = CollectionEntry<'posts'>;

export interface HomepageFeed {
  posts: Post[];
  initialCount: number;
}

/**
 * Giữ nhóm bài ưu tiên ban đầu, sau đó bổ sung bài đại diện
 * đầu tiên của mỗi series còn thiếu. `posts` phải được sort theo thứ
 * tự homepage trước, nên bài đại diện luôn là bài có ưu tiên cao
 * nhất (hoặc mới nhất) của series đó.
 */
export function buildHomepageFeed(
  posts: Post[],
  minimumInitial = 5
): HomepageFeed {
  const baselineCount = Math.min(Math.max(0, minimumInitial), posts.length);
  const initialPosts = posts.slice(0, baselineCount);
  const selectedIds = new Set(initialPosts.map((post) => post.id));
  const representedSeries = new Set(
    initialPosts.filter(isSeriesPost).map((post) => post.data.series as string)
  );

  for (const post of posts.slice(baselineCount)) {
    if (!isSeriesPost(post)) continue;

    const seriesId = post.data.series as string;
    if (representedSeries.has(seriesId)) continue;

    representedSeries.add(seriesId);
    selectedIds.add(post.id);
    initialPosts.push(post);
  }

  const remainingPosts = posts.filter((post) => !selectedIds.has(post.id));

  return {
    posts: [...initialPosts, ...remainingPosts],
    initialCount: initialPosts.length,
  };
}
