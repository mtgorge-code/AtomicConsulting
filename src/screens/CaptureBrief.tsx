import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneShell } from '../components/layout/PhoneShell';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import { Button } from '../components/ui/Button';
import { OwnerChip } from '../components/ui/OwnerChip';
import { Icons } from '../components/icons';
import { captureBriefs } from '../data';

const brief = captureBriefs[0];

export function CaptureBrief() {
  const navigate = useNavigate();
  const [activeShot, setActiveShot] = useState(0);
  const [handedOff, setHandedOff] = useState(false);

  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Top bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 12px 12px 6px',
        gap: 4,
        borderBottom: '1px solid var(--hairline)',
        background: 'var(--paper)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Link to="/" style={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--r-pill)',
          flexShrink: 0,
        }} aria-label="Back to today">
          <Icons.ChevronLeft s={22} c="var(--ink)" />
        </Link>
        <Eyebrow color="var(--ink3)">Capture brief</Eyebrow>
      </header>

      <main id="main" style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        {/* Context strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 22px',
          background: 'var(--accentSoft)',
          borderBottom: '1px solid var(--hairline)',
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent)',
            flexShrink: 0,
          }} aria-hidden="true" />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accentInk)', flex: 1 }}>
            Riverside Ave · stone wall, day 2
          </span>
          <Pill tone="accent" size="sm">Wed reel</Pill>
        </div>

        <div style={{ padding: '20px 22px' }}>
          {/* Ownership row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}>
            {handedOff
              ? <OwnerChip owner="crew" label="Handed to Atomic" size="md" />
              : <OwnerChip owner="you" label="You've got this one" size="md" />
            }
            {!handedOff && (
              <button
                onClick={() => setHandedOff(true)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'var(--accentInk)',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textUnderlineOffset: 2,
                  minHeight: 44,
                  padding: '0 4px',
                }}
                aria-label="Hand this capture to Atomic"
              >
                Hand to Atomic →
              </button>
            )}
          </div>

          {/* The shot */}
          <Eyebrow style={{ marginBottom: 8 }}>The shot</Eyebrow>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>
            "Stand 8 feet back. Capture the whole wall against the lawn."
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 20, lineHeight: 1.5 }}>
            Daylight, no people in frame. Hold steady for 2 seconds.
          </p>

          {/* Shot list */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', flex: 1 }}>Shot list</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>~30 sec total</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {brief.shots.map((shot, i) => {
              const isActive = activeShot === i;
              return (
                <button
                  key={shot.id}
                  onClick={() => setActiveShot(i)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: isActive ? 'var(--card)' : 'var(--paper2)',
                    border: isActive ? '2px solid var(--accent)' : '1px solid var(--hairline)',
                    borderRadius: 12,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    minHeight: 44,
                  }}
                  aria-pressed={isActive}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: `2px solid ${isActive ? 'var(--accent)' : 'var(--ink5)'}`,
                      background: isActive ? 'var(--accent)' : 'transparent',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }} aria-hidden="true">
                      {isActive && (
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: isActive ? 'var(--ink)' : 'var(--ink2)',
                        marginBottom: 2,
                      }}>
                        {shot.label}
                      </p>
                      <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.4 }}>
                        {shot.description}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--ink4)',
                      flexShrink: 0,
                    }}>
                      {shot.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Why-this-shot card */}
          <Card style={{ background: 'var(--accentSoft)', border: 'none', marginBottom: 22 }}>
            <Eyebrow color="var(--accentInk)" style={{ marginBottom: 6 }}>Why this shot</Eyebrow>
            <p style={{ fontSize: 14, color: 'var(--accentInk)', lineHeight: 1.5 }}>
              Feeds Wednesday's reel on "Show the craft." We've got 2 hardscape posts ready to feed — this one shot covers both.
            </p>
          </Card>
        </div>
      </main>

      {/* Sticky CTA */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: 'var(--paper)',
        borderTop: '1px solid var(--hairline)',
        padding: '14px 22px 22px',
      }}>
        <Button
          kind="accent"
          size="lg"
          style={{ width: '100%', marginBottom: 8 }}
          onClick={() => navigate('/shoot')}
        >
          <Icons.Camera s={18} c="#fff" />
          Start capture
        </Button>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--ink4)',
          textAlign: 'center',
          letterSpacing: '0.03em',
        }}>
          No pressure — we'll catch it on Thursday's shoot day if not.
        </p>
      </div>
    </PhoneShell>
  );
}
