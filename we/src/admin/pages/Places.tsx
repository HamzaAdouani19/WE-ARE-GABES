
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  MapPin,
  ExternalLink,
  Plus,
  Pencil,
  Trash2,
  LoaderCircle,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

type PublicationStatus = 'draft' | 'published';
type StatusFilter = 'all' | PublicationStatus;

interface Place {
  id: string;
  slug: string;
  delegation_id: string | null;
  dimension: string | null;
  publication_status: PublicationStatus;
  latitude: number | null;
  longitude: number | null;
  sort_order: number | null;
}

interface PlacesProps {
  onCreate: () => void;
  onEdit: (placeId: string) => void;
}

export default function Places({ onCreate, onEdit }: PlacesProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPlaces = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('places')
        .select(
          'id, slug, delegation_id, dimension, publication_status, latitude, longitude, sort_order',
        )
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true });

      if (queryError) throw queryError;

      setPlaces((data ?? []) as Place[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load places.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlaces();
  }, [loadPlaces]);

  const handleDelete = async (place: Place) => {
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${place.slug}" (${place.id})?\n\nThis will delete the place, its translations and gallery records.\n\nStorage images will NOT be deleted.\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(place.id);
    setError(null);

    try {
      // 1. Delete translations.
      const { error: translationsError } = await supabase
        .from('place_translations')
        .delete()
        .eq('place_id', place.id);

      if (translationsError) throw translationsError;

      // 2. Delete gallery database records.
      const { error: galleryError } = await supabase
        .from('place_gallery')
        .delete()
        .eq('place_id', place.id);

      if (galleryError) throw galleryError;

      // 3. Delete the place itself.
      const { error: placeError } = await supabase
        .from('places')
        .delete()
        .eq('id', place.id);

      if (placeError) throw placeError;

      setPlaces((current) =>
        current.filter((item) => item.id !== place.id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? `Unable to delete place: ${err.message}`
          : 'Unable to delete place.',
      );

      // Reload to reflect the actual database state.
      void loadPlaces();
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPlaces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return places.filter((place) => {
      const matchesSearch =
        !normalizedSearch ||
        place.id.toLowerCase().includes(normalizedSearch) ||
        place.slug.toLowerCase().includes(normalizedSearch) ||
        (place.delegation_id ?? '').toLowerCase().includes(normalizedSearch) ||
        (place.dimension ?? '').toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'all' ||
        place.publication_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [places, search, statusFilter]);

  const publishedCount = places.filter(
    (place) => place.publication_status === 'published',
  ).length;

  return (
    <div className="admin-places">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">CONTENT MANAGEMENT</span>
          <h2>Places</h2>
          <p>
            Manage the destinations and locations featured on
            WE ARE GABÈS.
          </p>
        </div>

        <div className="admin-heading-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => void loadPlaces()}
            disabled={loading || deletingId !== null}
          >
            <RefreshCw
              size={16}
              className={loading ? 'admin-spin' : ''}
            />
            Refresh
          </button>

          <button
            type="button"
            className="admin-primary-button"
            onClick={onCreate}
            disabled={deletingId !== null}
          >
            <Plus size={17} />
            Add place
          </button>
        </div>
      </div>

      <div className="admin-places-summary">
        <div>
          <span>Total places</span>
          <strong>{places.length}</strong>
        </div>

        <div>
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>

        <div>
          <span>Drafts</span>
          <strong>{places.length - publishedCount}</strong>
        </div>
      </div>

      <section className="admin-table-card">
        <div className="admin-table-toolbar">
          <div className="admin-search-field">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search places, slugs, delegations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className="admin-filter-select"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            aria-label="Filter by publication status"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {error && (
          <div className="admin-error-message" role="alert">
            {error}
            <button type="button" onClick={() => void loadPlaces()}>
              Try again
            </button>
          </div>
        )}

        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>PLACE</th>
                <th>DELEGATION</th>
                <th>DIMENSION</th>
                <th>LOCATION</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Loading places...
                  </td>
                </tr>
              ) : filteredPlaces.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    <MapPin size={25} />
                    <strong>No places found</strong>
                    <span>
                      Try changing your search or add a new place.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredPlaces.map((place) => (
                  <tr key={place.id}>
                    <td>
                      <div className="admin-place-name">
                        <strong>{place.slug || place.id}</strong>
                        <span>{place.id}</span>
                      </div>
                    </td>

                    <td>{place.delegation_id || '—'}</td>
                    <td>{place.dimension || '—'}</td>

                    <td>
                      {place.latitude != null &&
                      place.longitude != null ? (
                        <a
                          className="admin-map-link"
                          href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View map
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        'Not set'
                      )}
                    </td>

                    <td>
                      <span
                        className={`admin-status-badge ${
                          place.publication_status === 'published'
                            ? 'published'
                            : 'draft'
                        }`}
                      >
                        {place.publication_status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="admin-icon-button"
                        onClick={() => onEdit(place.id)}
                        disabled={deletingId !== null}
                        aria-label={`Edit ${place.slug}`}
                        title="Edit place"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="admin-icon-button admin-delete-button"
                        onClick={() => void handleDelete(place)}
                        disabled={deletingId !== null}
                        aria-label={`Delete ${place.slug}`}
                        title="Delete place"
                      >
                        {deletingId === place.id ? (
                          <LoaderCircle
                            size={16}
                            className="admin-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-table-footer">
          <span>
            Showing {filteredPlaces.length} of {places.length} places
          </span>
        </div>
      </section>
    </div>
  );
}
