import type { CSSProperties, ReactNode } from 'react';

interface IconProps {
  s?: number;
  c?: string;
  title?: string;
  style?: CSSProperties;
}

function Icon({ s = 20, c = 'currentColor', title, style, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={!title}
      role={title ? 'img' : undefined}
      aria-label={title}
      style={style}
    >
      {children}
    </svg>
  );
}

export const Icons = {
  Camera: (p: IconProps) => (
    <Icon {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </Icon>
  ),
  Calendar: (p: IconProps) => (
    <Icon {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </Icon>
  ),
  Compass: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </Icon>
  ),
  Home: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </Icon>
  ),
  Bell: (p: IconProps) => (
    <Icon {...p}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </Icon>
  ),
  Check: (p: IconProps) => (
    <Icon {...p}>
      <polyline points="20 6 9 17 4 12"/>
    </Icon>
  ),
  ArrowRight: (p: IconProps) => (
    <Icon {...p}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </Icon>
  ),
  Pin: (p: IconProps) => (
    <Icon {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </Icon>
  ),
  Play: (p: IconProps) => (
    <Icon {...p}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </Icon>
  ),
  Plus: (p: IconProps) => (
    <Icon {...p}>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </Icon>
  ),
  Dot: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="3" fill="currentColor" strokeWidth={0}/>
    </Icon>
  ),
  Flash: (p: IconProps) => (
    <Icon {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </Icon>
  ),
  ChevronLeft: (p: IconProps) => (
    <Icon {...p}>
      <polyline points="15 18 9 12 15 6"/>
    </Icon>
  ),
  ChevronRight: (p: IconProps) => (
    <Icon {...p}>
      <polyline points="9 18 15 12 9 6"/>
    </Icon>
  ),
  X: (p: IconProps) => (
    <Icon {...p}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </Icon>
  ),
  BarChart: (p: IconProps) => (
    <Icon {...p}>
      <rect x="3" y="12" width="4" height="9"/>
      <rect x="10" y="7" width="4" height="14"/>
      <rect x="17" y="3" width="4" height="18"/>
    </Icon>
  ),
  Plug: (p: IconProps) => (
    <Icon {...p}>
      <path d="M12 22v-5"/>
      <path d="M9 8V2"/>
      <path d="M15 8V2"/>
      <path d="M18 8H6a2 2 0 0 0-2 2v3a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2z"/>
    </Icon>
  ),
};
