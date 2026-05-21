import type { CSSProperties } from 'react';
import { OWNERS } from '../../types';
import { AtomicMark } from './AtomicMark';
import { Avatar } from './Avatar';

type OwnerKey = keyof typeof OWNERS;
type ChipSize = 'sm' | 'md' | 'lg';
type ChipTone = 'default' | 'inverted';

interface OwnerChipProps {
  owner: OwnerKey;
  label?: string;
  role?: string;
  size?: ChipSize;
  tone?: ChipTone;
  style?: CSSProperties;
}

const sizeMap = {
  sm: { disc: 20, font: 12, pad: '4px 10px 4px 5px', gap: 6 },
  md: { disc: 26, font: 13, pad: '5px 12px 5px 6px', gap: 7 },
  lg: { disc: 32, font: 14, pad: '6px 14px 6px 7px', gap: 8 },
};

export function OwnerChip({ owner, label, role: roleProp, size = 'sm', tone = 'default', style: styleProp }: OwnerChipProps) {
  const ownerData = OWNERS[owner];
  const displayLabel = label ?? (roleProp ? `${ownerData.label} · ${roleProp}` : ownerData.label);
  const s = sizeMap[size];
  const isAtomicType = ownerData.kind === 'atomic' || ownerData.kind === 'crew';
  const isYou = ownerData.kind === 'you';
  const isNamed = ownerData.kind === 'named';

  let bg: string;
  let textColor: string;
  let discBg: string;

  if (tone === 'inverted') {
    bg = 'rgba(255,255,255,0.15)';
    textColor = '#fff';
    discBg = 'rgba(255,255,255,0.25)';
  } else if (isAtomicType) {
    bg = 'var(--accentSoft)';
    textColor = 'var(--accentInk)';
    discBg = '#fff';
  } else if (isYou) {
    bg = 'var(--paper3)';
    textColor = 'var(--ink)';
    discBg = 'var(--ink)';
  } else {
    bg = 'var(--paper2)';
    textColor = 'var(--ink2)';
    discBg = ownerData.color;
  }

  return (
    <div
      aria-label={`Assigned to: ${displayLabel}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: s.pad,
        background: bg,
        borderRadius: 'var(--r-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: s.font,
        fontWeight: 500,
        color: textColor,
        lineHeight: 1,
        ...styleProp,
      }}
    >
      {isAtomicType ? (
        <div style={{
          width: s.disc,
          height: s.disc,
          borderRadius: '50%',
          background: discBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <AtomicMark size={s.disc * 0.65} color="var(--accent)" />
        </div>
      ) : isYou ? (
        <Avatar
          initials={ownerData.initials ?? '?'}
          color={discBg}
          size={s.disc}
        />
      ) : isNamed ? (
        <Avatar
          initials={ownerData.initials ?? '?'}
          color={ownerData.color}
          size={s.disc}
        />
      ) : null}
      {displayLabel}
    </div>
  );
}
