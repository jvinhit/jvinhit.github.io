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
  /**
   * Surface this tool in the "Pinned" section at the very top of the Tools
   * page (in addition to its normal section). Use for the handful of demos
   * worth showcasing first.
   */
  pinned?: boolean;
}

export interface ToolSection {
  label: string | null;
  tools: Tool[];
}

const standaloneTools: Tool[] = [
  {
    name: 'Three.js — Your First Scene',
    description:
      'Interactive first Three.js scene — orbit a live cube while the three pillars (Scene, Camera, Renderer) report draw calls, FOV, and FPS in real time. Toggle wireframe, axes, and grid helpers.',
    href: '/tools/threejs-first-scene-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'webgl', 'demo'],
  },
  {
    name: 'Three.js — Geometries & Materials',
    description:
      'Swap built-in geometries (box, sphere, torus knot, icosahedron…) against every material type (Basic, Lambert, Phong, Standard, Physical, Normal) and watch metalness, roughness, color, and lighting change the surface live.',
    href: '/tools/threejs-geometry-material-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'materials', 'demo'],
  },
  {
    name: 'Three.js — Scene Graph & Cameras',
    description:
      'A sun→earth→moon hierarchy that proves children inherit their parent transform — rotate the sun and the whole system follows. Switch between Perspective and Orthographic cameras to feel the projection difference.',
    href: '/tools/threejs-scene-graph-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'scene-graph', 'demo'],
  },
  {
    name: 'Three.js — Lights & Shadows',
    description:
      'Swap Directional, Point, Spot, and Hemisphere lights, drive intensity and position, and toggle real-time shadow maps on a ground plane — with light helpers and a live draw-call readout so you feel the cost.',
    href: '/tools/threejs-lights-shadows-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'lighting', 'demo'],
  },
  {
    name: 'Three.js — PBR Textures & Environment',
    description:
      'Toggle PBR texture maps (base color, normal, roughness) on a live sphere and add a procedural environment so metal actually reflects — every texture generated in code, no downloads. Drive metalness, roughness, and tiling.',
    href: '/tools/threejs-pbr-textures-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'pbr', 'demo'],
  },
  {
    name: 'Three.js — Animation System',
    description:
      'See how AnimationMixer, AnimationClip, and AnimationActions fit together: crossfade between hand-built clips (bounce, spin, pulse), scrub time scale, and watch mixer time advance — the same API that plays glTF character animations.',
    href: '/tools/threejs-animation-mixer-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'animation', 'demo'],
  },
  {
    name: 'Three.js — Post-Processing & Bloom',
    description:
      'Render the scene through an EffectComposer chain (RenderPass → UnrealBloom → Output) and watch emissive surfaces glow. Drive bloom strength, radius, and threshold to control exactly what blooms — the cinematic-polish layer.',
    href: '/tools/threejs-postprocessing-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'post-processing', 'demo'],
  },
  {
    name: 'Three.js — Instancing & Performance',
    description:
      'The same thousands of cubes drawn two ways: one InstancedMesh (a single draw call) versus N separate meshes (one call each). Push the count and switch modes to watch draw calls and FPS diverge in real time.',
    href: '/tools/threejs-instancing-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'performance', 'demo'],
  },
  {
    name: 'Three.js — Raycasting & Interaction',
    description:
      'Make a 3D scene clickable: a Raycaster shoots from the camera through the mouse to pick objects. Hover to highlight, click to select, and read the live hit (object, distance, world point) — the basis of every 3D UI.',
    href: '/tools/threejs-raycasting-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'interaction', 'demo'],
  },
  {
    name: 'Three.js — Capstone Solar System',
    description:
      'The whole series in one scene: a loading screen, a bloom-lit emissive sun, an instanced asteroid belt (one draw call), click-to-select planets via raycasting, ResizeObserver responsiveness, and a live renderer.info debug HUD.',
    href: '/tools/threejs-capstone-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'capstone', 'demo'],
  },
  {
    name: 'Three.js — Custom GLSL Shaders',
    description:
      'Drop below the built-in materials and write the GPU program yourself: a ShaderMaterial with a vertex displacement shader and a fragment color shader, driven live through uniforms — displacement, frequency, and time, all from JS.',
    href: '/tools/threejs-shaders-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'glsl', 'shaders', 'demo'],
  },
  {
    name: 'Three.js — Physics Sandbox',
    description:
      'Two parallel worlds kept in sync: Three.js meshes for rendering and cannon-es rigid bodies for simulation. Click the floor to drop boxes and spheres, watch them collide and stack, and drive gravity and restitution live.',
    href: '/tools/threejs-physics-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'physics', 'demo'],
  },
  {
    name: 'Interior Decorator',
    description:
      'A working 3D room planner: click furniture from a catalog to place it, drag it across the floor, recolor and resize every piece, repaint the room, and slide from noon to midnight — the pattern behind real product configurators.',
    href: '/tools/threejs-interior-decor-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'project', 'demo'],
    app: true,
    pinned: true,
  },
  {
    name: 'Three.js — glTF Import Inspector',
    description:
      'Load pinned Khronos sample assets, inspect mesh/material/triangle counts, switch wireframe and environment lighting, and see how a glTF scene maps into Three.js objects.',
    href: '/tools/threejs-gltf-import-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'gltf', 'assets', 'demo'],
    app: true,
  },
  {
    name: 'Three.js — Rigging & Animation',
    description:
      'Drive a skinned glTF character through locomotion cross-fades, one-shot emotes, time scaling and facial morph targets with AnimationMixer.',
    href: '/tools/threejs-animation-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'animation', 'rigging', 'demo'],
    app: true,
  },
  {
    name: 'Three.js — Character Interaction',
    description:
      'Raycast from pointer intent into a 3D world, click the ground to walk or run, trigger emotes, and coordinate animation through a guarded state controller.',
    href: '/tools/threejs-interaction-demo/',
    icon: 'layers',
    tags: ['threejs', '3d', 'interaction', 'animation', 'demo'],
    app: true,
  },
  {
    name: 'Three.js — Spatial Math Lab',
    description:
      'Trace a point through local, world, view, clip, NDC and screen spaces; compare Euler and quaternion interpolation; unproject pointer input and expose floating-point precision loss.',
    href: '/tools/threejs-spatial-math-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'math', 'coordinates', 'precision'],
    app: true,
  },
  {
    name: 'Three.js — Depth & Transparency Lab',
    description:
      'Inject z-fighting and transparency failures, toggle depth test/write, alpha test/hash/blend and render order, then see the draw-call cost of an intermediate render target.',
    href: '/tools/threejs-depth-transparency-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'rendering', 'depth', 'transparency'],
    app: true,
  },
  {
    name: 'Three.js — Runtime Lifecycle Lab',
    description:
      'Stress managed versus naïve mount cycles, asset races, fixed-step simulation, resource ownership and context loss while lifecycle counters reveal leaks and stale work.',
    href: '/tools/threejs-runtime-lifecycle-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'architecture', 'lifecycle', 'resources'],
    app: true,
  },
  {
    name: 'Three.js — Frame Budget Lab',
    description:
      'Separate draw-call, vertex, fragment/overdraw and upload pressure with deterministic workloads, p50/p95 frame time, GPU timer fallback and adaptive-quality controls.',
    href: '/tools/threejs-frame-budget-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'performance', 'gpu', 'profiling'],
    app: true,
  },
  {
    name: 'Three.js — Asset Pipeline Gate',
    description:
      'Evaluate a versioned glTF manifest against device-tier budgets, coordinate and naming contracts, slot-aware KTX2 policy, immutable hashes, license and provenance rules.',
    href: '/tools/threejs-asset-pipeline-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'gltf', 'ci', 'assets'],
    app: true,
  },
  {
    name: 'Three.js — Resilience Workbench',
    description:
      'Inject network, decode, stale-response and WebGL context failures; recover through explicit states while a semantic DOM twin keeps the 3D experience keyboard-accessible.',
    href: '/tools/threejs-resilience-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'testing', 'accessibility', 'resilience'],
    app: true,
  },
  {
    name: 'Three.js — WebGPU & TSL Migration Lab',
    description:
      'Run the same TSL node material on WebGPU or the WebGL 2 backend, inspect the actual backend, change quality policy and exercise async renderer initialization and fallback UI.',
    href: '/tools/threejs-webgpu-tsl-lab/',
    icon: 'layers',
    tags: ['threejs', '3d', 'webgpu', 'tsl', 'architecture'],
    app: true,
  },
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
    pinned: true
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
    pinned: true,
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

const css3dSeriesTools: Tool[] = [
  {
    name: 'Perspective & the Z-axis',
    description:
      'Move a panel toward and away from the camera with translateZ, dial perspective and perspective-origin, rotate on all three axes, and flip a card — the 3D mental model made visible.',
    href: '/tools/css-3d-perspective-demo/',
    icon: 'layers',
    tags: ['css', '3d', 'demo', 'css_3d'],
  },
  {
    name: 'preserve-3d Cube Builder',
    description:
      'Watch six flat faces fold into a real cube, toggle transform-style: preserve-3d to see it collapse, explode the faces apart, and flip backface-visibility on and off.',
    href: '/tools/css-3d-cube-demo/',
    icon: 'layers',
    tags: ['css', '3d', 'demo', 'css_3d'],
  },
  {
    name: '3D Tilt & Parallax Card',
    description:
      'A pointer-driven tilt card with layered parallax depth — move your mouse to rotate it in 3D, adjust max tilt, perspective, and layer separation, and see the live transform.',
    href: '/tools/css-3d-tilt-demo/',
    icon: 'layers',
    pinned: true,
    tags: ['css', '3d', 'demo', 'css_3d'],
  },
  {
    name: '3D Carousel & Coverflow',
    description:
      'A rotating 3D ring of cards built from rotateY + translateZ, plus an Apple-style coverflow — adjust radius, item count, and spin speed, and step through items.',
    href: '/tools/css-3d-carousel-demo/',
    icon: 'layers',
    tags: ['css', '3d', 'demo', 'css_3d'],
  },
  {
    name: '3D Lighting, Perf & A11y',
    description:
      'A polished spinning 3D object with gradient/brightness shading, plus toggles for will-change, z-fighting, and prefers-reduced-motion — see how to ship 3D responsibly.',
    href: '/tools/css-3d-showcase-demo/',
    icon: 'layers',
    tags: ['css', '3d', 'demo', 'css_3d'],
  },
];

const svgSeriesTools: Tool[] = [
  {
    name: 'SVG Coordinate & viewBox Lab',
    description:
      'Drag the viewBox min-x/min-y/width/height and watch the same shapes pan and zoom; toggle preserveAspectRatio and basic shapes (rect, circle, ellipse, line, polygon) on a live grid.',
    href: '/tools/svg-shapes-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Path Command Builder',
    description:
      'Build a <path> command by command — M/L/H/V, cubic & quadratic Béziers, smooth shortcuts, and elliptical arcs — with draggable control points and the live d attribute.',
    href: '/tools/svg-path-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Painting Playground',
    description:
      'Fill rules, stroke width/linecap/linejoin/dasharray, linear & radial gradients, and tiling patterns — tweak every paint property and copy the markup.',
    href: '/tools/svg-paint-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Text & textPath Lab',
    description:
      'Position text with x/y/dx/dy and anchors, style tspans, and flow a label along any curve with <textPath> — adjust startOffset and the path live.',
    href: '/tools/svg-text-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Transforms & Nested Coords',
    description:
      'translate/scale/rotate/skew with transform-origin, see why order matters, group with <g>, and nest an inner <svg> to understand local coordinate systems.',
    href: '/tools/svg-transforms-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Animation Studio',
    description:
      'Line-drawing with stroke-dashoffset, CSS keyframes vs SMIL <animate>/<animateTransform>, and motion along a path — play, scrub, and read the generated code.',
    href: '/tools/svg-animation-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Filter Playground',
    description:
      'Compose feGaussianBlur, feColorMatrix, feOffset/feMerge drop shadows, feDropShadow, and a glow pipeline — adjust primitives and watch the filter region update.',
    href: '/tools/svg-filters-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Clipping & Masking Lab',
    description:
      'Compare clipPath (hard, binary) vs mask (soft, luminance/alpha), drag the clip shape, and feather a gradient mask to fade an image — side by side.',
    href: '/tools/svg-clip-mask-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'Interactive SVG Chart',
    description:
      'A data-driven bar/line chart drawn from a JS array — edit values, hover for tooltips, see screen→user coordinate mapping and hit testing in action.',
    href: '/tools/svg-interactive-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Production & Sprites',
    description:
      'Before/after SVGO optimization byte counts, a <symbol> + <use> icon sprite, currentColor theming, and an accessibility checklist (title/desc/role).',
    href: '/tools/svg-production-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Path Morphing Lab',
    description:
      'Scrub and animate between two paths that share command structure — see linear coordinate interpolation rebuild the d attribute live, the foundation of icon morphs.',
    href: '/tools/svg-morph-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'Progress Rings & Gauges',
    description:
      'The circumference trick: stroke-dashoffset = C × (1 − percent) drives a circular progress ring and a 270° speedometer gauge, with the live math shown.',
    href: '/tools/svg-gauge-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'Generative Patterns & Blobs',
    description:
      'Generate repeating <pattern> tiles (dots, grid, hatch) for tiny resolution-independent backgrounds, plus an organic blob generator built from smooth closed Bézier curves.',
    href: '/tools/svg-generative-demo/',
    icon: 'layers',
    tags: ['svg', 'demo', 'svg_10'],
  },
  {
    name: 'React/JSX Icon Component',
    description:
      'Tune size/color/strokeWidth props and watch the rendered icon and the equivalent typed React/TSX component + usage update together — the icon-system pattern.',
    href: '/tools/svg-react-demo/',
    icon: 'layers',
    tags: ['svg', 'react', 'demo', 'svg_10'],
  },
  {
    name: 'Interactive Pan & Zoom Map',
    description:
      'Drag to pan and scroll to zoom toward the cursor by driving only the viewBox — the zoom-to-point formula, non-scaling strokes, and clickable choropleth regions.',
    href: '/tools/svg-map-demo/',
    icon: 'layers',
    tags: ['svg', 'maps', 'demo', 'svg_10'],
  },
  {
    name: 'Accessible SVG Lab',
    description:
      'Decorative vs meaningful SVG, role="img" + aria-labelledby with <title>/<desc>, a keyboard-focusable chart, an aria-live status, and a visually-hidden data table alternative.',
    href: '/tools/svg-a11y-demo/',
    icon: 'layers',
    tags: ['svg', 'a11y', 'demo', 'svg_10'],
  },
  {
    name: 'Icon Sprite Pipeline',
    description:
      'Combine many icons into one <symbol> sheet and render with <use>, compare inline vs external sprite delivery, and theme every icon at once with currentColor.',
    href: '/tools/svg-sprite-demo/',
    icon: 'layers',
    tags: ['svg', 'icons', 'demo', 'svg_10'],
  },
  {
    name: 'Animation Timelines & Libraries',
    description:
      'A hand-built timeline player with stagger, easing, play and scrub controls — the exact orchestration features GSAP/anime.js/Motion sell you, plus a which-tool-when table.',
    href: '/tools/svg-anim-libs-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'demo', 'svg_10'],
  },
  {
    name: 'SVG Performance Stress Test',
    description:
      'Push the animated node count up and watch a live FPS meter, then compare transform vs cx/cy animation and toggle a blur filter to feel the real rendering cost.',
    href: '/tools/svg-performance-demo/',
    icon: 'layers',
    tags: ['svg', 'performance', 'demo', 'svg_10'],
  },
  {
    name: 'Build a Chart From Scratch',
    description:
      'No D3, no Chart.js — edit the data and watch scales, nice ticks, axes, gridlines and bars recompute by hand, with native <title> tooltips and responsive viewBox sizing.',
    href: '/tools/svg-charts-demo/',
    icon: 'layers',
    tags: ['svg', 'charts', 'demo', 'svg_10'],
  },
  {
    name: 'SMIL Scene Choreography',
    description:
      'A self-playing, looping sunrise scene sequenced entirely with SMIL syncbase timing (begin="other.end") — sky, sun, clouds and title fire in order, with keySplines easing and a Replay button.',
    href: '/tools/svg-scene-smil-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'demo', 'svg_10'],
  },
  {
    name: 'Motion Paths & orient',
    description:
      'Two arrows follow the same curve at the same speed — only rotate="auto" differs, so one banks into the turn and one slides. animateMotion + mpath with a speed control and the CSS offset-path equivalent.',
    href: '/tools/svg-motion-path-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'demo', 'svg_10'],
  },
  {
    name: 'Character Rigging Studio',
    description:
      'A stick figure rigged from nested <g> joints — rotate each around its pivot and transform inheritance swings the whole limb. Switch between idle, wave and a walk cycle, and reveal the joint pivots.',
    href: '/tools/svg-rigging-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'demo', 'svg_10'],
  },
  {
    name: 'Scroll-Driven SVG Story',
    description:
      'Scroll is the timeline: a trail draws itself, a hiker climbs, the sun rises, and three layers parallax — built on the Scroll-driven Animations API (scroll()/view()) with a cross-browser JS fallback.',
    href: '/tools/svg-scroll-story-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'scroll', 'demo', 'svg_10'],
  },
  {
    name: 'Ambient Looping Scene',
    description:
      'A forever-looping night scene — seamless parallax hills (translate a tile by its own width then wrap) and a recycled requestAnimationFrame firefly pool that twinkles via sine, all on a reduced-motion budget.',
    href: '/tools/svg-ambient-scene-demo/',
    icon: 'layers',
    tags: ['svg', 'animation', 'particles', 'svg_10'],
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

const tailwindUiSeriesTools: Tool[] = [
  {
    name: 'Tailwind v4 Cheatsheet',
    description:
      'A compact Tailwind v4 utility and @theme token reference: layout, flex/grid, spacing, sizing, typography, colors, effects, filters, transforms, SVG, and design-token namespaces in one searchable-feeling tabbed panel.',
    href: '/tools/tailwind-v4-cheatsheet/',
    icon: 'code',
    tags: ['tailwind', 'cheatsheet', 'design-tokens', 'reference', 'tailwind_ui_14'],
    app: true,
  },
  {
    name: 'Tailwind Utility-First Playground',
    description:
      'Compose a component by toggling utilities and watch the class="" string build up alongside the exact plain CSS Tailwind generates — the whole utility-first mental model made visible.',
    href: '/tools/tailwind-utility-playground/',
    icon: 'sparkles',
    tags: ['tailwind', 'css', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Tailwind Flexbox & Grid Builder',
    description:
      'Toggle Flexbox and Grid utilities on a live container, then shrink the viewport to watch a md: responsive override activate and read the generated @media block.',
    href: '/tools/tailwind-layout-builder/',
    icon: 'layers',
    tags: ['tailwind', 'layout', 'responsive', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Tailwind v4 @theme Token Studio',
    description:
      'Change a design token (brand color, radius, base size) and watch the live UI, the @theme block, and the utilities it auto-generates update together — plus a light/dark mode toggle.',
    href: '/tools/tailwind-theme-tokens/',
    icon: 'sparkles',
    tags: ['tailwind', 'design-tokens', 'theming', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Tailwind Variants & State Explorer',
    description:
      'Interact with real elements to fire each variant: hover/focus/active/disabled, group-* (parent state), peer-* (sibling state), and the data-[state] pattern Radix and shadcn rely on.',
    href: '/tools/tailwind-variants-explorer/',
    icon: 'code',
    tags: ['tailwind', 'variants', 'state', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'cva + cn Variant Factory',
    description:
      'Pick a variant and size to see a cva() call resolve to a className exactly like a shadcn Button, then edit an override and watch tailwind-merge strike out the conflicting utilities so the last one wins.',
    href: '/tools/tailwind-cva-factory/',
    icon: 'code',
    tags: ['tailwind', 'cva', 'components', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Tailwind Plugin Showcase',
    description:
      'Toggle the three plugins you install in almost every project on and off: @tailwindcss/typography (prose), @tailwindcss/forms, and tw-animate-css enter/exit motion — see exactly what each one changes.',
    href: '/tools/tailwind-plugins-showcase/',
    icon: 'sparkles',
    tags: ['tailwind', 'plugins', 'typography', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Radix Primitives — Anatomy & A11y',
    description:
      'Re-creations of a Radix Dialog and DropdownMenu with real focus trapping, Esc-to-close, return-focus, and full arrow-key navigation — the accessibility Radix gives you for free, styled the Tailwind way.',
    href: '/tools/radix-primitives-anatomy/',
    icon: 'layers',
    tags: ['radix', 'accessibility', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'Radix Composition Lab',
    description:
      'Interactive Tabs, Switch, Tooltip, and Popover — each exposing data-state for styling — plus the asChild slot pattern that merges Radix behavior onto your own components without extra wrapper DOM.',
    href: '/tools/radix-composition-lab/',
    icon: 'layers',
    tags: ['radix', 'composition', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'shadcn/ui Component Gallery',
    description:
      'The out-of-the-box shadcn look — Button, Badge, Input, Card, Avatar, Alert — built from Tailwind + Radix + cva and copied into your repo, with the exact CLI commands to add them.',
    href: '/tools/shadcn-component-gallery/',
    icon: 'sparkles',
    tags: ['shadcn', 'components', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'shadcn/ui Theme Generator',
    description:
      'Pick a primary color, radius and light/dark mode and watch shadcn components re-skin live while the :root / .dark CSS-variable blocks update for you to paste — the semantic-token theming model in action.',
    href: '/tools/shadcn-theme-generator/',
    icon: 'sparkles',
    tags: ['shadcn', 'theming', 'dark-mode', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'shadcn Form Lab — RHF + zod',
    description:
      'One zod schema typing and validating a form: type invalid values and watch field-level errors, isValid, isDirty and the errors object update live — the react-hook-form + zod + shadcn Form pattern.',
    href: '/tools/shadcn-form-lab/',
    icon: 'code',
    tags: ['shadcn', 'forms', 'zod', 'demo', 'tailwind_ui_12'],
  },
  {
    name: 'shadcn Dashboard — Capstone',
    description:
      'Everything together: a sortable, filterable data table, a ⌘K command palette with keyboard navigation, and stacking toasts — the pro patterns (TanStack Table, cmdk, sonner) in one dashboard.',
    href: '/tools/shadcn-dashboard-capstone/',
    icon: 'layers',
    tags: ['shadcn', 'data-table', 'cmdk', 'demo', 'tailwind_ui_12'],
    app: true,
  },
];

const chromeExtSeriesTools: Tool[] = [
  {
    name: 'Extension Anatomy Explorer',
    description:
      'Click through the four pieces of a Manifest V3 extension — popup, content script, service worker, options page — and see what each one is, where it runs, and what it can touch.',
    href: '/tools/chrome-ext-anatomy/',
    icon: 'layers',
    tags: ['chrome-extension', 'manifest-v3', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'manifest.json Builder',
    description:
      'Toggle features (popup, content scripts, background, options, side panel, commands, permissions) and watch a valid manifest.json assemble itself key by key, with each field explained.',
    href: '/tools/chrome-ext-manifest-builder/',
    icon: 'wrench',
    tags: ['chrome-extension', 'manifest', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Architecture & Context Map',
    description:
      'A capability matrix across the four contexts plus a play-able data-flow (popup → worker → content → page) — the distributed-system mental model that makes everything else click.',
    href: '/tools/chrome-ext-architecture/',
    icon: 'gitfork',
    tags: ['chrome-extension', 'architecture', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Content Script Lab',
    description:
      'Tune match patterns and run_at, watch a script inject (or not) into a fake page, and prove the isolated world by setting a variable the page can never see.',
    href: '/tools/chrome-ext-content-script-lab/',
    icon: 'code',
    tags: ['chrome-extension', 'content-script', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Service Worker Lifecycle',
    description:
      'Fire events and watch the MV3 background wake, idle, and terminate — and see exactly why an in-memory counter resets while chrome.storage survives.',
    href: '/tools/chrome-ext-sw-lifecycle/',
    icon: 'repeat',
    tags: ['chrome-extension', 'service-worker', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Messaging Playground',
    description:
      'Compare one-shot sendMessage with a long-lived connect port, animate packets across contexts, and read the code each messaging style generates.',
    href: '/tools/chrome-ext-messaging-playground/',
    icon: 'gitfork',
    tags: ['chrome-extension', 'messaging', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'chrome.storage Explorer',
    description:
      'Set and remove keys across local/sync/session, watch the quota bar fill toward each area’s limit, and see the onChanged event fire — the reactive cross-context pattern.',
    href: '/tools/chrome-ext-storage-explorer/',
    icon: 'layers',
    tags: ['chrome-extension', 'storage', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'UI Surfaces Mock Browser',
    description:
      'Open the popup, dock the side panel, take over with the options page, and increment the action badge — feel the difference between every UI surface in one mock browser.',
    href: '/tools/chrome-ext-ui-surfaces/',
    icon: 'sparkles',
    tags: ['chrome-extension', 'popup', 'side-panel', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Permissions Inspector',
    description:
      'Toggle permissions and watch the exact install-time consent warning Chrome shows the user, plus a risk meter — the least-privilege lesson made tangible.',
    href: '/tools/chrome-ext-permissions-inspector/',
    icon: 'wrench',
    tags: ['chrome-extension', 'permissions', 'security', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Chrome API Explorer',
    description:
      'tabs, scripting, contextMenus, commands, and notifications — read each snippet then run a simulated version (invert a page, right-click a custom menu, fire a shortcut, pop a notification).',
    href: '/tools/chrome-ext-api-explorer/',
    icon: 'code',
    tags: ['chrome-extension', 'tabs', 'scripting', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Build Pipeline Visualizer',
    description:
      'Watch Vite + CRXJS turn TypeScript/React source into a loadable dist/, then save an edit and see HMR hot-reload only the popup — why plain files stop scaling.',
    href: '/tools/chrome-ext-build-pipeline/',
    icon: 'loader',
    tags: ['chrome-extension', 'vite', 'tooling', 'demo', 'chrome_ext_12'],
  },
  {
    name: 'Publish Checklist & Capstone',
    description:
      'Tick the exact ship checklist from built dist/ to a live Web Store listing and watch progress fill, then study the capstone “Reading Ruler” map wiring every part of the series together.',
    href: '/tools/chrome-ext-publish-checklist/',
    icon: 'trending',
    tags: ['chrome-extension', 'publishing', 'capstone', 'demo', 'chrome_ext_12'],
  },
];

const webpackSeriesTools: Tool[] = [
  {
    name: 'Dependency Graph Explorer',
    description:
      'Watch Webpack crawl from one entry file through every import to build the dependency graph, then bundle it into output chunks — the core mental model behind every bundler.',
    href: '/tools/webpack-dependency-graph/',
    icon: 'gitfork',
    tags: ['webpack', 'bundler', 'demo', 'webpack_12'],
  },
  {
    name: 'webpack.config.js Builder',
    description:
      'Toggle entry, output, mode, devtool, loaders, and plugins and watch a valid webpack.config.js assemble itself key by key, with each field explained as you add it.',
    href: '/tools/webpack-config-builder/',
    icon: 'wrench',
    tags: ['webpack', 'config', 'demo', 'webpack_12'],
  },
  {
    name: 'Loader Pipeline Visualizer',
    description:
      'Feed a file through a loader chain and watch the transform run right-to-left (sass-loader → css-loader → style-loader), seeing the source change at every step.',
    href: '/tools/webpack-loader-pipeline/',
    icon: 'repeat',
    tags: ['webpack', 'loaders', 'demo', 'webpack_12'],
  },
  {
    name: 'Plugin Lifecycle Inspector',
    description:
      'Fire a build and watch plugins tap into compiler hooks (compile, emit, done) in order — see exactly when HtmlWebpackPlugin, DefinePlugin, and friends do their work.',
    href: '/tools/webpack-plugin-lifecycle/',
    icon: 'layers',
    tags: ['webpack', 'plugins', 'demo', 'webpack_12'],
  },
  {
    name: 'HMR & Source Maps Lab',
    description:
      'Compare a full reload against hot module replacement preserving state, then weigh each devtool option on the build-speed vs map-quality trade-off.',
    href: '/tools/webpack-hmr-sourcemaps/',
    icon: 'loader',
    tags: ['webpack', 'hmr', 'source-maps', 'demo', 'webpack_12'],
  },
  {
    name: 'Code Splitting Visualizer',
    description:
      'Turn one giant bundle into an entry chunk plus lazy-loaded route chunks and a shared vendor chunk — click routes to fetch chunks on demand and watch initial load shrink.',
    href: '/tools/webpack-code-splitting/',
    icon: 'gitfork',
    tags: ['webpack', 'code-splitting', 'demo', 'webpack_12'],
  },
  {
    name: 'Tree Shaking Visualizer',
    description:
      'Import one named export and watch dead code get marked and dropped in production mode — see why ESM, sideEffects:false, and mode:production are all required.',
    href: '/tools/webpack-tree-shaking/',
    icon: 'sparkles',
    tags: ['webpack', 'tree-shaking', 'demo', 'webpack_12'],
  },
  {
    name: 'Contenthash Cache Simulator',
    description:
      'Edit one module and watch only the chunks whose content changed get new [contenthash] filenames — the long-term caching trick, plus why runtimeChunk keeps hashes stable.',
    href: '/tools/webpack-contenthash-cache/',
    icon: 'repeat',
    tags: ['webpack', 'caching', 'demo', 'webpack_12'],
  },
  {
    name: 'Bundle Analyzer Treemap',
    description:
      'A clickable analyzer treemap — fix the usual offenders (full moment, full lodash, duplicate deps) and watch the bundle drop from over-budget red to within-budget green.',
    href: '/tools/webpack-bundle-analyzer/',
    icon: 'trending',
    tags: ['webpack', 'performance', 'analysis', 'demo', 'webpack_12'],
  },
  {
    name: 'Custom Loader & Plugin Lab',
    description:
      'Run a tiny custom loader on real input and toggle its options to watch the output change, then read a working custom-plugin skeleton tapping the done, emit, and compile hooks.',
    href: '/tools/webpack-custom-loader-plugin/',
    icon: 'code',
    tags: ['webpack', 'loaders', 'plugins', 'demo', 'webpack_12'],
  },
  {
    name: 'Module Federation Visualizer',
    description:
      'A host loads modules from independent remotes at runtime — click exposed modules to federate them in, and toggle shared to see React deduped into a single singleton copy.',
    href: '/tools/webpack-module-federation/',
    icon: 'gitfork',
    tags: ['webpack', 'module-federation', 'micro-frontends', 'demo', 'webpack_12'],
  },
  {
    name: 'Production Config Capstone',
    description:
      'Toggle every technique from the series — mode, contenthash, splitChunks, CSS extraction, source maps, budgets, caching — to assemble a real production config and score its readiness.',
    href: '/tools/webpack-production-capstone/',
    icon: 'trending',
    tags: ['webpack', 'production', 'capstone', 'demo', 'webpack_12'],
  },
];

const viteSeriesTools: Tool[] = [
  {
    name: 'Vite vs Bundler Startup Race',
    description:
      'Drag the project size and race a bundler against Vite\u2019s native-ESM dev server \u2014 watch the bundler\u2019s startup grow with the app while Vite stays nearly flat, and see why production still bundles.',
    href: '/tools/vite-dev-vs-bundle/',
    icon: 'trending',
    tags: ['vite', 'esm', 'dev-server', 'demo', 'vite_12'],
  },
  {
    name: 'vite.config.ts Builder',
    description:
      'Toggle the options you actually reach for \u2014 framework plugin, base, alias, server proxy, build/sourcemap, define \u2014 and watch a real, idiomatic vite.config.ts assemble itself field by field.',
    href: '/tools/vite-config-builder/',
    icon: 'wrench',
    tags: ['vite', 'config', 'demo', 'vite_12'],
  },
  {
    name: 'On-Demand ESM Requests',
    description:
      'Open a route and watch the browser pull modules one request at a time as Vite rewrites each import into a fetchable URL \u2014 then navigate and see only the new modules load.',
    href: '/tools/vite-esm-requests/',
    icon: 'gitfork',
    tags: ['vite', 'esm', 'dev-server', 'demo', 'vite_12'],
  },
  {
    name: 'Dependency Pre-bundling',
    description:
      'Run the pre-bundle step and watch hundreds of node_modules files collapse into a few cached .vite/deps files, with CommonJS converted to ESM \u2014 plus optimizeDeps include/exclude and the cache-clear fix.',
    href: '/tools/vite-prebundle/',
    icon: 'layers',
    tags: ['vite', 'optimizeDeps', 'performance', 'demo', 'vite_12'],
  },
  {
    name: 'HMR Boundary Lab',
    description:
      'Build up counter state, then edit a CSS file, a leaf component, and a shared util to feel the difference between a hot module swap (state preserved) and a full reload (state lost) \u2014 with the import.meta.hot API.',
    href: '/tools/vite-hmr-boundary/',
    icon: 'repeat',
    tags: ['vite', 'hmr', 'demo', 'vite_12'],
  },
  {
    name: 'CSS Pipeline Explorer',
    description:
      'Compare plain CSS, scoped CSS Modules, Sass/SCSS, the ?inline query, and PostCSS \u2014 see what you import on the left and exactly what Vite produces (global vs hashed-and-scoped) on the right.',
    href: '/tools/vite-css-pipeline/',
    icon: 'sparkles',
    tags: ['vite', 'css', 'css-modules', 'demo', 'vite_12'],
  },
  {
    name: 'Asset Imports Explorer',
    description:
      'Expand each asset import form \u2014 default URL, ?url, ?raw, ?worker, and import.meta.glob \u2014 to see what it returns and when to reach for it, plus public/ vs imported assets.',
    href: '/tools/vite-asset-imports/',
    icon: 'code',
    tags: ['vite', 'assets', 'glob', 'demo', 'vite_12'],
  },
  {
    name: 'Env Vars & Modes Resolver',
    description:
      'Pick a mode to see which .env files load and in what priority, then study the VITE_ prefix gate that decides which variables reach the client bundle \u2014 the rule that keeps secrets out of the browser.',
    href: '/tools/vite-env-modes/',
    icon: 'wrench',
    tags: ['vite', 'env', 'security', 'demo', 'vite_12'],
  },
  {
    name: 'Plugin Hook Timeline',
    description:
      'Run a module through the plugin pipeline and watch the hooks light up in order (resolveId \u2192 load \u2192 transform and friends), then read a working virtual-module plugin you can copy.',
    href: '/tools/vite-plugin-hooks/',
    icon: 'gitfork',
    tags: ['vite', 'plugins', 'rollup', 'demo', 'vite_12'],
  },
  {
    name: 'Build Output Explorer',
    description:
      'Toggle vendor splitting, a lazy route, and source maps to watch the dist/ structure and chunking change \u2014 see how much JS the browser loads initially vs on navigation, with the Rolldown chunk config.',
    href: '/tools/vite-build-output/',
    icon: 'layers',
    tags: ['vite', 'build', 'rolldown', 'demo', 'vite_12'],
  },
  {
    name: 'Library Mode & Environments',
    description:
      'Pick library output formats (ESM/CJS/types) and externalized peer deps to build the config and package.json exports map, then explore the multi-environment SSR model behind the Environment API.',
    href: '/tools/vite-lib-environments/',
    icon: 'code',
    tags: ['vite', 'library', 'ssr', 'demo', 'vite_12'],
  },
  {
    name: 'Capstone Config & Migration',
    description:
      'Assemble a production-grade vite.config.ts from the whole series and score its readiness, then switch to the migration tab to map every Webpack/CRA concept to its Vite equivalent.',
    href: '/tools/vite-capstone/',
    icon: 'trending',
    tags: ['vite', 'capstone', 'migration', 'demo', 'vite_12'],
  },
];

export const toolSections: ToolSection[] = [
  { label: null, tools: standaloneTools },
  { label: 'Vite Zero to Pro · vite_12', tools: viteSeriesTools },
  { label: 'Webpack Zero to Pro · webpack_12', tools: webpackSeriesTools },
  { label: 'Build Chrome Extensions · chrome_ext_12', tools: chromeExtSeriesTools },
  { label: 'Tailwind, Radix & shadcn/ui · tailwind_ui_14', tools: tailwindUiSeriesTools },
  { label: 'JavaScript Deep Dive · js_10', tools: jsSeriesTools },
  { label: 'CSS Deep Dive · css_10', tools: cssSeriesTools },
  { label: 'CSS Animation · css_10_batch2', tools: cssAnimationSeriesTools },
  { label: 'CSS 3D · css_3d', tools: css3dSeriesTools },
  { label: 'SVG Deep Dive · svg_10', tools: svgSeriesTools },
  { label: 'Building AI Agents · llm_10', tools: llmSeriesTools },
];

export const allTools: Tool[] = toolSections.flatMap((section) => section.tools);

/**
 * Tools flagged `pinned`, surfaced in a showcase section at the top of the
 * Tools page. Order follows their declaration order in `toolSections`.
 */
export const pinnedTools: Tool[] = allTools.filter((tool) => tool.pinned);

/** Derive the iframe slug (folder name) from a tool href like `/tools/foo/`. */
export function toolSlug(href: string): string {
  return href.replace(/^\/tools\//, '').replace(/\/$/, '');
}
