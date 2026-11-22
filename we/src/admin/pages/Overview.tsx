
import { useEffect, useState } from 'react';
import {
  Activity,
  Compass,
  FileText,
  MapPin,
  RefreshCw,
  Tags,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

export default function Overview({
  onOpenPlaces,
}: {
  onOpenPlaces: () => void;
}) {
  const [stats, setStats] = useState({
    places: 0,
    published: 0,
    drafts: 0,
    delegations: 0,
    dimensions: 0,
  });

  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadStatistics() {
      if (!supabase) {
        setError('Supabase is not configured. Check your environment variables.');
        setBusy(false);
        return;
      }

      setBusy(true);
      setError(null);

      try {
        const [
          placesResult,
          publishedResult,
          draftsResult,
          delegationsResult,
          dimensionsResult,
        ] = await Promise.all([
          supabase
            .from('places')
            .select('id', { count: 'exact', head: true }),

          supabase
            .from('places')
            .select('id', { count: 'exact', head: true })
            .eq('publication_status', 'published'),

          supabase
            .from('places')
            .select('id', { count: 'exact', head: true })
            .eq('publication_status', 'draft'),

          supabase
            .from('delegations')
            .select('id', { count: 'exact', head: true }),

          supabase
            .from('cultural_dimensions')
            .select('key', { count: 'exact', head: true }),
        ]);

        if (!active) return;

        const errors = [
          { table: 'places', error: placesResult.error },
          { table: 'published places', error: publishedResult.error },
          { table: 'draft places', error: draftsResult.error },
          { table: 'delegations', error: delegationsResult.error },
          { table: 'cultural_dimensions', error: dimensionsResult.error },
        ].filter((item) => item.error !== null);

        setStats({
          places: placesResult.count ?? 0,
          published: publishedResult.count ?? 0,
          drafts: draftsResult.count ?? 0,
          delegations: delegationsResult.count ?? 0,
          dimensions: dimensionsResult.count ?? 0,
        });

        if (errors.length > 0) {
          setError(
            errors
              .map(
                (item) =>
                  `${item.table}: ${item.error?.message ?? 'Unknown error'}`,
              )
              .join(' | '),
          );
        }
      } catch (err) {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : 'Unexpected error while loading dashboard statistics.',
        );
      } finally {
        if (active) setBusy(false);
      }
    }

    void loadStatistics();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const cards = [
    { label: 'Total places', value: stats.places, icon: MapPin },
    { label: 'Published', value: stats.published, icon: Activity },
    { label: 'Drafts', value: stats.drafts, icon: FileText },
    { label: 'Delegations', value: stats.delegations, icon: Compass },
    { label: 'Dimensions', value: stats.dimensions, icon: Tags },
  ];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">YOUR REGION, YOUR STORIES</p>
          <h1>Overview</h1>
          <p className="admin-muted">
            A clear view of the content powering your digital destination.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="admin-secondary-btn compact"
            onClick={() => setReloadKey((current) => current + 1)}
            disabled={busy}
          >
            <RefreshCw
              size={15}
              className={busy ? 'admin-spin' : ''}
            />
            {busy ? 'Loading...' : 'Refresh'}
          </button>

          <button
            type="button"
            className="admin-secondary-btn compact"
            onClick={onOpenPlaces}
          >
            Manage content <span>→</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-error-message" role="alert">
          <strong>Unable to load all dashboard statistics.</strong>
          <p>{error}</p>
          <button
            type="button"
            className="admin-secondary-btn compact"
            onClick={() => setReloadKey((current) => current + 1)}
            disabled={busy}
          >
            Try again
          </button>
        </div>
      )}

      <div className="admin-stats-grid">
        {cards.map(({ label, value, icon: Icon }) => (
          <div className="admin-stat-card" key={label}>
            <div className="admin-stat-top">
              <span>{label}</span>
              <Icon size={18} />
            </div>

            <strong>{busy ? '—' : value}</strong>

            <span className="admin-stat-note">
              Live database count
            </span>
          </div>
        ))}
      </div>

      <div className="admin-panel admin-welcome-panel">
        <div className="admin-welcome-icon">
          <Compass size={22} />
        </div>

        <div>
          <h2>Welcome to your content studio</h2>
          <p>
            Manage places, stories, imagery and translations from one
            private workspace. Your public website remains a separate
            experience.
          </p>
        </div>
      </div>
    </>
  );
}
