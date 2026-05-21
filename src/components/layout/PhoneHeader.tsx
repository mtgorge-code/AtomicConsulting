import type { ReactNode } from 'react';
import { AtomicWordmark } from '../ui/AtomicMark';
import { Avatar } from '../ui/Avatar';
import { Icons } from '../icons';
import { SR } from '../ui/SR';
import { user } from '../../data';

interface PhoneHeaderProps {
  right?: ReactNode;
  showBell?: boolean;
  showAvatar?: boolean;
}

export function PhoneHeader({ right, showBell = true, showAvatar = true }: PhoneHeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 22px 10px',
      background: 'var(--paper)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderBottom: '1px solid var(--hairline)',
    }}>
      <AtomicWordmark size="sm" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {right}
        {showBell && (
          <button
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: 'var(--r-pill)',
            }}
            aria-label="Notifications (1 unread)"
          >
            <Icons.Bell s={20} c="var(--ink)" />
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '1.5px solid var(--paper)',
              }}
            />
            <SR>1 unread</SR>
          </button>
        )}
        {showAvatar && (
          <Avatar initials={user.initials} color={user.avatarColor} size={32} />
        )}
      </div>
    </header>
  );
}
