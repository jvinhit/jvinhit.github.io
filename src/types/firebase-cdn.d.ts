/**
 * Type declarations tối thiểu cho Firebase SDK load qua gstatic CDN.
 *
 * Repo cố ý không cài npm package `firebase` (xem src/lib/love-firebase.ts),
 * nên tự khai đúng phần API mà Love Board dùng — không hơn. URL module phải
 * khớp TỪNG KÝ TỰ với chuỗi import trong love-firebase.ts: TS map type theo
 * literal string, lệch một ký tự là mất type (về `any` ngầm → check fail).
 *
 * Nâng version SDK = đổi version trong URL ở cả file này lẫn love-firebase.ts.
 */

declare module 'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js' {
  export interface FirebaseApp {
    readonly name: string;
  }

  export function initializeApp(options: Record<string, string>): FirebaseApp;
}

declare module 'https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js' {
  import type { FirebaseApp } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js';

  export interface User {
    readonly uid: string;
    readonly email: string | null;
  }

  export interface Auth {
    readonly currentUser: User | null;
  }

  export interface UserCredential {
    readonly user: User;
  }

  export function getAuth(app: FirebaseApp): Auth;
  export function signInWithEmailAndPassword(
    auth: Auth,
    email: string,
    password: string
  ): Promise<UserCredential>;
  /** Trả về hàm unsubscribe. */
  export function onAuthStateChanged(
    auth: Auth,
    next: (user: User | null) => void
  ): () => void;
  export function signOut(auth: Auth): Promise<void>;
}

declare module 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js' {
  import type { FirebaseApp } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js';

  export interface DocumentData {
    [field: string]: unknown;
  }

  /** Opaque handles — Love Board không đọc field nào bên trong. */
  export interface Firestore {
    readonly app: FirebaseApp;
  }

  export interface CollectionReference {
    readonly id: string;
    readonly path: string;
  }

  export interface DocumentReference {
    readonly id: string;
    readonly path: string;
  }

  export interface Query {
    readonly firestore: Firestore;
  }

  export interface QueryConstraint {
    readonly type: string;
  }

  export interface Timestamp {
    toDate(): Date;
    toMillis(): number;
  }

  export interface QueryDocumentSnapshot {
    readonly id: string;
    data(): DocumentData;
  }

  export interface QuerySnapshot {
    readonly docs: QueryDocumentSnapshot[];
    readonly empty: boolean;
  }

  export function getFirestore(app: FirebaseApp): Firestore;
  export function collection(db: Firestore, path: string): CollectionReference;
  export function doc(
    db: Firestore,
    path: string,
    id: string
  ): DocumentReference;
  export function addDoc(
    ref: CollectionReference,
    data: DocumentData
  ): Promise<DocumentReference>;
  export function updateDoc(
    ref: DocumentReference,
    data: DocumentData
  ): Promise<void>;
  export function deleteDoc(ref: DocumentReference): Promise<void>;
  export function query(
    ref: CollectionReference,
    ...constraints: QueryConstraint[]
  ): Query;
  export function orderBy(
    field: string,
    direction?: 'asc' | 'desc'
  ): QueryConstraint;
  /** Trả về hàm unsubscribe. */
  export function onSnapshot(
    q: Query | CollectionReference,
    next: (snapshot: QuerySnapshot) => void,
    error?: (err: Error) => void
  ): () => void;
  export function serverTimestamp(): unknown;
}
