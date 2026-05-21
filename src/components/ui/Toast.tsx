import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Icons } from '../icons';

export function Toast() {
  const { state, dispatch } = useApp();
  const toast = state.toast;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3200);
    return () => clearTimeout(t);
  }, [toast?.id]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--ink)',
        color: '#fff',
        borderRadius: 'var(--r-pill)',
        padding: '11px 18px',
        fontSize: 14,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        zIndex: 9999,
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        maxWidth: 380,
        animation: 'slideUp 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <Icons.Check s={15} c="var(--good)" />
      {toast.message}
      <button
        onClick={() => dispatch({ type: 'CLEAR_TOAST' })}
        aria-label="Dismiss"
        style={{ color: 'rgba(255,255,255,0.5)', marginLeft: 4, padding: '0 2px', minHeight: 24, display: 'flex', alignItems: 'center' }}
      >
        <Icons.X s={13} c="rgba(255,255,255,0.5)" />
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
