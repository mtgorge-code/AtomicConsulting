export type OwnerKind = 'you' | 'atomic' | 'named' | 'crew' | 'auto';

export interface Owner {
  kind: OwnerKind;
  label: string;
  initials: string | null;
  color: string;
}

export type PostState =
  | 'in-design'
  | 'draft'
  | 'scheduled'
  | 'posted'
  | 'review'
  | 'capture'
  | 'capture-crew'
  | 'shoot-day';

export interface User {
  id: string;
  firstName: string;
  initials: string;
  avatarColor: string;
  businessName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface Job {
  id: string;
  startsAt: string;
  endsAt: string;
  location: string;
  title: string;
  sub: string;
  jobType: 'capture' | 'crew-shoot' | 'estimate' | 'install';
}

export interface Shot {
  id: string;
  label: string;
  description: string;
  duration: string;
}

export interface CaptureBrief {
  id: string;
  jobId: string;
  owner: keyof typeof OWNERS;
  shots: Shot[];
  forPostId: string;
  status: 'pending' | 'submitted' | 'reassigned';
  pillar: string;
  source: string;
}

export interface Post {
  id: string;
  scheduledAt: string;
  channels: string[];
  title: string;
  state: PostState;
  owner: keyof typeof OWNERS;
  pillar: string;
  source: string;
  draftBody?: string;
  heroAsset?: string;
}

export interface Pillar {
  name: string;
  pct: number;
  done: number;
  total: number;
  color: string;
}

export interface Strategy {
  goal: string;
  lead: string;
  pillars: Pillar[];
}

export interface ConnectedChannel {
  platform: string;
  handle: string;
  status: 'active' | 'disconnected';
  lastSyncedAt: string;
}

export const OWNERS = {
  you:    { kind: 'you'    as OwnerKind, label: 'You',          initials: 'MR', color: 'var(--ink)' },
  atomic: { kind: 'atomic' as OwnerKind, label: 'Atomic',       initials: null, color: 'var(--accent)' },
  sarah:  { kind: 'named'  as OwnerKind, label: 'Sarah',        initials: 'SR', color: 'var(--sarah-color)' },
  david:  { kind: 'named'  as OwnerKind, label: 'David',        initials: 'DK', color: 'var(--david-color)' },
  marie:  { kind: 'named'  as OwnerKind, label: 'Marie',        initials: 'MA', color: 'var(--marie-color)' },
  crew:   { kind: 'crew'   as OwnerKind, label: 'Atomic crew',  initials: null, color: 'var(--accent)' },
  auto:   { kind: 'auto'   as OwnerKind, label: 'Auto',         initials: null, color: 'var(--ink2)' },
} as const;
