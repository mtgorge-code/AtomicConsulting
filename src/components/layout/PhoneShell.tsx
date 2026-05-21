import type { ReactNode } from 'react';

interface PhoneShellProps {
  children: ReactNode;
}

export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div style={{
      maxWidth: 390,
      margin: '0 auto',
      minHeight: '100dvh',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}
