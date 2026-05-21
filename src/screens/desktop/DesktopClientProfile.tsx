import { useState } from 'react';
import type { DesktopView } from '../../types';
import { useApp } from '../../context/AppContext';
import { billingInfo, usageStats } from '../../data';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Icons } from '../../components/icons';

const PLAN_CONFIG = {
  starter: { label: 'Starter',  color: 'var(--ink4)',    bg: 'var(--paper3)',  price: '$97' },
  growth:  { label: 'Growth',   color: 'var(--accentInk)', bg: 'var(--accentSoft)', price: '$297' },
  pro:     { label: 'Pro',      color: '#7c3aed',         bg: '#f5f3ff',        price: '$497' },
};

function UsageBar({ value, max, color = 'var(--accent)' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const warn = pct >= 80;
  return (
    <div style={{ height: 6, background: 'var(--paper3)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: `${pct}%`,
          height: '100%',
          background: warn ? 'var(--good)' : color,
          borderRadius: 'var(--r-pill)',
          transition: 'width 0.4s',
        }}
      />
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  half?: boolean;
}

function Field({ label, value, editing, onChange, type = 'text', placeholder, half }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '0 0 calc(50% - 8px)' : '1 1 100%' }}>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink4)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? label}
          style={{
            padding: '9px 12px',
            borderRadius: 10,
            border: '1.5px solid var(--accent)',
            background: '#fff',
            color: 'var(--ink)',
            fontSize: 14,
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <p style={{ fontSize: 14, color: value ? 'var(--ink)' : 'var(--ink4)', padding: '9px 0', borderBottom: '1px solid var(--hairline)', minHeight: 38 }}>
          {value || '—'}
        </p>
      )}
    </div>
  );
}

interface DesktopClientProfileProps {
  onNavigate: (v: DesktopView) => void;
}

export function DesktopClientProfile({ onNavigate }: DesktopClientProfileProps) {
  const { state, updateProfile } = useApp();
  const profile = state.profile;

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...profile });

  function set(key: keyof typeof draft) {
    return (v: string) => setDraft(d => ({ ...d, [key]: v }));
  }

  function handleSave() {
    updateProfile(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft({ ...profile });
    setEditing(false);
  }

  const plan = PLAN_CONFIG[billingInfo.plan];
  const billing = billingInfo;
  const usage = usageStats;

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const clientSinceFmt = fmtDate(usage.clientSince);
  const storagePct = Math.round((usage.photosStorageUsedMb / usage.photosStorageLimitMb) * 100);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        padding: '20px 36px 16px',
        borderBottom: '1px solid var(--hairline)',
        background: 'var(--paper)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <button
          onClick={() => onNavigate('today')}
          aria-label="Back to Today"
          style={{
            width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 10,
            background: 'var(--paper3)',
            color: 'var(--ink3)',
            flexShrink: 0,
          }}
        >
          <Icons.ChevronLeft s={16} c="var(--ink3)" />
        </button>
        <div style={{ flex: 1 }}>
          <Eyebrow style={{ marginBottom: 2 }}>Account</Eyebrow>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Client Profile</h1>
        </div>
        {editing ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button kind="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
            <Button kind="accent" size="sm" onClick={handleSave}>Save changes</Button>
          </div>
        ) : (
          <Button kind="ghost" size="sm" onClick={() => setEditing(true)}>
            <Icons.Plus s={13} c="var(--ink)" />
            Edit profile
          </Button>
        )}
      </header>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Identity card */}
          <Card pad={24}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <Avatar initials={profile.initials} color={profile.avatarColor} size={52} />
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                  {profile.firstName} {profile.lastName}
                </h2>
                <p style={{ fontSize: 13.5, color: 'var(--ink3)', marginTop: 2 }}>{profile.businessName}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--r-pill)',
                    background: plan.bg,
                    color: plan.color,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {plan.label} Plan
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--ink4)' }}>
                    Client since {clientSinceFmt}
                  </span>
                </div>
              </div>
            </div>

            <Eyebrow style={{ marginBottom: 16 }}>Business information</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <Field label="First name"    value={draft.firstName}   editing={editing} onChange={set('firstName')}   half />
              <Field label="Last name"     value={draft.lastName}    editing={editing} onChange={set('lastName')}    half />
              <Field label="Business name" value={draft.businessName} editing={editing} onChange={set('businessName')} />
              <Field label="Industry"      value={draft.industry}    editing={editing} onChange={set('industry')} />
              <Field label="Service area"  value={draft.serviceArea} editing={editing} onChange={set('serviceArea')} />
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--hairline)' }}>
              <Eyebrow style={{ marginBottom: 16 }}>Contact</Eyebrow>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <Field label="Email"   value={draft.email}   editing={editing} onChange={set('email')}   type="email" half />
                <Field label="Phone"   value={draft.phone}   editing={editing} onChange={set('phone')}   type="tel"   half />
                <Field label="Website" value={draft.website} editing={editing} onChange={set('website')} />
              </div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--hairline)' }}>
              <Eyebrow style={{ marginBottom: 16 }}>Address</Eyebrow>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <Field label="Street"  value={draft.address} editing={editing} onChange={set('address')} />
                <Field label="City"    value={draft.city}    editing={editing} onChange={set('city')}    half />
                <Field label="State"   value={draft.state}   editing={editing} onChange={set('state')}   half />
                <Field label="ZIP"     value={draft.zip}     editing={editing} onChange={set('zip')}     half />
              </div>
            </div>
          </Card>

          {/* Invoice history */}
          <Card pad={24}>
            <Eyebrow style={{ marginBottom: 16 }}>Invoice history</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {billing.invoices.map((inv, i) => (
                <div key={inv.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < billing.invoices.length - 1 ? '1px solid var(--hairline)' : 'none',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{inv.description}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink4)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                      {fmtDate(inv.date)}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: inv.status === 'paid' ? 'var(--good)' : inv.status === 'failed' ? '#dc2626' : 'var(--ink3)',
                  }}>
                    {inv.status === 'paid' ? '✓ ' : ''}${(inv.amountCents / 100).toFixed(0)}
                  </span>
                  <button style={{
                    fontSize: 12,
                    color: 'var(--accentInk)',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Plan & billing */}
          <Card pad={22}>
            <Eyebrow style={{ marginBottom: 14 }}>Plan & billing</Eyebrow>

            <div style={{
              background: plan.bg,
              borderRadius: 14,
              padding: '16px 18px',
              marginBottom: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: plan.color, marginBottom: 4 }}>
                    {plan.label} Plan
                  </p>
                  <p style={{ fontSize: 26, fontWeight: 700, color: plan.color, lineHeight: 1 }}>
                    {plan.price}
                    <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.7 }}>/mo</span>
                  </p>
                  <p style={{ fontSize: 12, color: plan.color, opacity: 0.75, marginTop: 4 }}>
                    Billed {billing.billingCycle}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--ink2)' }}>Next billing date</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                  {fmtDate(billing.nextBillingDate)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--ink2)' }}>Payment method</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                  {billing.cardBrand} ···· {billing.cardLast4}
                </span>
              </div>
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: '1px solid var(--hairline)',
                background: 'var(--paper)',
                color: 'var(--ink)',
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                Update payment method
                <Icons.ChevronRight s={14} c="var(--ink4)" />
              </button>
              <button style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 10,
                border: '1px solid var(--hairline)',
                background: 'var(--paper)',
                color: 'var(--accentInk)',
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                Upgrade to Pro
                <Icons.ChevronRight s={14} c="var(--accentInk)" />
              </button>
            </div>
          </Card>

          {/* Usage stats */}
          <Card pad={22}>
            <Eyebrow style={{ marginBottom: 16 }}>Usage this month</Eyebrow>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Posts */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--ink2)', fontWeight: 500 }}>Posts published</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink3)' }}>
                    {usage.postsPublishedThisMonth} / {usage.postsMonthlyLimit}
                  </span>
                </div>
                <UsageBar value={usage.postsPublishedThisMonth} max={usage.postsMonthlyLimit} />
                <p style={{ fontSize: 11.5, color: 'var(--ink4)', marginTop: 4 }}>
                  {usage.postsPublishedAllTime} total posts all time
                </p>
              </div>

              {/* Storage */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--ink2)', fontWeight: 500 }}>Photo storage</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink3)' }}>
                    {(usage.photosStorageUsedMb / 1024).toFixed(1)} GB / {(usage.photosStorageLimitMb / 1024).toFixed(0)} GB
                  </span>
                </div>
                <UsageBar value={usage.photosStorageUsedMb} max={usage.photosStorageLimitMb} />
                <p style={{ fontSize: 11.5, color: 'var(--ink4)', marginTop: 4 }}>
                  {storagePct}% used · {usage.photosCount} photos
                </p>
              </div>

              {/* Channels */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--ink2)', fontWeight: 500 }}>Channels connected</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink3)' }}>
                    {usage.channelsConnected} / {usage.channelsLimit}
                  </span>
                </div>
                <UsageBar value={usage.channelsConnected} max={usage.channelsLimit} />
              </div>

              {/* Seats */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--ink2)', fontWeight: 500 }}>Team seats</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink3)' }}>
                    {usage.teamSeats} / {usage.teamSeatsLimit}
                  </span>
                </div>
                <UsageBar value={usage.teamSeats} max={usage.teamSeatsLimit} />
              </div>
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'var(--ink3)' }}>Client since</span>
                <span style={{ fontSize: 12.5, color: 'var(--ink2)', fontFamily: 'var(--font-mono)' }}>{clientSinceFmt}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'var(--ink3)' }}>Last active</span>
                <span style={{ fontSize: 12.5, color: 'var(--ink2)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(usage.lastActiveAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at{' '}
                  {new Date(usage.lastActiveAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
