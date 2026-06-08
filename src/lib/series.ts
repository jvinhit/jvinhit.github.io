import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;

/**
 * Series registry — single source of truth for series metadata.
 *
 * Một bài thuộc series khi frontmatter có `series` khớp một key ở đây và
 * `seriesOrder` (số phần). Thứ tự bài KHÔNG phụ thuộc `pubDate` — đó là lý do
 * series không còn bị xen kẽ trong archive khi ta gom nhóm theo metadata.
 */
export interface SeriesMeta {
  /** Tên hiển thị */
  title: string;
  /** Mô tả ngắn cho trang /series và landing */
  blurb: string;
}

export const SERIES: Record<string, SeriesMeta> = {
  bash: {
    title: 'Bash & Shell Scripting',
    blurb:
      'From your first script to production-grade automation — quoting, loops, functions, text processing, and robust error handling.',
  },
  'ts-pattern': {
    title: 'Design Patterns in TypeScript',
    blurb:
      'The classic design patterns every senior web engineer should have at hand, explained with runnable TypeScript.',
  },
  'web-security': {
    title: 'Web Security for Frontend Devs',
    blurb:
      'The security essentials every frontend developer must know — each part shows a real threat, vulnerable code, then the fix.',
  },
  docker: {
    title: 'Docker, Compose & Kubernetes',
    blurb:
      'Containers from fundamentals to Compose and Kubernetes, ending with debugging real-world issues.',
  },
  nginx: {
    title: 'Nginx from Zero to Production',
    blurb:
      'Master Nginx hands-on: install locally, understand the config model, build a reverse proxy and load balancer, add TLS, caching and rate limiting, then ship and debug a production setup.',
  },
  eng: {
    title: 'Practical English for Work',
    blurb:
      'Build real work-communication reflexes from zero — bilingual, pattern-first, no academic grammar.',
  },
  'css-modern': {
    title: 'Modern CSS Deep Dives',
    blurb:
      'Core modern CSS: layout mental models, cascade layers, custom properties, container queries, and responsive design.',
  },
  'css-animation': {
    title: 'CSS Animation Mastery',
    blurb:
      'Transitions, keyframes, easing, performance, accessible motion, and scroll-driven animations.',
  },
  networking: {
    title: 'Network Programming',
    blurb:
      'Build network apps from the socket up with Node.js + TypeScript — TCP/UDP, DNS, HTTP, WebSockets, TLS, framing, scaling, and debugging.',
  },
  mindset: {
    title: 'Effort, Focus & Grit',
    blurb:
      'A practical mindset series on effort, focus, consistency, discipline, resilience, and positivity — small daily practices that compound over time.',
  },
};

export function isSeriesPost(post: Post): boolean {
  const { series, seriesOrder } = post.data;
  return typeof series === 'string' && series in SERIES && typeof seriesOrder === 'number';
}

/** All posts of a series, ordered by `seriesOrder` ascending (Part 1 first). */
export function seriesParts(posts: Post[], id: string): Post[] {
  return posts
    .filter((p) => p.data.series === id && typeof p.data.seriesOrder === 'number')
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

export interface SeriesContext {
  id: string;
  meta: SeriesMeta;
  parts: Post[];
  total: number;
  /** 1-based position of the current post */
  current: number;
  prev: Post | null;
  next: Post | null;
}

/** Context for rendering in-post navigation; null if the post is not in a series. */
export function getSeriesContext(posts: Post[], post: Post): SeriesContext | null {
  if (!isSeriesPost(post)) return null;
  const id = post.data.series as string;
  const meta = SERIES[id];
  if (!meta) return null;

  const parts = seriesParts(posts, id);
  const index = parts.findIndex((p) => p.id === post.id);
  if (index === -1) return null;

  return {
    id,
    meta,
    parts,
    total: parts.length,
    current: index + 1,
    prev: parts[index - 1] ?? null,
    next: parts[index + 1] ?? null,
  };
}

export interface SeriesSummary {
  id: string;
  meta: SeriesMeta;
  parts: Post[];
  count: number;
  /** Most recent part's pubDate — used to order series in listings. */
  latest: Date;
  /** Earliest part's pubDate — when the series started. */
  started: Date;
}

/** Every series that has at least one published post, newest-activity first. */
export function listSeries(posts: Post[]): SeriesSummary[] {
  return Object.entries(SERIES)
    .map(([id, meta]) => {
      const parts = seriesParts(posts, id);
      if (parts.length === 0) return null;
      const dates = parts.map((p) => p.data.pubDate.getTime());
      return {
        id,
        meta,
        parts,
        count: parts.length,
        latest: new Date(Math.max(...dates)),
        started: new Date(Math.min(...dates)),
      } satisfies SeriesSummary;
    })
    .filter((s): s is SeriesSummary => s !== null)
    .sort((a, b) => b.latest.getTime() - a.latest.getTime());
}
