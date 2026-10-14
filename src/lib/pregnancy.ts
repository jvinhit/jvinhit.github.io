/**
 * Logic thuần cho khu theo dõi thai kỳ `/be-yeu-dotro/` (spec 009) — toán
 * tuần thai, validate cài đặt, parse document Firestore, gom nhóm, format.
 *
 * Cố ý KHÔNG import gì (kể cả `~/lib/love-board`): mọi hàm nhận `todayKey`
 * ('YYYY-MM-DD' theo giờ VN — caller lấy từ `todayKeyVN()` của love-board)
 * thay vì tự đọc đồng hồ, để file chạy được trực tiếp bằng
 * `node --experimental-strip-types` khi cần kiểm số tay (repo không có test
 * suite). Không đụng DOM.
 */

const DAY_MS = 86_400_000;

/** Thai kỳ tính từ ngày đầu kỳ kinh cuối: 40 tuần = 280 ngày (Naegele). */
export const PREGNANCY_DAYS = 280;

/** Nội dung tham khảo có đủ tuần 1..42 (AC-8). */
export const MAX_GUIDE_WEEK = 42;

// ---------------------------------------------------------------------------
// Ngày tháng — chuỗi 'YYYY-MM-DD', tính trong hệ quy chiếu nửa đêm UTC
// (Date.parse hiểu chuỗi ISO ngày như vậy) nên hiệu số luôn tròn ngày.
// ---------------------------------------------------------------------------

function parseKey(key: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return null;
  const ms = Date.parse(key);
  return Number.isNaN(ms) ? null : ms;
}

export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && parseKey(value) !== null;
}

/** `key` cộng `days` ngày (âm = lùi). Chuỗi hỏng thì trả nguyên. */
export function addDays(key: string, days: number): string {
  const ms = parseKey(key);
  if (ms === null) return key;
  return new Date(ms + days * DAY_MS).toISOString().slice(0, 10);
}

/** `b − a` theo ngày — dương khi `b` sau `a`; null nếu có chuỗi hỏng. */
export function diffDays(a: string, b: string): number | null {
  const pa = parseKey(a);
  const pb = parseKey(b);
  if (pa === null || pb === null) return null;
  return Math.round((pb - pa) / DAY_MS);
}

// ---------------------------------------------------------------------------
// Tuổi thai
// ---------------------------------------------------------------------------

export type Trimester = 1 | 2 | 3;

export interface GestationalAge {
  /** Tuổi thai theo ngày = 280 − (dự sinh − hôm nay). */
  days: number;
  /** Số tuần ĐÃ hoàn thành — cách bác sĩ VN ghi "thai 12 tuần 3 ngày". */
  weeks: number;
  /** Ngày lẻ 0–6. */
  dayOfWeek: number;
  /** Tam cá nguyệt: 1 = tuần 0–13, 2 = 14–27, 3 = 28+ (requirement AC-5). */
  trimester: Trimester;
  /** Số ngày tới dự sinh; âm = đã quá ngày. */
  daysLeft: number;
  /** Số ngày quá dự sinh (0 nếu chưa tới). */
  overdueDays: number;
  /** Tiến trình 0..1 cho progressbar. */
  progress: number;
  /**
   * Tuần nội dung để mở trang `tuan/<n>/`: chính là `weeks`, kẹp vào 1..42.
   * Tuần 0 (7 ngày đầu tính từ kỳ kinh) dùng nội dung tuần 1; quá 42 giữ 42.
   */
  guideWeek: number;
}

export function trimesterOf(weeks: number): Trimester {
  if (weeks < 14) return 1;
  if (weeks < 28) return 2;
  return 3;
}

export function clampGuideWeek(weeks: number): number {
  return Math.min(MAX_GUIDE_WEEK, Math.max(1, weeks));
}

/** null khi một trong hai chuỗi ngày hỏng. */
export function gestationalAge(
  dueDate: string,
  todayKey: string
): GestationalAge | null {
  const daysLeft = diffDays(todayKey, dueDate);
  if (daysLeft === null) return null;
  const days = PREGNANCY_DAYS - daysLeft;
  const safeDays = Math.max(0, days);
  const weeks = Math.floor(safeDays / 7);
  return {
    days,
    weeks,
    dayOfWeek: safeDays % 7,
    trimester: trimesterOf(weeks),
    daysLeft,
    overdueDays: Math.max(0, -daysLeft),
    progress: Math.min(1, safeDays / PREGNANCY_DAYS),
    guideWeek: clampGuideWeek(weeks),
  };
}

/** Dự sinh từ ngày đầu kỳ kinh cuối (+280 ngày). */
export function eddFromLmp(lmpDate: string): string {
  return addDays(lmpDate, PREGNANCY_DAYS);
}

/** Dự sinh từ ngày que thử hai vạch / ngày lẽ ra có kinh (≈ 4 tuần). */
export function eddFromPositiveTest(testDate: string): string {
  return addDays(testDate, PREGNANCY_DAYS - TEST_DAY_GA_DAYS);
}

/** Dự sinh từ kết quả siêu âm "X tuần Y ngày" tại ngày `scanDate`. */
export function eddFromScan(
  scanDate: string,
  weeks: number,
  days: number
): string {
  return addDays(scanDate, PREGNANCY_DAYS - (weeks * 7 + days));
}

/** Ngày đầu tiên (N tuần 0 ngày) của tuần `week` — gợi ý ngày cho mốc khám. */
export function suggestedDateForWeek(dueDate: string, week: number): string {
  return addDays(dueDate, week * 7 - PREGNANCY_DAYS);
}

/**
 * Tuần thai (đã hoàn thành) tại một ngày bất kỳ — dùng gom nhật ký theo
 * tuần và suy lại nhãn khi đổi ngày dự sinh (AC-6). Trước kỳ kinh → 0.
 */
export function weekForDateKey(dateKey: string, dueDate: string): number {
  const daysLeft = diffDays(dateKey, dueDate);
  if (daysLeft === null) return 0;
  return Math.max(0, Math.floor((PREGNANCY_DAYS - daysLeft) / 7));
}

/** "13 tuần 1 ngày" / "13 tuần" (ngày lẻ 0 thì bỏ cho tự nhiên). */
export function formatGa(ga: Pick<GestationalAge, 'weeks' | 'dayOfWeek'>) {
  return ga.dayOfWeek === 0
    ? `${ga.weeks} tuần`
    : `${ga.weeks} tuần ${ga.dayOfWeek} ngày`;
}

export function trimesterLabel(trimester: Trimester): string {
  return `Tam cá nguyệt ${trimester}`;
}

// ---------------------------------------------------------------------------
// Tuổi bé (sau khi nhập ngày chào đời — AC-7)
// ---------------------------------------------------------------------------

export interface BabyAge {
  /** Ngày tuổi, 0 vào đúng ngày sinh. */
  days: number;
  weeks: number;
  dayOfWeek: number;
}

export function babyAge(birthDate: string, todayKey: string): BabyAge | null {
  const days = diffDays(birthDate, todayKey);
  if (days === null || days < 0) return null;
  return { days, weeks: Math.floor(days / 7), dayOfWeek: days % 7 };
}

/** "3 ngày tuổi" tuần đầu, sau đó "5 tuần 2 ngày". */
export function formatBabyAge(age: BabyAge): string {
  if (age.days < 7) return `${age.days} ngày tuổi`;
  return age.dayOfWeek === 0
    ? `${age.weeks} tuần tuổi`
    : `${age.weeks} tuần ${age.dayOfWeek} ngày`;
}

// ---------------------------------------------------------------------------
// Cài đặt thai kỳ — document `pregnancySettings/current`
// ---------------------------------------------------------------------------

export type DueDateMethod = 'edd' | 'lmp' | 'scan' | 'test';

/**
 * Que thử lên hai vạch (hoặc ngày lẽ ra có kinh) ≈ thai 4 tuần 0 ngày theo
 * cách tính từ kỳ kinh cuối với chu kỳ 28 ngày → dự sinh = ngày đó + 36 tuần.
 * Là ước lượng thô cho lúc chưa nhớ kỳ kinh; siêu âm lần đầu sẽ chốt lại.
 */
export const TEST_DAY_GA_DAYS = 28;

/**
 * Mặc định điền sẵn form onboarding (nhà mình): ngày lẽ ra có kinh / biết tin
 * 07/10/2026. Chỉ là giá trị khởi tạo cho form, không ghi đâu cả.
 */
export const ONBOARDING_DEFAULTS = {
  method: 'test' as DueDateMethod,
  date: '2026-10-07',
};

/** Phần user nhập (validate xong); page ghi thêm updatedAtMs/updatedBy. */
export interface SettingsPayload {
  dueDate: string;
  method: DueDateMethod;
  lmpDate?: string;
  scanDate?: string;
  scanWeeks?: number;
  scanDays?: number;
  /** Ngày que 2 vạch / trễ kinh khi method = 'test'. */
  testDate?: string;
  babyName?: string;
  /** Có giá trị = bé đã chào đời → dashboard chuyển sang đếm tuổi bé. */
  birthDate?: string;
  heightCm?: number;
  preWeightKg?: number;
}

export interface PregnancySettings extends SettingsPayload {
  updatedAtMs: number;
  updatedBy: string;
}

/** Giá trị thô từ form — chuỗi hết, validate mới ép kiểu. */
export interface SettingsInput {
  method: DueDateMethod;
  dueDate: string;
  lmpDate: string;
  scanDate: string;
  scanWeeks: string;
  scanDays: string;
  testDate: string;
  babyName: string;
  birthDate: string;
  heightCm: string;
  preWeightKg: string;
}

export type SettingsValidation =
  | { ok: true; value: SettingsPayload }
  | { ok: false; error: string };

/** Dự sinh hợp lệ: không quá 3 tuần trong quá khứ, không xa hơn 40 tuần. */
const MAX_OVERDUE_DAYS = 21;

function optionalNumber(
  raw: string,
  min: number,
  max: number
): number | null | undefined {
  const trimmed = raw.trim();
  if (trimmed === '') return undefined;
  const n = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

/**
 * Validate theo edge case của requirement; mọi câu lỗi là tiếng Việt để
 * page hiện thẳng vào `aria-live`.
 */
export function validateSettingsInput(
  input: SettingsInput,
  todayKey: string
): SettingsValidation {
  const value: SettingsPayload = { dueDate: '', method: input.method };

  if (input.method === 'edd') {
    if (!isDateKey(input.dueDate)) {
      return { ok: false, error: 'Nhập ngày dự sinh bác sĩ cho nhé.' };
    }
    value.dueDate = input.dueDate;
  } else if (input.method === 'lmp') {
    if (!isDateKey(input.lmpDate)) {
      return { ok: false, error: 'Nhập ngày đầu của kỳ kinh cuối nhé.' };
    }
    const gap = diffDays(input.lmpDate, todayKey) ?? -1;
    if (gap < 0) {
      return { ok: false, error: 'Ngày kỳ kinh cuối không thể ở tương lai.' };
    }
    value.lmpDate = input.lmpDate;
    value.dueDate = eddFromLmp(input.lmpDate);
  } else if (input.method === 'test') {
    if (!isDateKey(input.testDate)) {
      return {
        ok: false,
        error: 'Nhập ngày que lên hai vạch (hoặc ngày lẽ ra có kinh) nhé.',
      };
    }
    if ((diffDays(input.testDate, todayKey) ?? -1) < 0) {
      return { ok: false, error: 'Ngày que thử không thể ở tương lai.' };
    }
    value.testDate = input.testDate;
    value.dueDate = eddFromPositiveTest(input.testDate);
  } else {
    if (!isDateKey(input.scanDate)) {
      return { ok: false, error: 'Nhập ngày đi siêu âm nhé.' };
    }
    if ((diffDays(input.scanDate, todayKey) ?? -1) < 0) {
      return { ok: false, error: 'Ngày siêu âm không thể ở tương lai.' };
    }
    const weeks = optionalNumber(input.scanWeeks, 0, MAX_GUIDE_WEEK);
    const days = optionalNumber(input.scanDays || '0', 0, 6);
    if (weeks === undefined || weeks === null || !Number.isInteger(weeks)) {
      return { ok: false, error: 'Số tuần siêu âm phải là số nguyên 0–42.' };
    }
    if (days === undefined || days === null || !Number.isInteger(days)) {
      return { ok: false, error: 'Số ngày lẻ phải là số nguyên 0–6.' };
    }
    value.scanDate = input.scanDate;
    value.scanWeeks = weeks;
    value.scanDays = days;
    value.dueDate = eddFromScan(input.scanDate, weeks, days);
  }

  const daysLeft = diffDays(todayKey, value.dueDate) ?? 0;
  if (daysLeft < -MAX_OVERDUE_DAYS) {
    return {
      ok: false,
      error:
        'Ngày dự sinh này đã qua hơn 3 tuần — kiểm tra lại số, hoặc nhập ngày bé chào đời nếu bé đã ra đời rồi 🎉',
    };
  }
  if (daysLeft > PREGNANCY_DAYS) {
    return {
      ok: false,
      error: 'Ngày dự sinh xa hơn 40 tuần — thai kỳ không dài đến vậy đâu.',
    };
  }

  const babyName = input.babyName.trim();
  if (babyName.length > 40) {
    return { ok: false, error: 'Tên gọi của bé dài quá 40 ký tự rồi.' };
  }
  if (babyName) value.babyName = babyName;

  if (input.birthDate.trim() !== '') {
    if (!isDateKey(input.birthDate)) {
      return { ok: false, error: 'Ngày bé chào đời chưa đúng định dạng.' };
    }
    if ((diffDays(input.birthDate, todayKey) ?? -1) < 0) {
      return { ok: false, error: 'Ngày bé chào đời không thể ở tương lai.' };
    }
    // Sinh non cực sớm cũng hiếm khi trước 22 tuần → chặn số gõ nhầm.
    if ((diffDays(input.birthDate, value.dueDate) ?? 0) > 18 * 7) {
      return {
        ok: false,
        error:
          'Ngày bé chào đời sớm hơn dự sinh tới hơn 18 tuần — kiểm tra lại nhé.',
      };
    }
    value.birthDate = input.birthDate;
  }

  const heightCm = optionalNumber(input.heightCm, 120, 220);
  if (heightCm === null) {
    return { ok: false, error: 'Chiều cao nên trong khoảng 120–220 cm.' };
  }
  if (heightCm !== undefined) value.heightCm = heightCm;

  const preWeightKg = optionalNumber(input.preWeightKg, 30, 200);
  if (preWeightKg === null) {
    return {
      ok: false,
      error: 'Cân nặng trước mang thai nên trong 30–200 kg.',
    };
  }
  if (preWeightKg !== undefined) value.preWeightKg = preWeightKg;

  return { ok: true, value };
}

function optionalString(raw: unknown): string | undefined {
  // '' là quy ước "đã xóa" (giống imageBase64 của love board) → undefined.
  return typeof raw === 'string' && raw !== '' ? raw : undefined;
}

function optionalFiniteNumber(raw: unknown): number | undefined {
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : undefined;
}

function isDueDateMethod(raw: unknown): raw is DueDateMethod {
  return raw === 'edd' || raw === 'lmp' || raw === 'scan' || raw === 'test';
}

/** Parse tolerant document settings; thiếu dueDate hợp lệ → null (coi như chưa setup). */
export function settingsFromDoc(
  data: Record<string, unknown> | undefined
): PregnancySettings | null {
  if (!data || !isDateKey(data.dueDate)) return null;
  return {
    dueDate: data.dueDate,
    method: isDueDateMethod(data.method) ? data.method : 'edd',
    lmpDate: isDateKey(data.lmpDate) ? data.lmpDate : undefined,
    scanDate: isDateKey(data.scanDate) ? data.scanDate : undefined,
    scanWeeks: optionalFiniteNumber(data.scanWeeks),
    scanDays: optionalFiniteNumber(data.scanDays),
    testDate: isDateKey(data.testDate) ? data.testDate : undefined,
    babyName: optionalString(data.babyName),
    birthDate: isDateKey(data.birthDate) ? data.birthDate : undefined,
    heightCm: optionalFiniteNumber(data.heightCm),
    preWeightKg: optionalFiniteNumber(data.preWeightKg),
    updatedAtMs: optionalFiniteNumber(data.updatedAtMs) ?? 0,
    updatedBy: typeof data.updatedBy === 'string' ? data.updatedBy : '',
  };
}

// ---------------------------------------------------------------------------
// Nhật ký — collection `pregnancyNotes`
// ---------------------------------------------------------------------------

export const NOTE_KINDS = [
  { id: 'checkup', label: 'Khám thai', emoji: '🩺' },
  { id: 'food', label: 'Ăn uống', emoji: '🍲' },
  { id: 'symptom', label: 'Triệu chứng & cảm nhận', emoji: '🤰' },
  { id: 'weight', label: 'Cân nặng', emoji: '⚖️' },
  { id: 'prep', label: 'Chuẩn bị', emoji: '🧸' },
  { id: 'other', label: 'Khác', emoji: '✨' },
] as const satisfies readonly { id: string; label: string; emoji: string }[];

export type NoteKind = (typeof NOTE_KINDS)[number]['id'];

export function isNoteKind(raw: unknown): raw is NoteKind {
  return NOTE_KINDS.some((kind) => kind.id === raw);
}

export function noteKindMeta(kind: NoteKind) {
  // NOTE_KINDS là hằng đầy đủ nên luôn tìm thấy; fallback giữ cho TS strict.
  return NOTE_KINDS.find((item) => item.id === kind) ?? NOTE_KINDS[5];
}

export interface PregnancyNote {
  id: string;
  /** YYYY-MM-DD theo giờ VN — ngày THẬT của ghi chú; tuần suy lúc render. */
  dateKey: string;
  kind: NoteKind;
  text: string;
  /** Chỉ có khi kind = 'weight'. */
  weightKg?: number;
  imageBase64?: string;
  /** `id` profile trong LOVE_CONFIG ('p1' | 'p2'); tolerant với data lạ. */
  author: string;
  /** Epoch ms từ đồng hồ client — cùng lý do với love board (sort ổn định). */
  createdAtMs: number;
  updatedAtMs?: number;
}

export function noteFromDoc(
  id: string,
  data: Record<string, unknown>
): PregnancyNote | null {
  const { dateKey, kind, text, createdAtMs, author } = data;
  if (
    !isDateKey(dateKey) ||
    typeof text !== 'string' ||
    typeof createdAtMs !== 'number'
  ) {
    return null;
  }
  return {
    id,
    dateKey,
    text,
    createdAtMs,
    kind: isNoteKind(kind) ? kind : 'other',
    weightKg: optionalFiniteNumber(data.weightKg),
    imageBase64: optionalString(data.imageBase64),
    author: typeof author === 'string' ? author : 'p1',
    updatedAtMs: optionalFiniteNumber(data.updatedAtMs),
  };
}

export interface NoteDay {
  dateKey: string;
  notes: PregnancyNote[];
}

export interface NoteWeekGroup {
  /** Tuần thai tại ngày đó (0 = trước kỳ kinh / không rõ). */
  week: number;
  days: NoteDay[];
}

/**
 * Gom notes (đã sort createdAtMs desc) thành tuần → ngày, giữ thứ tự mới→cũ.
 * Tuần suy từ `dueDate` hiện tại nên đổi dự sinh là nhãn tự đúng lại (AC-6).
 */
export function groupNotesByWeek(
  notes: PregnancyNote[],
  dueDate: string
): NoteWeekGroup[] {
  const groups: NoteWeekGroup[] = [];
  let week: NoteWeekGroup | null = null;
  let day: NoteDay | null = null;
  for (const note of notes) {
    const w = weekForDateKey(note.dateKey, dueDate);
    if (!week || week.week !== w) {
      week = { week: w, days: [] };
      groups.push(week);
      day = null;
    }
    if (!day || day.dateKey !== note.dateKey) {
      day = { dateKey: note.dateKey, notes: [] };
      week.days.push(day);
    }
    day.notes.push(note);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Cân nặng (AC-15) — khuyến nghị tăng cân theo BMI trước mang thai (IOM 2009)
// ---------------------------------------------------------------------------

export interface WeightGainTarget {
  minKg: number;
  maxKg: number;
  /** Nhóm BMI theo cách gọi quen thuộc. */
  label: string;
}

export function bmi(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function weightGainTarget(bmiValue: number): WeightGainTarget {
  if (bmiValue < 18.5) return { minKg: 12.5, maxKg: 18, label: 'gầy' };
  if (bmiValue < 25) return { minKg: 11.5, maxKg: 16, label: 'bình thường' };
  if (bmiValue < 30) return { minKg: 7, maxKg: 11.5, label: 'thừa cân' };
  return { minKg: 5, maxKg: 9, label: 'béo phì' };
}

export interface WeightEntry {
  dateKey: string;
  kg: number;
  /** Chênh so với mốc gốc (cân trước mang thai nếu có, không thì lần cân đầu). */
  deltaKg: number;
}

export interface WeightSummary {
  entries: WeightEntry[];
  baseKg: number;
  /** true khi mốc gốc là cân nặng trước mang thai từ cài đặt. */
  baseIsPrePregnancy: boolean;
  latestKg: number;
  gainKg: number;
  bmi?: number;
  target?: WeightGainTarget;
}

/** null khi chưa có ghi chú cân nặng nào. Entries sort cũ→mới. */
export function weightSummary(
  notes: PregnancyNote[],
  settings: Pick<PregnancySettings, 'heightCm' | 'preWeightKg'>
): WeightSummary | null {
  const weighed = notes
    .filter(
      (note): note is PregnancyNote & { weightKg: number } =>
        note.kind === 'weight' && typeof note.weightKg === 'number'
    )
    .sort((a, b) => a.createdAtMs - b.createdAtMs);
  const first = weighed[0];
  const last = weighed[weighed.length - 1];
  if (!first || !last) return null;

  const baseKg = settings.preWeightKg ?? first.weightKg;
  const entries = weighed.map((note) => ({
    dateKey: note.dateKey,
    kg: note.weightKg,
    deltaKg: Math.round((note.weightKg - baseKg) * 10) / 10,
  }));
  const summary: WeightSummary = {
    entries,
    baseKg,
    baseIsPrePregnancy: settings.preWeightKg !== undefined,
    latestKg: last.weightKg,
    gainKg: Math.round((last.weightKg - baseKg) * 10) / 10,
  };
  if (settings.heightCm && settings.preWeightKg) {
    const value = bmi(settings.heightCm, settings.preWeightKg);
    summary.bmi = Math.round(value * 10) / 10;
    summary.target = weightGainTarget(value);
  }
  return summary;
}

// ---------------------------------------------------------------------------
// Lịch khám — collection `pregnancyAppointments`
// ---------------------------------------------------------------------------

export type AppointmentStatus = 'upcoming' | 'done';

export interface Appointment {
  id: string;
  date: string;
  /** 'HH:mm' tuỳ chọn. */
  time?: string;
  place: string;
  purpose: string;
  result?: string;
  status: AppointmentStatus;
  /** id mốc khám chuẩn nếu tạo từ bảng mốc (AC-9). */
  milestoneId?: string;
  author: string;
  createdAtMs: number;
  updatedAtMs?: number;
}

export function appointmentFromDoc(
  id: string,
  data: Record<string, unknown>
): Appointment | null {
  const { date, purpose, createdAtMs } = data;
  if (
    !isDateKey(date) ||
    typeof purpose !== 'string' ||
    typeof createdAtMs !== 'number'
  ) {
    return null;
  }
  const time = optionalString(data.time);
  return {
    id,
    date,
    purpose,
    createdAtMs,
    time: time && /^\d{2}:\d{2}$/.test(time) ? time : undefined,
    place: typeof data.place === 'string' ? data.place : '',
    result: optionalString(data.result),
    status: data.status === 'done' ? 'done' : 'upcoming',
    milestoneId: optionalString(data.milestoneId),
    author: typeof data.author === 'string' ? data.author : 'p1',
    updatedAtMs: optionalFiniteNumber(data.updatedAtMs),
  };
}

function byDateTime(a: Appointment, b: Appointment): number {
  return `${a.date} ${a.time ?? ''}`.localeCompare(`${b.date} ${b.time ?? ''}`);
}

/** Sắp tới sort gần nhất trước; đã khám sort mới nhất trước (AC-16). */
export function splitAppointments(list: Appointment[]): {
  upcoming: Appointment[];
  done: Appointment[];
} {
  const upcoming = list.filter((a) => a.status === 'upcoming').sort(byDateTime);
  const done = list
    .filter((a) => a.status === 'done')
    .sort((a, b) => byDateTime(b, a));
  return { upcoming, done };
}

/** Lịch hẹn sắp tới trong `withinDays` ngày kể từ hôm nay (cả hôm nay). */
export function upcomingWithin(
  list: Appointment[],
  todayKey: string,
  withinDays: number
): Appointment[] {
  return splitAppointments(list).upcoming.filter((a) => {
    const gap = diffDays(todayKey, a.date);
    return gap !== null && gap >= 0 && gap <= withinDays;
  });
}

// ---------------------------------------------------------------------------
// Mốc khám chuẩn (dữ liệu ở pregnancy-milestones.ts) — chỉ phần tính
// ---------------------------------------------------------------------------

export interface MilestoneWindow {
  fromWeek: number;
  toWeek: number;
}

export type MilestoneStatus = 'past' | 'now' | 'upcoming';

export function milestoneStatus(
  window: MilestoneWindow,
  currentWeek: number
): MilestoneStatus {
  if (currentWeek > window.toWeek) return 'past';
  if (currentWeek >= window.fromWeek) return 'now';
  return 'upcoming';
}

export function milestoneStatusLabel(status: MilestoneStatus): string {
  switch (status) {
    case 'past':
      return 'Đã qua';
    case 'now':
      return 'Đang trong cửa sổ';
    default:
      return 'Sắp tới';
  }
}

// ---------------------------------------------------------------------------
// Checklist — document `pregnancyChecklist/<listId>`
// ---------------------------------------------------------------------------

/**
 * Mục tự do. Shape phải giữ ĐÚNG 4 field như lúc ghi: xóa dùng arrayRemove()
 * so bằng tuyệt đối — bài học từ LoveComment (spec 006).
 */
export interface CustomChecklistItem {
  id: string;
  text: string;
  author: string;
  createdAtMs: number;
}

export interface ChecklistState {
  /** id mục mẫu hoặc mục tự do đã tick. */
  checked: string[];
  custom: CustomChecklistItem[];
}

export function checklistStateFromDoc(
  data: Record<string, unknown> | undefined
): ChecklistState {
  const checked: string[] = [];
  if (Array.isArray(data?.checked)) {
    for (const item of data.checked) {
      if (typeof item === 'string') checked.push(item);
    }
  }
  const custom: CustomChecklistItem[] = [];
  if (Array.isArray(data?.custom)) {
    for (const item of data.custom) {
      if (typeof item !== 'object' || item === null) continue;
      const { id, text, author, createdAtMs } = item as Record<string, unknown>;
      if (
        typeof id !== 'string' ||
        typeof text !== 'string' ||
        typeof author !== 'string' ||
        typeof createdAtMs !== 'number'
      ) {
        continue;
      }
      custom.push({ id, text, author, createdAtMs });
    }
  }
  custom.sort((a, b) => a.createdAtMs - b.createdAtMs);
  return { checked, custom };
}

// ---------------------------------------------------------------------------
// Format ngày cho UI (giờ VN)
// ---------------------------------------------------------------------------

const VN_TZ = 'Asia/Ho_Chi_Minh';

function dateAtVN(dateKey: string): Date | null {
  const date = new Date(`${dateKey}T00:00:00+07:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** 'Thứ Tư, 14/10/2026'. */
export function formatDateVN(dateKey: string): string {
  const date = dateAtVN(dateKey);
  if (!date) return dateKey;
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: VN_TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** '14/10' — cho nhãn gọn trong danh sách. */
export function formatDateShort(dateKey: string): string {
  const date = dateAtVN(dateKey);
  if (!date) return dateKey;
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: VN_TZ,
    day: 'numeric',
    month: 'numeric',
  }).format(date);
}

/** 'Hôm nay' / 'Ngày mai' / 'Còn 5 ngày' / 'Hôm qua' / '3 ngày trước'. */
export function relativeDayLabel(dateKey: string, todayKey: string): string {
  const gap = diffDays(todayKey, dateKey);
  if (gap === null) return dateKey;
  if (gap === 0) return 'Hôm nay';
  if (gap === 1) return 'Ngày mai';
  if (gap === -1) return 'Hôm qua';
  return gap > 0 ? `Còn ${gap} ngày` : `${-gap} ngày trước`;
}

/** Id ngắn cho mục tự do / lịch hẹn tạo phía client. */
export function shortId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
