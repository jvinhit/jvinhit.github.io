/**
 * Nội dung hướng dẫn theo tuần (spec 009, AC-8) — type + registry gộp.
 * Nội dung thật nằm trong ba file theo tam cá nguyệt (`pregnancy-weeks-t1/
 * t2/t3.ts`) để mỗi file còn đọc được; CHỈ page server import file này —
 * client import `pregnancy-week-sizes.ts` (bảng nhỏ) là đủ.
 */
import { WEEK_GUIDES_T1 } from '~/lib/pregnancy-weeks-t1';
import { WEEK_GUIDES_T2 } from '~/lib/pregnancy-weeks-t2';
import { WEEK_GUIDES_T3 } from '~/lib/pregnancy-weeks-t3';

export interface WeekGuide {
  week: number;
  /** Tiêu đề ngắn của tuần (h1 trang tuần). */
  title: string;
  /** Bé tuần này — phát triển, kích thước, cử động. */
  baby: string[];
  /** Mẹ tuần này — thay đổi cơ thể, dấu hiệu thường gặp. */
  mom: string[];
  /** Nên làm tuần này — việc nhà, dinh dưỡng, chuẩn bị, mốc khám. */
  todo: string[];
  /** Đi khám ngay nếu — dấu hiệu nguy hiểm (render bằng AlertBox). */
  warning: string[];
  /** Ghi chú đặc biệt (vd tuần 1–3 chưa có bé). */
  note?: string;
}

export const WEEK_GUIDES: readonly WeekGuide[] = [
  ...WEEK_GUIDES_T1,
  ...WEEK_GUIDES_T2,
  ...WEEK_GUIDES_T3,
];

/**
 * Ném lỗi nếu thiếu/trùng tuần hoặc có khối rỗng — gọi trong getStaticPaths
 * của `tuan/[week].astro` để `pnpm build` fail thay vì âm thầm thiếu trang
 * (AC-8: đủ 42 tuần, không tuần nào trống).
 */
export function assertWeekGuidesComplete(max: number): void {
  const seen = new Set<number>();
  for (const guide of WEEK_GUIDES) {
    if (seen.has(guide.week)) {
      throw new Error(`pregnancy-weeks: tuần ${guide.week} bị khai hai lần`);
    }
    seen.add(guide.week);
    for (const block of ['baby', 'mom', 'todo', 'warning'] as const) {
      if (guide[block].length === 0) {
        throw new Error(
          `pregnancy-weeks: tuần ${guide.week} thiếu khối ${block}`
        );
      }
    }
  }
  const missing = Array.from({ length: max }, (_, i) => i + 1).filter(
    (week) => !seen.has(week)
  );
  if (missing.length > 0) {
    throw new Error(`pregnancy-weeks: thiếu tuần ${missing.join(', ')}`);
  }
}

export function weekGuide(week: number): WeekGuide | undefined {
  return WEEK_GUIDES.find((guide) => guide.week === week);
}
