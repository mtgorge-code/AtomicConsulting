import { Card } from '../../components/ui/Card';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { OwnerChip } from '../../components/ui/OwnerChip';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Pill';
import { Icons } from '../../components/icons';
import { strategy } from '../../data';
import { useApp } from '../../context/AppContext';

const weekAsksYou = [
  { eyebrow: 'Capture · 10 sec',  title: 'Snap the finished wall — wide, Riverside Ave', sub: 'After your 11am wrap' },
  { eyebrow: 'Say yes or no',     title: 'LinkedIn draft ready · "Why we dry-fit before mortaring"', sub: 'Wed 7am · Sarah is waiting' },
];

const weekAtomic = [
  { label: 'Design post: behind the scenes — how we prep',    owner: 'sarah' as const, due: 'Wed' },
  { label: 'Caption + hero pick for Riverside reel',          owner: 'atomic' as const, due: 'Today' },
  { label: 'Schedule GBP spring post for Friday',             owner: 'atomic' as const, due: 'Thu' },
  { label: 'Shoot Maple Ridge mulch install (crew)',           owner: 'crew' as const,   due: 'Today 3pm' },
  { label: 'Edit + color the stone wall reel',                owner: 'sarah' as const,  due: 'Thu' },
];

const bRoll = [
  { label: 'Hands setting a capstone — extreme close-up',     done: false },
  { label: 'Any tools laid out before a job',                 done: true },
  { label: 'The crew truck arriving at a site',               done: false },
  { label: 'Freshly edged lawn line — straight and clean',    done: true },
  { label: 'Gravel being raked — smooth finish shot',         done: false },
  { label: 'Before / midpoint / after — 3-frame sequence',   done: false },
];

export function DesktopStrategy() {
  const { state, toggleBRoll } = useApp();
  const capturedPhotos = state.photos;
  const totalCaptured = capturedPhotos.length;
  const inUse = capturedPhotos.filter(p => p.status === 'in-use').length;

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {/* Header */}
      <header style={{
        padding: '22px 36px 20px',
        borderBottom: '1px solid var(--hairline)',
        background: 'var(--paper)',
        position: 'sticky',
        top: 0,
        zIndex: 5,
      }}>
        <Eyebrow style={{ marginBottom: 4 }}>August goal</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', flex: 1, lineHeight: 1.2 }}>
            {strategy.goal}
          </h1>
          <Button kind="ghost" size="sm">Open full strategy doc →</Button>
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--ink2)', marginTop: 8, lineHeight: 1.5 }}>
          {strategy.lead}
        </p>
      </header>

      <div style={{ padding: '28px 36px', display: 'flex', gap: 28 }}>
        {/* ── Left column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Pillar mix */}
          <section aria-label="Content pillar mix" style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Pillar mix</h2>
            <Card>
              {/* Stacked bar */}
              <div style={{
                height: 14,
                borderRadius: 'var(--r-pill)',
                overflow: 'hidden',
                display: 'flex',
                marginBottom: 18,
              }} role="img" aria-label="Pillar distribution across all posts">
                {strategy.pillars.map(p => (
                  <div key={p.name} style={{ width: `${p.pct}%`, background: p.color, height: '100%' }} aria-hidden="true" />
                ))}
              </div>

              {/* Legend rows */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {strategy.pillars.map(p => {
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <div key={p.name} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: p.color, flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{p.name}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>{p.pct}%</span>
                        </div>
                        <div style={{ height: 5, background: 'var(--paper3)', borderRadius: 'var(--r-pill)', overflow: 'hidden', marginBottom: 4 }}>
                          <div
                            role="progressbar"
                            aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
                            aria-label={`${p.name}: ${p.done} of ${p.total}`}
                            style={{ width: `${pct}%`, height: '100%', background: p.color, borderRadius: 'var(--r-pill)' }}
                          />
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--ink3)', fontFamily: 'var(--font-mono)' }}>
                          {p.done}/{p.total} posts · {pct}% complete
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          {/* Media stats */}
          <section aria-label="Media library stats" style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Media coverage</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Total captured',    value: totalCaptured, sub: 'All time' },
                { label: 'In active posts',   value: inUse,         sub: 'Published or scheduled' },
                { label: 'Ready to use',      value: capturedPhotos.filter(p => p.status === 'approved').length, sub: 'Approved, unassigned' },
              ].map(stat => (
                <Card key={stat.label} pad={16}>
                  <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{stat.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink4)' }}>{stat.sub}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* B-roll wishlist */}
          <section aria-label="B-roll wishlist">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>B-roll wishlist</h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink4)' }}>
                {bRoll.filter(b => b.done).length}/{bRoll.length} captured
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink4)', marginBottom: 14, lineHeight: 1.45 }}>
              Snap any of these when you see them — no urgency, no schedule. Just great raw material when the moment arrives.
            </p>
            <Card pad={0} style={{ overflow: 'hidden' }}>
              {bRoll.map((item, i) => (
                <label key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 16px',
                  borderBottom: i < bRoll.length - 1 ? '1px solid var(--hairline)' : 'none',
                  cursor: 'pointer',
                  background: (state.bRollChecked[item.label] ?? item.done) ? 'var(--paper2)' : 'var(--card)',
                  minHeight: 48,
                }}>
                  <input
                    type="checkbox"
                    checked={state.bRollChecked[item.label] ?? item.done}
                    onChange={() => toggleBRoll(item.label)}
                    style={{ width: 17, height: 17, accentColor: 'var(--accent)', flexShrink: 0, cursor: 'pointer' }}
                    aria-label={item.label}
                  />
                  <span style={{
                    fontSize: 14,
                    color: (state.bRollChecked[item.label] ?? item.done) ? 'var(--ink3)' : 'var(--ink)',
                    textDecoration: (state.bRollChecked[item.label] ?? item.done) ? 'line-through' : 'none',
                    textDecorationColor: 'var(--ink4)',
                    lineHeight: 1.4,
                  }}>
                    {item.label}
                  </span>
                  {item.done && (
                    <Pill tone="good" size="sm" style={{ marginLeft: 'auto' }}>Got it</Pill>
                  )}
                </label>
              ))}
            </Card>
          </section>
        </div>

        {/* ── Right column ── */}
        <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* This week — your bit */}
          <section aria-label="Your tasks this week">
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>This week — your bit</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {weekAsksYou.map((item, i) => (
                <Card key={i} pad={14} style={{ borderLeft: '3px solid var(--accent)', borderRadius: '0 14px 14px 0' }}>
                  <Eyebrow color="var(--accentInk)" style={{ marginBottom: 5 }}>{item.eyebrow}</Eyebrow>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 4 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--ink4)' }}>{item.sub}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* This week — Atomic */}
          <section aria-label="Atomic's tasks this week">
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>This week — we've got</h2>
            <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {weekAtomic.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    borderBottom: i < weekAtomic.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: 'var(--accentInk)', lineHeight: 1.35, marginBottom: 2 }}>{item.label}</p>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accentInk)', opacity: 0.6 }}>Due {item.due}</span>
                    </div>
                    <OwnerChip owner={item.owner} size="sm" />
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* On-track summary */}
          <section>
            <Card style={{ background: 'var(--goodSoft)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--good)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icons.Check s={14} c="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--good)', marginBottom: 4 }}>On track for August</p>
                  <p style={{ fontSize: 12.5, color: 'var(--good)', opacity: 0.85, lineHeight: 1.45 }}>
                    19 posts published, 4 pillars progressing. You're showing the work consistently — that's what builds the reputation.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
