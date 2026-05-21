import type { CSSProperties, ReactNode } from 'react';

type ButtonKind = 'primary' | 'accent' | 'ghost' | 'soft';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

const kindStyles: Record<ButtonKind, CSSProperties> = {
  primary: { background: 'var(--ink)', color: '#fff' },
  accent:  { background: 'var(--accent)', color: '#fff' },
  ghost:   { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--hairline)' },
  soft:    { background: 'var(--paper2)', color: 'var(--ink)' },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: { padding: '8px 14px', fontSize: 13, minHeight: 36, borderRadius: 10 },
  md: { padding: '11px 20px', fontSize: 15, minHeight: 44, borderRadius: 12 },
  lg: { padding: '14px 24px', fontSize: 16, minHeight: 52, borderRadius: 14 },
};

export function Button({
  children,
  kind = 'primary',
  size = 'md',
  onClick,
  style,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.15s, transform 0.1s',
        ...kindStyles[kind],
        ...sizeStyles[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
