import sharp from 'sharp';

/**
 * Icon "Bé yêu" cho màn hình chính (spec 009 — thêm vào màn hình chính).
 *
 * Vẽ bằng hình học thuần (trái tim + mầm cây), KHÔNG dùng emoji hay chữ:
 * librsvg trong `sharp` render emoji/font khác nhau giữa máy dev và runner
 * CI. Nền tràn viền + hình nằm gọn trong vòng tròn an toàn (bán kính 40%
 * cạnh) nên cùng một ảnh dùng được cho cả `purpose: any` lẫn `maskable`
 * (Android cắt icon thành tròn/squircle tùy launcher).
 *
 * Cùng pattern với `og-image.ts`: SVG → PNG ở build time, không có asset nhị
 * phân nào trong repo.
 */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e3f4ec"/>
      <stop offset="1" stop-color="#ffe9df"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <path d="M256 214 L256 150" stroke="#3aa17e" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="226" cy="160" rx="30" ry="15" fill="#3aa17e" transform="rotate(-30 226 160)"/>
  <ellipse cx="287" cy="146" rx="34" ry="17" fill="#3aa17e" transform="rotate(25 287 146)"/>
  <path d="M256 376 C 160 306 132 254 148 214 C 165 172 222 166 256 212 C 290 166 347 172 364 214 C 380 254 352 306 256 376 Z" fill="#f5a989"/>
  <path d="M210 230 C 200 236 194 248 196 262" stroke="#ffffff" stroke-opacity="0.7" stroke-width="12" stroke-linecap="round" fill="none"/>
</svg>`;

/** PNG vuông `size`×`size`. */
export function renderPregnancyIcon(size: number): Promise<Buffer> {
  return sharp(Buffer.from(SVG), { density: Math.max(72, (72 * size) / 512) })
    .resize(size, size)
    .png()
    .toBuffer();
}

/** Kích thước cần: 180 cho iOS (apple-touch-icon), 192 + 512 cho manifest. */
export const PREGNANCY_ICON_SIZES = [180, 192, 512] as const;
