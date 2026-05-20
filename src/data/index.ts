import type { User, TeamMember, Job, CaptureBrief, Post, Strategy, ConnectedChannel } from '../types';

export const user: User = {
  id: 'u1',
  firstName: 'Mike',
  initials: 'MR',
  avatarColor: 'var(--ink)',
  businessName: 'Cardinal Landscape Co.',
};

export const team: TeamMember[] = [
  { id: 't1', name: 'Sarah', role: 'Designer', initials: 'SR', color: 'var(--sarah-color)' },
  { id: 't2', name: 'David', role: 'Strategist', initials: 'DK', color: 'var(--david-color)' },
  { id: 't3', name: 'Marie', role: 'Coordinator', initials: 'MA', color: 'var(--marie-color)' },
];

export const jobs: Job[] = [
  {
    id: 'j1',
    startsAt: '2026-05-21T08:00:00',
    endsAt:   '2026-05-21T11:00:00',
    location: 'Riverside Ave',
    title: 'Riverside stone wall — day 2',
    sub: 'Finishing back wall + cleanup',
    jobType: 'capture',
  },
  {
    id: 'j2',
    startsAt: '2026-05-21T15:00:00',
    endsAt:   '2026-05-21T17:00:00',
    location: 'Maple Ridge',
    title: 'Maple Ridge — mulch install',
    sub: 'Crew handles full install',
    jobType: 'crew-shoot',
  },
];

export const captureBriefs: CaptureBrief[] = [
  {
    id: 'cb1',
    jobId: 'j1',
    owner: 'you',
    shots: [
      { id: 's1', label: '01 Wide · full wall', description: 'Stand 8 feet back. Capture the whole wall against the lawn.', duration: '~10 sec' },
      { id: 's2', label: '02 Hands on stone', description: 'Close up — gloved hands setting the final cap stone.', duration: '~10 sec' },
      { id: 's3', label: '03 Crew shot', description: 'Step back. Get 2–3 crew members with the finished wall behind them.', duration: '~10 sec' },
    ],
    forPostId: 'p2',
    status: 'pending',
    pillar: 'Show the craft',
    source: 'Riverside stone wall reveal',
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    scheduledAt: '2026-05-21T10:00:00',
    channels: ['Instagram'],
    title: 'Before-and-after: Eastside patio transformation',
    state: 'scheduled',
    owner: 'atomic',
    pillar: 'Show the craft',
    source: 'Eastside patio shoot',
  },
  {
    id: 'p2',
    scheduledAt: '2026-05-21T10:00:00',
    channels: ['Instagram'],
    title: 'Stone wall reveal — Riverside Ave',
    state: 'capture',
    owner: 'you',
    pillar: 'Show the craft',
    source: 'Riverside stone wall reveal',
  },
  {
    id: 'p3',
    scheduledAt: '2026-05-22T09:00:00',
    channels: ['Facebook', 'Instagram'],
    title: 'How we prep for hardscape — behind the scenes',
    state: 'in-design',
    owner: 'sarah',
    pillar: 'Behind the scenes',
    source: 'Stock + archive',
  },
  {
    id: 'p4',
    scheduledAt: '2026-05-22T10:00:00',
    channels: ['LinkedIn'],
    title: 'Why we always dry-fit before mortaring',
    state: 'draft',
    owner: 'you',
    pillar: 'Expertise',
    source: 'Mike voice notes',
    draftBody: "Most people don't realize that dry-fitting every stone before we mortar is what separates a wall that lasts 20 years from one that cracks in three. We lay it all out, check the levels, then pull it apart and do it right.\n\nThat extra hour saves the homeowner thousands. It's just how we work.\n\n#hardscape #landscaping #Westhaven",
  },
  {
    id: 'p5',
    scheduledAt: '2026-05-23T10:00:00',
    channels: ['Instagram', 'Facebook'],
    title: 'Maple Ridge mulch install — time-lapse',
    state: 'capture-crew',
    owner: 'crew',
    pillar: 'Show the craft',
    source: 'Maple Ridge crew shoot',
  },
  {
    id: 'p6',
    scheduledAt: '2026-05-24T09:00:00',
    channels: ['Google Business'],
    title: 'Spring landscaping — are you ready for summer?',
    state: 'scheduled',
    owner: 'atomic',
    pillar: 'Local presence',
    source: 'Seasonal template',
  },
  {
    id: 'p7',
    scheduledAt: '2026-05-25T10:00:00',
    channels: ['Instagram'],
    title: 'What a full-season maintenance plan looks like',
    state: 'in-design',
    owner: 'david',
    pillar: 'Expertise',
    source: 'Strategy doc',
  },
];

export const strategy: Strategy = {
  goal: 'Become the hardscape name in Westhaven by August.',
  lead: "On track. You're showing the craft, and customers are seeing the work — not the ads.",
  pillars: [
    { name: 'Show the craft',    pct: 40, done: 8,  total: 12, color: 'var(--accent)' },
    { name: 'Behind the scenes', pct: 25, done: 4,  total: 7,  color: 'var(--ink)' },
    { name: 'Expertise',         pct: 20, done: 5,  total: 8,  color: 'var(--good)' },
    { name: 'Local presence',    pct: 15, done: 2,  total: 5,  color: 'var(--ink5)' },
  ],
};

export const connectedChannels: ConnectedChannel[] = [
  { platform: 'Instagram',      handle: '@cardinallandscape', status: 'active', lastSyncedAt: '2026-05-21T09:00:00' },
  { platform: 'Facebook',       handle: 'Cardinal Landscape Co.', status: 'active', lastSyncedAt: '2026-05-21T09:00:00' },
  { platform: 'Google Business', handle: 'Cardinal Landscape Co.', status: 'active', lastSyncedAt: '2026-05-21T08:30:00' },
  { platform: 'LinkedIn',       handle: 'Cardinal Landscape Co.', status: 'active', lastSyncedAt: '2026-05-21T08:00:00' },
];
