import { PhoneShell } from '../components/layout/PhoneShell';
import { PhoneHeader } from '../components/layout/PhoneHeader';
import { PhoneTabBar } from '../components/layout/PhoneTabBar';
import { Card } from '../components/ui/Card';
import { Eyebrow } from '../components/ui/Eyebrow';
import { OwnerChip } from '../components/ui/OwnerChip';
import { SR } from '../components/ui/SR';
import { strategy } from '../data';

const weekAsksYou = [
  { eyebrow: 'Capture · 10 sec', title: 'Snap the finished wall — wide, Riverside Ave' },
  { eyebrow: 'Say yes or no', title: 'LinkedIn draft ready · "Why we dry-fit before mortaring"' },
];

const weekAtomic = [
  { label: 'Design post: behind the scenes — how we prep', owner: 'sarah' as const },
  { label: 'Caption + hero pick for Riverside reel', owner: 'atomic' as const },
  { label: 'Schedule GBP spring post for Friday', owner: 'atomic' as const },
  { label: 'Shoot Maple Ridge mulch install (crew)', owner: 'crew' as const },
  { label: 'Edit + color the stone wall reel', owner: 'sarah' as const },
];

const bRoll = [
  'Hands setting a capstone — extreme close-up',
  'Any tools laid out before a job',
  'The crew truck arriving at a site',
  'Freshly edged lawn line — straight and clean',
];

export function Strategy() {
  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>
      <PhoneHeader />

      <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 32px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Strategy</h1>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>
          {strategy.goal}
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink2)', marginBottom: 24, lineHeight: 1.5 }}>
          {strategy.lead}
        </p>

        {/* Pillar mix card */}
        <section aria-label="Content pillar mix" style={{ marginBottom: 24 }}>
          <Card>
            <Eyebrow style={{ marginBottom: 10 }}>Pillar mix</Eyebrow>

            {/* Stacked bar */}
            <div style={{
              height: 10,
              borderRadius: 'var(--r-pill)',
              overflow: 'hidden',
              display: 'flex',
              marginBottom: 16,
            }} role="img" aria-label="Pillar distribution: Show the craft 40%, Behind the scenes 25%, Expertise 20%, Local presence 15%">
              {strategy.pillars.map((p) => (
                <div key={p.name} style={{
                  width: `${p.pct}%`,
                  background: p.color,
                  height: '100%',
                }} aria-hidden="true" />
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {strategy.pillars.map((p) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: p.color,
                    flexShrink: 0,
                  }} aria-hidden="true" />
                  <span style={{ fontSize: 14, color: 'var(--ink)', flex: 1 }}>{p.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--ink3)',
                  }}>
                    {p.done}/{p.total}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--ink4)',
                    width: 36,
                    textAlign: 'right',
                  }}>
                    {p.pct}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <button style={{
            marginTop: 10,
            fontSize: 13.5,
            color: 'var(--accentInk)',
            fontWeight: 600,
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
          }}>
            Open the full strategy doc →
          </button>
        </section>

        {/* This week — your bit */}
        <section aria-label="This week — your tasks" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10 }}>
            This week — your bit
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {weekAsksYou.map((item, i) => (
              <Card key={i} pad={14} style={{ borderLeft: '3px solid var(--ink)', borderRadius: '0 14px 14px 0' }}>
                <Eyebrow color="var(--accentInk)" style={{ marginBottom: 6 }}>{item.eyebrow}</Eyebrow>
                <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {item.title}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* This week — we've got */}
        <section aria-label="This week — Atomic's tasks" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10 }}>
            This week — we've got
          </h3>
          <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {weekAtomic.map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '11px 0',
                  borderBottom: i < weekAtomic.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                }}>
                  <span style={{ flex: 1, fontSize: 13.5, color: 'var(--accentInk)', lineHeight: 1.35 }}>
                    {item.label}
                  </span>
                  <OwnerChip owner={item.owner} size="sm" />
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* B-roll wishlist */}
        <section aria-label="B-roll wishlist">
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 4 }}>
            B-roll wishlist
          </h3>
          <p style={{ fontSize: 12.5, color: 'var(--ink4)', marginBottom: 12, lineHeight: 1.45 }}>
            Snap any of these when you see them. No urgency.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {bRoll.map((item, i) => (
              <label key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 0',
                borderBottom: i < bRoll.length - 1 ? '1px solid var(--hairline)' : 'none',
                cursor: 'pointer',
                minHeight: 44,
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: 'var(--accent)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.4 }}>{item}</span>
              </label>
            ))}
          </div>
        </section>
      </main>

      <PhoneTabBar />
    </PhoneShell>
  );
}
