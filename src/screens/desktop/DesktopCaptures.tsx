import { useState, useMemo } from 'react';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Card } from '../../components/ui/Card';
import { Pill } from '../../components/ui/Pill';
import { Button } from '../../components/ui/Button';
import { OwnerChip } from '../../components/ui/OwnerChip';
import { Icons } from '../../components/icons';
import { capturedPhotos, jobs, posts } from '../../data';
import type { CapturedPhoto, PhotoStatus } from '../../types';

type FilterStatus = 'all' | PhotoStatus;
type FilterBy = 'you' | 'crew' | 'all';
type SortBy = 'newest' | 'oldest' | 'status';

const STATUS_CONFIG: Record<PhotoStatus, { label: string; bg: string; color: string }> = {
  submitted:  { label: 'Submitted',  bg: 'var(--paper3)',   color: 'var(--ink)' },
  'in-review':{ label: 'In review',  bg: 'oklch(0.92 0.04 240)', color: 'oklch(0.35 0.1 240)' },
  approved:   { label: 'Approved',   bg: 'var(--goodSoft)', color: 'var(--good)' },
  'in-use':   { label: 'In use',     bg: 'var(--accentSoft)', color: 'var(--accentInk)' },
  archived:   { label: 'Archived',   bg: 'var(--paper2)',   color: 'var(--ink4)' },
};

const STATUS_ORDER: PhotoStatus[] = ['submitted', 'in-review', 'approved', 'in-use', 'archived'];

function PhotoCard({
  photo,
  selected,
  onClick,
}: {
  photo: CapturedPhoto;
  selected: boolean;
  onClick: () => void;
}) {
  const sc = STATUS_CONFIG[photo.status];
  const job = jobs.find(j => j.id === photo.jobId);
  const date = new Date(photo.capturedAt);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${photo.shotLabel}, ${photo.status}, captured ${dateStr}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: selected ? '2px solid var(--accent)' : '1px solid var(--hairline)',
        cursor: 'pointer',
        background: 'var(--card)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: selected ? '0 0 0 3px var(--accentSoft)' : 'none',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        background: photo.colorHint,
        aspectRatio: String(photo.ratio),
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px)',
        }} aria-hidden="true" />
        {/* Status badge */}
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <span style={{
            display: 'inline-block',
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            background: sc.bg,
            color: sc.color,
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {sc.label}
          </span>
        </div>
        {/* Captured by */}
        <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            background: 'rgba(0,0,0,0.55)',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}>
            {photo.capturedBy === 'you' ? 'Mike' : 'Crew'}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>
          {photo.shotLabel}
        </p>
        <p style={{ fontSize: 11.5, color: 'var(--ink3)', marginBottom: 6 }}>
          {job?.location ?? 'Unknown site'}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: 'var(--ink4)',
          }}>
            {dateStr} · {timeStr}
          </span>
          {photo.usedInPostId && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              color: 'var(--accentInk)',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}>
              Used ↗
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotoDetail({ photo, onClose }: { photo: CapturedPhoto; onClose: () => void }) {
  const sc = STATUS_CONFIG[photo.status];
  const job = jobs.find(j => j.id === photo.jobId);
  const usedInPost = photo.usedInPostId ? posts.find(p => p.id === photo.usedInPostId) : null;
  const date = new Date(photo.capturedAt);

  return (
    <div style={{
      width: 340,
      borderLeft: '1px solid var(--hairline)',
      background: 'var(--card)',
      flexShrink: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        borderBottom: '1px solid var(--hairline)',
        gap: 10,
      }}>
        <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', flex: 1 }}>Photo detail</h2>
        <button
          onClick={onClose}
          aria-label="Close detail panel"
          style={{
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r-pill)',
            background: 'var(--paper3)',
            color: 'var(--ink2)',
          }}>
          <Icons.X s={15} c="var(--ink3)" />
        </button>
      </div>

      {/* Large thumbnail */}
      <div style={{
        background: photo.colorHint,
        aspectRatio: String(photo.ratio),
        position: 'relative',
        overflow: 'hidden',
        margin: 16,
        borderRadius: 12,
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 10px)',
        }} aria-hidden="true" />
      </div>

      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Status + actions */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{
              padding: '4px 10px',
              borderRadius: 'var(--r-pill)',
              background: sc.bg,
              color: sc.color,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>{sc.label}</span>
            {photo.reviewedBy && (
              <span style={{ fontSize: 12, color: 'var(--ink4)' }}>
                Reviewed by {photo.reviewedBy.charAt(0).toUpperCase() + photo.reviewedBy.slice(1)}
              </span>
            )}
          </div>
          {(photo.status === 'submitted' || photo.status === 'in-review') && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button kind="accent" size="sm" style={{ flex: 1 }}>Approve</Button>
              <Button kind="ghost" size="sm">Archive</Button>
            </div>
          )}
          {photo.status === 'approved' && (
            <Button kind="soft" size="sm" style={{ width: '100%' }}>Use in a post →</Button>
          )}
        </div>

        {/* Shot info */}
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
          <Eyebrow style={{ marginBottom: 8 }}>Shot details</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Shot', value: photo.shotLabel },
              { label: 'Site', value: job?.location ?? '—' },
              { label: 'Job', value: job?.title ?? '—' },
              { label: 'Captured', value: date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) },
              { label: 'By', value: photo.capturedBy === 'you' ? 'Mike Reyes (you)' : 'Atomic crew' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--ink4)', width: 70, flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.4, fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Used in post */}
        {usedInPost && (
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
            <Eyebrow style={{ marginBottom: 8 }}>Used in</Eyebrow>
            <div style={{
              background: 'var(--accentSoft)',
              borderRadius: 10,
              padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                {usedInPost.channels.map(ch => (
                  <Pill key={ch} tone="ghost" size="sm">{ch}</Pill>
                ))}
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accentInk)', lineHeight: 1.35 }}>
                {usedInPost.title}
              </p>
              <p style={{ fontSize: 11.5, color: 'var(--accentInk)', opacity: 0.7, marginTop: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {new Date(usedInPost.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' · '}{usedInPost.state}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {photo.notes && (
          <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
            <Eyebrow style={{ marginBottom: 6 }}>Notes</Eyebrow>
            <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}>{photo.notes}</p>
          </div>
        )}

        {/* Download */}
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
          <Button kind="ghost" size="sm" style={{ width: '100%' }}>
            Download full resolution
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DesktopCaptures() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: capturedPhotos.length };
    STATUS_ORDER.forEach(s => {
      c[s] = capturedPhotos.filter(p => p.status === s).length;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = [...capturedPhotos];
    if (filterStatus !== 'all') list = list.filter(p => p.status === filterStatus);
    if (filterBy !== 'all') list = list.filter(p => p.capturedBy === filterBy);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.shotLabel.toLowerCase().includes(q) ||
        (jobs.find(j => j.id === p.jobId)?.location ?? '').toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'newest') return b.capturedAt.localeCompare(a.capturedAt);
      if (sortBy === 'oldest') return a.capturedAt.localeCompare(b.capturedAt);
      return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
    });
    return list;
  }, [filterStatus, filterBy, sortBy, search]);

  const selectedPhoto = selectedId ? capturedPhotos.find(p => p.id === selectedId) ?? null : null;

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{
        padding: '20px 32px 16px',
        borderBottom: '1px solid var(--hairline)',
        background: 'var(--paper)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <Eyebrow style={{ marginBottom: 3 }}>Media library</Eyebrow>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Captures</h1>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--ink3)', paddingBottom: 2 }}>
            {capturedPhotos.length} photos · {counts['submitted'] + counts['in-review']} need attention
          </p>
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Status filter pills */}
          <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
            {([['all', 'All'], ...STATUS_ORDER.map(s => [s, STATUS_CONFIG[s].label])] as [string, string][]).map(([s, label]) => {
              const active = filterStatus === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s as FilterStatus)}
                  aria-pressed={active}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--r-pill)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    background: active ? 'var(--ink)' : 'var(--paper3)',
                    color: active ? '#fff' : 'var(--ink3)',
                    border: 'none',
                    cursor: 'pointer',
                    minHeight: 34,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  {label}
                  {counts[s] != null && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      background: active ? 'rgba(255,255,255,0.2)' : 'var(--paper2)',
                      color: active ? '#fff' : 'var(--ink4)',
                      padding: '1px 6px',
                      borderRadius: 'var(--r-pill)',
                    }}>
                      {counts[s]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* By filter */}
          <select
            value={filterBy}
            onChange={e => setFilterBy(e.target.value as FilterBy)}
            aria-label="Filter by captured by"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--hairline)',
              background: 'var(--card)',
              color: 'var(--ink)',
              fontSize: 13,
              minHeight: 34,
              cursor: 'pointer',
            }}
          >
            <option value="all">All sources</option>
            <option value="you">Your shots</option>
            <option value="crew">Crew shots</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            aria-label="Sort photos"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--hairline)',
              background: 'var(--card)',
              color: 'var(--ink)',
              fontSize: 13,
              minHeight: 34,
              cursor: 'pointer',
            }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="status">By status</option>
          </select>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search shots or sites…"
              aria-label="Search captures"
              style={{
                padding: '6px 12px 6px 34px',
                borderRadius: 8,
                border: '1px solid var(--hairline)',
                background: 'var(--card)',
                color: 'var(--ink)',
                fontSize: 13,
                minHeight: 34,
                width: 200,
                outline: 'none',
              }}
            />
            <Icons.Compass s={14} c="var(--ink4)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Grid */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 28px',
        }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <p style={{ fontSize: 16, color: 'var(--ink3)' }}>No photos match those filters.</p>
            </div>
          ) : (
            <>
              {/* Group by date */}
              {(() => {
                const groups: { dateKey: string; label: string; photos: CapturedPhoto[] }[] = [];
                for (const photo of filtered) {
                  const dk = photo.capturedAt.slice(0, 10);
                  let g = groups.find(g => g.dateKey === dk);
                  if (!g) {
                    const d = new Date(photo.capturedAt);
                    const label = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                    g = { dateKey: dk, label, photos: [] };
                    groups.push(g);
                  }
                  g.photos.push(photo);
                }
                return groups.map(group => (
                  <div key={group.dateKey} style={{ marginBottom: 28 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 12,
                    }}>
                      <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink2)', whiteSpace: 'nowrap' }}>
                        {group.label}
                      </h2>
                      <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink4)', whiteSpace: 'nowrap' }}>
                        {group.photos.length} photo{group.photos.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 12,
                    }} role="list" aria-label={`Photos from ${group.label}`}>
                      {group.photos.map(photo => (
                        <div key={photo.id} role="listitem">
                          <PhotoCard
                            photo={photo}
                            selected={selectedId === photo.id}
                            onClick={() => setSelectedId(prev => prev === photo.id ? null : photo.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </>
          )}
        </div>

        {/* Detail panel */}
        {selectedPhoto && (
          <PhotoDetail
            photo={selectedPhoto}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}
