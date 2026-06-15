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
  /**
   * Pin series lên đầu listing (/series, /blog). Số lớn hơn = ưu tiên cao hơn.
   * Bỏ trống = không pin, xếp theo hoạt động gần nhất (`latest`) như mặc định.
   */
  pin?: number;
}

export const SERIES: Record<string, SeriesMeta> = {
  ai: {
    title: 'AI for Developers — LLMs, Agents & Coding',
    blurb:
      'The complete AI path for developers in one series: from the history of AI and how LLMs work (tokens, sampling, embeddings, prompting) to choosing models, RAG and fine-tuning, building agents (tool use, architecture, patterns, MCP), and finally coding day-to-day with AI agents and Cursor — hands-on and hype-free.',
    pin: 1,
  },
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
  nextjs: {
    title: 'Next.js 16 from Zero to Senior',
    blurb:
      'Go from zero to senior on the latest Next.js (16): the App Router mental model, Server Components and data fetching, the new Cache Components & "use cache" model, Server Actions, route handlers and proxy, rendering, SEO, auth, then shipping and debugging production — hands-on, with exercises.',
  },
  nodejs: {
    title: 'Node.js Super Senior — 10 Phases + Deep Dives',
    blurb:
      'A production-ready, enterprise-grade path from "gà mờ" to Super Senior Node.js backend developer: ten core phases — core fundamentals, HTTP, Express, databases, auth & security, advanced patterns, DevOps, performance, testing, and enterprise architecture — then bonus deep dives into PostgreSQL, Prisma, and NestJS. Hands-on in TypeScript, with projects.',
  },
  eng: {
    title: 'Practical English for Work',
    blurb:
      'Build real work-communication reflexes from zero — bilingual, pattern-first, no academic grammar.',
  },
  'css-modern': {
    title: 'Modern CSS Deep Dives',
    blurb:
      'The complete modern CSS path in one series: layout mental models (Flexbox, Grid, subgrid, container queries, fluid design), the cascade, custom properties and color, then animation (transitions, keyframes, easing, performance, accessible and scroll-driven motion), and finally pure-CSS 3D — perspective, preserve-3d objects, tilt and parallax, carousels, lighting and performance.',
  },
  'web-dev': {
    title: 'Web Development in Practice',
    blurb:
      'Practical web development for senior frontend engineers — the CSS, JavaScript, and browser-platform fundamentals behind production UI. From CSS performance and modern features, through core JavaScript (event loop, async, closures, fetch, events, memory, Intl) and the browser APIs that power real apps, to landing-page motion across CSS, vanilla JS, and React + Framer Motion.',
  },
  'chrome-ext': {
    title: 'Build Chrome Extensions — Zero to Pro (Manifest V3)',
    blurb:
      'Go from "I want to build a browser extension" to shipping one on the Chrome Web Store. Every part has real config and a live, interactive simulator. Start with the Manifest V3 mental model and your first "load unpacked" extension, then the manifest deep dive, the component architecture (popup, service worker, content scripts, options), content-script injection and isolated worlds, the event-driven background service worker, messaging across contexts, chrome.storage, UI surfaces and the action API, permissions and security, the powerful APIs (tabs, scripting, contextMenus, commands, notifications), a pro Vite + CRXJS + TypeScript + React build, and finally publishing, auto-update, and cross-browser — with a capstone extension.',
  },
  webpack: {
    title: 'Webpack from Zero to Pro',
    blurb:
      'Master Webpack 5 config from the ground up — every part ships a real config and a live, interactive demo. Start with the bundler mental model and your first build, then the config anatomy, loaders and plugins, the dev server with HMR and source maps, code splitting and lazy loading, tree shaking and production mode, long-term caching with contenthash, bundle analysis and performance, advanced resolve plus authoring your own loader and plugin, Module Federation for micro-frontends, and a production capstone with migration tips.',
  },
  vite: {
    title: 'Vite from Zero to Pro',
    blurb:
      'Master Vite 8 from the ground up — every part ships a real config and a live, interactive demo. Start with the native-ESM mental model and your first project, then the vite.config.ts anatomy, the dev server and on-demand transform, dependency pre-bundling, HMR internals, CSS and static assets, glob imports, env vars and modes, the Rollup-compatible plugin API, production builds with Rolldown, library mode plus the SSR/Environment API, and finish with performance tuning, a capstone config, and migrating off Webpack/CRA.',
  },
  'tailwind-ui': {
    title: 'Tailwind, Radix & shadcn/ui — Zero to Pro',
    blurb:
      'Become fluent in the modern React styling stack — every part ships real config and a live, interactive demo. Start with the Tailwind CSS v4 mental model and setup, then core utilities and layout, design tokens and theming, variants and state composition, and building reusable components the right way (clsx, tailwind-merge, cn, cva) plus the plugin ecosystem. Then go headless and accessible with Radix UI primitives, adopt shadcn/ui (philosophy, CLI, components.json), theme and customize it, build validated forms with react-hook-form + zod, and finish with pro patterns and a dashboard capstone.',
  },
  threejs: {
    title: 'Three.js from Zero to Senior',
    blurb:
      'Go from "gà mờ" to senior on Three.js: the WebGL mental model and your first scene, geometries and materials, the scene graph and cameras, lights and shadows, PBR textures and environment maps, loading glTF models and the animation system, post-processing with the EffectComposer, performance and instancing, raycasting and interaction, and a production capstone covering loading, responsiveness, framework integration, and deployment. Every part ships a live, interactive 3D demo.',
  },
  svg: {
    title: 'SVG from Zero to Senior',
    blurb:
      'Master SVG end to end: the coordinate system and viewBox, the path language, painting with strokes/gradients/patterns, text, transforms and nested coordinate systems, animation (CSS + SMIL, line-drawing), filters, clipping and masking, interactive data-driven graphics with JavaScript, and finally production — optimization, sprites, accessibility and performance. Every part ships a live, interactive demo.',
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

/**
 * Thứ tự hiển thị homepage: bài được pin (`top` có giá trị) lên trước, `top`
 * giảm dần; phần còn lại theo `pubDate` giảm dần. `top` độc lập với series —
 * nó chỉ điều khiển vị trí ở homepage, không ảnh hưởng thứ tự trong series.
 */
export function sortByPriority(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const topA = a.data.top ?? -Infinity;
    const topB = b.data.top ?? -Infinity;
    if (topA !== topB) return topB - topA;
    return b.data.pubDate.getTime() - a.data.pubDate.getTime();
  });
}

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
    .sort((a, b) => {
      // Pinned series lên đầu (pin desc); phần còn lại theo hoạt động gần nhất.
      const pinA = a.meta.pin ?? -Infinity;
      const pinB = b.meta.pin ?? -Infinity;
      if (pinA !== pinB) return pinB - pinA;
      return b.latest.getTime() - a.latest.getTime();
    });
}
