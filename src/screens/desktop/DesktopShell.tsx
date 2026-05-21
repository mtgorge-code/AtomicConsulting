import { useState } from 'react';
import { AtomicWordmark } from '../../components/ui/AtomicMark';
import { AtomicMark } from '../../components/ui/AtomicMark';
import { Avatar } from '../../components/ui/Avatar';
import { Icons } from '../../components/icons';
import { connectedChannels, team, user } from '../../data';
import type { DesktopView } from '../../types';
import { DesktopToday } from './DesktopToday';
import { DesktopCaptures } from './DesktopCaptures';
import { DesktopPlan } from './DesktopPlan';
import { DesktopStrategy } from './DesktopStrategy';

interface NavItem {
  id: DesktopView;
  label: string;
  icon: (p: { s: number; c: string }) => React.ReactElement;
  count?: number;
}

const navItems: NavItem[] = [
  { id: 'today',    label: 'Today',    icon: Icons.Home,     count: 2 },
  { id: 'captures', label: 'Captures', icon: Icons.Camera,   count: 3 },
  { id: 'plan',     label: 'Plan',     icon: Icons.Calendar  },
  { id: 'strategy', label: 'Strategy', icon: Icons.Compass   },
];

const channelDots: Record<string, string> = {
  Instagram:       '#e1306c',
  Facebook:        '#1877f2',
  'Google Business': '#34a853',
  LinkedIn:        '#0077b5',
};

export function DesktopShell() {
  const [view, setView] = useState<DesktopView>('today');

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--paper)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
    }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── Sidebar ── */}
      <aside
        aria-label="Sidebar navigation"
        style={{
          width: 232,
          background: 'var(--card)',
          borderRight: '1px solid var(--hairline)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Wordmark */}
        <div style={{ padding: '20px 18px 16px' }}>
          <AtomicWordmark size="md" />
        </div>

        {/* User identity */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 18px 16px',
          borderBottom: '1px solid var(--hairline)',
        }}>
          <Avatar initials={user.initials} color={user.avatarColor} size={32} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
              {user.firstName} Reyes
            </p>
            <p style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.3 }}>
              {user.businessName}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav aria-label="Workspace navigation" style={{ padding: '10px 0' }}>
          <ul style={{ listStyle: 'none' }}>
            {navItems.map((item) => {
              const active = view === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setView(item.id)}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 18px',
                      background: active ? 'var(--paper2)' : 'transparent',
                      color: active ? 'var(--ink)' : 'var(--ink3)',
                      fontSize: 14,
                      fontWeight: active ? 600 : 400,
                      textAlign: 'left',
                      minHeight: 44,
                      borderLeft: `3px solid ${active ? 'var(--accent)' : 'transparent'}`,
                      transition: 'background 0.1s, color 0.1s',
                    }}
                  >
                    <item.icon s={16} c={active ? 'var(--ink)' : 'var(--ink4)'} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.count != null && item.count > 0 && (
                      <span style={{
                        background: 'var(--accent)',
                        color: '#fff',
                        borderRadius: 'var(--r-pill)',
                        padding: '1px 7px',
                        fontSize: 11,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        minWidth: 20,
                        textAlign: 'center',
                      }} aria-label={`${item.count} items`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Channels */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid var(--hairline)', marginTop: 4 }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--ink4)',
            marginBottom: 10,
          }}>Channels</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {connectedChannels.map((ch) => (
              <li key={ch.platform} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: channelDots[ch.platform] ?? 'var(--good)',
                  flexShrink: 0,
                }} aria-hidden="true" />
                <span style={{ fontSize: 13, color: 'var(--ink2)', flex: 1 }}>{ch.platform}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9.5,
                  color: 'var(--good)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>Live</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Team card */}
        <div style={{ padding: '0 12px 20px', marginTop: 'auto' }}>
          <div style={{
            background: 'var(--accentSoft)',
            borderRadius: 14,
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <AtomicMark size={15} color="var(--accent)" />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accentInk)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Your team</span>
            </div>
            <div style={{ display: 'flex', marginBottom: 8 }}>
              {team.map((m, i) => (
                <Avatar
                  key={m.id}
                  initials={m.initials}
                  color={m.color}
                  size={26}
                  style={{
                    marginLeft: i === 0 ? 0 : -8,
                    border: '2px solid var(--accentSoft)',
                    zIndex: team.length - i,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--accentInk)', lineHeight: 1.45 }}>
              Sarah is editing your Wednesday post.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {view === 'today'    && <DesktopToday    onNavigate={setView} />}
        {view === 'captures' && <DesktopCaptures />}
        {view === 'plan'     && <DesktopPlan />}
        {view === 'strategy' && <DesktopStrategy />}
      </div>
    </div>
  );
}
