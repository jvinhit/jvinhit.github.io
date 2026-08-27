/**
 * Logic thuần cho Love Board (/love-story-dotro/) — tính ngày, format,
 * map lỗi, nén ảnh. Không render/điều khiển DOM của page (canvas offscreen
 * trong compressImage là công cụ tính toán, không gắn vào document); phần
 * wiring nằm trong script của page (convention: logic ở src/lib/).
 */

/** Múi giờ chốt cho mọi phép tính "hôm nay" của board (AC-8). */
const LOVE_TZ = 'Asia/Ho_Chi_Minh';

/**
 * 'YYYY-MM-DD' của thời điểm `now` theo giờ VN — locale `en-CA` cho sẵn
 * đúng định dạng ISO. Chuỗi này cũng là `dateKey` lưu trong document note.
 */
export function todayKeyVN(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: LOVE_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 * Số ngày bên nhau tính đến hôm nay (giờ VN); ngày kỷ niệm là ngày thứ 1.
 * Cả hai chuỗi đều dạng YYYY-MM-DD nên Date.parse hiểu là nửa đêm UTC —
 * cùng hệ quy chiếu, hiệu số luôn là bội của 86400000.
 */
export function daysTogether(
  anniversary: string,
  now: Date = new Date()
): number {
  const start = Date.parse(anniversary);
  const today = Date.parse(todayKeyVN(now));
  if (Number.isNaN(start) || Number.isNaN(today)) return 0;
  return Math.max(0, Math.floor((today - start) / 86_400_000) + 1);
}

/**
 * Một trả lời nằm trong mảng `comments` của document note/sticky (spec 006,
 * hướng D1 — không mở collection mới để khỏi đổi security rules).
 *
 * Shape phải giữ ĐÚNG 4 field như lúc ghi: xóa comment dùng arrayRemove(),
 * nó chỉ match phần tử bằng nhau tuyệt đối — parse mà thêm/bớt field là
 * không xóa được nữa.
 */
export interface LoveComment {
  id: string;
  author: string;
  text: string;
  createdAtMs: number;
}

/**
 * Một lượt thả cảm xúc trong mảng `reactions` — đúng cặp {emoji, author}
 * (hướng R1). Toggle bằng arrayUnion/arrayRemove: hai người thả cùng emoji
 * là hai phần tử khác nhau nên không đè nhau; cùng shape-nhạy-cảm với
 * arrayRemove như LoveComment.
 */
export interface LoveReaction {
  emoji: string;
  author: string;
}

/** Parse tolerant mảng comments thô — phần tử rác bị bỏ, sort cũ→mới. */
export function commentsFromRaw(raw: unknown): LoveComment[] {
  if (!Array.isArray(raw)) return [];
  const comments: LoveComment[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const { id, author, text, createdAtMs } = item as Record<string, unknown>;
    if (
      typeof id !== 'string' ||
      typeof author !== 'string' ||
      typeof text !== 'string' ||
      typeof createdAtMs !== 'number'
    ) {
      continue;
    }
    comments.push({ id, author, text, createdAtMs });
  }
  // arrayUnion không bảo toàn thứ tự thời gian giữa hai máy — sort ở đây.
  return comments.sort((a, b) => a.createdAtMs - b.createdAtMs);
}

/** Parse tolerant mảng reactions thô — phần tử rác bị bỏ. */
export function reactionsFromRaw(raw: unknown): LoveReaction[] {
  if (!Array.isArray(raw)) return [];
  const reactions: LoveReaction[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const { emoji, author } = item as Record<string, unknown>;
    if (typeof emoji !== 'string' || typeof author !== 'string') continue;
    reactions.push({ emoji, author });
  }
  return reactions;
}

/** Nhãn đếm cho nút mở panel comment — screen reader đọc được. */
export function commentCountLabel(count: number): string {
  return `${count} trả lời`;
}

/** Một note trong collection `dailyNotes` (đã validate từ document thô). */
export interface LoveNote {
  id: string;
  /** YYYY-MM-DD theo giờ VN — khóa gom nhóm timeline. */
  dateKey: string;
  /** `id` trong LOVE_CONFIG.profiles ('p1' | 'p2'); tolerant với data lạ. */
  author: string;
  mood: string;
  text: string;
  imageBase64?: string;
  /**
   * Epoch ms từ đồng hồ client. Dùng thay serverTimestamp() vì: (a) sort
   * ổn định ngay với pending write (serverTimestamp là null trong snapshot
   * latency-compensation → note mới nhảy xuống đáy), (b) lệch giờ vài giây
   * giữa hai điện thoại không có ý nghĩa với use case này.
   */
  createdAtMs: number;
  updatedAtMs?: number;
  comments: LoveComment[];
  reactions: LoveReaction[];
}

/** Parse + validate một document thô; document rác → null (bỏ qua). */
export function noteFromDoc(
  id: string,
  data: Record<string, unknown>
): LoveNote | null {
  const { dateKey, author, mood, text, imageBase64, createdAtMs, updatedAtMs } =
    data;
  if (
    typeof dateKey !== 'string' ||
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
    author: typeof author === 'string' ? author : 'p1',
    mood: typeof mood === 'string' ? mood : '',
    // '' là "không có ảnh" — updateDoc không xóa được field nếu thiếu
    // deleteField(), nên bỏ ảnh khi sửa note được ghi thành chuỗi rỗng.
    imageBase64:
      typeof imageBase64 === 'string' && imageBase64 !== ''
        ? imageBase64
        : undefined,
    updatedAtMs: typeof updatedAtMs === 'number' ? updatedAtMs : undefined,
    comments: commentsFromRaw(data.comments),
    reactions: reactionsFromRaw(data.reactions),
  };
}

export interface DayGroup {
  dateKey: string;
  notes: LoveNote[];
}

/**
 * Gom notes (đã sort createdAtMs desc) thành nhóm theo ngày, giữ nguyên
 * thứ tự — note cùng ngày luôn liền kề vì dateKey suy từ thời điểm tạo.
 */
export function groupByDate(notes: LoveNote[]): DayGroup[] {
  const groups: DayGroup[] = [];
  let current: DayGroup | null = null;
  for (const note of notes) {
    if (!current || current.dateKey !== note.dateKey) {
      current = { dateKey: note.dateKey, notes: [] };
      groups.push(current);
    }
    current.notes.push(note);
  }
  return groups;
}

/**
 * Ngưỡng bật chế độ collapse timeline (spec 006): xét TỔNG số note đã
 * validate — dưới/bằng ngưỡng thì giữ hành vi cũ (mọi ngày mở, không có
 * control), vượt ngưỡng mới gấp các ngày cũ lại.
 */
export const COLLAPSE_THRESHOLD = 20;

/** Xem COLLAPSE_THRESHOLD — tách hàm để page không tự so sánh lệch dấu. */
export function isCollapseEnabled(totalNotes: number): boolean {
  return totalNotes > COLLAPSE_THRESHOLD;
}

/**
 * Ngày được mở sẵn khi collapse bật: hôm nay (giờ VN) nếu có note; hôm nay
 * chưa viết gì thì lấy nhóm mới nhất — để board không bao giờ mở ra toàn
 * dòng đóng kín (AC-5). `groups` đã sort mới→cũ nên phần tử đầu là nhóm
 * gần nhất.
 */
export function defaultOpenDateKey(
  groups: DayGroup[],
  now: Date = new Date()
): string | null {
  const today = todayKeyVN(now);
  if (groups.some((group) => group.dateKey === today)) return today;
  return groups[0]?.dateKey ?? null;
}

/** Nhãn đếm cho header ngày đang gấp — screen reader đọc được, không chỉ là số. */
export function noteCountLabel(count: number): string {
  return `${count} ghi chú`;
}

/** Một mẩu giấy trên sticky board (collection `stickyNotes`). */
export interface LoveSticky {
  id: string;
  text: string;
  /** id màu giấy khai trong page ('rose' | 'mint' | …); tolerant data lạ. */
  color: string;
  author: string;
  createdAtMs: number;
  comments: LoveComment[];
  reactions: LoveReaction[];
}

/** Parse + validate một document sticky thô; document rác → null. */
export function stickyFromDoc(
  id: string,
  data: Record<string, unknown>
): LoveSticky | null {
  const { text, color, author, createdAtMs } = data;
  if (typeof text !== 'string' || typeof createdAtMs !== 'number') return null;
  return {
    id,
    text,
    createdAtMs,
    color: typeof color === 'string' ? color : 'rose',
    author: typeof author === 'string' ? author : 'p1',
    comments: commentsFromRaw(data.comments),
    reactions: reactionsFromRaw(data.reactions),
  };
}

/** Heading nhóm ngày: 'Hôm nay 💖' hoặc 'Thứ Tư, 27/8/2026' (giờ VN). */
export function formatDateHeading(
  dateKey: string,
  now: Date = new Date()
): string {
  if (dateKey === todayKeyVN(now)) return 'Hôm nay 💖';
  const date = new Date(`${dateKey}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: LOVE_TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** 'HH:mm' theo giờ VN cho dòng meta của note. */
export function formatTimeVN(ms: number): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: LOVE_TZ,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ms));
}

/** Map mã lỗi Firebase Auth thành câu tiếng Việt thân thiện trên form. */
export function loginErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email hoặc mật mã chưa đúng rồi 🥺 thử lại nhé!';
    case 'auth/invalid-email':
      return 'Email chưa đúng định dạng — kiểm tra lại nhé ✉️';
    case 'auth/too-many-requests':
      return 'Thử sai nhiều quá nên bị tạm khóa một xíu — chờ vài phút rồi thử lại nha ⏳';
    case 'auth/network-request-failed':
      return 'Mạng đang chập chờn 📡 kiểm tra kết nối rồi thử lại nhé.';
    case 'auth/operation-not-allowed':
      return 'Firebase chưa bật Email/Password — xem firebase-setup.md, Bước 2.';
    default:
      return code
        ? `Có lỗi lạ (${code}) — thử lại hoặc xem firebase-setup.md.`
        : 'Có lỗi không xác định, thử lại nhé.';
  }
}

/**
 * Nén ảnh phía client cho note (AC-9): resize về cạnh dài ≤ `maxSide` rồi
 * hạ JPEG quality dần tới khi data URI ≤ `maxChars` ký tự (base64 ≈ 4/3 số
 * byte → 220k ký tự ≈ 160KB, dư an toàn dưới trần 700KB của rules và limit
 * 1MB/document của Firestore). Trả null khi file không decode được hoặc
 * nén hết cỡ vẫn quá to — caller tự hiện thông báo.
 */
export async function compressImage(
  file: File,
  maxSide = 1024,
  maxChars = 220_000
): Promise<string | null> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  for (const quality of [0.8, 0.65, 0.5, 0.35]) {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    if (dataUrl.length <= maxChars) return dataUrl;
  }
  return null;
}

/** Map mã lỗi Firestore khi ghi/xóa thành thông báo trên composer. */
export function writeErrorMessage(code: string): string {
  switch (code) {
    case 'permission-denied':
      return 'Không có quyền ghi — kiểm tra UID trong Firestore Rules (firebase-setup.md, Bước 5).';
    case 'unavailable':
      return 'Mạng đang chập chờn 📡 note sẽ tự gửi khi có sóng lại.';
    default:
      return code
        ? `Lưu chưa được (${code}) — thử lại nhé.`
        : 'Lưu chưa được, thử lại nhé.';
  }
}
