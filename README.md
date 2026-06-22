# jvinhit — Personal Blog

## Bắt đầu local

```bash
# Yêu cầu: Node.js >= 20 (dùng 22 LTS như CI)
nvm use          # hoặc: nvm install 22

npm install
npm run dev      # http://localhost:4321
```

## Scripts

| Command           | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Dev server với HMR                            |
| `npm run build`   | Build production sang `dist/`                 |
| `npm run preview` | Serve `dist/` local (test build trước deploy) |
| `npm run check`   | Type-check + kiểm tra content schema          |
| `npm run format`  | Prettier format toàn bộ                       |

---

## Viết bài mới

Tạo file `.mdx` trong `src/content/posts/`. Tên file trở thành slug URL.

```mdx
---
title: 'Tên bài viết'
description: 'Mô tả ngắn hiển thị ở home + OG tag.'
pubDate: 2025-01-15
tags: [react, performance]
draft: false # đặt `true` để ẩn ở production
cover: ./images/cover.png # optional, tương đối với file mdx
---

# Mở đầu

Viết markdown hoặc **MDX** (có thể embed component Astro/React) thoải mái.

\`\`\`ts
const hello = 'world';
\`\`\`
```

Sau khi commit + push, bài sẽ lên production trong vài chục giây.

### Schema được validate ở build time

Xem `src/content.config.ts` — Zod sẽ reject build nếu frontmatter sai format
(missing field, wrong type, invalid date, v.v.). An toàn hơn nhiều so với
chỉnh CMS.

### Draft workflow

- Set `draft: true` trong frontmatter.
- Local (`npm run dev`): vẫn thấy.
- Production (`npm run build`): tự động loại.

---

## Design system

Toàn bộ design token ở `src/styles/global.css` theo Tailwind 4 syntax
(`@theme { ... }`):

| Token            | Giá trị               | Ý nghĩa                      |
| ---------------- | --------------------- | ---------------------------- |
| `--color-bg`     | `#0a0a0a`             | nền chính                    |
| `--color-fg`     | `#e5e5e5`             | text chính                   |
| `--color-accent` | `#c8ff00`             | lime accent — CTA, link, bar |
| `--color-border` | `#2a2a2a`             | viền card                    |
| `--font-mono`    | `JetBrains Mono, ...` | typography toàn site         |

Đổi ở đây là đổi toàn site. Component KHÔNG hard-code màu hex — luôn dùng
token qua `var(--color-*)` hoặc Tailwind utility class.

---

## Deploy lên Cloudflare Pages

> **Khuyến nghị:** dùng CF Pages direct integration (không qua GH Actions).

## Cấu trúc thư mục

```
src/
  components/
    about/          — SkillBar (CV-only components)
    blog/           — ArticleCard, PostMeta
    layout/         — Header, Footer
    ui/             — Container, TerminalBox (primitives)
  content/
    posts/          — *.mdx bài viết (thêm ở đây)
    about/          — about.mdx (CV page)
  layouts/          — BaseLayout, PostLayout
  lib/
    site-config.ts  — branding, nav, socials
    format.ts       — date + reading time helpers
  pages/            — routes (Astro file-based)
  styles/
    global.css      — design tokens + base
    prose.css       — typography cho MDX render
  content.config.ts — Zod schemas cho collections
public/             — static files (favicon, robots.txt)
```

---

## License

MIT — nội dung bài viết thuộc tác giả, code boilerplate free to reuse.
