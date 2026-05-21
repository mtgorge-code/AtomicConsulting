import { Link } from 'react-router-dom';
import { PhoneShell } from '../components/layout/PhoneShell';
import { AtomicWordmark } from '../components/ui/AtomicMark';
import { Card } from '../components/ui/Card';
import { Eyebrow } from '../components/ui/Eyebrow';
import { OwnerChip } from '../components/ui/OwnerChip';
import { Icons } from '../components/icons';

const timeline = [
  {
    done: true,
    label: 'Sent 3 photos from Riverside Ave',
    owner: 'you' as const,
    ownerLabel: 'You',
    time: 'Just now',
  },
  {
    done: true,
    label: 'AI drafts caption & picks the hero shot',
    owner: 'atomic' as const,
    ownerLabel: 'Atomic',
    time: 'Today',
  },
  {
    done: false,
    label: 'Final edit, color, copy polish',
    owner: 'sarah' as const,
    ownerLabel: 'Sarah · designer',
    time: 'Tonight',
  },
  {
    done: false,
    label: 'Quick approval — one tap',
    owner: 'you' as const,
    ownerLabel: 'You',
    time: 'Wed 7am',
  },
];

export function Handoff() {
  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Tiny top bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 22px',
        borderBottom: '1px solid var(--hairline)',
      }}>
        <AtomicWordmark size="sm" />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--ink4)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          11:04 · Wrap-up
        </span>
      </header>

      <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '40px 22px 32px' }}>
        {/* Check disc */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--goodSoft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--good)',
          }} aria-hidden="true">
            <Icons.Check s={24} c="var(--good)" />
          </div>
        </div>

        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          textAlign: 'center',
          color: 'var(--ink)',
          marginBottom: 14,
          lineHeight: 1.2,
        }}>
          Got it.<br />We're on it.
        </h1>

        <p style={{
          fontSize: 15.5,
          color: 'var(--ink2)',
          textAlign: 'center',
          lineHeight: 1.55,
          marginBottom: 32,
        }}>
          3 shots in. Sarah on our team is reviewing now — you'll see the drafted post tomorrow morning before it goes live.
        </p>

        {/* Timeline */}
        <section aria-label="What happens next" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink3)', marginBottom: 14, letterSpacing: '0.01em' }}>
            What happens next
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 12,
                padding: '12px 0',
                borderBottom: i < timeline.length - 1 ? '1px solid var(--hairline)' : 'none',
                opacity: item.done ? 0.65 : 1,
              }}>
                {/* Status dot */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: item.done ? 'var(--goodSoft)' : 'var(--paper3)',
                  border: `1px solid ${item.done ? 'var(--good)' : 'var(--hairline)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }} aria-hidden="true">
                  {item.done && <Icons.Check s={10} c="var(--good)" />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    marginBottom: 4,
                    textDecoration: item.done ? 'line-through' : 'none',
                    textDecorationColor: 'var(--ink3)',
                  }}>
                    {item.label}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <OwnerChip owner={item.owner} label={item.ownerLabel} size="sm" />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--ink4)',
                    }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next-capture nudge */}
        <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <Eyebrow color="var(--accentInk)" style={{ marginBottom: 6 }}>Next · We've got it</Eyebrow>
              <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--accentInk)', marginBottom: 2 }}>
                3pm · Maple Ridge
              </p>
              <p style={{ fontSize: 13, color: 'var(--accentInk)', opacity: 0.8 }}>
                Our crew is on it
              </p>
            </div>
            <button
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}
              aria-label="View next capture details"
            >
              <Icons.ArrowRight s={16} c="#fff" />
            </button>
          </div>
        </Card>

        {/* Home link */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--ink4)',
            letterSpacing: '0.04em',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}>
            ← Back to today
          </Link>
        </div>
      </main>
    </PhoneShell>
  );
}
