import { Link } from 'react-router-dom';
import { PhoneShell } from '../components/layout/PhoneShell';
import { PhoneHeader } from '../components/layout/PhoneHeader';
import { PhoneTabBar } from '../components/layout/PhoneTabBar';
import { Card } from '../components/ui/Card';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Pill } from '../components/ui/Pill';
import { Icons } from '../components/icons';
import { posts, postPerformance } from '../data';

const heroStats = [
  { label: 'Calls',         value: '12', color: 'var(--good)',  sub: 'from content' },
  { label: 'Quote requests', value: '6',  color: 'var(--ink)',  sub: 'attributed' },
  { label: 'Jobs booked',   value: '4',  color: 'var(--ink)',  sub: 'confirmed' },
  { label: 'Revenue',        value: '$9.8k', color: 'var(--good)', sub: 'attributed' },
];

const thisMonth  = { calls: 12, quotes: 6, bookings: 4, revenue: 9800 };
const lastMonth  = { calls: 8,  quotes: 4, bookings: 3, revenue: 6400 };

function pctDiff(curr: number, prev: number) {
  if (prev === 0) return '+100%';
  const d = Math.round(((curr - prev) / prev) * 100);
  return (d >= 0 ? '+' : '') + d + '%';
}

export function Results() {
  // Top 2 posts by total business impact
  const topPerf = [...postPerformance]
    .sort((a, b) => (b.callsAttributed + b.bookingsAttributed + b.formSubmissions) -
                    (a.callsAttributed + a.bookingsAttributed + a.formSubmissions))
    .slice(0, 2);

  return (
    <PhoneShell>
      <a href="#main" className="skip-link">Skip to main content</a>
      <PhoneHeader />

      <main id="main" style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 32px' }}>
        <Eyebrow style={{ marginBottom: 4 }}>Results</Eyebrow>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2 }}>
          What's working.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 24, lineHeight: 1.5 }}>
          Business impact from your content this month.
        </p>

        {/* Hero metrics 2x2 grid */}
        <section aria-label="Business impact metrics" style={{ marginBottom: 24 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}>
            {heroStats.map((stat) => (
              <div key={stat.label} style={{
                background: 'var(--card)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-lg)',
                padding: '16px 16px',
              }}>
                <p style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 2 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 11.5, color: 'var(--ink4)' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* This month vs last */}
        <section aria-label="Month comparison" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
            This month vs last
          </h2>
          <Card pad={16}>
            {[
              { label: 'Calls',    curr: thisMonth.calls,    prev: lastMonth.calls },
              { label: 'Quotes',   curr: thisMonth.quotes,   prev: lastMonth.quotes },
              { label: 'Bookings', curr: thisMonth.bookings, prev: lastMonth.bookings },
            ].map((row) => (
              <div key={row.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingBottom: 10,
                marginBottom: 10,
                borderBottom: '1px solid var(--hairline)',
              }}>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>
                  {row.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}>
                  {row.curr}
                </span>
                <Pill tone="good" size="sm">{pctDiff(row.curr, row.prev)}</Pill>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 1, fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>Revenue</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--good)',
              }}>
                ${thisMonth.revenue.toLocaleString()}
              </span>
              <Pill tone="good" size="sm">{pctDiff(thisMonth.revenue, lastMonth.revenue)}</Pill>
            </div>
          </Card>
        </section>

        {/* What's working — top posts */}
        <section aria-label="Top performing posts" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
            What's working
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topPerf.map((perf) => {
              const post = posts.find(p => p.id === perf.postId);
              if (!post) return null;
              return (
                <Card key={perf.postId} pad={14}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {/* Thumbnail placeholder */}
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      background: 'var(--paper3)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--hairline)',
                    }}>
                      <Icons.Camera s={18} c="var(--ink5)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 6 }}>
                        {post.title}
                      </p>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {perf.callsAttributed > 0 && (
                          <span style={{ fontSize: 12.5, color: 'var(--ink3)' }}>
                            <span style={{ color: 'var(--good)', fontWeight: 700 }}>{perf.callsAttributed}</span>
                            {' '}call{perf.callsAttributed !== 1 ? 's' : ''}
                          </span>
                        )}
                        {perf.bookingsAttributed > 0 && (
                          <span style={{ fontSize: 12.5, color: 'var(--ink3)' }}>
                            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{perf.bookingsAttributed}</span>
                            {' '}booking{perf.bookingsAttributed !== 1 ? 's' : ''}
                          </span>
                        )}
                        {perf.revenueAttributed > 0 && (
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 11,
                            fontWeight: 700,
                            color: 'var(--good)',
                            background: 'var(--goodSoft)',
                            padding: '2px 7px',
                            borderRadius: 'var(--r-pill)',
                          }}>
                            ${perf.revenueAttributed.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Connect your tools CTA */}
        <section>
          <Card style={{ background: 'var(--accentSoft)', border: 'none' }} pad={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Icons.Plug s={16} c="var(--accentInk)" />
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accentInk)' }}>
                Connect your tools
              </p>
            </div>
            <p style={{ fontSize: 13, color: 'var(--accentInk)', opacity: 0.85, lineHeight: 1.45, marginBottom: 12 }}>
              Connect Jobber or HouseCall Pro to see which content turns into paid jobs.
            </p>
            <Link
              to="/desktop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13.5,
                fontWeight: 700,
                color: 'var(--accentInk)',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              Connect your tools
              <Icons.ArrowRight s={14} c="var(--accentInk)" />
            </Link>
          </Card>
        </section>
      </main>

      <PhoneTabBar />
    </PhoneShell>
  );
}
