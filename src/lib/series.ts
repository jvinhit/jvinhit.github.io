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
  /** Mô tả SEO ngắn; fallback về blurb nếu bỏ trống. */
  description?: string;
  /** Ngôn ngữ của landing page; fallback về ngôn ngữ mặc định của site. */
  lang?: 'en' | 'vi';
  /** Chia một series dài thành các chặng học trên landing page. */
  sections?: Array<{
    title: string;
    description: string;
    from: number;
    to: number;
  }>;
  /**
   * Pin series lên đầu listing (/series, /blog). Số lớn hơn = ưu tiên cao hơn.
   * Bỏ trống = không pin, xếp theo hoạt động gần nhất (`latest`) như mặc định.
   */
  pin?: number;
}

export const SERIES: Record<string, SeriesMeta> = {
  'tanstack-query': {
    title: 'TanStack Query (React Query) — từ Zero đến Production',
    blurb:
      'Series tiếng Việt (18 phần) đưa bạn từ "fetch dữ liệu bằng useEffect + useState" đến làm chủ server state với TanStack Query (React Query) v5 một cách chuyên nghiệp. Nửa đầu xây nền: mental model — vì sao server state khác client state và vì sao không nên tự viết fetch tay — cài đặt QueryClient/Provider/Devtools, đào sâu useQuery (status vs fetchStatus, loading/error/empty), staleTime/gcTime và vòng đời cache, hệ query key phân cấp cùng API client validate bằng zod và queryOptions, dependent/parallel queries, pagination và useInfiniteQuery, mutations với invalidate, optimistic update (onMutate/rollback) và quản lý cache thủ công, error handling/retry/Suspense/performance, rồi testing với MSW + React Testing Library và một capstone CRUD hoàn chỉnh. Nửa sau lên production: QueryClient & defaults sâu, SSR/Next.js App Router & hydration, prefetching và tích hợp router, dùng QueryClient như một store để thao tác cache chủ động, offline-first & persistence, realtime với WebSocket/SSE, mutation nâng cao, tối ưu hiệu năng render, type-safety đỉnh cao, và kiến trúc production cùng lộ trình migrate v4 → v5. Mỗi bài có code TypeScript/React 19 chạy được và bài tập thực hành.',
    pin: 3,
  },
  'service-workers': {
    title: 'Service Workers & PWA — từ Zero đến Production',
    blurb:
      'Series tiếng Việt đưa bạn từ "service worker là cái gì" đến chỗ tự tin xây dựng một Progressive Web App offline-first chạy thật. Bắt đầu với mental model — service worker là một network proxy chạy nền, vòng đời (lifecycle) và vì sao nó khác Web Worker — rồi đào sâu lifecycle (install, activate, waiting, skipWaiting, clients.claim, update flow) và cách debug trong DevTools. Tiếp đó là chặn request với fetch event và respondWith, Cache API cùng các caching strategy kinh điển (cache-first, network-first, stale-while-revalidate), kiến trúc app shell offline-first và trang fallback, rồi advanced caching (versioning, cleanup, expiration, opaque/CORS). Phần sau là các năng lực nâng cao của nền tảng: Background Sync để retry request thất bại bằng hàng đợi IndexedDB, Push Notifications với Push API + VAPID, và Workbox để giảm boilerplate (precaching, routing, vite-plugin-pwa) — kết bằng capstone build một PWA hoàn chỉnh: manifest, install prompt, update UX, testing và deploy. Mỗi bài có ví dụ code chạy được và bài tập thực hành kèm hướng dẫn.',
    pin: 2,
  },
  'browser-internals': {
    title: 'How Browsers Work — Internals Deep Dive',
    blurb:
      'Series tiếng Việt đi dưới lớp vỏ của browser — runtime mà frontend engineer ship code vào mỗi ngày nhưng hiếm khi hiểu trọn. Chặng nền tảng 1–12 bắt đầu từ kiến trúc đa process (browser, renderer, GPU, network, sandbox và site isolation), lần theo navigation từ URL tới pixel, rồi đào sâu HTML parser/DOM, CSSOM, render tree, layout, paint, compositing, V8, event loop, memory/GC, networking, storage và security model. Chặng chuyên sâu 13–22 nối mental model đó với GPU/Viz và layer promotion, scrolling, frame scheduling, các tier tối ưu/deopt của V8, heap leak và detached DOM, accessibility tree, pipeline decode ảnh/video, worker + SharedArrayBuffer/Atomics, process model + BFCache — kết bằng capstone profiling có hệ thống trong DevTools. Mỗi phần nối internals với code và triệu chứng bạn thật sự gặp.',
  },
  'web-a11y': {
    title: 'Web Accessibility (a11y) — From Zero to Inclusive',
    blurb:
      'A bilingual (English-first) deep dive into building web UIs everyone can use. Start with the mental model — why accessibility matters, the POUR principles, disabilities and how assistive technology actually works — then the foundation of semantic HTML and a pragmatic ARIA deep dive (roles, states, live regions, and the rules for when NOT to use ARIA). Master keyboard accessibility and focus management in SPAs (tab order, skip links, focus traps, roving tabindex, dialogs and route changes), accessible forms (labels, fieldsets, errors, aria-describedby), accessible names and image alternatives, and the visual layer (color contrast, zoom, reduced motion, focus indicators). Then build real accessible components following the WAI-ARIA Authoring Practices, test with screen readers (VoiceOver/NVDA) and automated tools (axe-core, eslint-plugin-jsx-a11y, Playwright), and finish with a capstone that audits a real page end-to-end against WCAG and bakes accessibility into your workflow. Every part ships runnable TypeScript/React examples.',
  },
  'web-perf': {
    title: 'Web Performance & Core Web Vitals',
    blurb:
      'Series tiếng Việt đưa bạn từ "trang chậm mà không biết tại sao" đến làm chủ hiệu năng web một cách có hệ thống. Chặng nền tảng 1–12 đi từ RAIL và Core Web Vitals (LCP, INP, CLS), lab vs field, Lighthouse/Performance/WebPageTest/CrUX/RUM và critical rendering path tới tối ưu LCP, INP, CLS, JavaScript bundle, ảnh/media, font, network/cache — rồi gom lại bằng capstone audit, performance budget và Lighthouse CI. Chặng chuyên sâu 13–22 tiếp tục với RUM attribution và sampling, resource hints/Fetch Priority/Early Hints/Speculation Rules, kiến trúc CSR–SSR–SSG–streaming, LoAF và main-thread scheduling, CSS rendering/containment, memory của phiên dài, HTTP/2–3 + compression/cache policy, third-party governance, guardrail ở quy mô tổ chức — kết bằng capstone điều tra triệu chứng tới nguyên nhân gốc. Mỗi phần có code, giới hạn hỗ trợ và cách đo lại.',
  },
  'fe-algorithms': {
    title: 'Thuật toán hay áp dụng trong Frontend',
    blurb:
      'Series tiếng Việt đi sâu vào những thuật toán mà frontend engineer thực sự dùng hằng ngày — không phải LeetCode, mà là code chạy trong trình duyệt. Bắt đầu từ mental model và cách đo độ phức tạp trong môi trường browser, rồi tới debounce/throttle, tìm kiếm & lọc client-side (binary search, fuzzy search), ảo hóa danh sách lớn, diffing & reconciliation của Virtual DOM, cây và đồ thị trong UI, memoization và LRU cache, scheduling với priority queue và time-slicing, sắp xếp với comparator phức tạp, thuật toán chuỗi (highlight, text-diff, autocomplete), hình học cho animation và drag-drop — và một capstone gộp tất cả vào một "command palette + data grid". Mỗi phần có code TypeScript/React chạy được và giải thích cặn kẽ tại sao.',
  },
  'fe-patterns': {
    title: 'Design Patterns hay dùng trong Frontend Web',
    blurb:
      'Series tiếng Việt về các mẫu thiết kế (design pattern) mà frontend engineer hiện đại dùng để giữ codebase sạch và mở rộng được. Khởi đầu với mental model "pattern là gì, khi nào nên/không nên dùng" và SOLID nhìn qua lăng kính frontend, rồi đi qua Module & Singleton, Observer & Pub/Sub (nền tảng của reactivity/signals), Factory, Strategy, Command (undo/redo), Facade & Adapter (chống vendor lock-in), Decorator & Proxy (HOC, logging, reactive), các pattern composition đặc trưng React (Compound Components, Render Props, Custom Hooks), state patterns (Flux/Redux, State Machine), Container/Presentational, MVVM và dependency injection — kết bằng một capstone refactor một feature rối thành code gọn gàng. Toàn bộ có ví dụ TypeScript/React thực tế.',
  },
  stocks: {
    title: 'Đầu tư Cổ phiếu — từ Zero đến Quy trình chuyên nghiệp',
    blurb:
      'Lộ trình tiếng Việt, chỉ mang tính giáo dục, đưa bạn từ "cổ phiếu là gì" đến một quy trình có thể viết ra, kiểm chứng và lặp lại. Series bắt đầu với tư duy chủ sở hữu, cơ chế thị trường, báo cáo tài chính, định giá, kỹ thuật, danh mục, rủi ro, tâm lý, lãi kép và vĩ mô; sau đó đào sâu DCF, lợi thế cạnh tranh, phong cách đầu tư, thuế, phái sinh, thị trường quốc tế, bong bóng và gian lận. Volume phòng lab tiếp theo chuyển kiến thức thành năng lực thực hành: đọc trọn bộ BCTC, viết trading playbook, kiểm định lợi thế, thực thi lệnh, quản trị rủi ro và review hiệu suất. Không phải lời khuyên đầu tư và không bảo đảm lợi nhuận.',
  },
  'package-managers': {
    title: 'Node Package Managers & the Supply Chain — Deep Dive',
    blurb:
      'Go from "I just run npm install" to understanding the entire dependency layer like a senior. Start with the mental model every package manager shares (resolve → fetch → link, package.json, semver, the registry, lockfiles), then go deep on npm, Yarn Classic (v1), Yarn Berry (v2–v4) with Plug\'n\'Play, and pnpm plus Bun — what each does differently and why. Then the parts most guides skip: lockfiles and integrity hashes, lifecycle scripts and node-gyp, how native modules ship prebuilt binaries, and the dependency supply chain — real-world attacks (typosquatting, dependency confusion, malicious postinstall, account takeover) and a hardened defense playbook. Ends with monorepos/workspaces and a capstone decision-and-migration guide.',
  },
  ai: {
    title: 'AI for Developers — LLMs, Agents & Coding',
    description:
      'Lộ trình AI cho developer gồm 42 bài: nền tảng LLM, RAG và eval, kiến trúc agent, coding workflow, Cursor, MCP và multi-agent.',
    blurb:
      'Lộ trình 42 bài dành cho developer muốn hiểu AI từ gốc và dùng được trong công việc thật. Bắt đầu từ lịch sử AI, token, sampling, prompting và embeddings; tiếp tục với cách chọn model, RAG, fine-tuning, eval, safety và tối ưu chi phí; sau đó tự thiết kế agent với context, memory, tool use, patterns, orchestration và MCP; cuối cùng áp dụng vào coding hằng ngày — đọc codebase, build feature, debug, review, viết rules/skills, dùng sub-agent và bàn giao context. Nội dung ưu tiên mental model, trade-off, workflow có thể lặp lại và kiểm chứng, không chạy theo hype hay một model cụ thể.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng LLM',
        description:
          'Hiểu model nhận, biến đổi và sinh thông tin như thế nào trước khi dùng API hay agent framework.',
        from: 1,
        to: 9,
      },
      {
        title: 'Đưa LLM vào sản phẩm',
        description:
          'Chọn model theo eval, quản lý rủi ro, dữ liệu, chất lượng và chi phí thay vì theo leaderboard.',
        from: 10,
        to: 20,
      },
      {
        title: 'Agent engineering',
        description:
          'Từ context và tool calling đến agent loop, planning, orchestration và giao thức MCP.',
        from: 21,
        to: 26,
      },
      {
        title: 'Workflow coding với AI',
        description:
          'Dùng coding agent để onboard codebase, ship feature, debug, review và test mà vẫn giữ quyền kiểm soát.',
        from: 27,
        to: 34,
      },
      {
        title: 'Tùy biến agent & capstone',
        description:
          'Đóng gói cách làm việc bằng config, rules, skills, sub-agent và handoff; sau đó ghép thành một workflow end-to-end.',
        from: 35,
        to: 41,
      },
      {
        title: 'Sự nghiệp trong kỷ nguyên AI',
        description:
          'Chuyển từ tối ưu tốc độ gõ code sang tối ưu khả năng phán đoán, thiết kế hệ thống và xác minh output.',
        from: 42,
        to: 42,
      },
    ],
    pin: 1,
  },
  bash: {
    title: 'Bash & Shell Scripting',
    blurb:
      'From your first script to production-grade automation — quoting, loops, functions, text processing, and robust error handling.',
  },
  'dev-cli': {
    title: 'Command Line cho Developer - Commands, Bash Script & Workflow',
    blurb:
      'Series tiếng Việt dạng handbook/cookbook cho developer làm việc trong terminal mỗi ngày: điều hướng file, đọc log, tìm code với rg/find, pipe và redirection, Git workflow, curl+jq để debug API, process/port/network debugging, Node package manager, Docker/SSH, và cách gom tất cả thành bash script tự động hóa an toàn.',
  },
  nvim: {
    title: 'Neovim từ Gà mờ đến Pro',
    blurb:
      'Series tiếng Việt giúp bạn chuyển từ VSCode sang Neovim một cách thực dụng, theo chuẩn 2025-2026: modal editing, Lua config, lazy.nvim, native LSP mới với vim.lsp.config/vim.lsp.enable, completion, formatter/linter, Treesitter, fuzzy finder, Git, terminal, debug/test, dotfiles và một capstone cấu hình hoàn chỉnh. Mỗi phần có cheatsheet, bài tập và checklist để luyện thành phản xạ thật.',
  },
  typescript: {
    title: 'TypeScript Production Engineering — từ Senior đến Staff',
    description:
      'Lộ trình TypeScript 12 phần về type system, strict config, API design, runtime boundary, ESM, package authoring, kiến trúc, monorepo, hiệu năng và migration.',
    blurb:
      'Core series tiếng Việt 12 phần dành cho developer đã biết cú pháp TypeScript nhưng muốn dùng type system như một công cụ thiết kế hệ thống. Lộ trình đi từ structural typing, soundness, variance và control-flow analysis tới strict tsconfig theo TypeScript 6, generic API dễ suy luận, runtime validation và domain modeling. Nửa sau tập trung vào async/error contract, ESM và module resolution, viết và kiểm thử declaration cho package, kiến trúc theo boundary, project references và hiệu năng compiler, chiến lược test/migration ở codebase lớn, rồi kết bằng capstone xây một typed SDK production. Hai series Type Challenges và Design Patterns là phòng lab bổ trợ, không phải điều kiện tiên quyết. Mỗi bài có failure mode, decision rule, code TypeScript chạy được, bài tập và tiêu chí tự review.',
    lang: 'vi',
    sections: [
      {
        title: 'Hiểu và điều khiển type system',
        description:
          'Nắm giới hạn soundness, narrowing và inference để đọc được điều compiler đang chứng minh — và điều nó không thể chứng minh.',
        from: 1,
        to: 4,
      },
      {
        title: 'Thiết kế contract production',
        description:
          'Đưa dữ liệu runtime, lỗi, bất đồng bộ và module boundary vào các contract có thể kiểm tra.',
        from: 5,
        to: 8,
      },
      {
        title: 'Scale codebase và tổ chức',
        description:
          'Thiết kế boundary, package, build graph, type performance, migration và quality gate cho hệ thống lớn.',
        from: 9,
        to: 12,
      },
    ],
    pin: 6,
  },
  'ts-pattern': {
    title: 'Design Patterns in TypeScript',
    blurb:
      'The classic design patterns every senior web engineer should have at hand, explained with runnable TypeScript.',
  },
  'ts-challenges': {
    title: 'TypeScript Type Challenges — Zero to Type Wizard',
    blurb:
      'Master type-level programming by solving the famous type-challenges, one concept at a time. Start with the five building blocks and a guided tour, then go deep on mapped types, conditional types and distribution, infer, recursion over tuples, union manipulation, template-literal string math, type-level arithmetic, the hard utility types, parsers and state machines, and a few extreme challenges — finishing with a capstone that turns it all into a reusable typed library. Every challenge shows the goal first, hides the answer behind a toggle, then explains the solution step by step. Solutions follow the canonical community approaches from the MIT-licensed type-challenges project.',
  },
  'web-security': {
    title: 'Web Security for Frontend Devs',
    blurb:
      'The security essentials every frontend developer must know — each part shows a real threat, vulnerable code, then the fix.',
  },
  docker: {
    title: 'Docker, Compose & Kubernetes',
    blurb:
      'Lộ trình tiếng Việt theo hai chặng: 10 phần nền tảng giúp bạn làm chủ container, image, Dockerfile, storage, networking, Compose, hardening và debug; nhánh chuyên sâu đi xuống OCI runtime, namespace/cgroup, BuildKit và supply chain, Compose cho team/CI, rồi vào Kubernetes networking, scheduling, autoscaling, stateful storage, security, observability và incident response. Mỗi phần ưu tiên mental model, trade-off, failure mode, lab có thể tự phá–sửa và tài liệu chính thức để biến kiến thức thành năng lực vận hành production.',
  },
  nginx: {
    title: 'Nginx from Zero to Production',
    blurb:
      'Master Nginx hands-on: install locally, understand the config model, build a reverse proxy and load balancer, add TLS, caching and rate limiting, then ship and debug a production setup.',
  },
  'hosting-dns': {
    title: 'Domain, DNS & Hosting — từ Zero đến Production',
    description:
      'Series 10 phần về domain, DNS và hosting: Cloudflare, Hostinger, GitHub Pages, VPS, TLS, email DNS và migration không downtime.',
    blurb:
      'Series tiếng Việt 10 phần giúp bạn nối một domain thật tới đúng hạ tầng mà không làm gián đoạn website hay email. Lộ trình bắt đầu bằng mental model tách registrar, authoritative DNS, hosting, CDN và origin; sau đó làm chủ delegation, record A/AAAA/CNAME/MX/TXT/CAA, TTL và cách kiểm tra bằng dig. Phần thực hành đi qua đổi nameserver từ Hostinger sang Cloudflare đúng thứ tự DNSSEC, giữ Cloudflare DNS nhưng host website ở Hostinger, gắn custom domain cho GitHub Pages và Cloudflare Pages, trỏ domain vào VPS qua Nginx, rồi cấu hình Cloudflare proxy với Full (strict). Cuối series là email DNS với SPF/DKIM/DMARC và runbook migration không downtime, có acceptance test, rollback cùng quy trình debug từ NS/DS tới TLS, HTTP và application.',
    lang: 'vi',
    pin: 4,
  },
  nextjs: {
    title: 'Next.js 16 from Zero to Senior',
    blurb:
      'Go from zero to senior on the latest Next.js (16): the App Router mental model, Server Components and data fetching, the new Cache Components & "use cache" model, Server Actions, route handlers and proxy, rendering, SEO, auth, then shipping and debugging production — hands-on, with exercises.',
  },
  nodejs: {
    title: 'Node.js Production Engineering — Từ Runtime đến Hệ thống phân tán',
    blurb:
      'Lộ trình tiếng Việt gồm 20 phần dành cho kỹ sư muốn hiểu Node.js như một nền tảng production, không chỉ như công cụ dựng API. Series đi từ V8, libuv, event loop, HTTP và Express 5 đến data layer, authentication, testing, performance, delivery và kiến trúc modular monolith; sau đó đào sâu PostgreSQL, Prisma, Redis, NestJS, message queue, GraphQL, gRPC, realtime và observability với OpenTelemetry. Mỗi phần dùng TypeScript, giải thích mental model trước API, phân tích trade-off và failure mode, kèm tiêu chí vận hành, bài tập và tài liệu chính thức để người đọc có thể biến kiến thức thành quyết định kỹ thuật.',
    pin: 5,
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
    title: 'Tailwind, Radix & shadcn/ui — từ Zero đến Pro',
    blurb:
      'Series tiếng Việt giúp bạn thành thạo bộ công cụ styling React hiện đại — mỗi phần đều có config thật và một demo tương tác trực tiếp. Bắt đầu với tư duy nền tảng và cài đặt Tailwind CSS v4, rồi tới utility cốt lõi và layout, design token và theming, variant và kết hợp trạng thái, cách dựng component tái dùng cho đúng (clsx, tailwind-merge, cn, cva) cùng hệ sinh thái plugin. Tiếp đó đi headless và accessible với Radix UI primitives, áp dụng shadcn/ui (triết lý, CLI, components.json), theme và tùy biến nó, dựng form đã validate với react-hook-form + zod, và kết thúc bằng các mẫu chuyên nghiệp cùng capstone dashboard.',
  },
  vue: {
    title: 'Vue.js 3 — từ Zero đến Production',
    blurb:
      'Series tiếng Việt đưa bạn từ "Vue là gì" đến làm chủ Vue 3 hiện đại theo phong cách production: Composition API, TypeScript và Vite. Bắt đầu với mental model — reactivity là gì, Single-File Component, và vì sao Vue khác React — rồi cú pháp template và directive (v-bind, v-if, v-for, v-on, v-model), đào sâu hệ reactivity (ref, reactive, computed, watch/watchEffect và các bẫy thường gặp). Tiếp đó là component thực thụ (props, emits, slots, provide/inject), Composition API và composable để tái dùng logic, form và v-model tùy biến, định tuyến với Vue Router, quản lý state với Pinia, xử lý bất đồng bộ/Suspense/data fetching, dùng TypeScript đúng cách với Vue, tối ưu hiệu năng, và kết bằng phần testing (Vitest + Vue Test Utils) cùng một capstone. Mỗi phần có code chạy được và bài tập thực hành.',
  },
  'react-stack': {
    title: 'Build a Real React App — The Production Stack',
    blurb:
      'The hands-on sequel to the Tailwind/Radix/shadcn series: build one real app — "Pulse", a small CRM/SaaS dashboard — end-to-end with the modern React production stack. Start by scaffolding with pnpm, Vite and TypeScript strict, plus oxlint + oxfmt for fast linting and formatting, then lay the Tailwind v4 + shadcn/ui foundation and an app shell. Wire routing and architecture with React Router v7 (data mode), then master server state with TanStack Query — typed query keys, caching, mutations and optimistic updates with rollback. Build validated forms with react-hook-form + zod, manage genuine client state with Zustand, and ship a real feature: a data table with filters and URL-as-state. Add an auth + API layer, then tune performance (code splitting, prefetching, bundle analysis) and lock in quality with Vitest, React Testing Library and MSW. Finish with a capstone that assembles a full feature flow and a pnpm + oxlint GitHub Actions CI pipeline.',
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
  return (
    typeof series === 'string' &&
    series in SERIES &&
    typeof seriesOrder === 'number'
  );
}

/** All posts of a series, ordered by `seriesOrder` ascending (Part 1 first). */
export function seriesParts(posts: Post[], id: string): Post[] {
  return posts
    .filter(
      (p) => p.data.series === id && typeof p.data.seriesOrder === 'number'
    )
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
export function getSeriesContext(
  posts: Post[],
  post: Post
): SeriesContext | null {
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
