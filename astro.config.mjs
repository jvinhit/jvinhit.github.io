// @ts-check
import { defineConfig } from 'astro/config';
import { copyFile, access, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/lib/site-config';
import { allTools, toolSlug } from './src/lib/tools';

/**
 * Plugin `@astrojs/sitemap` mặc định ghi 2 file:
 *   - `sitemap-index.xml`  — index trỏ tới các sitemap con
 *   - `sitemap-0.xml`      — flat list URL thật
 *
 * Nhiều tool / crawler (Bing Webmaster, một số SEO scanner) dò mặc định
 * filename `sitemap.xml` — ta tạo thêm 1 alias là **bản copy của
 * `sitemap-0.xml`** (flat list), KHÔNG phải của `sitemap-index.xml`.
 * Lý do: file flat đọc được trực tiếp không cần fetch tiếp, tiện cho
 * tool / agent đọc 1-shot. Index file giữ nguyên cho site lớn vượt
 * 50K URL sau này (plugin sẽ tự shard `sitemap-1.xml`, `sitemap-2.xml`).
 *
 * @returns {import('astro').AstroIntegration}
 */
function copySitemapAlias() {
  return {
    name: 'copy-sitemap-alias',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const src = new URL('sitemap-0.xml', dir);
        const dst = new URL('sitemap.xml', dir);
        try {
          await copyFile(src, dst);
          logger.info('copied sitemap-0.xml → sitemap.xml');
        } catch (err) {
          logger.warn(
            `skip copy sitemap.xml: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      },
    },
  };
}

/**
 * Escape a value for safe interpolation into an HTML attribute.
 * @param {string} value
 */
function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Inject root-level SEO/OG meta into the standalone tool demos.
 *
 * The demos live as hand-authored static documents in `public/tools/<slug>/`
 * (copied verbatim to `dist/`). They only ship a `<title>`, so when shared
 * directly they have no description, canonical, or social card. Rather than
 * bloat 40+ source files (and keep them in sync by hand), we inject a
 * consistent block at build time, keyed by the shared tool metadata.
 *
 * Deliberately omits Google Analytics: these pages are embedded in iframes on
 * blog posts and the `/tools/view/*` viewer, so firing GA here would
 * double-count pageviews.
 *
 * @param {string} baseUrl  Production origin, e.g. `https://jvinhit.github.io`.
 * @param {string} basePath Deploy base path, e.g. `/` or `/jvinhit-blog`.
 * @returns {import('astro').AstroIntegration}
 */
function injectDemoSeo(baseUrl, basePath) {
  const baseClean = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  return {
    name: 'inject-demo-seo',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let patched = 0;

        for (const tool of allTools) {
          const slug = toolSlug(tool.href);
          const file = new URL(`tools/${slug}/index.html`, dir);

          let html;
          try {
            html = await readFile(file, 'utf-8');
          } catch {
            continue; // demo folder missing — skip silently
          }

          // Idempotent: don't double-inject on repeat builds.
          if (html.includes('property="og:title"')) continue;

          const pageTitle = `${tool.name} — ${SITE.name}`;
          const canonical = `${baseUrl}${baseClean}/tools/${slug}/`;
          const ogImage = `${baseUrl}${baseClean}/og-default.png`;
          const desc = escapeAttr(tool.description);
          const title = escapeAttr(pageTitle);

          const meta = [
            `<meta name="description" content="${desc}" />`,
            `<link rel="canonical" href="${canonical}" />`,
            `<meta name="theme-color" content="#0a0a0a" />`,
            `<link rel="icon" type="image/svg+xml" href="${baseClean}/favicon.svg" />`,
            `<meta property="og:type" content="article" />`,
            `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
            `<meta property="og:title" content="${title}" />`,
            `<meta property="og:description" content="${desc}" />`,
            `<meta property="og:url" content="${canonical}" />`,
            `<meta property="og:image" content="${ogImage}" />`,
            `<meta property="og:locale" content="${escapeAttr(SITE.locale)}" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta name="twitter:title" content="${title}" />`,
            `<meta name="twitter:description" content="${desc}" />`,
            `<meta name="twitter:image" content="${ogImage}" />`,
          ].join('\n  ');

          // Insert right after the existing <title> so the block sits with the
          // other head metadata.
          const next = html.replace(/<\/title>/i, `</title>\n  ${meta}`);
          if (next === html) continue; // no <title> — leave untouched

          await writeFile(file, next, 'utf-8');
          patched += 1;
        }

        logger.info(`injected SEO/OG into ${patched} tool demo(s)`);
      },
    },
  };
}

/**
 * Deploy target được quyết bởi env var (set trong CI workflow):
 * - Không set       → local dev / Cloudflare Pages / custom domain (base `/`)
 * - SITE_URL/BASE   → GitHub Pages project site, cần base path
 *
 * Ví dụ `.github/workflows/deploy-gh-pages.yml`:
 *   env:
 *     SITE_URL: https://jvinhit.github.io
 *     BASE_PATH: /jvinhit-blog
 */
const SITE_URL = process.env.SITE_URL ?? SITE.url;
const BASE_PATH = process.env.BASE_PATH ?? '/';

// `astro dev` chạy lệnh con `dev` trong argv. Chỉ dev mới cần nới lỏng
// trailing slash để link nội bộ thiếu `/` cuối không 404 (xem comment
// `trailingSlash` bên dưới). Build/preview giữ `'always'` để sitemap +
// canonical nhất quán cho production.
const IS_DEV = process.argv.includes('dev');

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // `'always'` → Astro generate URL với trailing slash trong sitemap, link,
  // và canonical. Cần thiết để:
  //   1. Sitemap URL prefix khớp với GH Pages serve path (GH Pages 301 redirect
  //      path không slash → có slash cho directory routes).
  //   2. Khớp với property URL prefix trên Google Search Console
  //      (`https://jvinhit.github.io/jvinhit-blog/` có trailing slash).
  // Nếu giữ `'never'`, homepage URL trong sitemap thành
  // `https://jvinhit.github.io/jvinhit-blog` (không slash) → bị 301 → Google
  // báo "Sitemap could not be read".
  //
  // DEV ngoại lệ: dùng `'ignore'` khi `astro dev` để dev server phục vụ cả
  // URL có và không có `/` cuối. Link nội bộ trong bài viết viết dạng
  // `/blog/slug` (thiếu `/`) sẽ không còn 404 ở local. Production (GitHub
  // Pages / Cloudflare) vốn tự 301 no-slash → slash, nên prod không đổi.
  trailingSlash: IS_DEV ? 'ignore' : 'always',

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
    // Phải đặt SAU `sitemap()` để hook `astro:build:done` chạy sau khi
    // file `sitemap-index.xml` đã tồn tại trong `dist/`.
    copySitemapAlias(),
    // Bơm SEO/OG vào các demo tĩnh trong `public/tools/*` sau khi build copy
    // chúng sang `dist/`.
    injectDemoSeo(SITE_URL, BASE_PATH),
  ],

  vite: {
    // Astro bundles its own Vite; `@tailwindcss/vite` ships types
    // against top-level Vite → known TS mismatch ở strict mode (runtime OK).
    // Safe cast theo doc Astro 5 + Tailwind 4.
    plugins: [
      /** @type {any} */ (tailwindcss()),
      {
        name: 'public-dir-index-html',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url ?? '';
            if (url.endsWith('/') && !url.startsWith('/@')) {
              const filePath = join(
                server.config.publicDir,
                url,
                'index.html'
              );
              try {
                await access(filePath);
                req.url = `${url}index.html`;
              } catch {
                // no index.html in public/ — fall through to Astro routing
              }
            }
            next();
          });
        },
      },
    ],
  },

  markdown: {
    shikiConfig: {
      // Dual-theme: github-light cho theme sáng, github-dark cho tối.
      // `defaultColor: false` → Shiki KHÔNG gắn màu inline mặc định mà chỉ
      // expose `--shiki-light(-bg)` / `--shiki-dark(-bg)`; prose.css tự chọn
      // bộ màu theo class theme trên <html> (xem prose.css).
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      defaultColor: false,
      wrap: true,
    },
  },

  build: {
    format: 'directory',
  },

  image: {
    // Astro tối ưu ảnh ở build-time
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
