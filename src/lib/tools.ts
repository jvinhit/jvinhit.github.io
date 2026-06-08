/**
 * Single source of truth for the Tools directory.
 *
 * Consumed by:
 * - `src/pages/tools.astro` — the listing grid (maps `icon` key → Lucide component).
 * - `src/pages/tools/view/[slug].astro` — the chrome-wrapped viewer that embeds
 *   each standalone demo in an iframe so the site header/footer stay visible.
 *
 * The icon is stored as a string key (not a component) so this stays a plain,
 * serializable data module that both an `.astro` page and a build-time
 * `getStaticPaths` can import without pulling in the Astro component runtime.
 */

export type ToolIcon =
  | 'wrench'
  | 'dices'
  | 'loader'
  | 'repeat'
  | 'sparkles'
  | 'cookie'
  | 'globe'
  | 'gitfork'
  | 'trending'
  | 'code'
  | 'layers'
  | 'bot';

export interface Tool {
  name: string;
  description: string;
  /** Canonical path to the standalone demo, e.g. `/tools/css-keyframes-demo/`. */
  href: string;
  icon: ToolIcon;
  tags: string[];
  /**
   * Full-viewport "app" demo (canvas, game, fixed-height layout) whose content
   * height equals the viewport rather than flowing. The `/tools/view/*` viewer
   * gives these a tall fixed iframe height instead of content auto-fit, which
   * would otherwise collapse them.
   */
  app?: boolean;
}

export interface ToolSection {
  label: string | null;
  tools: Tool[];
}

const standaloneTools: Tool[] = [
  {
    name: 'Landing Animation Lab',
    description:
      'Live lab of landing-page & component animation techniques — page-load orchestration, scroll reveal, stagger, text reveal, parallax, magnetic hover, gestures, page transitions, reduced motion.',
    href: '/tools/landing-animations-demo/',
    icon: 'sparkles',
    tags: ['animation', 'ux', 'react', 'demo'],
  },
  {
    name: 'Stock Chart Patterns',
    description:
      'Interactive gallery of common technical-analysis chart patterns — head & shoulders, double tops, triangles, flags — drawn with neckline, breakout, and target annotations.',
    href: '/tools/stock-patterns-demo/',
    icon: 'trending',
    tags: ['investing', 'charts', 'demo'],
  },
  {
    name: 'iOS Video Playback Lab',
    description:
      'Toggle playsinline, muted, autoplay, loop & controls on a live <video> and watch the generated tag, playback status, and an event log — including the iOS fullscreen takeover and the rejected play() promise.',
    href: '/tools/ios-video-playsinline-demo/',
    icon: 'sparkles',
    tags: ['ios', 'video', 'demo'],
  },
  {
    name: 'Vietlott Mega Draw',
    description:
      'Random number generator for Vietlott 6/45 & 6/55 with animated draw experience.',
    href: '/tools/vietlott-lottery/',
    icon: 'dices',
    tags: ['random', 'game', 'phaser'],
    app: true,
  },
  {
    name: 'Workflow Canvas Demo',
    description:
      'Interactive workflow editor with draggable HTML nodes and canvas bezier edges. Demo for HTML-in-Canvas blog post.',
    href: '/tools/workflow-canvas-demo/',
    icon: 'wrench',
    tags: ['canvas', 'workflow', 'demo'],
    app: true,
  },
  {
    name: 'Placeholder & Skeleton Demo',
    description:
      'Interactive demo of loading placeholders: spinner vs skeleton vs blur-up, the flash problem, and page-level loading islands.',
    href: '/tools/placeholder-demo/',
    icon: 'loader',
    tags: ['ux', 'loading', 'demo'],
  },
  {
    name: 'Generators & yield Demo',
    description:
      'Step through a generator with .next(), watch a lazy filter→map→take pipeline, and race a blocking loop against cooperative scheduling.',
    href: '/tools/generators-demo/',
    icon: 'repeat',
    tags: ['javascript', 'generators', 'demo'],
  },
  {
    name: 'Modern CSS Features Demo',
    description:
      'Live examples of container queries, :has(), <dialog>, the Popover API, scroll-driven animations, and color-mix().',
    href: '/tools/modern-css-demo/',
    icon: 'sparkles',
    tags: ['css', 'web-platform', 'demo'],
  },
  {
    name: 'Cookie Playground & Security Demo',
    description:
      'Set, read, and delete cookies with real attributes, see why HttpOnly defeats XSS, compare storage, and explore SameSite/CSRF.',
    href: '/tools/cookie-demo/',
    icon: 'cookie',
    tags: ['security', 'cookies', 'demo'],
  },
  {
    name: 'CORS Request Inspector',
    description:
      'Configure a cross-origin request and see if it is simple or preflighted, the generated OPTIONS, required response headers, and what bypasses CORS.',
    href: '/tools/cors-demo/',
    icon: 'globe',
    tags: ['cors', 'http', 'demo'],
  },
  {
    name: 'CORS Decision Flow',
    description:
      'An html-in-canvas flowchart that lights up the path the browser takes to decide if your JS can read a response — READ, BLOCKED, or OPAQUE.',
    href: '/tools/cors-flow-demo/',
    icon: 'gitfork',
    tags: ['cors', 'canvas', 'demo'],
    app: true,
  },
];

const jsSeriesTools: Tool[] = [
  {
    name: 'JavaScript Event Loop',
    description:
      'Step through call stack, Web APIs, microtask vs macrotask queues, and console ordering — the production event-loop mental model.',
    href: '/tools/js-event-loop-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Closures, Scope & this',
    description:
      'Lexical environments, closure counters, loop bugs, and binding rules — with live scope inspection.',
    href: '/tools/js-closures-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Async Patterns Playground',
    description:
      'Promise combinators, sequential vs parallel pitfalls, AbortController cancellation, and concurrency pools.',
    href: '/tools/js-async-patterns-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Debounce, Throttle & rAF',
    description:
      'Compare debounce, throttle, and requestAnimationFrame on scroll/input — leading, trailing, and maxWait behavior.',
    href: '/tools/js-debounce-throttle-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Event Delegation Lab',
    description:
      'One listener vs many, closest() delegation, and DOM batching — see propagation and performance trade-offs.',
    href: '/tools/js-event-delegation-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Fetch Resilience Simulator',
    description:
      'Timeouts, retries, exponential backoff, stale-response races, and deduplication — client-side fetch hardening.',
    href: '/tools/js-fetch-resilience-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Error Handling Sandbox',
    description:
      'Sync throws, promise rejections, async/await, Error.cause chains, and global handlers in one iframe sandbox.',
    href: '/tools/js-error-handling-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Form Validation Playground',
    description:
      'Constraint Validation API: ValidityState, setCustomValidity, async cross-field checks, and accessible error UI.',
    href: '/tools/js-form-validation-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Immutability & structuredClone',
    description:
      'Reference vs value, shallow-copy traps, nested mutation, Object.freeze, and change-detection patterns.',
    href: '/tools/js-immutability-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
  {
    name: 'Intl Formatting Explorer',
    description:
      'Intl.NumberFormat, DateTimeFormat, PluralRules, Collator, and locale-aware sorting — no hand-rolled i18n.',
    href: '/tools/js-intl-demo/',
    icon: 'code',
    tags: ['javascript', 'demo', 'js_10'],
  },
];

const cssSeriesTools: Tool[] = [
  {
    name: 'CSS Grid — Complete Reference',
    description:
      'Every grid property in one interactive lab — track builder, the fr unit, auto-fit/minmax responsive, template-areas presets, alignment matrix, item placement (span/lines/dense), and a full container + item cheat sheet.',
    href: '/tools/css-grid-complete-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Flexbox vs Grid Playground',
    description:
      'Toggle flex vs grid, resize containers, and see axis alignment, fr tracks, and intrinsic sizing live.',
    href: '/tools/css-layout-playground/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Advanced Grid Lab',
    description:
      'auto-fit vs auto-fill, subgrid, dense packing, named areas, and masonry-style layouts.',
    href: '/tools/css-grid-advanced-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Container Queries Demo',
    description:
      '@container, container-type, cqi units, and component-local breakpoints — not viewport media queries.',
    href: '/tools/css-container-queries-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Custom Properties & @property',
    description:
      'Runtime theming, cascade scoping, fallbacks, and typed @property for animatable gradients.',
    href: '/tools/css-custom-properties-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'OKLCH & color-mix()',
    description:
      'Perceptually uniform palettes, P3 gamut, relative colors, and HSL vs OKLCH side by side.',
    href: '/tools/css-color-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Cascade & Specificity',
    description:
      '@layer order, (a,b,c) specificity, :is/:where/:has(), and which rule wins — full resolution order.',
    href: '/tools/css-specificity-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Animations & Easing',
    description:
      'Transitions, keyframes, cubic-bezier vs steps, WAAPI, and compositor-friendly motion.',
    href: '/tools/css-easing-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Scroll-Driven Animations',
    description:
      'animation-timeline: scroll() and view(), animation-range, and compositor-native scroll UX without JS.',
    href: '/tools/css-scroll-animations-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Stacking Contexts & Anchors',
    description:
      'Paint order, z-index scoping, sticky pitfalls, and CSS anchor positioning for popovers.',
    href: '/tools/css-stacking-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
  {
    name: 'Fluid Type clamp() Builder',
    description:
      'Build clamp() type scales, preview at any viewport width, and export copy-paste CSS.',
    href: '/tools/css-fluid-type-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10'],
  },
];

const cssAnimationSeriesTools: Tool[] = [
  {
    name: 'Keyframes & animation Builder',
    description:
      'Live @keyframes playground — tweak duration, timing, delay, iteration, direction, fill-mode, and play-state, and copy the generated animation shorthand.',
    href: '/tools/css-keyframes-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Transitions Playground',
    description:
      'Interpolate between states on hover/toggle, see animatable vs discrete properties, and watch transition-behavior: allow-discrete fade display:none.',
    href: '/tools/css-transitions-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Easing — Bézier, steps & linear()',
    description:
      'Drag cubic-bezier control points, feel the curve on a track, step through steps(), approximate springs with linear(), and race two easings.',
    href: '/tools/css-easing-cubic-bezier-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Transforms Sandbox (2D/3D)',
    description:
      'Translate, scale, rotate, skew, and transform-origin live; see why function order matters; flip a 3D card with perspective and preserve-3d.',
    href: '/tools/css-transforms-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Animation Performance Race',
    description:
      'Animate hundreds of elements via compositor-only transform/opacity vs layout-triggering left/top — watch the live FPS meter drop and reveal jank.',
    href: '/tools/css-animation-performance-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Animating display & height:auto',
    description:
      'Compare the grid 0fr→1fr trick, interpolate-size, and instant baseline on a real accordion, plus an allow-discrete toast that fades in and out.',
    href: '/tools/css-display-height-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Animating @property Variables',
    description:
      'Registered vs unregistered custom properties side by side — animate gradient angles, gradient borders, and a typed <number> counter smoothly.',
    href: '/tools/css-at-property-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'prefers-reduced-motion Lab',
    description:
      'Detect the OS setting live via matchMedia, simulate both modes in-page, and see motion replaced with cross-fades instead of removed entirely.',
    href: '/tools/css-reduced-motion-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Staggered & Sequenced Motion',
    description:
      'Reveal a list with --index calc() delays, change step/direction, and sequence multiple comma-separated animations on a single element.',
    href: '/tools/css-stagger-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
  {
    name: 'Entry/Exit with @starting-style',
    description:
      'Animate toasts, modals, dropdowns, and tooltips in and out with @starting-style + allow-discrete — toggle it off to feel the difference.',
    href: '/tools/css-starting-style-demo/',
    icon: 'layers',
    tags: ['css', 'demo', 'css_10_batch2_maxmode'],
  },
];

const llmSeriesTools: Tool[] = [
  {
    name: 'Tokenizer & Context Budget',
    description:
      'Subword tokenization, context window math, and agent budgeting — the hard limit every agent respects.',
    href: '/tools/ai-tokenizer-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'LLM Sampling Visualizer',
    description:
      'Temperature, top_p, top_k reshape logits live — sample tokens and see greedy vs creative output.',
    href: '/tools/llm-sampling-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Agent Prompt Builder',
    description:
      'Compose system/user messages, few-shot examples, JSON schema output, and injection guard patterns.',
    href: '/tools/prompt-builder-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Stopping Criteria Simulator',
    description:
      'EOS tokens, max_tokens, stop sequences, finish_reason — streaming truncation and runaway cost guards.',
    href: '/tools/llm-stopping-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Context Window Packer',
    description:
      'Pack system prompt, tools, history, RAG chunks, and output reserve into a fixed context budget.',
    href: '/tools/context-window-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Fine-tune vs Prompt vs RAG',
    description:
      'Decision tree: knowledge vs behavior, data needs, cost, privacy — when to retrieve, prompt, or train.',
    href: '/tools/training-decision-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'LLM & Agent Eval Lab',
    description:
      'Golden sets, offline metrics, LLM-as-judge rubrics, A/B bars, and regression-style scoring.',
    href: '/tools/llm-eval-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Model Selector Matrix',
    description:
      'Capability tiers, context size, modality, cost, privacy, and tool-use — pick models beyond leaderboards.',
    href: '/tools/model-selector-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Function Calling Loop',
    description:
      'JSON Schema tools, request→execute→result loop, parallel calls, validation errors, and security traps.',
    href: '/tools/function-calling-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
  {
    name: 'Agent Loop (ReAct)',
    description:
      'ReAct, reflection, and planning steps — watch a multi-turn agent loop with tool calls and guardrails.',
    href: '/tools/agent-loop-demo/',
    icon: 'bot',
    tags: ['ai', 'demo', 'llm_10'],
  },
];

export const toolSections: ToolSection[] = [
  { label: null, tools: standaloneTools },
  { label: 'JavaScript Deep Dive · js_10', tools: jsSeriesTools },
  { label: 'CSS Deep Dive · css_10', tools: cssSeriesTools },
  { label: 'CSS Animation · css_10_batch2', tools: cssAnimationSeriesTools },
  { label: 'Building AI Agents · llm_10', tools: llmSeriesTools },
];

export const allTools: Tool[] = toolSections.flatMap((section) => section.tools);

/** Derive the iframe slug (folder name) from a tool href like `/tools/foo/`. */
export function toolSlug(href: string): string {
  return href.replace(/^\/tools\//, '').replace(/\/$/, '');
}
