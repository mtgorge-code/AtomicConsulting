import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Pill } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/icons';
import { useApp } from '../../context/AppContext';
import type { IntegrationCategory } from '../../types';

const categoryLabels: Record<IntegrationCategory, string> = {
  analytics: 'Analytics & Tracking',
  social:    'Social Platforms',
  crm:       'Field Service & CRM',
  booking:   'Booking & Dispatch',
  calls:     'Call Tracking',
  payments:  'Payments',
};

// Display order for available categories
const categoryOrder: IntegrationCategory[] = ['analytics', 'social', 'crm', 'booking', 'payments', 'calls'];

function LogoDisc({ color, text, size = 40 }: { color: string; text: string; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.25,
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: text.length > 3 ? 8 : 10,
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '0.03em',
        textAlign: 'center',
        lineHeight: 1,
      }}>{text}</span>
    </div>
  );
}

function fmtSyncTime(iso: string | undefined) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function DesktopIntegrations() {
  const { state, connectIntegration, disconnectIntegration } = useApp();
  const integrations = state.integrations;
  const [connecting, setConnecting] = useState<string | null>(null);

  const connected    = integrations.filter(i => i.status === 'connected');
  const disconnected = integrations.filter(i => i.status === 'disconnected');

  // Group disconnected by category
  const byCategory: Partial<Record<IntegrationCategory, typeof disconnected>> = {};
  for (const intg of disconnected) {
    if (!byCategory[intg.category]) byCategory[intg.category] = [];
    byCategory[intg.category]!.push(intg);
  }

  function handleConnect(id: string) {
    setConnecting(id);
    setTimeout(() => {
      connectIntegration(id);
      setConnecting(null);
    }, 1500);
  }

  const connectedCount = connected.length;

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
        <Eyebrow style={{ marginBottom: 4 }}>Integrations</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', flex: 1, lineHeight: 1.2 }}>
            Connect your tools.
          </h1>
          <Pill tone="good" size="sm">{connectedCount} connected</Pill>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink3)', marginTop: 8, lineHeight: 1.5 }}>
          Connect your tools so we can show you what's actually working — not just likes, but calls, bookings, and revenue.
        </p>
      </header>

      <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* ── Connected section ── */}
        {connected.length > 0 && (
          <section aria-label="Connected integrations">
            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
              Connected
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {connected.map((intg) => (
                <Card key={intg.id} pad={18}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <LogoDisc color={intg.logoColor} text={intg.logoText} size={44} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
                          {intg.name}
                        </p>
                        <Pill tone="good" size="sm">Connected</Pill>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.4, marginBottom: 6 }}>
                        {intg.description}
                      </p>
                      {intg.accountName && (
                        <p style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11.5,
                          color: 'var(--ink4)',
                          marginBottom: 8,
                        }}>
                          {intg.accountName}
                        </p>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10.5,
                          color: 'var(--ink5)',
                        }}>
                          Last synced {fmtSyncTime(intg.lastSyncedAt)}
                        </span>
                        <Button
                          kind="ghost"
                          size="sm"
                          onClick={() => disconnectIntegration(intg.id)}
                          style={{ fontSize: 12, padding: '6px 12px', minHeight: 30 }}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── Available by category ── */}
        {categoryOrder
          .filter(cat => (byCategory[cat]?.length ?? 0) > 0)
          .map(cat => (
            <section key={cat} aria-label={`${categoryLabels[cat]} integrations`}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                {categoryLabels[cat]}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {(byCategory[cat] ?? []).map((intg) => {
                  const isConnecting = connecting === intg.id;
                  return (
                    <Card key={intg.id} pad={18}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <LogoDisc color={intg.logoColor} text={intg.logoText} size={44} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                            {intg.name}
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--ink3)', lineHeight: 1.4, marginBottom: 12 }}>
                            {intg.description}
                          </p>
                          <Button
                            kind={isConnecting ? 'ghost' : 'accent'}
                            size="sm"
                            disabled={isConnecting}
                            onClick={() => handleConnect(intg.id)}
                          >
                            {isConnecting ? (
                              <>
                                <span style={{
                                  display: 'inline-block',
                                  width: 12,
                                  height: 12,
                                  border: '2px solid rgba(0,0,0,0.2)',
                                  borderTopColor: 'var(--ink)',
                                  borderRadius: '50%',
                                  animation: 'spin 0.7s linear infinite',
                                }} aria-hidden="true" />
                                Connecting…
                              </>
                            ) : (
                              <>
                                <Icons.Plus s={13} c="#fff" />
                                Connect
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}

        {/* ── Why connect more? ── */}
        <section>
          <Card style={{ background: 'var(--accentSoft)', border: 'none', padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icons.Flash s={16} c="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--accentInk)', marginBottom: 8 }}>
                  Why connect more?
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--accentInk)', lineHeight: 1.55, opacity: 0.9 }}>
                  Every connected tool closes a gap in attribution. Right now we can tell you{' '}
                  <strong>9,800 people saw your content</strong>. With Jobber connected, we can tell you
                  exactly which of those became paying customers — and how much revenue your content is
                  responsible for.
                </p>
              </div>
            </div>
          </Card>
        </section>

      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
