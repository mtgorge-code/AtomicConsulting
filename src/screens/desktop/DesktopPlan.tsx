import { useState } from 'react';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Card } from '../../components/ui/Card';
import { Pill } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { OwnerChip } from '../../components/ui/OwnerChip';
import { AtomicMark } from '../../components/ui/AtomicMark';
import { Icons } from '../../components/icons';
import { posts } from '../../data';
import type { PostState } from '../../types';

type CalView = 'week' | 'month' | 'pipeline';

function stateStyle(state: PostState) {
  return ({
    'posted':       { bg: 'var(--paper2)',    color: 'var(--ink2)' },
    'scheduled':    { bg: 'var(--goodSoft)',  color: 'var(--good)' },
    'in-design':    { bg: 'var(--paper3)',    color: 'var(--ink)' },
    'review':       { bg: 'var(--accent)',    color: '#fff' },
    'capture':      { bg: 'var(--card)',      color: 'var(--accentInk)', border: '1px solid var(--accent)' },
    'capture-crew': { bg: 'var(--accentSoft)',color: 'var(--accentInk)' },
    'shoot-day':    { bg: 'var(--accent)',    color: '#fff' },
    'draft':        { bg: 'var(--paper3)',    color: 'var(--ink)' },
  } as Record<string, { bg: string; color: string; border?: string }>)[state] ?? { bg: 'var(--paper3)', color: 'var(--ink)' };
}

function stateLabel(s: PostState) {
  return ({ 'posted': 'Posted', 'scheduled': 'Scheduled', 'in-design': 'Design',
    'review': 'Review', 'capture': 'Capture', 'capture-crew': 'Crew',
    'shoot-day': 'Shoot day', 'draft': 'Draft ready' } as Record<string, string>)[s] ?? s;
}

// 4-week month grid for May 2026
const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTH_START_DOW = 4; // May 1 = Friday (0=Sun...6=Sat)

function WeekGrid() {
  const weekDays = [
    { label: 'Mon', date: 19, today: false },
    { label: 'Tue', date: 20, today: true },
    { label: 'Wed', date: 21 },
    { label: 'Thu', date: 22, shootDay: true },
    { label: 'Fri', date: 23 },
    { label: 'Sat', date: 24 },
    { label: 'Sun', date: 25 },
  ];

  const days = weekDays.map(d => ({
    ...d,
    posts: posts.filter(p => p.scheduledAt.startsWith(`2026-05-${String(d.date).padStart(2, '0')}`)),
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }} role="grid">
      {days.map(day => (
        <div key={day.date} role="gridcell" style={{
          background: (day as any).today ? 'var(--ink6)' : (day as any).shootDay ? 'var(--accentSoft)' : 'var(--card)',
          border: `1px solid ${(day as any).today ? 'transparent' : 'var(--hairline)'}`,
          borderRadius: 12,
          padding: '10px 10px',
          minHeight: 180,
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
              letterSpacing: '0.05em',
              color: (day as any).today ? 'rgba(255,255,255,0.5)' : (day as any).shootDay ? 'var(--accentInk)' : 'var(--ink4)',
            }}>{day.label}</div>
            <div style={{
              fontSize: 17,
              fontWeight: 700,
              color: (day as any).today ? '#fff' : (day as any).shootDay ? 'var(--accentInk)' : 'var(--ink)',
            }}>{day.date}</div>
          </div>
          {(day as any).shootDay && day.posts.length === 0 && (
            <div style={{ fontSize: 10.5, color: 'var(--accentInk)', fontWeight: 600, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Atomic content day
            </div>
          )}
          {day.posts.map(post => {
            const s = stateStyle(post.state);
            const time = new Date(post.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            return (
              <div key={post.id} style={{ background: s.bg, color: s.color, border: s.border, borderRadius: 8, padding: '6px 8px', fontSize: 11.5, lineHeight: 1.35, cursor: 'pointer' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em', marginBottom: 2, opacity: 0.7, textTransform: 'uppercase' }}>
                  {post.channels[0]} · {time}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{post.title.length > 36 ? post.title.slice(0, 34) + '…' : post.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.7 }}>{stateLabel(post.state)}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MonthGrid() {
  const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const cells: (number | null)[] = [
    ...Array(MONTH_START_DOW).fill(null),
    ...MONTH_DAYS,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
        {DOW_LABELS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 0' }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} style={{ minHeight: 80 }} />;
          const dayPosts = posts.filter(p => p.scheduledAt.startsWith(`2026-05-${String(day).padStart(2, '0')}`));
          const isToday = day === 21;
          const isShoot = day === 22;
          return (
            <div key={i} style={{
              minHeight: 80,
              background: isToday ? 'var(--ink6)' : isShoot ? 'var(--accentSoft)' : 'var(--card)',
              border: `1px solid ${isToday ? 'transparent' : 'var(--hairline)'}`,
              borderRadius: 8,
              padding: '6px 8px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: isToday ? '#fff' : isShoot ? 'var(--accentInk)' : 'var(--ink)', marginBottom: 4 }}>
                {day}
              </div>
              {dayPosts.map(p => {
                const s = stateStyle(p.state);
                return (
                  <div key={p.id} style={{ background: s.bg, color: s.color, border: s.border, borderRadius: 4, padding: '2px 5px', fontSize: 10, fontWeight: 600, marginBottom: 3, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PipelineView() {
  const STATUS_ORDER: PostState[] = ['capture', 'capture-crew', 'in-design', 'review', 'draft', 'scheduled', 'posted'];
  const lanes = STATUS_ORDER.map(s => ({
    state: s,
    label: stateLabel(s),
    style: stateStyle(s),
    posts: posts.filter(p => p.state === s),
  })).filter(l => l.posts.length > 0);

  return (
    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 12 }}>
      {lanes.map(lane => (
        <div key={lane.state} style={{ minWidth: 220, maxWidth: 260, flex: '0 0 220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 10, height: 10, borderRadius: 3,
              background: lane.style.bg === 'var(--card)' ? 'var(--accent)' : lane.style.bg,
              border: lane.style.border,
            }} aria-hidden="true" />
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>{lane.label}</span>
            <span style={{ fontSize: 11, color: 'var(--ink4)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>{lane.posts.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lane.posts.map(post => (
              <div key={post.id} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 10, padding: 12, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 7 }}>
                  {post.channels.map(ch => (
                    <Pill key={ch} tone="ghost" size="sm">{ch}</Pill>
                  ))}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>
                  {post.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <OwnerChip owner={post.owner} size="sm" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink4)' }}>
                    {new Date(post.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                {post.state === 'draft' && (
                  <Button kind="accent" size="sm" style={{ width: '100%', marginTop: 8, fontSize: 12 }}>
                    Review draft →
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DesktopPlan() {
  const [calView, setCalView] = useState<CalView>('week');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        padding: '20px 32px 16px',
        borderBottom: '1px solid var(--hairline)',
        background: 'var(--paper)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <Eyebrow style={{ marginBottom: 3 }}>May 2026</Eyebrow>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Content plan</h1>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--ink2)', paddingBottom: 2 }}>
            7 posts this week · 2 captures on your calendar
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button kind="ghost" size="sm">
              <Icons.ChevronLeft s={14} c="var(--ink3)" />
              Prev week
            </Button>
            <Button kind="ghost" size="sm">
              Next week
              <Icons.ChevronRight s={14} c="var(--ink3)" />
            </Button>
          </div>
        </div>

        {/* State legend */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink4)', marginRight: 4 }}>States:</span>
          {(['scheduled', 'in-design', 'draft', 'capture', 'capture-crew', 'posted'] as PostState[]).map(s => {
            const st = stateStyle(s);
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: st.bg === 'var(--card)' ? 'var(--accent)' : st.bg, border: st.border }} aria-hidden="true" />
                <span style={{ fontSize: 11.5, color: 'var(--ink3)' }}>{stateLabel(s)}</span>
              </div>
            );
          })}
        </div>
      </header>

      {/* Calendar controls + body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
            {calView === 'week' && 'Week of May 19–25'}
            {calView === 'month' && 'May 2026'}
            {calView === 'pipeline' && 'Pipeline — by state'}
          </h2>
          <div style={{ display: 'flex', background: 'var(--paper3)', borderRadius: 10, padding: 3 }} role="group" aria-label="Calendar view">
            {(['week', 'month', 'pipeline'] as CalView[]).map(v => (
              <button key={v} onClick={() => setCalView(v)} aria-pressed={calView === v}
                style={{
                  padding: '6px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600,
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

        {calView === 'week'     && <WeekGrid />}
        {calView === 'month'    && <MonthGrid />}
        {calView === 'pipeline' && <PipelineView />}

        {/* Atomic content day callout */}
        {calView === 'week' && (
          <div style={{ marginTop: 20 }}>
            <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AtomicMark size={22} color="var(--accent)" />
                </div>
                <div style={{ flex: 1 }}>
                  <Eyebrow color="var(--accentInk)" style={{ marginBottom: 4 }}>Thu 22 · 9am – 1pm · Atomic content day</Eyebrow>
                  <p style={{ fontSize: 14, color: 'var(--accentInk)', lineHeight: 1.45 }}>
                    Marie and David are coming to you for a 4-hour shoot day. We'll capture everything needed for the next 2 weeks — you just need to be on site.
                  </p>
                </div>
                <OwnerChip owner="marie" size="sm" />
                <OwnerChip owner="david" size="sm" />
              </div>
            </Card>
          </div>
        )}

        {/* Posts list below grid */}
        {calView === 'week' && (
          <div style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink2)', marginBottom: 14 }}>All posts this week</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {posts.map((post, i) => {
                const s = stateStyle(post.state);
                return (
                  <div key={post.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 0',
                    borderBottom: i < posts.length - 1 ? '1px solid var(--hairline)' : 'none',
                  }}>
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--ink4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}>
                        {new Date(post.scheduledAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', width: 140, flexShrink: 0 }}>
                      {post.channels.map(ch => <Pill key={ch} tone="ghost" size="sm">{ch}</Pill>)}
                    </div>
                    <div style={{
                      width: 80,
                      flexShrink: 0,
                      padding: '3px 8px',
                      borderRadius: 'var(--r-pill)',
                      background: s.bg,
                      color: s.color,
                      border: s.border,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      textAlign: 'center',
                    }}>
                      {stateLabel(post.state)}
                    </div>
                    <p style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>
                      {post.title}
                    </p>
                    <OwnerChip owner={post.owner} size="sm" style={{ flexShrink: 0 }} />
                    {post.state === 'draft' && (
                      <Button kind="accent" size="sm" style={{ flexShrink: 0, fontSize: 12 }}>Review →</Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
