import { PhoneShell } from '../components/layout/PhoneShell';
import { PhoneHeader } from '../components/layout/PhoneHeader';
import { PhoneTabBar } from '../components/layout/PhoneTabBar';
import { Card } from '../components/ui/Card';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Pill } from '../components/ui/Pill';
import { OwnerChip } from '../components/ui/OwnerChip';
import { Button } from '../components/ui/Button';
import { AtomicMark } from '../components/ui/AtomicMark';
import { posts } from '../data';
import type { PostState } from '../types';

const days = [
  { label: 'M', date: 19, active: false },
  { label: 'T', date: 20, active: false },
  { label: 'T', date: 21, active: true, today: true },
  { label: 'W', date: 22, active: false },
  { label: 'T', date: 23, active: false, shootDay: true },
  { label: 'F', date: 24, active: false },
  { label: 'S', date: 25, active: false },
];

function statePill(state: PostState) {
  const map: Record<PostState, { label: string; tone: Parameters<typeof Pill>[0]['tone'] }> = {
    'in-design':    { label: 'In design',   tone: 'ink' },
    'draft':        { label: 'Draft ready', tone: 'ink2' },
    'scheduled':    { label: 'Scheduled',   tone: 'good' },
    'posted':       { label: 'Posted',      tone: 'ink2' },
    'review':       { label: 'Review',      tone: 'accent' },
    'capture':      { label: 'Capture',     tone: 'accent' },
    'capture-crew': { label: 'Crew shoot',  tone: 'accent' },
    'shoot-day':    { label: 'Shoot day',   tone: 'accent' },
  };
  const { label, tone } = map[state] ?? { label: state, tone: 'ink' as const };
  return <Pill tone={tone} size="sm">{label}</Pill>;
}

const postDayLabels: Record<string, string> = {
  '2026-05-21': 'Tue 21',
  '2026-05-22': 'Wed 22',
  '2026-05-23': 'Thu 23',
  '2026-05-24': 'Fri 24',
  '2026-05-25': 'Sat 25',
};

export function Plan() {
  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>
      <PhoneHeader />

      <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 24px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Plan</h1>
        <h2 style={{ fontSize: 16, fontWeight: 400, color: 'var(--ink2)', marginBottom: 20, lineHeight: 1.45 }}>
          7 posts on the runway. 2 captures yours. The rest, ours.
        </h2>

        {/* 7-day strip */}
        <div style={{
          display: 'flex',
          gap: 4,
          marginBottom: 24,
          background: 'var(--card)',
          border: '1px solid var(--hairline)',
          borderRadius: 14,
          padding: 8,
        }} role="list" aria-label="Week of May 19">
          {days.map((d) => {
            const dayPosts = posts.filter(p => p.scheduledAt.startsWith(`2026-05-${String(d.date).padStart(2,'0')}`));
            return (
              <div
                key={d.date}
                role="listitem"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 2px',
                  borderRadius: 10,
                  background: d.today ? 'var(--ink6)' : d.shootDay ? 'var(--accentSoft)' : 'transparent',
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                <span style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: d.today ? 'rgba(255,255,255,0.6)' : d.shootDay ? 'var(--accentInk)' : 'var(--ink4)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: d.today ? '#fff' : d.shootDay ? 'var(--accentInk)' : 'var(--ink)',
                }}>
                  {d.date}
                </span>
                {dayPosts.length > 0 && (
                  <div style={{ display: 'flex', gap: 2 }}>
                    {dayPosts.map((_, i) => (
                      <div key={i} style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: d.today ? 'rgba(255,255,255,0.5)' : d.shootDay ? 'var(--accent)' : 'var(--ink3)',
                      }} aria-hidden="true" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Today section */}
        <section aria-label="Today's captures" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10 }}>Today</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Card pad={14}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <Pill tone="accent" size="sm">Capture</Pill>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>~11am · 3 shots</span>
              </div>
              <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                Riverside Ave — stone wall reveal
              </p>
              <OwnerChip owner="you" label="You · 11am" size="sm" />
            </Card>
            <Card pad={14}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <Pill tone="accent" size="sm">Crew shoot</Pill>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)' }}>3pm · video</span>
              </div>
              <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                Maple Ridge — mulch install time-lapse
              </p>
              <OwnerChip owner="crew" label="Atomic crew · 3pm" size="sm" />
            </Card>
          </div>
        </section>

        {/* Atomic content day */}
        <section aria-label="Atomic content day" style={{ marginBottom: 20 }}>
          <Card style={{ background: 'var(--accentSoft)', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <AtomicMark size={20} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <Eyebrow color="var(--accentInk)" style={{ marginBottom: 4 }}>Thu 23 · 9am – 1pm</Eyebrow>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--accentInk)', marginBottom: 6 }}>
                  Atomic content day · we're coming to you
                </h3>
                <p style={{ fontSize: 13, color: 'var(--accentInk)', opacity: 0.8, marginBottom: 10, lineHeight: 1.45 }}>
                  Marie and David will be on site for 4 hours. We'll capture everything we need for the next 2 weeks.
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <OwnerChip owner="marie" size="sm" />
                  <OwnerChip owner="david" size="sm" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Posts going out */}
        <section aria-label="Posts going out this week">
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10 }}>Posts going out</h3>
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {posts.map((post, i) => {
              const dateKey = post.scheduledAt.slice(0, 10);
              const dayLabel = postDayLabels[dateKey] ?? dateKey;
              const isDraft = post.state === 'draft';

              return (
                <li key={post.id} style={{
                  padding: '14px 0',
                  borderBottom: i < posts.length - 1 ? '1px solid var(--hairline)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--ink4)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}>
                      {dayLabel}
                    </span>
                    {post.channels.map(ch => (
                      <Pill key={ch} tone="ghost" size="sm">{ch}</Pill>
                    ))}
                    {statePill(post.state)}
                  </div>
                  <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>
                    {post.title}
                  </p>
                  <div style={{
                    fontSize: 12.5,
                    color: 'var(--ink4)',
                    marginBottom: 8,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}>
                    {post.pillar} · {post.source}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <OwnerChip owner={post.owner} size="sm" />
                    {isDraft && (
                      <Button kind="soft" size="sm" style={{ fontSize: 12.5 }}>
                        Review draft →
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </main>

      <PhoneTabBar />
    </PhoneShell>
  );
}
