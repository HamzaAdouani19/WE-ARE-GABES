
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Search,
  RefreshCw,
  Pencil,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

type Locale = 'en' | 'ar' | 'fr';

interface Story {
  id: string;
  place_id: string;
  locale: Locale;
  title: string | null;
  story_lead: string | null;
  story_body: string | null;
}

interface StoriesProps {
  onEditPlace?: (placeId: string) => void;
}

export default function Stories({
  onEditPlace,
}: StoriesProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [localeFilter, setLocaleFilter] =
    useState<'all' | Locale>('all');

  const loadStories = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('place_translations')
        .select(
          'id, place_id, locale, title, story_lead, story_body',
        )
        .not('story_body', 'is', null)
        .order('place_id', { ascending: true });

      if (queryError) throw queryError;

      setStories((data ?? []) as Story[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load stories.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStories();
  }, [loadStories]);

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return stories.filter((story) => {
      const matchesSearch =
        !query ||
        story.place_id.toLowerCase().includes(query) ||
        (story.title ?? '').toLowerCase().includes(query) ||
        (story.story_lead ?? '').toLowerCase().includes(query) ||
        (story.story_body ?? '').toLowerCase().includes(query);

      const matchesLocale =
        localeFilter === 'all' ||
        story.locale === localeFilter;

      return matchesSearch && matchesLocale;
    });
  }, [stories, search, localeFilter]);

  const localeCounts = {
    en: stories.filter((story) => story.locale === 'en').length,
    ar: stories.filter((story) => story.locale === 'ar').length,
    fr: stories.filter((story) => story.locale === 'fr').length,
  };

  return (
    <div className="admin-stories">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">EDITORIAL CONTENT</span>
          <h2>Stories</h2>
          <p>
            Explore and manage the stories behind the places of Gabès.
          </p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={() => void loadStories()}
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={loading ? 'admin-spin' : ''}
          />
          Refresh
        </button>
      </div>

      <div className="admin-places-summary">
        <div>
          <span>Total stories</span>
          <strong>{stories.length}</strong>
        </div>

        <div>
          <span>English</span>
          <strong>{localeCounts.en}</strong>
        </div>

        <div>
          <span>Arabic</span>
          <strong>{localeCounts.ar}</strong>
        </div>

        <div>
          <span>French</span>
          <strong>{localeCounts.fr}</strong>
        </div>
      </div>

      <section className="admin-table-card">
        <div className="admin-table-toolbar">
          <div className="admin-search-field">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search stories or place IDs..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className="admin-filter-select"
            value={localeFilter}
            onChange={(event) =>
              setLocaleFilter(event.target.value as 'all' | Locale)
            }
            aria-label="Filter stories by language"
          >
            <option value="all">All languages</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>
        </div>

        {error && (
          <div className="admin-error-message" role="alert">
            {error}
            <button
              type="button"
              onClick={() => void loadStories()}
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="admin-table-empty">
            Loading stories...
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="admin-table-empty">
            <BookOpen size={26} />
            <strong>No stories found</strong>
            <span>
              Stories appear here when a translation has a story body.
            </span>
          </div>
        ) : (
          <div className="admin-story-list">
            {filteredStories.map((story) => (
              <article className="admin-story-card" key={story.id}>
                <div className="admin-story-card-content">
                  <div className="admin-story-meta">
                    <span className="admin-status-badge">
                      {story.locale.toUpperCase()}
                    </span>
                    <span>Place: {story.place_id}</span>
                  </div>

                  <h3>
                    {story.title || 'Untitled story'}
                  </h3>

                  <p>
                    {story.story_lead ||
                      story.story_body?.slice(0, 180) ||
                      'No story content available.'}
                  </p>
                </div>

                {onEditPlace && (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => onEditPlace(story.place_id)}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="admin-table-footer">
          <span>
            Showing {filteredStories.length} of {stories.length} stories
          </span>
        </div>
      </section>
    </div>
  );
}
