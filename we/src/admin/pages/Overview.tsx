
import { useCallback, useEffect, useState } from 'react';
import {
  MapPin,
  Globe,
  Images,
  BookOpen,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

interface DashboardStats {
  places: number;
  publishedPlaces: number;
  translations: number;
  media: number;
}

const initialStats: DashboardStats = {
  places: 0,
  publishedPlaces: 0,
  translations: 0,
  media: 0,
};

export default function Overview() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [
        placesResult,
        publishedResult,
        translationsResult,
        mediaResult,
      ] = await Promise.all([
        supabase
          .from('places')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('places')
          .select('*', { count: 'exact', head: true })
          .eq('publication_status', 'published'),

        supabase
          .from('place_translations')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('place_gallery')
          .select('*', { count: 'exact', head: true }),
      ]);

      const results = [
        placesResult,
        publishedResult,
        translationsResult,
        mediaResult,
      ];

      const failedResult = results.find((result) => result.error);

      if (failedResult?.error) {
        throw failedResult.error;
      }

      setStats({
        places: placesResult.count ?? 0,
        publishedPlaces: publishedResult.count ?? 0,
        translations: translationsResult.count ?? 0,
        media: mediaResult.count ?? 0,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load dashboard statistics.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const cards = [
    {
      label: 'Total Places',
      value: stats.places,
      icon: MapPin,
      description: 'All registered places',
    },
    {
      label: 'Published Places',
      value: stats.publishedPlaces,
      icon: Globe,
      description: 'Visible on the public website',
    },
    {
      label: 'Translations',
      value: stats.translations,
      icon: BookOpen,
      description: 'Available language entries',
    },
    {
      label: 'Gallery Images',
      value: stats.media,
      icon: Images,
      description: 'Images linked to places',
    },
  ];

  return (
    <div className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">YOUR WORKSPACE</span>
          <h2>Good to see you.</h2>
          <p>
            Here's an overview of your WE ARE GABÈS content.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={() => void loadStats()}
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={loading ? 'admin-spin' : ''}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-error-message" role="alert">
          {error}
        </div>
      )}

      <section className="admin-stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="admin-stat-card" key={card.label}>
              <div className="admin-stat-card-top">
                <span>{card.label}</span>
                <div className="admin-stat-icon">
                  <Icon size={19} strokeWidth={1.7} />
                </div>
              </div>

              <strong className="admin-stat-value">
                {loading ? '—' : card.value.toLocaleString()}
              </strong>

              <span className="admin-stat-description">
                {card.description}
              </span>
            </article>
          );
        })}
      </section>

      <section className="admin-overview-bottom">
        <article className="admin-welcome-card">
          <div>
            <span className="admin-eyebrow">THE DIGITAL EXPERIENCE</span>
            <h3>Discover the stories of Gabès.</h3>
            <p>
              Manage the places, stories and cultural dimensions
              that make Gabès unique.
            </p>
          </div>

          <div className="admin-welcome-decoration">WG</div>
        </article>

        <article className="admin-quick-info">
          <div className="admin-quick-info-heading">
            <div>
              <span className="admin-eyebrow">CONTENT STATUS</span>
              <h3>Publishing overview</h3>
            </div>
            <ArrowUpRight size={18} />
          </div>

          <div className="admin-progress-row">
            <div className="admin-progress-label">
              <span>Published places</span>
              <strong>
                {loading
                  ? '—'
                  : `${stats.publishedPlaces} / ${stats.places}`}
              </strong>
            </div>

            <div className="admin-progress-track">
              <div
                className="admin-progress-fill"
                style={{
                  width: `${
                    stats.places > 0
                      ? Math.min(
                          (stats.publishedPlaces / stats.places) * 100,
                          100,
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <p className="admin-quick-info-note">
            Only published places are displayed on the public website.
          </p>
        </article>
      </section>
    </div>
  );
}
