import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/ui/Toast';
import { Today } from './screens/Today';
import { PushNotification } from './screens/PushNotification';
import { CaptureBrief } from './screens/CaptureBrief';
import { Shoot } from './screens/Shoot';
import { Handoff } from './screens/Handoff';
import { Plan } from './screens/Plan';
import { Strategy } from './screens/Strategy';
import { Results } from './screens/Results';
import { Desktop } from './screens/Desktop';

function DevNav() {
  const { pathname } = useLocation();
  const screens = [
    { path: '/',         label: '01 Today' },
    { path: '/push',     label: '02 Push' },
    { path: '/capture',  label: '03 Brief' },
    { path: '/shoot',    label: '04 Shoot' },
    { path: '/handoff',  label: '05 Handoff' },
    { path: '/plan',     label: '06 Plan' },
    { path: '/strategy', label: '07 Strategy' },
    { path: '/results',  label: '08 Results' },
    { path: '/desktop',  label: '09 Desktop' },
  ];

  if (pathname === '/desktop') return null;

  return (
    <nav aria-label="Screen switcher" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'oklch(0.14 0.012 75)',
      padding: '8px 16px 10px',
      display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center',
      zIndex: 9000, boxShadow: '0 -2px 12px rgba(0,0,0,0.3)',
    }}>
      {screens.map((s) => {
        const active = s.path === '/' ? pathname === '/' : pathname.startsWith(s.path);
        return (
          <Link key={s.path} to={s.path} style={{
            fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600,
            letterSpacing: '0.04em',
            color: active ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
            background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
            padding: '5px 10px', borderRadius: 6, textDecoration: 'none',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
            border: active ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          }}>
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AppRoutes() {
  return (
    <>
      <DevNav />
      <Toast />
      <Routes>
        <Route path="/"         element={<Today />} />
        <Route path="/push"     element={<PushNotification />} />
        <Route path="/capture"  element={<CaptureBrief />} />
        <Route path="/shoot"    element={<Shoot />} />
        <Route path="/handoff"  element={<Handoff />} />
        <Route path="/plan"     element={<Plan />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/results"  element={<Results />} />
        <Route path="/desktop"  element={<Desktop />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}
