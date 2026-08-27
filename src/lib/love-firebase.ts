/**
 * Firebase cho Love Board — load SDK modular từ gstatic CDN ở runtime.
 *
 * Cố ý KHÔNG cài npm package `firebase` (working agreement: không thêm
 * dependency; AC-11 của spec 005): chỉ trang /love-story-dotro/ cần SDK,
 * các trang khác của site không tải thêm byte nào.
 *
 * `@vite-ignore` bảo Vite đừng resolve URL ngoài lúc bundle — câu import
 * được giữ nguyên và chạy thật trong trình duyệt. Version pin cứng; URL phải
 * khớp TỪNG KÝ TỰ với khai báo module trong src/types/firebase-cdn.d.ts để
 * TS map được type.
 */
import { LOVE_CONFIG } from '~/lib/love-config';

export type {
  Auth,
  User,
} from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js';
export type {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
} from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js';

type AuthApi =
  typeof import('https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js');
type FirestoreApi =
  typeof import('https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js');

export interface LoveFirebase {
  auth: import('https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js').Auth;
  db: import('https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js').Firestore;
  /** Namespace các hàm SDK — consumer gọi authApi.signInWithEmailAndPassword… */
  authApi: AuthApi;
  dbApi: FirestoreApi;
}

let loading: Promise<LoveFirebase> | null = null;

/**
 * Load SDK (một lần, memoized) và khởi tạo app từ LOVE_CONFIG.
 * Load fail (mất mạng lúc mở trang) thì xả cache để lần submit sau retry
 * được — không giam người dùng trong một promise đã rejected.
 */
export function loadFirebase(): Promise<LoveFirebase> {
  loading ??= (async () => {
    const [appApi, authApi, dbApi] = await Promise.all([
      import(
        /* @vite-ignore */
        'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js'
      ),
      import(
        /* @vite-ignore */
        'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js'
      ),
      import(
        /* @vite-ignore */
        'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js'
      ),
    ]);
    const app = appApi.initializeApp(LOVE_CONFIG.firebase);
    return {
      auth: authApi.getAuth(app),
      db: dbApi.getFirestore(app),
      authApi,
      dbApi,
    };
  })().catch((err: unknown) => {
    loading = null;
    throw err;
  });
  return loading;
}

/**
 * Rút `code` ('auth/invalid-credential', 'permission-denied'…) từ lỗi
 * Firebase mà không cần import class FirebaseError của SDK.
 */
export function firebaseErrorCode(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const code = (err as { code: unknown }).code;
    if (typeof code === 'string') return code;
  }
  return '';
}
