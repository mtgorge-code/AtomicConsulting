import { useState } from 'react';
import { AtomicWordmark, AtomicMark } from '../components/ui/AtomicMark';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Card } from '../components/ui/Card';
import { Pill } from '../components/ui/Pill';
import { Button } from '../components/ui/Button';
import { OwnerChip } from '../components/ui/OwnerChip';
import { Placeholder } from '../components/ui/Placeholder';
import { Avatar } from '../components/ui/Avatar';
import { SR } from '../components/ui/SR';
import { Icons } from '../components/icons';
import { posts, strategy, connectedChannels, team } from '../data';
import type { PostState } from '../types';

type CalView = 'week' | 'month' | 'pipeline';

const weekDays = [
  { label: 'Mon', date: 19, posts: [] as typeof posts },
  { label: 'Tue', date: 20, today: true, posts: [] as typeof posts },
  { label: 'Wed', date: 21, posts: [] as typeof posts },
  { label: 'Thu', date: 22, shootDay: true, posts: [] as typeof posts },
  { label: 'Fri', date: 23, posts: [] as typeof posts },
  { label: 'Sat', date: 24, posts: [] as typeof posts },
  { label: 'Sun', date: 25, posts: [] as typeof posts },
];

function populateDays() {
  return weekDays.map(d => ({
    ...d,
    posts: posts.filter(p => p.scheduledAt.startsWith(`2026-05-${String(d.date).padStart(2,'0')}`)),
  }));
}

function stateStyle(state: PostState): { bg: string; color: string; border?: string } {
  return {
    'posted':       { bg: 'var(--paper2)', color: 'var(--ink2)' },
    'scheduled':    { bg: 'var(--goodSoft)', color: 'var(--good)' },
    'in-design':    { bg: 'var(--paper3)', color: 'var(--ink)' },
    'review':       { bg: 'var(--accent)', color: '#fff' },
    'capture':      { bg: 'var(--card)', color: 'var(--accentInk)', border: '1px solid var(--accent)' },
    'capture-crew': { bg: 'var(--accentSoft)', color: 'var(--accentInk)' },
    'shoot-day':    { bg: 'var(--accent)', color: '#fff' },
    'draft':        { bg: 'var(--paper3)', color: 'var(--ink)' },
  }[state] ?? { bg: 'var(--paper3)', color: 'var(--ink)' };
}

function stateLabel(state: PostState) {
  return {
    'posted':       'Posted',
    'scheduled':    'Scheduled',
    'in-design':    'Design',
    'review':       'Review',
    'capture':      'Capture',
    'capture-crew': 'Crew',
    'shoot-day':    'Shoot day',
    'draft':        'Draft ready',
  }[state] ?? state;
}

export function Desktop() {
  const [calView, setCalView] = useState<CalView>('week');
  const days = populateDays();

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--paper)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* Sidebar */}
      <aside
        aria-label="Sidebar navigation"
        style={{
          width: 232,
          background: 'var(--card)',
          borderRight: '1px solid var(--hairline)',
          display: 'flex',
          flexDirection: 'column',
          padding: '22px 0',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '0 18px 20px' }}>
          <AtomicWordmark size="md" />
        </div>

        <nav aria-label="Workspace navigation">
          <ul style={{ listStyle: 'none' }}>
            {[
              { label: 'Today', icon: Icons.Home, count: 2, active: true },
              { label: 'Capture', icon: Icons.Camera, count: 1, active: false },
              { label: 'Plan', icon: Icons.Calendar, count: 0, active: false },
              { label: 'Strategy', icon: Icons.Compass, count: 0, active: false },
            ].map((item) => (
              <li key={item.label}>
                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 18px',
                  background: item.active ? 'var(--paper2)' : 'transparent',
                  color: item.active ? 'var(--ink)' : 'var(--ink3)',
                  borderRadius: 0,
                  fontSize: 14,
                  fontWeight: item.active ? 600 : 400,
                  textAlign: 'left',
                  minHeight: 44,
                }}>
                  <item.icon s={16} c={item.active ? 'var(--ink)' : 'var(--ink4)'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.count > 0 && (
                    <span style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      borderRadius: 'var(--r-pill)',
                      padding: '1px 7px',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }} aria-label={`${item.count} items`}>
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{
          padding: '16px 18px',
          marginTop: 8,
          borderTop: '1px solid var(--hairline)',
        }}>
          <Eyebrow style={{ marginBottom: 10 }}>Channels</Eyebrow>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {connectedChannels.map((ch) => (
              <li key={ch.platform} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: ch.status === 'active' ? 'var(--good)' : 'var(--ink5)',
                  flexShrink: 0,
                }} aria-hidden="true" />
                <span style={{ fontSize: 13, color: 'var(--ink2)' }}>{ch.platform}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Your team card */}
        <div style={{ padding: '0 12px', marginTop: 'auto' }}>
          <div style={{
            background: 'var(--accentSoft)',
            borderRadius: 14,
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <AtomicMark size={16} color="var(--accent)" />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--accentInk)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Your team
              </span>
            </div>
            <div style={{ display: 'flex', marginBottom: 8 }}>
              {team.map((member, i) => (
                <Avatar
                  key={member.id}
                  initials={member.initials}
                  color={member.color}
                  size={26}
                  style={{ marginLeft: i === 0 ? 0 : -8, border: '2px solid var(--accentSoft)', zIndex: team.length - i }}
                />
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--accentInk)', lineHeight: 1.4 }}>
              Sarah is editing your Wednesday post.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Main header */}
        <header style={{
          padding: '22px 36px 18px',
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--paper)',
          flexShrink: 0,
        }}>
          <Eyebrow style={{ marginBottom: 4 }}>Tuesday · May 21, 2026</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
              Morning, Mike.
            </h1>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button kind="ghost" size="sm">View strategy</Button>
              <Button kind="accent" size="sm">
                <Icons.Plus s={14} c="#fff" />
                Request something
              </Button>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink3)', marginTop: 6, lineHeight: 1.45 }}>
            <strong style={{ color: 'var(--accentInk)' }}>Yours today · 2</strong>
            {' '}— 2 captures on your calendar · 1 post needs 30 seconds of your eyes.{'  '}
            <strong style={{ color: 'var(--ink2)' }}>We've got · 6</strong>
            {' '}— 4 in design, 2 scheduling themselves out this week.
          </p>
        </header>

        {/* Main scroll area */}
        <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>
          {/* Calendar section */}
          <section aria-label="Content calendar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>Content calendar</h2>
                <p style={{ fontSize: 13, color: 'var(--ink4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
                  Week of May 19 · 7 posts
                </p>
              </div>
              {/* Segmented control */}
              <div style={{
                display: 'flex',
                background: 'var(--paper3)',
                borderRadius: 10,
                padding: 3,
                gap: 2,
              }} role="group" aria-label="Calendar view">
                {(['week', 'month', 'pipeline'] as CalView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalView(v)}
                    aria-pressed={calView === v}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      background: calView === v ? '#fff' : 'transparent',
                      color: calView === v ? 'var(--ink)' : 'var(--ink3)',
                      border: calView === v ? '1px solid var(--hairline)' : 'none',
                      minHeight: 32,
                    }}
                  >
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
                <div
                  key={day.date}
                  role="gridcell"
                  aria-label={`${day.label} ${day.date} May`}
                  style={{
                    background: day.today ? 'var(--ink6)' : day.shootDay ? 'var(--accentSoft)' : 'var(--card)',
                    border: `1px solid ${day.today ? 'transparent' : 'var(--hairline)'}`,
                    borderRadius: 12,
                    padding: '10px 10px',
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {/* Day header */}
                  <div style={{ marginBottom: 4 }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: day.today ? 'rgba(255,255,255,0.5)' : day.shootDay ? 'var(--accentInk)' : 'var(--ink4)',
                      letterSpacing: '0.05em',
                    }}>
                      {day.label}
                    </div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: day.today ? '#fff' : day.shootDay ? 'var(--accentInk)' : 'var(--ink)',
                    }}>
                      {day.date}
                    </div>
                  </div>

                  {day.shootDay && day.posts.length === 0 && (
                    <div style={{
                      fontSize: 11,
                      color: 'var(--accentInk)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}>
                      Atomic content day
                    </div>
                  )}

                  {day.posts.map((post) => {
                    const s = stateStyle(post.state);
                    const time = new Date(post.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                    return (
                      <div key={post.id} style={{
                        background: s.bg,
                        color: s.color,
                        border: s.border,
                        borderRadius: 8,
                        padding: '6px 8px',
                        fontSize: 11.5,
                        lineHeight: 1.35,
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          letterSpacing: '0.04em',
                          marginBottom: 2,
                          opacity: 0.7,
                          textTransform: 'uppercase',
                        }}>
                          {post.channels[0]} · {time}
                        </div>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>
                          {post.title.length > 40 ? post.title.slice(0, 38) + '…' : post.title}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          opacity: 0.7,
                        }}>
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
              <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink2)', marginBottom: 12 }}>
                This month · against the plan
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {strategy.pillars.map((p) => {
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <Card key={p.name} pad={14}>
                      <Eyebrow style={{ marginBottom: 8, fontSize: 11 }}>{p.name}</Eyebrow>
                      <div style={{
                        height: 6,
                        background: 'var(--paper3)',
                        borderRadius: 'var(--r-pill)',
                        overflow: 'hidden',
                        marginBottom: 8,
                      }}>
                        <div
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${p.name}: ${p.done} of ${p.total} posts`}
                          style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: p.color,
                            borderRadius: 'var(--r-pill)',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink3)' }}>
                          {p.done}/{p.total}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>
                          {pct}%
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </section>
        </main>
      </div>

      {/* Right rail */}
      <aside
        aria-label="Today's actions"
        style={{
          width: 360,
          background: 'var(--paper2)',
          borderLeft: '1px solid var(--hairline)',
          overflowY: 'auto',
          padding: '22px 20px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Today's captures */}
        <section aria-label="Today's captures">
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
            Today's captures
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Capture 1 — you */}
            <Card pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <OwnerChip owner="you" label="You · 11am" size="sm" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>3 shots</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.3 }}>
                When you wrap, snap 3 shots of the finished wall.
              </p>
              <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 8 }}>Riverside Ave · stone wall, day 2</p>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                color: 'var(--ink4)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                For · Instagram reel, Wed 10am
              </div>
            </Card>

            {/* Capture 2 — crew */}
            <Card pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <OwnerChip owner="crew" label="Atomic crew · 3pm" size="sm" />
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.3 }}>
                Time-lapse of the Maple Ridge mulch install.
              </p>
              <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginBottom: 8 }}>Maple Ridge · mulch install</p>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                color: 'var(--ink4)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                For · Instagram + FB, Thu 23
              </div>
            </Card>
          </div>
        </section>

        {/* Atomic content day */}
        <section aria-label="Atomic content day">
          <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <AtomicMark size={18} color="var(--accent)" />
              </div>
              <div>
                <Eyebrow color="var(--accentInk)" style={{ marginBottom: 4 }}>Thu 23 · Atomic content day</Eyebrow>
                <p style={{ fontSize: 13.5, color: 'var(--accentInk)', lineHeight: 1.4 }}>
                  Marie and David are coming to you, 9am–1pm. We'll cover the next 2 weeks.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Waiting on you */}
        <section aria-label="Waiting on you">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
              Waiting on you
            </h2>
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

            <Placeholder label="LinkedIn hero" ratio={16/9} style={{ marginBottom: 12 }} />

            {posts.find(p => p.state === 'draft')?.draftBody?.split('\n\n').map((para, i) => (
              para && <p key={i} style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.55, marginBottom: 8 }}>
                {para}
              </p>
            ))}

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button kind="accent" size="sm" style={{ flex: 1 }}>
                Approve · 1 tap
              </Button>
              <Button kind="ghost" size="sm">
                Tweak
              </Button>
            </div>
          </Card>
        </section>
      </aside>
    </div>
  );
}
