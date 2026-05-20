import { Card } from './Card';
import { Eyebrow } from './Eyebrow';

interface BalanceSide {
  count: number;
  detail: string;
}

interface BalanceCardProps {
  yours: BalanceSide;
  ours: BalanceSide;
}

export function BalanceCard({ yours, ours }: BalanceCardProps) {
  return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '14px 16px', borderRight: '1px solid var(--hairline)' }}>
          <Eyebrow color="var(--accentInk)" style={{ marginBottom: 4 }}>Yours today</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1,
            }}>{yours.count}</span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.4 }}>{yours.detail}</p>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <Eyebrow color="var(--ink3)" style={{ marginBottom: 4 }}>We&apos;ve got</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1,
            }}>{ours.count}</span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.4 }}>{ours.detail}</p>
        </div>
      </div>
    </Card>
  );
}
