interface AtomicMarkProps {
  size?: number;
  color?: string;
}

export function AtomicMark({ size = 24, color = 'var(--accent)' }: AtomicMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.7" />
      <circle cx="12" cy="12" r="6.5" stroke={color} strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}

interface AtomicWordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function AtomicWordmark({ size = 'md', color = 'var(--ink)' }: AtomicWordmarkProps) {
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 18 : 15;
  const markSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: 'var(--font-mono)',
      fontSize,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color,
      textTransform: 'uppercase',
    }}>
      <AtomicMark size={markSize} color="var(--accent)" />
      atomic
    </div>
  );
}
