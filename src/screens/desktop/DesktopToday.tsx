import { AtomicMark } from '../../components/ui/AtomicMark';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Card } from '../../components/ui/Card';
import { Pill } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { OwnerChip } from '../../components/ui/OwnerChip';
import { Placeholder } from '../../components/ui/Placeholder';
import { Icons } from '../../components/icons';
import { strategy } from '../../data';
import { useApp } from '../../context/AppContext';
import type { PostState, DesktopView } from '../../types';

interface DesktopTodayProps {
  onNavigate: (v: DesktopView) => void;
}

type CalView = 'week' | 'month' | 'pipeline';
import { useState } from 'react';

const weekDays = [
  { label: 'Mon', date: 19 },
  { label: 'Tue', date: 21, today: true },
  { label: 'Wed', date: 21 },
  { label: 'Thu', date: 22, shootDay: true },
  { label: 'Fri', date: 23 },
  { label: 'Sat', date: 24 },
  { label: 'Sun', date: 25 },
];

function stateStyle(state: PostState) {
  return ({
    'posted':       { bg: 'var(--paper2)',   color: 'var(--ink2)' },
    'scheduled':    { bg: 'var(--goodSoft)', color: 'var(--good)' },
    'in-design':    { bg: 'var(--paper3)',   color: 'var(--ink)' },
    'review':       { bg: 'var(--accent)',   color: '#fff' },
    'capture':      { bg: 'var(--card)',     color: 'var(--accentInk)', border: '1px solid var(--accent)' },
    'capture-crew': { bg: 'var(--accentSoft)', color: 'var(--accentInk)' },
    'shoot-day':    { bg: 'var(--accent)',   color: '#fff' },
    'draft':        { bg: 'var(--paper3)',   color: 'var(--ink)' },
  } as Record<string, { bg: string; color: string; border?: string }>)[state] ?? { bg: 'var(--paper3)', color: 'var(--ink)' };
}

function stateLabel(state: PostState) {
  return ({
    'posted': 'Posted', 'scheduled': 'Scheduled', 'in-design': 'Design',
    'review': 'Review', 'capture': 'Capture', 'capture-crew': 'Crew',
    'shoot-day': 'Shoot day', 'draft': 'Draft ready',
  } as Record<string, string>)[state] ?? state;
}

export function DesktopToday({ onNavigate }: DesktopTodayProps) {
  const { state, approvePost, rejectPost } = useApp();
  const posts = state.posts;
  const [calView, setCalView] = useState<CalView>('week');
  const draftPost = posts.find(p => p.state === 'draft');

  const days = weekDays.map(d => ({
    ...d,
    posts: posts.filter(p => p.scheduledAt.startsWith(`2026-05-${String(d.date).padStart(2, '0')}`)),
  }));

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* ── Main column ── */}
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          padding: '22px 36px 18px',
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--paper)',
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}>
          <Eyebrow style={{ marginBottom: 4 }}>Tuesday · May 21, 2026</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
              Morning, Mike.
            </h1>
            <Button kind="ghost" size="sm" onClick={() => onNavigate('strategy')}>View strategy</Button>
            <Button kind="accent" size="sm">
              <Icons.Plus s={14} c="#fff" />
              Request something
            </Button>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink3)', marginTop: 8, lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--accentInk)' }}>Yours today · 2</strong>
            {' '}— 2 captures on your calendar · 1 post needs 30 seconds of your eyes.&nbsp;&nbsp;
            <strong style={{ color: 'var(--ink2)' }}>We've got · 6</strong>
            {' '}— 4 in design, 2 scheduling themselves out this week.
          </p>
        </header>

        <div style={{ padding: '28px 36px' }}>
          {/* Calendar */}
          <section aria-label="Content calendar" style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>Content calendar</h2>
                <p style={{ fontSize: 12.5, color: 'var(--ink4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
                  Week of May 19 · 7 posts
                </p>
              </div>
              <div style={{
                display: 'flex',
                background: 'var(--paper3)',
                borderRadius: 10,
                padding: 3,
              }} role="group" aria-label="Calendar view">
                {(['week', 'month', 'pipeline'] as CalView[]).map((v) => (
                  <button key={v} onClick={() => setCalView(v)} aria-pressed={calView === v}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 7,
                      fontSize: 13,
                      fontWeight: 600,
                      background: calView === v ? '#fff' : 'transparent',
                      color: calView === v ? 'var(--ink)' : 'var(--ink3)',
                      border: calView === v ? '1px solid var(--hairline)' : 'none',
                      minHeight: 32,
                    }}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Week grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
              marginBottom: 24,
            }} role="grid" aria-label="Week of May 19">
              {days.map((day) => (
                <div key={day.date + day.label} role="gridcell"
                  style={{
                    background: day.today ? 'var(--ink6)' : day.shootDay ? 'var(--accentSoft)' : 'var(--card)',
                    border: `1px solid ${day.today ? 'transparent' : 'var(--hairline)'}`,
                    borderRadius: 12,
                    padding: '10px 10px',
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}>
                  <div style={{ marginBottom: 2 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: day.today ? 'rgba(255,255,255,0.5)' : day.shootDay ? 'var(--accentInk)' : 'var(--ink4)',
                      letterSpacing: '0.05em',
                    }}>{day.label}</div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: day.today ? '#fff' : day.shootDay ? 'var(--accentInk)' : 'var(--ink)',
                    }}>{day.date}</div>
                  </div>

                  {day.shootDay && day.posts.length === 0 && (
                    <div style={{
                      fontSize: 10.5,
                      color: 'var(--accentInk)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}>Atomic content day</div>
                  )}

                  {day.posts.map((post) => {
                    const s = stateStyle(post.state);
                    const time = new Date(post.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                    return (
                      <div key={post.id} style={{
                        background: s.bg, color: s.color, border: s.border,
                        borderRadius: 8, padding: '6px 8px', fontSize: 11.5, lineHeight: 1.35, cursor: 'pointer',
                      }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em', marginBottom: 2, opacity: 0.7, textTransform: 'uppercase' }}>
                          {post.channels[0]} · {time}
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>
                          {post.title.length > 38 ? post.title.slice(0, 36) + '…' : post.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.7 }}>
                          {stateLabel(post.state)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Pillar progress */}
            <section aria-label="This month against the plan">
              <h3 style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink2)', marginBottom: 12 }}>
                This month · against the plan
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {strategy.pillars.map((p) => {
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <Card key={p.name} pad={14}>
                      <Eyebrow style={{ marginBottom: 8, fontSize: 11 }}>{p.name}</Eyebrow>
                      <div style={{ height: 6, background: 'var(--paper3)', borderRadius: 'var(--r-pill)', overflow: 'hidden', marginBottom: 8 }}>
                        <div
                          role="progressbar"
                          aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
                          aria-label={`${p.name}: ${p.done} of ${p.total} posts`}
                          style={{ width: `${pct}%`, height: '100%', background: p.color, borderRadius: 'var(--r-pill)' }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)' }}>{p.done}/{p.total}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>{pct}%</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </section>
        </div>
      </main>

      {/* ── Right rail ── */}
      <aside aria-label="Today's actions" style={{
        width: 360,
        background: 'var(--paper2)',
        borderLeft: '1px solid var(--hairline)',
        overflowY: 'auto',
        padding: '22px 20px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
      }}>
        {/* Today's captures */}
        <section aria-label="Today's captures">
          <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Today's captures</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Card pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <OwnerChip owner="you" label="You · 11am" size="sm" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>3 shots</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>
                When you wrap, snap 3 shots of the finished wall.
              </p>
              <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 8 }}>Riverside Ave · stone wall, day 2</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                For · Instagram reel, Wed 10am
              </div>
            </Card>
            <Card pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <OwnerChip owner="crew" label="Atomic crew · 3pm" size="sm" />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>
                Time-lapse of the Maple Ridge mulch install.
              </p>
              <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 8 }}>Maple Ridge · mulch install</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                For · Instagram + FB, Thu 23
              </div>
            </Card>
          </div>
        </section>

        {/* Atomic content day */}
        <section>
          <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AtomicMark size={18} color="var(--accent)" />
              </div>
              <div>
                <Eyebrow color="var(--accentInk)" style={{ marginBottom: 4 }}>Thu 23 · Atomic content day</Eyebrow>
                <p style={{ fontSize: 13.5, color: 'var(--accentInk)', lineHeight: 1.4 }}>
                  Marie and David are coming to you, 9am–1pm. We'll cover the next 2 weeks of content.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Waiting on you */}
        <section aria-label="Waiting on you">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>Waiting on you</h2>
            <Pill tone="accent" size="sm">1 thing</Pill>
          </div>
          <Card pad={16}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <Pill tone="ink2" size="sm">Draft ready</Pill>
              <OwnerChip owner="sarah" size="sm" />
            </div>
            <p style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.3 }}>
              Why we always dry-fit before mortaring
            </p>
            <Placeholder label="LinkedIn hero" ratio={16 / 9} style={{ marginBottom: 12 }} />
            {draftPost?.draftBody?.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i} style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.55, marginBottom: 8 }}>{para}</p>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button kind="accent" size="sm" style={{ flex: 1 }} onClick={() => draftPost && approvePost(draftPost.id)}>Approve · 1 tap</Button>
              <Button kind="ghost" size="sm" onClick={() => draftPost && rejectPost(draftPost.id)}>Tweak</Button>
            </div>
          </Card>
        </section>

        {/* Recent from library */}
        <section aria-label="Recently submitted photos">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
              Just in — Riverside Ave
            </h2>
            <Pill tone="accent" size="sm">2 new</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Wide · full wall', color: 'oklch(0.54 0.04 138)' },
              { label: 'Hands on stone',   color: 'oklch(0.48 0.03 80)' },
            ].map((ph) => (
              <div key={ph.label} style={{
                borderRadius: 10,
                overflow: 'hidden',
                aspectRatio: '4/3',
                background: ph.color,
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 10px)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  padding: '8px 8px 6px',
                }}>
                  <p style={{ fontSize: 10.5, color: '#fff', fontWeight: 600, lineHeight: 1.3 }}>{ph.label}</p>
                  <Pill tone="dark" size="sm" style={{ fontSize: 9.5, padding: '2px 7px', marginTop: 3 }}>Submitted</Pill>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {/* navigate to captures */}}
            style={{
              marginTop: 10,
              fontSize: 13,
              color: 'var(--accentInk)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              minHeight: 36,
              display: 'flex',
              alignItems: 'center',
            }}>
            View full media library →
          </button>
        </section>
      </aside>
    </div>
  );
}
