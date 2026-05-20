import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SR } from '../components/ui/SR';
import { Icons } from '../components/icons';
import { captureBriefs } from '../data';

const brief = captureBriefs[0];

const coachPrompts = [
  "Back up 2 steps. Get the lawn line into frame.",
  "Steady — hold for 2 full seconds before moving.",
  "Great angle. Make sure the whole wall top is visible.",
];

export function Shoot() {
  const navigate = useNavigate();
  const [activeShot, setActiveShot] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState<boolean[]>(new Array(brief.shots.length).fill(false));
  const [coachIdx, setCoachIdx] = useState(0);
  const [flash, setFlash] = useState(false);

  const shot = brief.shots[activeShot];
  const shotNum = activeShot + 1;
  const totalShots = brief.shots.length;

  const handleShutter = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
    const next = capturedFrames.map((f, i) => i === activeShot ? true : f);
    setCapturedFrames(next);
    setCoachIdx((c) => (c + 1) % coachPrompts.length);
    if (activeShot < totalShots - 1) {
      setTimeout(() => setActiveShot(activeShot + 1), 300);
    } else if (next.every(Boolean)) {
      setTimeout(() => navigate('/handoff'), 400);
    }
  };

  const handleSkip = () => {
    if (activeShot < totalShots - 1) {
      setActiveShot(activeShot + 1);
    } else {
      navigate('/handoff');
    }
  };

  return (
    <div style={{
      maxWidth: 390,
      margin: '0 auto',
      height: '100dvh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <SR>
        <h1>Camera — shot {shotNum} of {totalShots}: {shot.label}</h1>
      </SR>

      {/* Simulated viewfinder */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, oklch(0.15 0.01 150) 0%, oklch(0.10 0.005 140) 100%)',
      }} aria-hidden="true" />

      {/* Flash overlay */}
      {flash && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          opacity: 0.7,
          zIndex: 50,
          pointerEvents: 'none',
        }} aria-hidden="true" />
      )}

      {/* Dashed frame + corner brackets */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        right: '8%',
        bottom: '22%',
        border: '1px dashed rgba(255,255,255,0.3)',
        borderRadius: 4,
        pointerEvents: 'none',
      }} aria-hidden="true">
        {[
          { top: -2, left: -2, borderTop: '3px solid #fff', borderLeft: '3px solid #fff' },
          { top: -2, right: -2, borderTop: '3px solid #fff', borderRight: '3px solid #fff' },
          { bottom: -2, left: -2, borderBottom: '3px solid #fff', borderLeft: '3px solid #fff' },
          { bottom: -2, right: -2, borderBottom: '3px solid #fff', borderRight: '3px solid #fff' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 18,
            height: 18,
            ...s,
          }} />
        ))}
      </div>

      {/* Top glass pill */}
      <div style={{ position: 'absolute', top: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--r-pill)',
          padding: '8px 14px',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <span style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }}>
            {String(shotNum).padStart(2, '0')}
          </span>
          <span style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            {shot.label.replace(/^\d+ · /, '')}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
          }}>
            {shotNum} of {totalShots}
          </span>
        </div>
      </div>

      {/* Coach prompt */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: 22,
          right: 22,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: 14,
          padding: '12px 16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 4,
        }}>
          Try this
        </p>
        <p style={{ fontSize: 14.5, color: '#fff', fontWeight: 500, lineHeight: 1.4 }}>
          {coachPrompts[coachIdx]}
        </p>
      </div>

      {/* Shutter row */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        padding: '0 22px 16px',
      }}>
        {/* Prev thumb placeholder */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} aria-hidden="true">
          {capturedFrames[activeShot - 1] && (
            <Icons.Check s={16} c="rgba(255,255,255,0.7)" />
          )}
        </div>

        {/* Shutter */}
        <button
          onClick={handleShutter}
          aria-label={`Capture shot ${shotNum}: ${shot.label}`}
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#fff',
            border: '4px solid rgba(255,255,255,0.5)',
            outline: 'none',
            flexShrink: 0,
            boxShadow: '0 0 0 6px rgba(255,255,255,0.15)',
          }}
        />

        {/* Skip */}
        <button
          onClick={handleSkip}
          aria-label="Skip this shot"
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--r-pill)',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          SKIP
        </button>
      </div>

      {/* Shot pips */}
      <div style={{
        position: 'absolute',
        bottom: '21%',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        paddingBottom: 8,
      }} aria-hidden="true">
        {brief.shots.map((_, i) => (
          <div key={i} style={{
            height: 3,
            width: i === activeShot ? 24 : 8,
            borderRadius: 2,
            background: i === activeShot
              ? 'var(--accent)'
              : capturedFrames[i]
              ? 'rgba(255,255,255,0.6)'
              : 'rgba(255,255,255,0.25)',
            transition: 'width 0.2s, background 0.2s',
          }} />
        ))}
      </div>
    </div>
  );
}
