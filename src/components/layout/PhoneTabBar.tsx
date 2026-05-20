import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../icons';
import { SR } from '../ui/SR';

interface Tab {
  label: string;
  path: string;
  icon: (props: { s: number; c: string }) => React.ReactElement;
}

const tabs: Tab[] = [
  { label: 'Today',    path: '/',          icon: Icons.Home },
  { label: 'Capture',  path: '/capture',   icon: Icons.Camera },
  { label: 'Plan',     path: '/plan',      icon: Icons.Calendar },
  { label: 'Strategy', path: '/strategy',  icon: Icons.Compass },
];

export function PhoneTabBar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: 'flex',
        background: 'var(--card)',
        borderTop: '1px solid var(--hairline)',
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
      }}
    >
      {tabs.map((tab) => {
        const active = tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path);
        return (
          <Link
            key={tab.path}
            to={tab.path}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '10px 0 14px',
              minHeight: 56,
              color: active ? 'var(--accent)' : 'var(--ink4)',
              transition: 'color 0.15s',
            }}
          >
            <tab.icon s={22} c={active ? 'var(--accent)' : 'var(--ink4)'} />
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
