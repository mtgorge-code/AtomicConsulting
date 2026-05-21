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
  lastName: string;
  initials: string;
  avatarColor: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  serviceArea: string;
}

export type BillingPlan = 'starter' | 'growth' | 'pro';

export interface BillingInvoice {
  id: string;
  date: string;
  amountCents: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export interface BillingInfo {
  plan: BillingPlan;
  billingCycle: 'monthly' | 'annual';
  amountCents: number;
  nextBillingDate: string;
  cardBrand: string;
  cardLast4: string;
  invoices: BillingInvoice[];
}

export interface UsageStats {
  postsPublishedThisMonth: number;
  postsPublishedAllTime: number;
  postsMonthlyLimit: number;
  photosCount: number;
  photosStorageUsedMb: number;
  photosStorageLimitMb: number;
  channelsConnected: number;
  channelsLimit: number;
  teamSeats: number;
  teamSeatsLimit: number;
  clientSince: string;
  lastActiveAt: string;
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

export type PhotoStatus = 'submitted' | 'in-review' | 'approved' | 'in-use' | 'archived';

export interface CapturedPhoto {
  id: string;
  jobId: string;
  briefId: string;
  shotLabel: string;
  capturedAt: string;
  capturedBy: 'you' | 'crew';
  status: PhotoStatus;
  usedInPostId?: string;
  reviewedBy?: string;
  notes?: string;
  ratio: number;
  colorHint: string;
}

export type DesktopView = 'today' | 'captures' | 'plan' | 'strategy' | 'results' | 'integrations' | 'profile';

export type IntegrationCategory = 'analytics' | 'social' | 'crm' | 'calls' | 'booking' | 'payments';
export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  accountName?: string;
  lastSyncedAt?: string;
  logoColor: string;
  logoText: string;
}

export interface PostPerformance {
  postId: string;
  period: string;
  reach: number;
  profileVisits: number;
  websiteClicks: number;
  callsAttributed: number;
  formSubmissions: number;
  bookingsAttributed: number;
  revenueAttributed: number;
}

export interface ResultsPeriod {
  label: string;
  value: 'this-month' | 'last-month' | '90-days' | 'all-time';
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
