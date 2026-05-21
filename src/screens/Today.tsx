import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PhoneShell } from '../components/layout/PhoneShell';
import { PhoneHeader } from '../components/layout/PhoneHeader';
import { PhoneTabBar } from '../components/layout/PhoneTabBar';
import { BalanceCard } from '../components/ui/BalanceCard';
import { Card } from '../components/ui/Card';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Pill } from '../components/ui/Pill';
import { OwnerChip } from '../components/ui/OwnerChip';
import { Icons } from '../components/icons';

const shotChips = [
  '01 Wide · full wall',
  '02 Hands on stone',
  '03 Crew shot',
];

const dayItems = [
  {
    time: '8am',
    title: 'Riverside Ave — stone wall, day 2',
    sub: 'Finishing back wall + cleanup',
    owner: 'you' as const,
    ownerLabel: 'You · 11am',
    hasCapture: true,
  },
  {
    time: '3pm',
    title: 'Maple Ridge — mulch install',
    sub: 'Crew handles full install',
    owner: 'crew' as const,
    ownerLabel: "Crew · we're shooting",
    hasCapture: true,
  },
  {
    time: '5pm',
    title: 'Site check — Hillside project',
    sub: 'Quick walkthrough, no shoot',
    owner: null,
    ownerLabel: null,
    hasCapture: false,
  },
];

export function Today() {
  const { state } = useApp();
  const posts = state.posts;
  const yourCount = posts.filter(p => p.owner === 'you' && (p.state === 'capture' || p.state === 'draft')).length;
  const oursCount = posts.filter(p => p.owner !== 'you').length;
  const makingItems = posts.filter(p => p.state === 'in-design' || p.state === 'scheduled').slice(0, 2);
  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>
      <PhoneHeader />

      <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 24px' }}>
        <Eyebrow color="var(--ink4)" style={{ marginBottom: 4 }}>Tuesday · May 21</Eyebrow>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 18, color: 'var(--ink)' }}>
          Morning, Mike.
        </h1>

        <section aria-label="Summary" style={{ marginBottom: 16 }}>
          <BalanceCard
            yours={{ count: yourCount, detail: `${yourCount} capture${yourCount !== 1 ? 's' : ''} on your calendar · ${posts.filter(p => p.state === 'draft' && p.owner === 'you').length > 0 ? '1 post needs 30 seconds of your eyes.' : 'nothing else needed from you.'}` }}
            ours={{ count: oursCount, detail: `${posts.filter(p => p.state === 'in-design').length} in design, ${posts.filter(p => p.state === 'scheduled').length} scheduling themselves out this week.` }}
          />
        </section>

        {/* Dark hero card */}
        <section aria-label="Next capture" style={{ marginBottom: 20 }}>
          <Card dark style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <Pill tone="accent" size="sm">
                Coming up · in 45 min
              </Pill>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.6)',
              }}>
                <Icons.Pin s={11} c="rgba(255,255,255,0.6)" />
                Riverside Ave
              </div>
            </div>

            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>
              When you wrap, snap 3 shots of the finished wall.
            </h2>

            <OwnerChip owner="you" label="You've got this one" size="sm" tone="inverted" />

            <div style={{ display: 'flex', gap: 7, marginTop: 14, flexWrap: 'wrap' }}>
              {shotChips.map((chip) => (
                <span key={chip} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 'var(--r-pill)',
                  padding: '4px 10px',
                  letterSpacing: '0.03em',
                }}>
                  {chip}
                </span>
              ))}
            </div>

            <Link to="/capture" style={{ display: 'block', marginTop: 16 }}>
              <div style={{
                background: '#fff',
                color: 'var(--ink)',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 600,
                fontSize: 15,
              }}>
                Open capture brief →
              </div>
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.03em',
            }}>
              <span>For · Instagram reel, Wed 10am</span>
              <button style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textDecoration: 'underline',
                fontWeight: 500,
              }}>
                Not today? Hand to us →
              </button>
            </div>
          </Card>
        </section>

        {/* Your day */}
        <section aria-label="Your day" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10, letterSpacing: '0.01em' }}>
            Your day
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {dayItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 12,
                padding: '12px 0',
                borderBottom: i < dayItems.length - 1 ? '1px solid var(--hairline)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--ink4)',
                  width: 32,
                  flexShrink: 0,
                  paddingTop: 1,
                }}>
                  {item.time}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: item.hasCapture ? 7 : 0 }}>
                    {item.sub}
                  </p>
                  {item.hasCapture && item.owner && (
                    <OwnerChip owner={item.owner} label={item.ownerLabel ?? undefined} size="sm" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* We're making */}
        <section aria-label="Posts in progress">
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 10, letterSpacing: '0.01em' }}>
            We&apos;re making
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {makingItems.map((post) => {
              const stateLabel = post.state === 'in-design' ? 'In design' : 'Scheduled';
              const stateTone = post.state === 'scheduled' ? 'good' : 'ink';
              const date = new Date(post.scheduledAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              return (
                <Card key={post.id} pad={14}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                    <Pill tone={stateTone as 'good' | 'ink'} size="sm">{stateLabel}</Pill>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)', letterSpacing: '0.04em' }}>
                      {post.channels[0]} · {date}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>
                    {post.title}
                  </p>
                  <OwnerChip owner={post.owner} size="sm" />
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <PhoneTabBar />
    </PhoneShell>
  );
}
