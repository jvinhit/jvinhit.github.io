/**
 * Logic thuần cho việc GHI LẠI "ai đang xem / lịch sử mở trang" của khu
 * /be-yeu-dotro/ (spec 009). Trang KHÔNG hiển thị dữ liệu này — chủ site
 * xem trong Firebase console (Firestore → Data). Vì vậy ID document được
 * đặt cho người đọc trong console: có giờ Việt Nam + tên người.
 *
 * - `pregnancyPresence/<tên>__<deviceId>`: một document cho mỗi thiết bị,
 *   ghi đè mỗi phút khi tab đang hiện (`state: online`), `away` khi ẩn/đóng.
 * - `pregnancyAccessLog/<giờ VN> · <tên> · <deviceId>`: một dòng cho mỗi
 *   phiên tab mở trang.
 */

/** Ghi "vẫn đang xem" mỗi phút khi tab đang hiện. */
export const HEARTBEAT_MS = 60_000;

export type PresenceState = 'online' | 'away';

/** '2026-10-15 16:12:03' theo giờ Việt Nam — dùng làm đầu ID document. */
export function vnTimestamp(ms: number): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(ms));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

/**
 * Nhãn thiết bị từ userAgent: "<máy> · <trình duyệt>", thêm "(màn hình
 * chính)" khi chạy như app đã cài. Đủ để nhận ra "máy lạ", không cố chính
 * xác tuyệt đối (userAgent có thể bị giả).
 */
export function deviceLabel(
  ua: string,
  platform: string,
  maxTouchPoints: number,
  standalone: boolean
): string {
  const android = /Android/i.test(ua);
  let device = 'Máy tính';
  if (/iPhone|iPod/.test(ua)) device = 'iPhone';
  else if (
    /iPad/.test(ua) ||
    (!android && platform === 'MacIntel' && maxTouchPoints > 1)
  )
    device = 'iPad';
  else if (android)
    device = /Mobile/i.test(ua) ? 'Android' : 'Máy tính bảng Android';
  else if (/Macintosh|Mac OS X/.test(ua)) device = 'Mac';
  else if (/Windows/.test(ua)) device = 'Windows';
  else if (/Linux/.test(ua)) device = 'Linux';

  let browser = 'trình duyệt';
  if (/Zalo/i.test(ua)) browser = 'Zalo';
  else if (/FBAN|FBAV|FB_IAB/.test(ua)) browser = 'Facebook';
  else if (/Instagram/.test(ua)) browser = 'Instagram';
  else if (/EdgiOS|EdgA|Edg\//.test(ua)) browser = 'Edge';
  else if (/SamsungBrowser/.test(ua)) browser = 'Samsung Internet';
  else if (/FxiOS|Firefox\//.test(ua)) browser = 'Firefox';
  else if (/CriOS|Chrome\//.test(ua)) browser = 'Chrome';
  else if (/Safari\//.test(ua)) browser = 'Safari';

  return standalone
    ? `${device} · ${browser} (màn hình chính)`
    : `${device} · ${browser}`;
}
