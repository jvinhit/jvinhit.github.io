/**
 * Session client dùng chung cho khu `/be-yeu-dotro/` (spec 009).
 *
 * Khu này có nhiều route con, mỗi route có script của layout (gate, header)
 * lẫn script của page (tính năng riêng). Cả hai cần cùng một SDK, cùng auth
 * state và cùng document settings → gom về một module: load SDK một lần,
 * đăng ký đúng MỘT `onAuthStateChanged` và MỘT `onSnapshot` settings, rồi
 * fan-out cho mọi listener. Vite dedupe module nên hai script trên cùng
 * trang dùng chung instance này (state nằm ở module scope).
 *
 * Không đọc/sửa phần tử DOM (riêng `startPresence` nghe sự kiện
 * visibilitychange/pagehide của trang). Firebase qua `love-firebase.ts` (cùng project,
 * cùng hai tài khoản với love board — quyết định đã chốt ở requirement).
 */
import { profileForUid, type LoveProfile } from '~/lib/love-config';
import {
  firebaseErrorCode,
  loadFirebase,
  type LoveFirebase,
  type User,
} from '~/lib/love-firebase';
import { writeErrorMessage } from '~/lib/love-board';
import {
  deviceLabel,
  HEARTBEAT_MS,
  vnTimestamp,
  type PresenceState,
} from '~/lib/pregnancy-presence';
import {
  settingsFromDoc,
  type PregnancySettings,
  type SettingsPayload,
} from '~/lib/pregnancy';

const SETTINGS_COLLECTION = 'pregnancySettings';
const SETTINGS_DOC = 'current';

export interface AuthState {
  user: User | null;
  /** Profile suy từ UID (spec 007); null = chưa login hoặc chưa gán tên. */
  me: LoveProfile | null;
}

export interface SessionContext {
  fb: LoveFirebase;
  user: User;
  me: LoveProfile;
}

type AuthListener = (state: AuthState) => void;
type SettingsListener = (
  settings: PregnancySettings | null,
  /** Câu lỗi tiếng Việt khi không đọc được document; '' khi ổn. */
  error: string
) => void;

/** Load SDK + khởi tạo app (memoized trong love-firebase, retry được khi fail). */
export function getFirebase(): Promise<LoveFirebase> {
  return loadFirebase();
}

// ---- auth fan-out ----------------------------------------------------------

const authListeners = new Set<AuthListener>();
/** null = Firebase chưa trả lời lần đầu. */
let authState: AuthState | null = null;
let authStarted = false;

function startAuth(fb: LoveFirebase): void {
  if (authStarted) return;
  authStarted = true;
  fb.authApi.onAuthStateChanged(fb.auth, (user) => {
    authState = { user, me: user ? profileForUid(user.uid) : null };
    // Settings chỉ đọc được khi đã login (rules) → bật/tắt theo auth tại đây
    // để page không phải tự lo thứ tự.
    if (user) startSettings(fb);
    else stopSettings();
    for (const listener of authListeners) listener(authState);
  });
}

/**
 * Nhận auth state hiện tại (nếu đã biết) và mọi thay đổi sau đó. Caller phải
 * đảm bảo `getFirebase()` đã resolve trước (layout làm việc này và tự hiện
 * lỗi khi SDK không tải được); page gọi sau layout nên luôn an toàn.
 */
export function onAuth(listener: AuthListener): () => void {
  authListeners.add(listener);
  if (authState) listener(authState);
  void getFirebase()
    .then(startAuth)
    .catch(() => {
      // Layout đã báo lỗi tải SDK trên gate; ở đây im lặng để không báo đôi.
    });
  return () => {
    authListeners.delete(listener);
  };
}

/**
 * Chạy `run` mỗi khi có phiên hợp lệ (đăng nhập VÀ đã gán profile), gọi hàm
 * cleanup nó trả về khi đăng xuất — page dùng để subscribe/unsubscribe
 * Firestore mà không tự theo dõi auth. Tài khoản login được nhưng chưa gán
 * tên thì không chạy (khóa ghi, giống love board AC-8 spec 007).
 */
export function whileSignedIn(
  run: (ctx: SessionContext) => (() => void) | void
): () => void {
  let cleanup: (() => void) | null = null;
  let activeUid: string | null = null;
  const stopAuth = onAuth(({ user, me }) => {
    const uid = user && me ? user.uid : null;
    if (uid === activeUid) return;
    cleanup?.();
    cleanup = null;
    activeUid = uid;
    if (user && me) {
      void getFirebase().then((fb) => {
        // Phiên đã đổi trong lúc chờ (hiếm) → bỏ qua lượt này.
        if (activeUid !== user.uid) return;
        cleanup = run({ fb, user, me }) ?? null;
      });
    }
  });
  return () => {
    stopAuth();
    cleanup?.();
    cleanup = null;
  };
}

// ---- settings fan-out ------------------------------------------------------

const settingsListeners = new Set<SettingsListener>();
/** null = chưa có snapshot nào (chưa login hoặc đang chờ). */
let settingsState: {
  settings: PregnancySettings | null;
  error: string;
} | null = null;
let settingsUnsub: (() => void) | null = null;

function emitSettings(): void {
  if (!settingsState) return;
  for (const listener of settingsListeners) {
    listener(settingsState.settings, settingsState.error);
  }
}

function startSettings(fb: LoveFirebase): void {
  if (settingsUnsub) return;
  settingsUnsub = fb.dbApi.onSnapshot(
    fb.dbApi.doc(fb.db, SETTINGS_COLLECTION, SETTINGS_DOC),
    (snap) => {
      settingsState = { settings: settingsFromDoc(snap.data()), error: '' };
      emitSettings();
    },
    (err) => {
      settingsState = {
        settings: null,
        error: readErrorMessage(firebaseErrorCode(err)),
      };
      emitSettings();
    }
  );
}

function stopSettings(): void {
  settingsUnsub?.();
  settingsUnsub = null;
  settingsState = null;
}

/** Nhận settings hiện tại (nếu đã có) và mọi thay đổi realtime sau đó. */
export function onSettings(listener: SettingsListener): () => void {
  settingsListeners.add(listener);
  if (settingsState) listener(settingsState.settings, settingsState.error);
  return () => {
    settingsListeners.delete(listener);
  };
}

/**
 * Ghi đè toàn bộ document settings (không merge): mọi field đều được viết
 * tường minh nên bỏ tên bé / bỏ ngày sinh là xóa thật, không sót giá trị cũ.
 * Field trống ghi '' / null theo quy ước parse của `settingsFromDoc`.
 */
export async function saveSettings(
  ctx: SessionContext,
  payload: SettingsPayload
): Promise<void> {
  const { fb, me } = ctx;
  await fb.dbApi.setDoc(
    fb.dbApi.doc(fb.db, SETTINGS_COLLECTION, SETTINGS_DOC),
    {
      dueDate: payload.dueDate,
      method: payload.method,
      lmpDate: payload.lmpDate ?? '',
      scanDate: payload.scanDate ?? '',
      scanWeeks: payload.scanWeeks ?? null,
      scanDays: payload.scanDays ?? null,
      testDate: payload.testDate ?? '',
      babyName: payload.babyName ?? '',
      birthDate: payload.birthDate ?? '',
      heightCm: payload.heightCm ?? null,
      preWeightKg: payload.preWeightKg ?? null,
      updatedAtMs: Date.now(),
      updatedBy: me.id,
    }
  );
}

// ---- collection realtime ---------------------------------------------------

/**
 * Subscribe một collection (sort theo `orderField` tăng dần), parse tolerant
 * từng document, bỏ document rác. Dùng cho lịch hẹn / ghi chú / checklist ở
 * cả page riêng lẫn dashboard, để không lặp lại cụm query + onSnapshot.
 * Trả hàm unsubscribe.
 */
export function watchCollection<T>(
  fb: LoveFirebase,
  path: string,
  orderField: string,
  parse: (id: string, data: Record<string, unknown>) => T | null,
  onData: (items: T[]) => void,
  onError: (message: string) => void
): () => void {
  return fb.dbApi.onSnapshot(
    fb.dbApi.query(
      fb.dbApi.collection(fb.db, path),
      fb.dbApi.orderBy(orderField, 'asc')
    ),
    (snap) => {
      const items: T[] = [];
      for (const docSnap of snap.docs) {
        const item = parse(docSnap.id, docSnap.data());
        if (item !== null) items.push(item);
      }
      onData(items);
    },
    (err) => onError(readErrorMessage(firebaseErrorCode(err)))
  );
}

// ---- ai đang xem / thiết bị nào ---------------------------------------------

const DEVICE_KEY = 'by-device-id';
let deviceIdCache: string | null = null;

/**
 * Id ngẫu nhiên cho máy này (nhớ trong localStorage) — để phân biệt hai
 * thiết bị của cùng một người và đánh dấu "máy này" trong Cài đặt. Không
 * suy ra được gì về người dùng. localStorage bị chặn → id theo phiên.
 */
export function getDeviceId(): string {
  if (deviceIdCache) return deviceIdCache;
  let id = '';
  try {
    id = localStorage.getItem(DEVICE_KEY) ?? '';
  } catch {
    // dùng id theo phiên bên dưới
  }
  if (!/^[a-z0-9]{8,16}$/.test(id)) {
    id = Math.random().toString(36).slice(2, 12).padEnd(10, '0');
    try {
      localStorage.setItem(DEVICE_KEY, id);
    } catch {
      // không nhớ được → mỗi phiên là một "thiết bị", chấp nhận
    }
  }
  deviceIdCache = id;
  return id;
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** Nhãn thiết bị của máy đang chạy. */
export function currentDeviceLabel(): string {
  return deviceLabel(
    navigator.userAgent,
    navigator.platform,
    navigator.maxTouchPoints,
    isStandalone()
  );
}

const ACCESS_LOGGED_KEY = 'by-access-logged';

/**
 * Ghi lại phiên hiện tại để chủ site xem trong Firebase console (trang KHÔNG
 * hiển thị): (1) một dòng lịch sử `pregnancyAccessLog` mỗi phiên tab
 * (sessionStorage chống ghi lặp khi chuyển trang trong khu), (2) heartbeat
 * `pregnancyPresence/<tên>__<deviceId>` mỗi phút khi tab hiện, 'away' khi
 * ẩn tab / đóng trang. Thời gian dùng serverTimestamp() — console hiện đúng
 * giờ, không phụ thuộc đồng hồ điện thoại.
 *
 * Mọi lỗi ghi được nuốt im lặng: đây là tính năng phụ, không được làm phiền
 * việc chính. Gặp `permission-denied` (rules chưa dán) thì dừng hẳn để khỏi
 * bắn lỗi mỗi phút. Trả hàm dừng.
 */
export function startPresence(ctx: SessionContext): () => void {
  const { fb, user, me } = ctx;
  const deviceId = getDeviceId();
  const device = currentDeviceLabel();
  const who = `${me.emoji} ${me.name}`;
  const ref = fb.dbApi.doc(
    fb.db,
    'pregnancyPresence',
    `${me.name}__${deviceId}`
  );
  let stopped = false;

  const onError = (err: unknown) => {
    if (firebaseErrorCode(err) === 'permission-denied') stop();
  };

  const write = (state: PresenceState) => {
    if (stopped) return;
    fb.dbApi
      .setDoc(ref, {
        who,
        uid: user.uid,
        deviceId,
        device,
        page: window.location.pathname,
        state,
        lastSeenAt: fb.dbApi.serverTimestamp(),
      })
      .catch(onError);
  };

  // Lịch sử: một dòng cho mỗi phiên tab của mỗi tài khoản.
  const loggedKey = `${ACCESS_LOGGED_KEY}:${user.uid}`;
  let alreadyLogged = false;
  try {
    alreadyLogged = sessionStorage.getItem(loggedKey) === '1';
  } catch {
    // sessionStorage bị chặn → ghi mỗi lần mở trang, chấp nhận
  }
  if (!alreadyLogged) {
    // ID đọc được ngay trong console và tự xếp theo thời gian.
    const logId = `${vnTimestamp(Date.now())} · ${me.name} · ${deviceId}`;
    fb.dbApi
      .setDoc(fb.dbApi.doc(fb.db, 'pregnancyAccessLog', logId), {
        who,
        uid: user.uid,
        deviceId,
        device,
        page: window.location.pathname,
        at: fb.dbApi.serverTimestamp(),
      })
      .then(() => {
        try {
          sessionStorage.setItem(loggedKey, '1');
        } catch {
          // như trên
        }
      })
      .catch(onError);
  }

  write(document.visibilityState === 'visible' ? 'online' : 'away');
  const timer = window.setInterval(() => {
    if (document.visibilityState === 'visible') write('online');
  }, HEARTBEAT_MS);
  const onVisibility = () =>
    write(document.visibilityState === 'visible' ? 'online' : 'away');
  // Chuyển trang TRONG khu (inline script trong layout đặt by-navigating):
  // trang mới sẽ ghi 'online' ngay, nên đừng ghi 'away' làm người kia thấy
  // chớp offline.
  const onPageHide = () => {
    if (!document.documentElement.classList.contains('by-navigating')) {
      write('away');
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  function stop(): void {
    if (stopped) return;
    stopped = true;
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', onPageHide);
  }

  // Gọi khi auth đã về null → lần ghi 'away' này thường bị rules từ chối
  // (đã mất quyền) và bị nuốt; trạng thái tự hết "online" sau
  // ONLINE_WINDOW_MS. Vẫn thử ghi cho trường hợp dừng vì lý do khác.
  return () => {
    write('away');
    stop();
  };
}

// ---- ghi khi mạng chậm -------------------------------------------------------

/**
 * Promise ghi của Firestore chỉ resolve khi SERVER xác nhận — mạng chậm thì
 * vài giây, mất mạng thì treo tới khi có sóng (SDK tự gửi lại). UI không nên
 * khóa nút lâu như vậy: chờ tối đa `slowMs`, quá thì trả 'queued' để page
 * nhả form và báo "đã lưu trên máy, sẽ tự gửi". Snapshot realtime đã hiện
 * bản ghi ngay nhờ latency compensation nên người dùng vẫn thấy kết quả.
 *
 * Lỗi về TRƯỚC hạn → throw như thường (page hiện lỗi, giữ chữ đang gõ).
 * Lỗi về SAU hạn (ví dụ rules từ chối) → gọi `onLateError` vì lúc đó form
 * đã nhả; Firestore tự rollback bản ghi khỏi snapshot.
 */
export async function awaitWrite(
  write: Promise<unknown>,
  onLateError: (message: string) => void,
  slowMs = 5000
): Promise<'done' | 'queued'> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let settled = false;
  const slow = new Promise<'queued'>((resolve) => {
    timer = setTimeout(() => resolve('queued'), slowMs);
  });
  const done = write.then(
    () => {
      settled = true;
      return 'done' as const;
    },
    (err: unknown) => {
      settled = true;
      throw err;
    }
  );
  try {
    const result = await Promise.race([done, slow]);
    if (result === 'queued' && !settled) {
      done.catch((err: unknown) =>
        onLateError(pregnancyWriteErrorMessage(firebaseErrorCode(err)))
      );
    }
    return result;
  } finally {
    clearTimeout(timer);
  }
}

/** Câu báo khi `awaitWrite` trả 'queued'. */
export const QUEUED_MESSAGE =
  'Mạng đang chậm 🐢 đã lưu trên máy, sẽ tự gửi khi kết nối ổn định.';

// ---- thông báo lỗi -----------------------------------------------------------

const RULES_HINT =
  'Firestore Rules chưa có collection pregnancy* — xem docs/specs/009-pregnancy-tracker/firebase-notes.md.';

/** Lỗi đọc Firestore (listener) thành câu tiếng Việt. */
export function readErrorMessage(code: string): string {
  if (code === 'permission-denied')
    return `Không đọc được dữ liệu — ${RULES_HINT}`;
  return `Không đọc được dữ liệu (${code || 'lỗi lạ'}) — thử tải lại trang nhé.`;
}

/** Lỗi ghi Firestore; chỉ khác love board ở câu permission-denied. */
export function pregnancyWriteErrorMessage(code: string): string {
  if (code === 'permission-denied') return `Không có quyền ghi — ${RULES_HINT}`;
  return writeErrorMessage(code);
}
