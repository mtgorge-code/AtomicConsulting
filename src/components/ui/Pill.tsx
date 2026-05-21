import type { CSSProperties, ReactNode } from 'react';

type PillTone = 'ink' | 'accent' | 'good' | 'ghost' | 'accentDark' | 'ink2' | 'dark';
type PillSize = 'sm' | 'md';

interface PillProps {
  children: ReactNode;
  tone?: PillTone;
  size?: PillSize;
  style?: CSSProperties;
}

const toneStyles: Record<PillTone, CSSProperties> = {
  ink:       { background: 'var(--paper3)', color: 'var(--ink)' },
  accent:    { background: 'var(--accent)', color: '#fff' },
  accentDark:{ background: 'var(--accentInk)', color: '#fff' },
  good:      { background: 'var(--goodSoft)', color: 'var(--good)' },
  ghost:     { background: 'transparent', color: 'var(--ink3)', border: '1px solid var(--hairline)' },
  ink2:      { background: 'var(--paper2)', color: 'var(--ink2)' },
  dark:      { background: 'rgba(255,255,255,0.15)', color: '#fff' },
};

export function Pill({ children, tone = 'ink', size = 'sm', style }: PillProps) {
  const sizeStyle: CSSProperties = size === 'sm'
    ? { padding: '3px 8px', fontSize: 11 }
    : { padding: '5px 12px', fontSize: 12 };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      borderRadius: 'var(--r-pill)',
      lineHeight: 1.3,
      ...sizeStyle,
      ...toneStyles[tone],
      ...style,
    }}>
      {children}
    </span>
  );
}
