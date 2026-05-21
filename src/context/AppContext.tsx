import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { Post, CapturedPhoto, CaptureBrief, Integration } from '../types';
import { posts as seedPosts, capturedPhotos as seedPhotos, captureBriefs as seedBriefs, integrations as seedIntegrations } from '../data';

// ── State shape ────────────────────────────────────────────────────
interface AppState {
  posts: Post[];
  photos: CapturedPhoto[];
  briefs: CaptureBrief[];
  bRollChecked: Record<string, boolean>;
  toast: { message: string; id: number } | null;
  integrations: Integration[];
}

// ── Actions ────────────────────────────────────────────────────────
type Action =
  | { type: 'APPROVE_POST';          postId: string }
  | { type: 'REJECT_POST';           postId: string }
  | { type: 'HANDOFF_CAPTURE';       briefId: string }
  | { type: 'SUBMIT_PHOTOS';         photos: CapturedPhoto[] }
  | { type: 'APPROVE_PHOTO';         photoId: string }
  | { type: 'ARCHIVE_PHOTO';         photoId: string }
  | { type: 'USE_PHOTO_IN_POST';     photoId: string; postId: string }
  | { type: 'TOGGLE_BROLL';          label: string }
  | { type: 'SHOW_TOAST';            message: string }
  | { type: 'CLEAR_TOAST' }
  | { type: 'CONNECT_INTEGRATION';    integrationId: string }
  | { type: 'DISCONNECT_INTEGRATION'; integrationId: string };

let toastSeq = 0;

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {

    case 'APPROVE_POST':
      return {
        ...state,
        posts: state.posts.map(p =>
          p.id === action.postId
            ? { ...p, state: p.state === 'draft' ? 'scheduled' : p.state === 'review' ? 'scheduled' : p.state }
            : p
        ),
        toast: { message: 'Post approved — scheduled. ✓', id: ++toastSeq },
      };

    case 'REJECT_POST':
      return {
        ...state,
        posts: state.posts.map(p =>
          p.id === action.postId ? { ...p, state: 'in-design' as const } : p
        ),
        toast: { message: 'Sent back for edits.', id: ++toastSeq },
      };

    case 'HANDOFF_CAPTURE':
      return {
        ...state,
        briefs: state.briefs.map(b =>
          b.id === action.briefId
            ? { ...b, owner: 'crew' as const, status: 'reassigned' as const }
            : b
        ),
        toast: { message: 'Handed off to Atomic crew — they\'ve got it.', id: ++toastSeq },
      };

    case 'SUBMIT_PHOTOS': {
      const newPhotos = action.photos.map(p => ({ ...p, status: 'submitted' as const }));
      return {
        ...state,
        photos: [...newPhotos, ...state.photos],
        briefs: state.briefs.map(b =>
          b.id === action.photos[0]?.briefId ? { ...b, status: 'submitted' as const } : b
        ),
        toast: { message: `${newPhotos.length} photos submitted — Sarah is reviewing.`, id: ++toastSeq },
      };
    }

    case 'APPROVE_PHOTO':
      return {
        ...state,
        photos: state.photos.map(p =>
          p.id === action.photoId ? { ...p, status: 'approved' as const, reviewedBy: 'sarah' } : p
        ),
        toast: { message: 'Photo approved and ready to use.', id: ++toastSeq },
      };

    case 'ARCHIVE_PHOTO':
      return {
        ...state,
        photos: state.photos.map(p =>
          p.id === action.photoId ? { ...p, status: 'archived' as const } : p
        ),
        toast: { message: 'Photo archived.', id: ++toastSeq },
      };

    case 'USE_PHOTO_IN_POST':
      return {
        ...state,
        photos: state.photos.map(p =>
          p.id === action.photoId
            ? { ...p, status: 'in-use' as const, usedInPostId: action.postId }
            : p
        ),
        toast: { message: 'Photo linked to post.', id: ++toastSeq },
      };

    case 'TOGGLE_BROLL':
      return {
        ...state,
        bRollChecked: {
          ...state.bRollChecked,
          [action.label]: !state.bRollChecked[action.label],
        },
      };

    case 'SHOW_TOAST':
      return { ...state, toast: { message: action.message, id: ++toastSeq } };

    case 'CLEAR_TOAST':
      return { ...state, toast: null };

    case 'CONNECT_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map(i =>
          i.id === action.integrationId
            ? { ...i, status: 'connected' as const, lastSyncedAt: new Date().toISOString() }
            : i
        ),
        toast: { message: "Connected! We're pulling your data now.", id: ++toastSeq },
      };

    case 'DISCONNECT_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map(i =>
          i.id === action.integrationId
            ? { ...i, status: 'disconnected' as const, accountName: undefined, lastSyncedAt: undefined }
            : i
        ),
        toast: { message: 'Disconnected.', id: ++toastSeq },
      };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<Action>;
  approvePost:           (postId: string) => void;
  rejectPost:            (postId: string) => void;
  handoffCapture:        (briefId: string) => void;
  submitPhotos:          (photos: CapturedPhoto[]) => void;
  approvePhoto:          (photoId: string) => void;
  archivePhoto:          (photoId: string) => void;
  toggleBRoll:           (label: string) => void;
  connectIntegration:    (id: string) => void;
  disconnectIntegration: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// Pre-seed some b-roll as checked
const seedBRoll: Record<string, boolean> = {
  'Any tools laid out before a job': true,
  'Freshly edged lawn line — straight and clean': true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    posts:         seedPosts,
    photos:        seedPhotos,
    briefs:        seedBriefs,
    bRollChecked:  seedBRoll,
    toast:         null,
    integrations:  seedIntegrations,
  });

  const value: AppContextValue = {
    state,
    dispatch,
    approvePost:           (id)     => dispatch({ type: 'APPROVE_POST',          postId: id }),
    rejectPost:            (id)     => dispatch({ type: 'REJECT_POST',           postId: id }),
    handoffCapture:        (id)     => dispatch({ type: 'HANDOFF_CAPTURE',       briefId: id }),
    submitPhotos:          (photos) => dispatch({ type: 'SUBMIT_PHOTOS',         photos }),
    approvePhoto:          (id)     => dispatch({ type: 'APPROVE_PHOTO',         photoId: id }),
    archivePhoto:          (id)     => dispatch({ type: 'ARCHIVE_PHOTO',         photoId: id }),
    toggleBRoll:           (label)  => dispatch({ type: 'TOGGLE_BROLL',          label }),
    connectIntegration:    (id)     => dispatch({ type: 'CONNECT_INTEGRATION',    integrationId: id }),
    disconnectIntegration: (id)     => dispatch({ type: 'DISCONNECT_INTEGRATION', integrationId: id }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
