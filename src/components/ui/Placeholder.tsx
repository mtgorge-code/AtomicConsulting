import { CSSProperties } from 'react';

interface PlaceholderProps {
  label?: string;
  ratio?: number;
  dark?: boolean;
  style?: CSSProperties;
}

export function Placeholder({ label, ratio = 16 / 9, dark = false, style }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label ?? 'Image placeholder'}
      style={{
        width: '100%',
        paddingBottom: `${(1 / ratio) * 100}%`,
        position: 'relative',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        background: dark ? 'var(--ink3)' : 'var(--paper3)',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(
          45deg,
          ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 0px,
          ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 1px,
          transparent 1px,
          transparent 12px
        )`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {label && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: dark ? 'rgba(255,255,255,0.4)' : 'var(--ink5)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
