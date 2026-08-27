/**
 * Cấu hình cá nhân cho Love Board (/love-story-dotro/).
 *
 * Đây là FILE DUY NHẤT cần điền tay — làm theo hướng dẫn từng bước trong
 * docs/specs/005-daily-love-board/firebase-setup.md (Bước 7).
 *
 * Mọi giá trị ở đây là PUBLIC trên repo. An toàn vì: apiKey Firebase không
 * phải secret (chỉ là identifier trỏ tới project), dữ liệu được bảo vệ bằng
 * Firestore security rules khóa theo UID. Mật mã (password của tài khoản
 * chung) KHÔNG BAO GIỜ được đặt vào đây hay bất kỳ đâu trong repo.
 */

export interface LoveFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  /** Console có thể đưa thêm field khác (storageBucket…) — dán thêm vô hại. */
  [extra: string]: string;
}

export interface LoveProfile {
  /** Khóa lưu trong document Firestore — đừng đổi sau khi đã có note. */
  id: 'p1' | 'p2';
  /** Tên hiển thị trên note. */
  name: string;
  /** Avatar emoji. */
  emoji: string;
}

const PLACEHOLDER = 'PASTE_ME';

export const LOVE_CONFIG = {
  /** Web config copy từ Firebase console (firebase-setup.md, Bước 6). */
  firebase: {
    apiKey: 'AIzaSyDej2pxU1-e2pUv1fDNajAM3a6Lz72CVhU',
    authDomain: 'love-story-dotro.firebaseapp.com',
    projectId: 'love-story-dotro',
    storageBucket: 'love-story-dotro.firebasestorage.app',
    messagingSenderId: '552174305863',
    appId: '1:552174305863:web:f79bc1dc520ec75c87a762',
  } satisfies LoveFirebaseConfig,

  // Email đăng nhập KHÔNG để ở đây (tránh lộ email thật trên repo public):
  // nhập trên form login, được nhớ theo máy qua localStorage.

  /** Ngày bắt đầu yêu (YYYY-MM-DD) — mốc cho bộ đếm "bên nhau X ngày". */
  anniversary: '2026-08-16',

  /** Hai đứa. Phần tử đầu là người hay dùng máy này (mặc định của picker). */
  profiles: [
    { id: 'p1', name: 'Oán Oán Cô Nương', emoji: '🐻' },
    { id: 'p2', name: 'Đồ Tró', emoji: '🐰' },
  ] as [LoveProfile, LoveProfile],
};

/**
 * Trang hiện màn hình "chưa setup" (thay vì lỗi khó hiểu) khi config còn
 * placeholder — xem edge case trong requirement của spec 005.
 */
export function isLoveConfigured(): boolean {
  const { firebase } = LOVE_CONFIG;
  return (
    firebase.apiKey !== PLACEHOLDER &&
    firebase.authDomain !== PLACEHOLDER &&
    firebase.projectId !== PLACEHOLDER &&
    firebase.appId !== PLACEHOLDER
  );
}
