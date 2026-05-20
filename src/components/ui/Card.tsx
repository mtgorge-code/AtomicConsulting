import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  pad?: number | string;
  soft?: boolean;
  dark?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
}

export function Card({ children, pad = 16, soft, dark, style, onClick, role, 'aria-label': ariaLabel }: CardProps) {
  const bg = dark ? 'var(--ink6)' : soft ? 'var(--paper2)' : 'var(--card)';
  const border = dark ? 'none' : `1px solid var(--hairline)`;

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        background: bg,
        border,
        borderRadius: 'var(--r-lg)',
        padding: typeof pad === 'number' ? pad : pad,
        color: dark ? '#fff' : 'var(--ink)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
