import { CSSProperties } from 'react';

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
}

export function Avatar({ initials, color = 'var(--ink)', size = 36, style }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: Math.max(10, size * 0.35),
        fontWeight: 600,
        letterSpacing: '0.02em',
        flexShrink: 0,
        userSelect: 'none',
        ...style,
      }}
    >
      {initials}
    </div>
  );
}
