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
  /** Bài đại diện được ghim trên homepage (Astro content entry id/slug). */
  homepagePick: string;
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
  'web-components': {
    homepagePick: 'web-components-15-package-interop-capstone',
    title: 'Web Components từ nền tảng đến production',
    description:
      'Series 15 phần về Custom Elements, Shadow DOM, slots, accessibility, form controls, Lit, testing, SSR và đóng gói component library.',
    blurb:
      'Lộ trình tiếng Việt 15 phần đi từ mental model của browser platform tới một component library có thể dùng trong HTML thuần, React và Vue. Chặng đầu làm rõ Custom Elements, lifecycle, upgrade, public API, render và state bằng JavaScript không framework. Chặng tiếp theo đào sâu Shadow DOM, composed tree, slots, CSS encapsulation, theming, events, focus, accessibility và form-associated custom elements với ElementInternals. Sau checkpoint vanilla, series chuyển sang testing trên browser thật và Lit: reactive properties, template bindings, directives, update lifecycle, controllers và kiến trúc state. Hai phần cuối xử lý performance, security, Declarative Shadow DOM, SSR, packaging, type, versioning và interoperability. Một Mini Kanban accessible nối các quyết định kỹ thuật xuyên suốt series.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng Custom Elements',
        description:
          'Hiểu component model gốc của browser, lifecycle, upgrade, public contract và cách render state không cần framework.',
        from: 1,
        to: 4,
      },
      {
        title: 'Encapsulation và component tương tác',
        description:
          'Làm chủ Shadow DOM, slots, theming, event boundary, focus, accessibility, HTML form và một capstone vanilla.',
        from: 5,
        to: 9,
      },
      {
        title: 'Testing và Lit',
        description:
          'Khóa public contract bằng browser test rồi thay boilerplate bằng Lit mà không thay đổi component model.',
        from: 10,
        to: 13,
      },
      {
        title: 'Production và phát hành',
        description:
          'Đánh giá hiệu năng, security, SSR/DSD, đóng gói, versioning và interop qua capstone component library.',
        from: 14,
        to: 15,
      },
    ],
    pin: 7,
  },
  'video-engineering': {
    homepagePick: 'video-engineering-16-capstone-stream-lab',
    title: 'Video Engineering cho Web Developer — từ byte đến pixel',
    description:
      'Series 16 phần về FFmpeg, codec, encoder/decoder, video renderer, metadata, HLS, MPEG-TS, MSE, WebCodecs và debugging media trên web.',
    blurb:
      'Series tiếng Việt 16 phần đi từ mental model container–codec–stream–packet–frame tới pipeline demux, decode, render, encode và mux. Bốn chặng lần lượt đào sâu timestamp, GOP, color/audio metadata; biến ffprobe và FFmpeg thành workflow inspect–render–cut–concat có kiểm chứng; giải thích progressive MP4, HTTP Range, HLS/ABR, MPEG-TS, MSE và WebCodecs; rồi kết bằng Chrome DevTools, playbook xử lý stall/decode/CORS, ad marker cùng playlist rewrite trên stream được phép kiểm soát, và một capstone Stream Lab end-to-end. Các lab thực hành dùng fixture tự tạo, phân biệt rõ stream copy với re-encode và ưu tiên bằng chứng thay vì đoán.',
    lang: 'vi',
    sections: [
      {
        title: 'Media từ byte đến frame',
        description:
          'Xây mental model về container, codec, stream, encoder, decoder, renderer, timestamp, GOP và metadata.',
        from: 1,
        to: 4,
      },
      {
        title: 'FFmpeg và ffprobe thực chiến',
        description:
          'Inspect, map stream, dựng filtergraph, render, cắt và nối media mà không tự làm hỏng timeline.',
        from: 5,
        to: 8,
      },
      {
        title: 'Video trong browser và adaptive streaming',
        description:
          'Theo dữ liệu qua HTML video, HTTP Range, HLS, MPEG-TS, MSE và WebCodecs.',
        from: 9,
        to: 12,
      },
      {
        title: 'Debugging, ad markers và capstone',
        description:
          'Điều tra media bằng Chrome DevTools, sửa lỗi theo tầng và rewrite playlist an toàn trên fixture được phép kiểm thử.',
        from: 13,
        to: 16,
      },
    ],
  },
  'tanstack-query': {
    homepagePick: 'tanstack-query-18-production-architecture-migration',
    title: 'TanStack Query (React Query) — từ Zero đến Production',
    blurb:
      'Series tiếng Việt (18 phần) đưa bạn từ "fetch dữ liệu bằng useEffect + useState" đến làm chủ server state với TanStack Query (React Query) v5 một cách chuyên nghiệp. Nửa đầu xây nền: mental model — vì sao server state khác client state và vì sao không nên tự viết fetch tay — cài đặt QueryClient/Provider/Devtools, đào sâu useQuery (status vs fetchStatus, loading/error/empty), staleTime/gcTime và vòng đời cache, hệ query key phân cấp cùng API client validate bằng zod và queryOptions, dependent/parallel queries, pagination và useInfiniteQuery, mutations với invalidate, optimistic update (onMutate/rollback) và quản lý cache thủ công, error handling/retry/Suspense/performance, rồi testing với MSW + React Testing Library và một capstone CRUD hoàn chỉnh. Nửa sau lên production: QueryClient & defaults sâu, SSR/Next.js App Router & hydration, prefetching và tích hợp router, dùng QueryClient như một store để thao tác cache chủ động, offline-first & persistence, realtime với WebSocket/SSE, mutation nâng cao, tối ưu hiệu năng render, type-safety đỉnh cao, và kiến trúc production cùng lộ trình migrate v4 → v5. Mỗi bài có code TypeScript/React 19 chạy được và bài tập thực hành.',
    pin: 3,
  },
  'service-workers': {
    homepagePick: 'service-workers-20-advanced-patterns-frameworks',
    title: 'Service Workers & PWA — từ Zero đến Production',
    blurb:
      'Series tiếng Việt đưa bạn từ "service worker là cái gì" đến chỗ tự tin xây dựng một Progressive Web App offline-first chạy thật. Bắt đầu với mental model — service worker là một network proxy chạy nền, vòng đời (lifecycle) và vì sao nó khác Web Worker — rồi đào sâu lifecycle (install, activate, waiting, skipWaiting, clients.claim, update flow) và cách debug trong DevTools. Tiếp đó là chặn request với fetch event và respondWith, Cache API cùng các caching strategy kinh điển (cache-first, network-first, stale-while-revalidate), kiến trúc app shell offline-first và trang fallback, rồi advanced caching (versioning, cleanup, expiration, opaque/CORS). Phần sau là các năng lực nâng cao của nền tảng: Background Sync để retry request thất bại bằng hàng đợi IndexedDB, Push Notifications với Push API + VAPID, và Workbox để giảm boilerplate (precaching, routing, vite-plugin-pwa) — kết bằng capstone build một PWA hoàn chỉnh: manifest, install prompt, update UX, testing và deploy. Mỗi bài có ví dụ code chạy được và bài tập thực hành kèm hướng dẫn.',
    pin: 2,
  },
  'browser-internals': {
    homepagePick: 'browser-internals-22-capstone-profiling-internals',
    title: 'How Browsers Work — Internals Deep Dive',
    blurb:
      'Series tiếng Việt đi dưới lớp vỏ của browser — runtime mà frontend engineer ship code vào mỗi ngày nhưng hiếm khi hiểu trọn. Chặng nền tảng 1–12 bắt đầu từ kiến trúc đa process (browser, renderer, GPU, network, sandbox và site isolation), lần theo navigation từ URL tới pixel, rồi đào sâu HTML parser/DOM, CSSOM, render tree, layout, paint, compositing, V8, event loop, memory/GC, networking, storage và security model. Chặng chuyên sâu 13–22 nối mental model đó với GPU/Viz và layer promotion, scrolling, frame scheduling, các tier tối ưu/deopt của V8, heap leak và detached DOM, accessibility tree, pipeline decode ảnh/video, worker + SharedArrayBuffer/Atomics, process model + BFCache — kết bằng capstone profiling có hệ thống trong DevTools. Mỗi phần nối internals với code và triệu chứng bạn thật sự gặp.',
  },
  'web-a11y': {
    homepagePick: 'web-a11y-22-capstone-accessibility-at-scale',
    title: 'Web Accessibility (a11y) — From Zero to Inclusive',
    blurb:
      'A bilingual (English-first) deep dive into building web UIs everyone can use. Start with the mental model — why accessibility matters, the POUR principles, disabilities and how assistive technology actually works — then the foundation of semantic HTML and a pragmatic ARIA deep dive (roles, states, live regions, and the rules for when NOT to use ARIA). Master keyboard accessibility and focus management in SPAs (tab order, skip links, focus traps, roving tabindex, dialogs and route changes), accessible forms (labels, fieldsets, errors, aria-describedby), accessible names and image alternatives, and the visual layer (color contrast, zoom, reduced motion, focus indicators). Then build real accessible components following the WAI-ARIA Authoring Practices, test with screen readers (VoiceOver/NVDA) and automated tools (axe-core, eslint-plugin-jsx-a11y, Playwright), and finish with a capstone that audits a real page end-to-end against WCAG and bakes accessibility into your workflow. Every part ships runnable TypeScript/React examples.',
  },
  'web-perf': {
    homepagePick: 'web-perf-22-capstone-systematic-investigation',
    title: 'Web Performance & Core Web Vitals',
    blurb:
      'Series tiếng Việt đưa bạn từ "trang chậm mà không biết tại sao" đến làm chủ hiệu năng web một cách có hệ thống. Chặng nền tảng 1–12 đi từ RAIL và Core Web Vitals (LCP, INP, CLS), lab vs field, Lighthouse/Performance/WebPageTest/CrUX/RUM và critical rendering path tới tối ưu LCP, INP, CLS, JavaScript bundle, ảnh/media, font, network/cache — rồi gom lại bằng capstone audit, performance budget và Lighthouse CI. Chặng chuyên sâu 13–22 tiếp tục với RUM attribution và sampling, resource hints/Fetch Priority/Early Hints/Speculation Rules, kiến trúc CSR–SSR–SSG–streaming, LoAF và main-thread scheduling, CSS rendering/containment, memory của phiên dài, HTTP/2–3 + compression/cache policy, third-party governance, guardrail ở quy mô tổ chức — kết bằng capstone điều tra triệu chứng tới nguyên nhân gốc. Mỗi phần có code, giới hạn hỗ trợ và cách đo lại.',
  },
  'fe-algorithms': {
    homepagePick: 'fe-algorithms-12-capstone',
    title: 'Thuật toán hay áp dụng trong Frontend',
    blurb:
      'Series tiếng Việt đi sâu vào những thuật toán mà frontend engineer thực sự dùng hằng ngày — không phải LeetCode, mà là code chạy trong trình duyệt. Bắt đầu từ mental model và cách đo độ phức tạp trong môi trường browser, rồi tới debounce/throttle, tìm kiếm & lọc client-side (binary search, fuzzy search), ảo hóa danh sách lớn, diffing & reconciliation của Virtual DOM, cây và đồ thị trong UI, memoization và LRU cache, scheduling với priority queue và time-slicing, sắp xếp với comparator phức tạp, thuật toán chuỗi (highlight, text-diff, autocomplete), hình học cho animation và drag-drop — và một capstone gộp tất cả vào một "command palette + data grid". Mỗi phần có code TypeScript/React chạy được và giải thích cặn kẽ tại sao.',
  },
  'fe-patterns': {
    homepagePick: 'fe-patterns-12-capstone-refactor',
    title: 'Design Patterns hay dùng trong Frontend Web',
    blurb:
      'Series tiếng Việt về các mẫu thiết kế (design pattern) mà frontend engineer hiện đại dùng để giữ codebase sạch và mở rộng được. Khởi đầu với mental model "pattern là gì, khi nào nên/không nên dùng" và SOLID nhìn qua lăng kính frontend, rồi đi qua Module & Singleton, Observer & Pub/Sub (nền tảng của reactivity/signals), Factory, Strategy, Command (undo/redo), Facade & Adapter (chống vendor lock-in), Decorator & Proxy (HOC, logging, reactive), các pattern composition đặc trưng React (Compound Components, Render Props, Custom Hooks), state patterns (Flux/Redux, State Machine), Container/Presentational, MVVM và dependency injection — kết bằng một capstone refactor một feature rối thành code gọn gàng. Toàn bộ có ví dụ TypeScript/React thực tế.',
  },
  stocks: {
    homepagePick: 'stocks-34-vnindex-market-outlook-vingroup-pillars',
    title: 'Đầu tư Cổ phiếu — từ Zero đến Quy trình chuyên nghiệp',
    blurb:
      'Lộ trình tiếng Việt, chỉ mang tính giáo dục, đưa bạn từ "cổ phiếu là gì" đến một quy trình có thể viết ra, kiểm chứng và lặp lại. Series bắt đầu với tư duy chủ sở hữu, cơ chế thị trường, báo cáo tài chính, định giá, kỹ thuật, danh mục, rủi ro, tâm lý, lãi kép và vĩ mô; sau đó đào sâu DCF, lợi thế cạnh tranh, phong cách đầu tư, thuế, phái sinh, thị trường quốc tế, bong bóng và gian lận. Volume phòng lab tiếp theo chuyển kiến thức thành năng lực thực hành: đọc trọn bộ BCTC, viết trading playbook, kiểm định lợi thế, thực thi lệnh, quản trị rủi ro và review hiệu suất. Không phải lời khuyên đầu tư và không bảo đảm lợi nhuận.',
  },
  'package-managers': {
    homepagePick: 'package-managers-12-capstone',
    title: 'Node Package Managers & the Supply Chain — Deep Dive',
    blurb:
      'Go from "I just run npm install" to understanding the entire dependency layer like a senior. Start with the mental model every package manager shares (resolve → fetch → link, package.json, semver, the registry, lockfiles), then go deep on npm, Yarn Classic (v1), Yarn Berry (v2–v4) with Plug\'n\'Play, and pnpm plus Bun — what each does differently and why. Then the parts most guides skip: lockfiles and integrity hashes, lifecycle scripts and node-gyp, how native modules ship prebuilt binaries, and the dependency supply chain — real-world attacks (typosquatting, dependency confusion, malicious postinstall, account takeover) and a hardened defense playbook. Ends with monorepos/workspaces and a capstone decision-and-migration guide.',
  },
  ai: {
    homepagePick: 'ai-agent-workflow-putting-it-all-together',
    title: 'AI for Developers — LLMs, Agents & Coding',
    description:
      'Lộ trình AI cho developer gồm 43 bài: nền tảng LLM, RAG và eval, kiến trúc agent, coding workflow, Cursor, MCP và multi-agent.',
    blurb:
      'Lộ trình 43 bài dành cho developer muốn hiểu AI từ gốc và dùng được trong công việc thật. Bắt đầu từ lịch sử AI, token, sampling, prompting và embeddings; tiếp tục với cách chọn model, RAG, fine-tuning, eval, safety và tối ưu chi phí; sau đó tự thiết kế agent với context, memory, tool use, patterns, orchestration và MCP; cuối cùng áp dụng vào coding hằng ngày — đọc codebase, build feature, debug, review, viết rules/skills, dùng sub-agent và bàn giao context. Nội dung ưu tiên mental model, trade-off, workflow có thể lặp lại và kiểm chứng, không chạy theo hype hay một model cụ thể.',
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
        to: 27,
      },
      {
        title: 'Workflow coding với AI',
        description:
          'Dùng coding agent để onboard codebase, ship feature, debug, review và test mà vẫn giữ quyền kiểm soát.',
        from: 28,
        to: 35,
      },
      {
        title: 'Tùy biến agent & capstone',
        description:
          'Đóng gói cách làm việc bằng config, rules, skills, sub-agent và handoff; sau đó ghép thành một workflow end-to-end.',
        from: 36,
        to: 42,
      },
      {
        title: 'Sự nghiệp trong kỷ nguyên AI',
        description:
          'Chuyển từ tối ưu tốc độ gõ code sang tối ưu khả năng phán đoán, thiết kế hệ thống và xác minh output.',
        from: 43,
        to: 43,
      },
    ],
    pin: 1,
  },
  bash: {
    homepagePick: 'bash-10-automation-best-practices',
    title: 'Bash & Shell Scripting',
    blurb:
      'From your first script to production-grade automation — quoting, loops, functions, text processing, and robust error handling.',
  },
  'dev-cli': {
    homepagePick: 'dev-cli-10-bash-automation-playbook',
    title: 'Command Line cho Developer - Commands, Bash Script & Workflow',
    blurb:
      'Series tiếng Việt dạng handbook/cookbook cho developer làm việc trong terminal mỗi ngày: điều hướng file, đọc log, tìm code với rg/find, pipe và redirection, Git workflow, curl+jq để debug API, process/port/network debugging, Node package manager, Docker/SSH, và cách gom tất cả thành bash script tự động hóa an toàn.',
  },
  nvim: {
    homepagePick: 'nvim-12-capstone-pro-setup-cheatsheet',
    title: 'Neovim từ Gà mờ đến Pro',
    blurb:
      'Series tiếng Việt giúp bạn chuyển từ VSCode sang Neovim một cách thực dụng, theo chuẩn 2025-2026: modal editing, Lua config, lazy.nvim, native LSP mới với vim.lsp.config/vim.lsp.enable, completion, formatter/linter, Treesitter, fuzzy finder, Git, terminal, debug/test, dotfiles và một capstone cấu hình hoàn chỉnh. Mỗi phần có cheatsheet, bài tập và checklist để luyện thành phản xạ thật.',
  },
  typescript: {
    homepagePick: 'typescript-12-capstone-typed-sdk',
    title: 'TypeScript Engineering — từ Type System đến Production',
    description:
      'Lộ trình TypeScript 42 phần từ type system, production engineering và typed SDK tới type challenges cùng các design pattern thực chiến.',
    blurb:
      'Lộ trình tiếng Việt 42 phần gom toàn bộ nội dung TypeScript của blog vào một series duy nhất. Chặng Production Engineering dựng mental model về soundness, strict config, narrowing và inference; đào sâu conditional types, infer, mapped types, tuple, template-literal DSL, recursion và union algebra; rồi đưa chúng qua runtime boundary, async contract, module, declaration, kiến trúc, monorepo, migration và capstone typed SDK. Chặng Type Challenges gồm 12 bài luyện type-level programming từ năm khối nền tảng tới parser, state machine và typed path utility. Chặng cuối áp dụng TypeScript vào 10 design pattern thực chiến như Factory, Builder, Strategy, Observer, Decorator, Adapter, Command, State, Proxy và Dependency Injection.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng để đọc compiler',
        description:
          'Nắm giới hạn soundness, strictness, narrowing và generic inference trước khi viết type-level code.',
        from: 1,
        to: 4,
      },
      {
        title: 'Type-level engineering chuyên sâu',
        description:
          'Dùng conditional types, infer, mapped types, tuple, template literal, recursion và union algebra để xây API có kiểm soát.',
        from: 5,
        to: 12,
      },
      {
        title: 'Contract chạy được ở production',
        description:
          'Nối compile-time model với dữ liệu runtime, lỗi, bất đồng bộ, module và public package.',
        from: 13,
        to: 16,
      },
      {
        title: 'Scale codebase và tổ chức',
        description:
          'Thiết kế boundary, build graph, type performance, migration, governance và release gate ở cấp Staff.',
        from: 17,
        to: 20,
      },
      {
        title: 'Type Challenges — từ nền tảng đến type wizard',
        description:
          'Luyện mapped type, conditional type, infer, recursion, union, template literal, type-level arithmetic và parser qua challenge có lời giải.',
        from: 21,
        to: 32,
      },
      {
        title: 'Design Patterns trong TypeScript',
        description:
          'Áp dụng các pattern tạo object, thay đổi hành vi, giao tiếp, state và dependency boundary vào code TypeScript thực tế.',
        from: 33,
        to: 42,
      },
    ],
    pin: 6,
  },
  'web-security': {
    homepagePick: 'web-security-05-auth-tokens-secure-storage',
    title: 'Web Security for Frontend Devs',
    blurb:
      'The security essentials every frontend developer must know — each part shows a real threat, vulnerable code, then the fix.',
  },
  docker: {
    homepagePick: 'docker-08-debugging-troubleshooting-docker',
    title: 'Docker, Compose & Kubernetes',
    blurb:
      'Lộ trình tiếng Việt theo hai chặng: 10 phần nền tảng giúp bạn làm chủ container, image, Dockerfile, storage, networking, Compose, hardening và debug; nhánh chuyên sâu đi xuống OCI runtime, namespace/cgroup, BuildKit và supply chain, Compose cho team/CI, rồi vào Kubernetes networking, scheduling, autoscaling, stateful storage, security, observability và incident response. Mỗi phần ưu tiên mental model, trade-off, failure mode, lab có thể tự phá–sửa và tài liệu chính thức để biến kiến thức thành năng lực vận hành production.',
  },
  nginx: {
    homepagePick: 'nginx-05-production-and-debugging',
    title: 'Nginx from Zero to Production',
    blurb:
      'Master Nginx hands-on: install locally, understand the config model, build a reverse proxy and load balancer, add TLS, caching and rate limiting, then ship and debug a production setup.',
  },
  'hosting-dns': {
    homepagePick: 'hosting-10-zero-downtime-migration-debugging',
    title: 'Domain, DNS & Hosting — từ Zero đến Production',
    description:
      'Series 10 phần về domain, DNS và hosting: Cloudflare, Hostinger, GitHub Pages, VPS, TLS, email DNS và migration không downtime.',
    blurb:
      'Series tiếng Việt 10 phần giúp bạn nối một domain thật tới đúng hạ tầng mà không làm gián đoạn website hay email. Lộ trình bắt đầu bằng mental model tách registrar, authoritative DNS, hosting, CDN và origin; sau đó làm chủ delegation, record A/AAAA/CNAME/MX/TXT/CAA, TTL và cách kiểm tra bằng dig. Phần thực hành đi qua đổi nameserver từ Hostinger sang Cloudflare đúng thứ tự DNSSEC, giữ Cloudflare DNS nhưng host website ở Hostinger, gắn custom domain cho GitHub Pages và Cloudflare Pages, trỏ domain vào VPS qua Nginx, rồi cấu hình Cloudflare proxy với Full (strict). Cuối series là email DNS với SPF/DKIM/DMARC và runbook migration không downtime, có acceptance test, rollback cùng quy trình debug từ NS/DS tới TLS, HTTP và application.',
    lang: 'vi',
    pin: 4,
  },
  nextjs: {
    homepagePick: 'nextjs-10-production-testing-and-debugging',
    title: 'Next.js 16 from Zero to Senior',
    blurb:
      'Go from zero to senior on the latest Next.js (16): the App Router mental model, Server Components and data fetching, the new Cache Components & "use cache" model, Server Actions, route handlers and proxy, rendering, SEO, auth, then shipping and debugging production — hands-on, with exercises.',
  },
  nodejs: {
    homepagePick: 'node-26-production-game-day-capstone',
    title: 'Node.js Production Engineering — Từ Runtime đến Hệ thống phân tán',
    description:
      'Lộ trình Node.js 26 phần từ runtime, HTTP và data layer tới distributed systems, reliability, diagnostics và các case study production thực tế.',
    blurb:
      'Lộ trình tiếng Việt gồm 26 phần dành cho kỹ sư muốn hiểu Node.js như một nền tảng production, không chỉ như công cụ dựng API. Series đi từ V8, libuv, event loop, HTTP và Express 5 đến data layer, security, testing, performance, delivery và modular monolith; đào sâu PostgreSQL, Prisma, Redis, NestJS, queue, GraphQL, gRPC, realtime và OpenTelemetry; rồi chuyển sang volume thực chiến về overload control, stream dữ liệu lớn, production diagnostics, multi-tenant SaaS, webhook/payment và một capstone game day. Mỗi phần dùng TypeScript, giải thích mental model trước API, phân tích trade-off và failure mode, kèm tiêu chí vận hành, bài tập cùng tài liệu chính thức để biến kiến thức thành quyết định kỹ thuật.',
    lang: 'vi',
    sections: [
      {
        title: 'Runtime, API và trust boundary',
        description:
          'Hiểu Node.js từ event loop và HTTP tới Express, data layer, authentication và API security.',
        from: 1,
        to: 5,
      },
      {
        title: 'Nền tảng production engineering',
        description:
          'Thiết kế codebase lớn, delivery, performance, test portfolio và kiến trúc có khả năng tiến hóa.',
        from: 6,
        to: 10,
      },
      {
        title: 'Data, framework và identity chuyên sâu',
        description:
          'Đào sâu PostgreSQL, Prisma, Redis, NestJS và identity architecture bằng các invariant production.',
        from: 11,
        to: 15,
      },
      {
        title: 'Async và distributed systems',
        description:
          'Xây queue, GraphQL, microservices/gRPC, realtime và observability theo user journey.',
        from: 16,
        to: 20,
      },
      {
        title: 'Reliability và diagnostics',
        description:
          'Kiểm soát overload, stream dữ liệu lớn và điều tra CPU, event loop, heap cùng native memory.',
        from: 21,
        to: 23,
      },
      {
        title: 'Case study production',
        description:
          'Giải bài toán multi-tenant SaaS, webhook/payment và hoàn thiện capstone bằng một production game day.',
        from: 24,
        to: 26,
      },
    ],
    pin: 5,
  },
  'nestjs-zero-to-hero': {
    homepagePick: 'nestjs-20-deployment-docker-ci-capstone',
    title: 'NestJS Zero to Hero — Modern TypeScript Back-end Development',
    description:
      'Series NestJS 11 gồm 20 bài thực hành: REST API, DI, PostgreSQL, Prisma, auth, testing, queue, realtime, GraphQL, microservices, observability và deployment.',
    blurb:
      'Lộ trình tiếng Việt 20 phần biến một project TaskFlow từ HTTP API đầu tiên thành back-end production bằng NestJS 11 và TypeScript strict. Chặng nền tảng giải thích controller, provider, dependency injection, module graph, request lifecycle, config và logging bằng mental model có thể debug. Chặng REST và data thiết kế contract, validation, OpenAPI, PostgreSQL, Prisma, transaction, concurrency, idempotency cùng kiến trúc ports-and-adapters. Chặng chất lượng hoàn thiện authentication, refresh-token rotation, authorization theo policy và tenant, security baseline, testing nhiều tầng, profiling, Fastify, cache và rate limit. Chặng cuối thêm BullMQ, outbox, WebSocket/SSE, GraphQL, microservices/gRPC, OpenTelemetry, health check, graceful shutdown, Docker và CI/CD. Mỗi bài có lab tiếp nối, lệnh chạy, test, failure mode, bài tập và acceptance criteria; capstone cuối series tạo trải nghiệm triển khai một hệ thống NestJS hoàn chỉnh thay vì chỉ học decorator rời rạc.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng NestJS và runtime',
        description:
          'Tạo TaskFlow API, hiểu controller, provider, DI, module graph, request pipeline, configuration và bootstrap có kiểm soát.',
        from: 1,
        to: 6,
      },
      {
        title: 'REST, dữ liệu và kiến trúc',
        description:
          'Thiết kế HTTP contract, kết nối PostgreSQL/Prisma, xử lý transaction và đưa business rule vào boundary có thể test.',
        from: 7,
        to: 10,
      },
      {
        title: 'Bảo mật, chất lượng và hiệu năng',
        description:
          'Xây authentication/authorization đúng nghĩa, khóa hành vi bằng test và đo trước khi tối ưu cache hoặc adapter.',
        from: 11,
        to: 14,
      },
      {
        title: 'Async, phân tán và production',
        description:
          'Thêm queue, realtime, GraphQL, messaging/gRPC, observability, graceful shutdown và delivery pipeline cho capstone.',
        from: 15,
        to: 20,
      },
    ],
    pin: 8,
  },
  eng: {
    homepagePick: 'eng-19-explaining-technical-things-simply',
    title: 'Practical English for Work',
    blurb:
      'Build real work-communication reflexes from zero — bilingual, pattern-first, no academic grammar.',
  },
  'css-modern': {
    homepagePick: 'css-grid-complete-guide',
    title: 'Modern CSS Deep Dives',
    blurb:
      'The complete modern CSS path in one series: layout mental models (Flexbox, Grid, subgrid, container queries, fluid design), the cascade, custom properties and color, then animation (transitions, keyframes, easing, performance, accessible and scroll-driven motion), and finally pure-CSS 3D — perspective, preserve-3d objects, tilt and parallax, carousels, lighting and performance.',
  },
  'web-dev': {
    homepagePick: 'javascript-event-loop-microtasks-macrotasks',
    title: 'Web Development in Practice',
    blurb:
      'Practical web development for senior frontend engineers — the CSS, JavaScript, and browser-platform fundamentals behind production UI. From CSS performance and modern features, through core JavaScript (event loop, async, closures, fetch, events, memory, Intl) and the browser APIs that power real apps, to landing-page motion across CSS, vanilla JS, and React + Framer Motion.',
  },
  'chrome-ext': {
    homepagePick: 'chrome-ext-12-publish-advanced-capstone',
    title: 'Build Chrome Extensions — Zero to Pro (Manifest V3)',
    blurb:
      'Go from "I want to build a browser extension" to shipping one on the Chrome Web Store. Every part has real config and a live, interactive simulator. Start with the Manifest V3 mental model and your first "load unpacked" extension, then the manifest deep dive, the component architecture (popup, service worker, content scripts, options), content-script injection and isolated worlds, the event-driven background service worker, messaging across contexts, chrome.storage, UI surfaces and the action API, permissions and security, the powerful APIs (tabs, scripting, contextMenus, commands, notifications), a pro Vite + CRXJS + TypeScript + React build, and finally publishing, auto-update, and cross-browser — with a capstone extension.',
  },
  webpack: {
    homepagePick: 'webpack-12-production-capstone-migration',
    title: 'Webpack from Zero to Pro',
    blurb:
      'Master Webpack 5 config from the ground up — every part ships a real config and a live, interactive demo. Start with the bundler mental model and your first build, then the config anatomy, loaders and plugins, the dev server with HMR and source maps, code splitting and lazy loading, tree shaking and production mode, long-term caching with contenthash, bundle analysis and performance, advanced resolve plus authoring your own loader and plugin, Module Federation for micro-frontends, and a production capstone with migration tips.',
  },
  vite: {
    homepagePick: 'vite-12-performance-capstone-migration',
    title: 'Vite from Zero to Pro',
    blurb:
      'Master Vite 8 from the ground up — every part ships a real config and a live, interactive demo. Start with the native-ESM mental model and your first project, then the vite.config.ts anatomy, the dev server and on-demand transform, dependency pre-bundling, HMR internals, CSS and static assets, glob imports, env vars and modes, the Rollup-compatible plugin API, production builds with Rolldown, library mode plus the SSR/Environment API, and finish with performance tuning, a capstone config, and migrating off Webpack/CRA.',
  },
  'tailwind-ui': {
    homepagePick: 'tailwind-ui-12-pro-patterns-capstone',
    title: 'Tailwind, Radix & shadcn/ui — từ Zero đến Pro',
    blurb:
      'Series tiếng Việt giúp bạn thành thạo bộ công cụ styling React hiện đại — mỗi phần đều có config thật và một demo tương tác trực tiếp. Bắt đầu với tư duy nền tảng và cài đặt Tailwind CSS v4, rồi tới utility cốt lõi và layout, design token và theming, variant và kết hợp trạng thái, cách dựng component tái dùng cho đúng (clsx, tailwind-merge, cn, cva) cùng hệ sinh thái plugin. Tiếp đó đi headless và accessible với Radix UI primitives, áp dụng shadcn/ui (triết lý, CLI, components.json), theme và tùy biến nó, dựng form đã validate với react-hook-form + zod, và kết thúc bằng các mẫu chuyên nghiệp cùng capstone dashboard.',
  },
  vue: {
    homepagePick: 'vue-12-testing-capstone',
    title: 'Vue.js 3 — từ Zero đến Production',
    blurb:
      'Series tiếng Việt đưa bạn từ "Vue là gì" đến làm chủ Vue 3 hiện đại theo phong cách production: Composition API, TypeScript và Vite. Bắt đầu với mental model — reactivity là gì, Single-File Component, và vì sao Vue khác React — rồi cú pháp template và directive (v-bind, v-if, v-for, v-on, v-model), đào sâu hệ reactivity (ref, reactive, computed, watch/watchEffect và các bẫy thường gặp). Tiếp đó là component thực thụ (props, emits, slots, provide/inject), Composition API và composable để tái dùng logic, form và v-model tùy biến, định tuyến với Vue Router, quản lý state với Pinia, xử lý bất đồng bộ/Suspense/data fetching, dùng TypeScript đúng cách với Vue, tối ưu hiệu năng, và kết bằng phần testing (Vitest + Vue Test Utils) cùng một capstone. Mỗi phần có code chạy được và bài tập thực hành.',
  },
  react: {
    homepagePick: 'react-01-ui-as-value',
    title: 'React 19 — từ Rendering Model đến Production',
    description:
      'Lộ trình React 19 gồm 28 phần từ element tree, render/commit và Hooks tới Actions, Compiler, profiling, kiến trúc và migration production.',
    blurb:
      'Series tiếng Việt 28 phần dạy React như một runtime giữ UI đồng bộ với state, không phải danh sách API. Lộ trình bắt đầu từ UI-as-value, JSX, render/commit, identity, state queue, Effects và một mini renderer; sau đó suy ra cơ chế Hooks, closure, memoization, refs, reducer, custom hook và external store. Các chặng tiếp theo xử lý state ownership, Context, form, Suspense, error recovery, Actions, optimistic UI, React Compiler, concurrent scheduling, profiling, virtualization và feature architecture. Capstone cuối migrate một codebase React 18-era lên React 19.2 cùng Compiler 1.0 bằng test, trace và rollback gate có thể kiểm chứng.',
    lang: 'vi',
    sections: [
      {
        title: 'Rendering model',
        description:
          'Hiểu element tree, render/commit, identity, state queue và Effects trước khi dùng abstraction cấp cao.',
        from: 1,
        to: 7,
      },
      {
        title: 'Cơ chế Hooks',
        description:
          'Suy ra call order, closure, memoization, refs, reducer, custom hook và external-store contract.',
        from: 8,
        to: 14,
      },
      {
        title: 'State và data boundaries',
        description:
          'Đặt state đúng owner, thiết kế Context/form và phối hợp Suspense với error recovery.',
        from: 15,
        to: 20,
      },
      {
        title: 'React 19 và Compiler',
        description:
          'Dùng Actions, optimistic projection, Compiler 1.0 và concurrent scheduling theo contract đã kiểm chứng.',
        from: 21,
        to: 24,
      },
      {
        title: 'Production',
        description:
          'Profile, virtualize, giữ dependency direction và migrate React 18-era lên React 19.2 có rollback.',
        from: 25,
        to: 28,
      },
    ],
  },
  'react-stack': {
    homepagePick: 'react-stack-12-capstone-ci-deploy',
    title: 'Build a Real React App — The Production Stack',
    blurb:
      'The hands-on sequel to the Tailwind/Radix/shadcn series: build one real app — "Pulse", a small CRM/SaaS dashboard — end-to-end with the modern React production stack. Start by scaffolding with pnpm, Vite and TypeScript strict, plus oxlint + oxfmt for fast linting and formatting, then lay the Tailwind v4 + shadcn/ui foundation and an app shell. Wire routing and architecture with React Router v7 (data mode), then master server state with TanStack Query — typed query keys, caching, mutations and optimistic updates with rollback. Build validated forms with react-hook-form + zod, manage genuine client state with Zustand, and ship a real feature: a data table with filters and URL-as-state. Add an auth + API layer, then tune performance (code splitting, prefetching, bundle analysis) and lock in quality with Vitest, React Testing Library and MSW. Finish with a capstone that assembles a full feature flow and a pnpm + oxlint GitHub Actions CI pipeline.',
  },
  threejs: {
    homepagePick: 'threejs-13-interior-decorator-real-world',
    title: 'Three.js Production Engineering — từ Zero đến Staff',
    description:
      'Lộ trình Three.js 25 phần từ scene đầu tiên tới GPU profiling, asset CI, runtime architecture, resilience, WebGPU và TSL.',
    blurb:
      'Lộ trình tiếng Việt 25 phần đưa bạn từ scene đầu tiên tới năng lực thiết kế và vận hành một nền tảng 3D production. Ba chặng đầu xây mental model WebGL/Three.js, scene graph, camera, ánh sáng, PBR, glTF, animation, post-processing, interaction, physics và pipeline Blender–glTF–compression qua các demo thực hành. Chặng chuyên sâu đi xuống coordinate space, precision, depth, transparency và render target; sau đó đi lên cấp hệ thống với frame phases, fixed timestep, resource ownership, CPU/GPU profiling, adaptive quality, asset contract + CI, testing, observability, accessibility, context-loss recovery và chiến lược migrate WebGPU/TSL. Nội dung ưu tiên budget đo được, failure mode, decision rule và trade-off kiến trúc thay vì khẩu quyết tối ưu.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng realtime rendering',
        description:
          'Từ WebGL mental model tới geometry, scene graph, camera, ánh sáng, texture và PBR đúng color pipeline.',
        from: 1,
        to: 5,
      },
      {
        title: 'Dựng trải nghiệm 3D tương tác',
        description:
          'Nạp model, animation, post-processing, instancing, raycasting, kiến trúc scene và physics qua các lab chạy thật.',
        from: 6,
        to: 12,
      },
      {
        title: 'Asset, character và workflow thực tế',
        description:
          'Từ configurator, Blender và công cụ DCC tới compression, rigging, state machine và tương tác nhân vật.',
        from: 13,
        to: 18,
      },
      {
        title: 'Graphics engineering',
        description:
          'Làm chủ toán không gian, precision, depth buffer, transparency và render target để debug bằng mô hình thay vì đoán.',
        from: 19,
        to: 20,
      },
      {
        title: 'Production architecture từ Senior đến Staff',
        description:
          'Thiết kế runtime, budget CPU/GPU, asset CI, quality engineering, resilience và lộ trình WebGPU/TSL có kiểm soát.',
        from: 21,
        to: 25,
      },
    ],
  },
  svg: {
    homepagePick: 'svg-20-charts-from-scratch',
    title: 'SVG from Zero to Senior',
    blurb:
      'Master SVG end to end: the coordinate system and viewBox, the path language, painting with strokes/gradients/patterns, text, transforms and nested coordinate systems, animation (CSS + SMIL, line-drawing), filters, clipping and masking, interactive data-driven graphics with JavaScript, and finally production — optimization, sprites, accessibility and performance. Every part ships a live, interactive demo.',
  },
  networking: {
    homepagePick: 'net-10-robust-networking-debugging',
    title: 'Network Programming',
    blurb:
      'Build network apps from the socket up with Node.js + TypeScript — TCP/UDP, DNS, HTTP, WebSockets, TLS, framing, scaling, and debugging.',
  },
  mindset: {
    homepagePick: 'grow-10-resilient-daily-practice',
    title: 'Effort, Focus & Grit',
    description:
      'Series 10 phần về nỗ lực có chủ đích, tập trung, tính đều đặn, kỷ luật, khả năng phục hồi, năng lượng và hệ thống thực hành bền vững.',
    blurb:
      'Series tiếng Việt 10 phần giúp biến ý chí thành một cách luyện tập bền vững: hiểu vai trò và giới hạn của nỗ lực, bảo vệ sự tập trung, xây tính đều đặn và kỷ luật linh hoạt, học cách hồi phục và đổi khung sau trở ngại, biết khi nào nên kiên nhẫn hoặc điều chỉnh, quản lý năng lượng, rồi nối mục tiêu với vòng phản hồi và một thực hành hằng ngày đủ nhỏ để duy trì. Trọng tâm không phải “cố hơn bằng mọi giá”, mà là luyện có chủ đích, nhận phản hồi, nghỉ đúng lúc và sửa hệ thống theo thực tế.',
    lang: 'vi',
    sections: [
      {
        title: 'Nền tảng cho tiến bộ bền vững',
        description:
          'Hiểu nỗ lực có chủ đích, tập trung, tính đều đặn và kỷ luật như những kỹ năng có thể thiết kế.',
        from: 1,
        to: 4,
      },
      {
        title: 'Phục hồi, điều chỉnh và chơi đường dài',
        description:
          'Xử lý trở ngại, đổi khung nhìn, xem lại chỗ chững và quản lý năng lượng mà không đồng nhất bền bỉ với cố chấp.',
        from: 5,
        to: 8,
      },
      {
        title: 'Biến ý định thành hệ thống',
        description:
          'Nối mục tiêu với vòng phản hồi và gom các nguyên tắc thành một thực hành hằng ngày linh hoạt.',
        from: 9,
        to: 10,
      },
    ],
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
  /** Most recent publication/update activity — used to order series in listings. */
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
      const activityDates = parts.map((p) =>
        (p.data.updatedDate ?? p.data.pubDate).getTime()
      );
      const publicationDates = parts.map((p) => p.data.pubDate.getTime());
      return {
        id,
        meta,
        parts,
        count: parts.length,
        latest: new Date(Math.max(...activityDates)),
        started: new Date(Math.min(...publicationDates)),
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
