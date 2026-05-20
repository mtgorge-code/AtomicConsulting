import { CSSProperties, ElementType, ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  color?: string;
  as?: ElementType;
  style?: CSSProperties;
}

export function Eyebrow({ children, color = 'var(--ink3)', as: Tag = 'p', style }: EyebrowProps) {
  return (
    <Tag style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color,
      lineHeight: 1.3,
      ...style,
    }}>
      {children}
    </Tag>
  );
}
