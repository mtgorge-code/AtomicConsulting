import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Pill } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/icons';
import { posts, postPerformance, integrations as allIntegrations } from '../../data';
import type { ResultsPeriod } from '../../types';

const periods: ResultsPeriod[] = [
  { label: 'This month',  value: 'this-month' },
  { label: 'Last month',  value: 'last-month' },
  { label: '90 days',     value: '90-days' },
  { label: 'All time',    value: 'all-time' },
];

const heroStats = [
  {
    label: 'Calls from your content',
    value: '12',
    sub: 'people called you directly from a post or your profile',
    color: 'var(--good)',
  },
  {
    label: 'Quote requests',
    value: '6',
    sub: 'form submissions attributed to content',
    color: 'var(--ink)',
  },
  {
    label: 'Jobs booked',
    value: '4',
    sub: 'confirmed bookings we can trace to a post',
    color: 'var(--ink)',
  },
  {
    label: 'Revenue attributed',
    value: '$9,800',
    sub: 'estimated from average job value × bookings',
    color: 'var(--good)',
  },
];

const journeySteps = [
  { icon: Icons.Home,       label: 'Saw the post',               value: 9800,  unit: 'people' },
  { icon: Icons.ArrowRight, label: 'Visited profile or website', value: 633,   unit: 'people' },
  { icon: Icons.Bell,       label: 'Called or filled out a form', value: 18,   unit: 'people' },
  { icon: Icons.Check,      label: 'Booked a job',               value: 4,     unit: 'people' },
];

const callSources = [
  { label: 'Google Business Profile', calls: 6, pct: 50, color: '#34a853' },
  { label: 'Instagram',               calls: 4, pct: 33, color: '#e1306c' },
  { label: 'Website (from content)',  calls: 2, pct: 17, color: '#6366f1' },
];

function fmt(n: number) {
  return n >= 1000 ? n.toLocaleString() : String(n);
}

export function DesktopResults() {
  const [period, setPeriod]         = useState<ResultsPeriod['value']>('this-month');
  const [editingJobValue, setEditing] = useState(false);
  const [jobValue, setJobValue]     = useState(2450);
  const [jobValueInput, setInput]   = useState('2450');

  const connectedIntegrations = allIntegrations.filter(i => i.status === 'connected');
  const unlockIntegrations    = allIntegrations.filter(i => i.status === 'disconnected').slice(0, 2);

  // Join posts with performance data
  const performanceWithPosts = postPerformance.map(perf => ({
    perf,
    post: posts.find(p => p.id === perf.postId),
  })).filter(r => r.post != null);

  const totalRevenue = postPerformance.reduce((sum, p) => sum + p.revenueAttributed, 0);

  function convRate(from: number, to: number) {
    if (from === 0) return '0%';
    return `${Math.round((to / from) * 100)}%`;
  }

  function fmtSyncTime(iso: string | undefined) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

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
          <Eyebrow style={{ marginBottom: 4 }}>Results</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', flex: 1, lineHeight: 1.2 }}>
              What your content is doing for the business.
            </h1>
            {/* Period selector */}
            <div style={{
              display: 'flex',
              background: 'var(--paper3)',
              borderRadius: 10,
              padding: 3,
            }} role="group" aria-label="Results period">
              {periods.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  aria-pressed={period === p.value}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 7,
                    fontSize: 13,
                    fontWeight: 600,
                    background: period === p.value ? '#fff' : 'transparent',
                    color: period === p.value ? 'var(--ink)' : 'var(--ink3)',
                    border: period === p.value ? '1px solid var(--hairline)' : 'none',
                    minHeight: 32,
                    whiteSpace: 'nowrap',
                  }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div style={{ padding: '28px 36px' }}>

          {/* ── Hero metrics ── */}
          <section aria-label="Business impact metrics" style={{ marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {heroStats.map((stat) => (
                <div key={stat.label} style={{
                  background: '#fff',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--r-lg)',
                  padding: '18px 20px',
                }}>
                  <p style={{
                    fontSize: 36,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 4 }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--ink4)', lineHeight: 1.4 }}>
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── The journey ── */}
          <section aria-label="Customer journey funnel" style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>The journey</h2>
            <p style={{ fontSize: 13, color: 'var(--ink4)', marginBottom: 16, lineHeight: 1.45 }}>
              This is how people move from seeing your content to becoming a customer. Every step is normal — this is how acquisition works.
            </p>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              {journeySteps.map((step, i) => {
                const next = journeySteps[i + 1];
                const rate = next ? convRate(step.value, next.value) : null;
                return (
                  <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div style={{
                      flex: 1,
                      background: 'var(--card)',
                      border: '1px solid var(--hairline)',
                      borderRadius: 'var(--r-lg)',
                      padding: '16px 18px',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'var(--paper3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                      }}>
                        <step.icon s={16} c="var(--ink3)" />
                      </div>
                      <p style={{
                        fontSize: 28,
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink)',
                        lineHeight: 1,
                        marginBottom: 6,
                      }}>
                        {fmt(step.value)}
                      </p>
                      <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.35 }}>
                        {step.label}
                      </p>
                    </div>
                    {rate != null && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0 6px',
                        flexShrink: 0,
                        gap: 3,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          color: 'var(--ink4)',
                          fontWeight: 600,
                        }}>{rate}</span>
                        <Icons.ChevronRight s={14} c="var(--ink5)" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Posts that drove real business ── */}
          <section aria-label="Posts with business impact" style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
              Posts that drove real business
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {performanceWithPosts.map(({ perf, post }) => {
                if (!post) return null;
                const revPct = totalRevenue > 0 ? (perf.revenueAttributed / totalRevenue) * 100 : 0;
                return (
                  <Card key={perf.postId} pad={16}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {/* Thumbnail placeholder */}
                      <div style={{
                        width: 68,
                        height: 68,
                        borderRadius: 10,
                        background: 'var(--paper3)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--hairline)',
                      }}>
                        <Icons.Camera s={20} c="var(--ink5)" />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Channels */}
                        <div style={{ display: 'flex', gap: 4, marginBottom: 6, flexWrap: 'wrap' }}>
                          {post.channels.map(ch => (
                            <Pill key={ch} tone="ink2" size="sm">{ch}</Pill>
                          ))}
                        </div>

                        {/* Title */}
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>
                          {post.title}
                        </p>

                        {/* Business impact */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          fontSize: 13,
                          color: 'var(--ink3)',
                          marginBottom: perf.revenueAttributed > 0 ? 10 : 0,
                        }}>
                          {perf.callsAttributed > 0 && (
                            <span>
                              <span style={{ color: 'var(--good)', fontWeight: 700 }}>{perf.callsAttributed}</span>
                              {' '}call{perf.callsAttributed !== 1 ? 's' : ''}
                            </span>
                          )}
                          {perf.formSubmissions > 0 && (
                            <span>
                              <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{perf.formSubmissions}</span>
                              {' '}quote request{perf.formSubmissions !== 1 ? 's' : ''}
                            </span>
                          )}
                          {perf.bookingsAttributed > 0 && (
                            <span>
                              <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{perf.bookingsAttributed}</span>
                              {' '}booking{perf.bookingsAttributed !== 1 ? 's' : ''}
                            </span>
                          )}
                          {perf.callsAttributed === 0 && perf.formSubmissions === 0 && perf.bookingsAttributed === 0 && (
                            <span style={{ color: 'var(--ink4)' }}>Early signals — no direct leads yet</span>
                          )}
                        </div>

                        {/* Revenue + bar */}
                        {perf.revenueAttributed > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 12,
                              fontWeight: 700,
                              color: 'var(--good)',
                              background: 'var(--goodSoft)',
                              padding: '3px 9px',
                              borderRadius: 'var(--r-pill)',
                            }}>
                              ${perf.revenueAttributed.toLocaleString()} attributed
                            </span>
                            <div style={{ flex: 1, height: 4, background: 'var(--paper3)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                              <div style={{
                                width: `${revPct}%`,
                                height: '100%',
                                background: 'var(--good)',
                                borderRadius: 'var(--r-pill)',
                              }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── Call sources ── */}
          <section aria-label="Where calls are coming from" style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
              Where your calls are coming from
            </h2>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {callSources.map((src) => (
                  <div key={src.label}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <div style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: src.color,
                        flexShrink: 0,
                      }} aria-hidden="true" />
                      <span style={{ flex: 1, fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{src.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink)', fontWeight: 700 }}>
                        {src.calls} calls
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink4)', width: 36, textAlign: 'right' }}>
                        {src.pct}%
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'var(--paper3)', borderRadius: 'var(--r-pill)', overflow: 'hidden', marginLeft: 20 }}>
                      <div style={{
                        width: `${src.pct}%`,
                        height: '100%',
                        background: src.color,
                        borderRadius: 'var(--r-pill)',
                      }} role="progressbar" aria-valuenow={src.pct} aria-valuemin={0} aria-valuemax={100}
                         aria-label={`${src.label}: ${src.pct}%`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ── Trend callout ── */}
          <section style={{ marginBottom: 32 }}>
            <Card style={{ background: 'var(--accentSoft)', border: 'none', padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icons.Flash s={15} c="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--accentInk)', marginBottom: 5 }}>
                    May is on track to be your best month for leads.
                  </p>
                  <p style={{ fontSize: 13.5, color: 'var(--accentInk)', lineHeight: 1.5, opacity: 0.9 }}>
                    You've already matched April's full-month numbers with 10 days left. Three more scheduled posts
                    means this trend is likely to hold.
                  </p>
                </div>
              </div>
            </Card>
          </section>

        </div>
      </main>

      {/* ── Right rail ── */}
      <aside aria-label="Data and settings" style={{
        width: 300,
        background: 'var(--paper2)',
        borderLeft: '1px solid var(--hairline)',
        overflowY: 'auto',
        padding: '22px 18px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>

        {/* Connected data sources */}
        <section aria-label="Connected data sources">
          <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
            Connected data sources
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {connectedIntegrations.map((intg) => (
              <div key={intg.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '9px 12px',
                background: 'var(--card)',
                border: '1px solid var(--hairline)',
                borderRadius: 10,
              }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: intg.logoColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 7,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em',
                  }}>{intg.logoText}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 1 }}>
                    {intg.name}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--ink4)',
                  }}>
                    Synced {fmtSyncTime(intg.lastSyncedAt)}
                  </p>
                </div>
                <div style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--good)',
                  flexShrink: 0,
                }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* Unlock more insight */}
        <section aria-label="Unlock more insight">
          <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
            Unlock more insight
          </h2>
          <p style={{ fontSize: 12.5, color: 'var(--ink4)', lineHeight: 1.45, marginBottom: 10 }}>
            Connect your field service software to see which content actually becomes paid jobs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {unlockIntegrations.map((intg) => (
              <div key={intg.id} style={{
                padding: '12px 14px',
                background: 'var(--card)',
                border: '1px solid var(--hairline)',
                borderRadius: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background: intg.logoColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 7,
                      fontWeight: 700,
                      color: '#fff',
                    }}>{intg.logoText}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{intg.name}</p>
                </div>
                <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.4, marginBottom: 10 }}>
                  {intg.description}
                </p>
                <Button kind="accent" size="sm" style={{ width: '100%' }}>Connect</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Avg job value */}
        <section aria-label="Average job value">
          <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
            Avg job value
          </h2>
          <p style={{ fontSize: 12.5, color: 'var(--ink4)', lineHeight: 1.45, marginBottom: 10 }}>
            Used to estimate revenue attributed to bookings.
          </p>
          <Card pad={14}>
            {editingJobValue ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>$</span>
                <input
                  type="number"
                  value={jobValueInput}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink)',
                    border: '1px solid var(--accent)',
                    borderRadius: 8,
                    padding: '6px 10px',
                    background: 'var(--paper)',
                    outline: 'none',
                  }}
                  autoFocus
                  aria-label="Average job value in dollars"
                />
                <Button
                  kind="accent"
                  size="sm"
                  onClick={() => {
                    const v = parseInt(jobValueInput, 10);
                    if (!isNaN(v) && v > 0) setJobValue(v);
                    setEditing(false);
                  }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <p style={{
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--ink)',
                  flex: 1,
                  lineHeight: 1,
                }}>
                  ${jobValue.toLocaleString()}
                </p>
                <Button kind="ghost" size="sm" onClick={() => {
                  setInput(String(jobValue));
                  setEditing(true);
                }}>
                  Edit
                </Button>
              </div>
            )}
          </Card>
        </section>
      </aside>
    </div>
  );
}
