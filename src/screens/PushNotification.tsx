import { Link } from 'react-router-dom';
import { AtomicMark } from '../components/ui/AtomicMark';
import { SR } from '../components/ui/SR';

export function PushNotification() {
  return (
    <div
      role="alert"
      style={{
        maxWidth: 390,
        margin: '0 auto',
        minHeight: '100dvh',
        background: 'linear-gradient(160deg, oklch(0.18 0.015 260) 0%, oklch(0.12 0.01 250) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '60px 22px 30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SR>Lock screen notification</SR>

      {/* Background blur circles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Time */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          fontSize: 86,
          fontWeight: 200,
          color: '#fff',
          lineHeight: 0.95,
          letterSpacing: '-2px',
          fontFamily: 'var(--font-sans)',
        }}>
          10:58
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 14,
          color: 'rgba(255,255,255,0.7)',
          marginTop: 8,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Tuesday, May 21
        </div>
      </div>

      {/* Glass notification card */}
      <div style={{
        width: '100%',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.18)',
        padding: '14px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
        {/* App row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--accentSoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <AtomicMark size={16} color="var(--accent)" />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flex: 1,
          }}>
            ATOMIC
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
          }}>
            now
          </span>
        </div>

        {/* Title */}
        <p style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 5,
          lineHeight: 1.25,
        }}>
          Heading to Riverside · in 2 min
        </p>

        {/* Body */}
        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.45,
          marginBottom: 12,
        }}>
          When you wrap, snap the finished wall — wide. 10 seconds. We'll take it from there.
        </p>

        {/* Footer actions */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span>Hold for shot list</span>
          <Link to="/capture" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Slide to capture →
          </Link>
        </div>
      </div>

      {/* Nav hint */}
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.04em',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}>
          ← Back to today
        </Link>
      </div>
    </div>
  );
}
