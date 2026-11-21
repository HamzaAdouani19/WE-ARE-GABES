
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Save, LoaderCircle } from 'lucide-react';

import { supabase } from '../../lib/supabase';

type Locale = 'en' | 'ar' | 'fr';
type PublicationStatus = 'draft' | 'published';

interface PlaceEditorProps {
  placeId?: string | null;
  onBack: () => void;
}

interface TranslationForm {
  title: string;
  subtitle: string;
  summary: string;
  story_lead: string;
  story_body: string;
  cultural_note: string;
  local_life: string;
  image_caption: string;
  best_season: string;
  access: string;
  highlight: string;
}

interface PlaceForm {
  id: string;
  slug: string;
  delegation_id: string;
  dimension: string;
  secondary_dimensions: string;
  latitude: string;
  longitude: string;
  elevation_meters: string;
  main_image: string;
  publication_status: PublicationStatus;
  sort_order: string;
}

interface Option {
  id: string;
  label: string;
}

const emptyTranslation: TranslationForm = {
  title: '',
  subtitle: '',
  summary: '',
  story_lead: '',
  story_body: '',
  cultural_note: '',
  local_life: '',
  image_caption: '',
  best_season: '',
  access: '',
  highlight: '',
};

const emptyPlace: PlaceForm = {
  id: '',
  slug: '',
  delegation_id: '',
  dimension: '',
  secondary_dimensions: '',
  latitude: '',
  longitude: '',
  elevation_meters: '',
  main_image: '',
  publication_status: 'draft',
  sort_order: '0',
};

const locales: { id: Locale; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'العربية' },
  { id: 'fr', label: 'Français' },
];

function parseJsonLabel(value: unknown): string {
  if (typeof value === 'string') return value;

  if (value && typeof value === 'object') {
    const labels = value as Record<string, unknown>;
    return String(labels.en ?? labels.fr ?? labels.ar ?? '');
  }

  return '';
}

export default function PlaceEditor({
  placeId = null,
  onBack,
}: PlaceEditorProps) {
  const [form, setForm] = useState<PlaceForm>(emptyPlace);
  const [translations, setTranslations] = useState<
    Record<Locale, TranslationForm>
  >({
    en: { ...emptyTranslation },
    ar: { ...emptyTranslation },
    fr: { ...emptyTranslation },
  });

  const [activeLocale, setActiveLocale] = useState<Locale>('en');
  const [delegations, setDelegations] = useState<Option[]>([]);
  const [dimensions, setDimensions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(Boolean(placeId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadEditorData() {
      if (!supabase) {
        setError('Supabase is not configured.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [
          delegationsResult,
          dimensionsResult,
          placeResult,
          translationsResult,
        ] = await Promise.all([
          supabase
            .from('delegations')
            .select('id, name')
            .order('id'),

          supabase
            .from('cultural_dimensions')
            .select('key, label')
            .order('sort_order'),

          placeId
            ? supabase
                .from('places')
                .select('*')
                .eq('id', placeId)
                .single()
            : Promise.resolve({ data: null, error: null }),

          placeId
            ? supabase
                .from('place_translations')
                .select('*')
                .eq('place_id', placeId)
            : Promise.resolve({ data: [], error: null }),
        ]);

        if (delegationsResult.error) throw delegationsResult.error;
        if (dimensionsResult.error) throw dimensionsResult.error;
        if (placeResult.error) throw placeResult.error;
        if (translationsResult.error) throw translationsResult.error;

        if (cancelled) return;

        setDelegations(
          (delegationsResult.data ?? []).map((item) => ({
            id: item.id,
            label: parseJsonLabel(item.name) || item.id,
          })),
        );

        setDimensions(
          (dimensionsResult.data ?? []).map((item) => ({
            id: item.key,
            label: parseJsonLabel(item.label) || item.key,
          })),
        );

        if (placeResult.data) {
          const place = placeResult.data;

          setForm({
            id: place.id ?? '',
            slug: place.slug ?? '',
            delegation_id: place.delegation_id ?? '',
            dimension: place.dimension ?? '',
            secondary_dimensions: (
              place.secondary_dimensions ?? []
            ).join(', '),
            latitude: place.latitude?.toString() ?? '',
            longitude: place.longitude?.toString() ?? '',
            elevation_meters:
              place.elevation_meters?.toString() ?? '',
            main_image: place.main_image ?? '',
            publication_status:
              place.publication_status ?? 'draft',
            sort_order: place.sort_order?.toString() ?? '0',
          });
        }

        const nextTranslations = {
          en: { ...emptyTranslation },
          ar: { ...emptyTranslation },
          fr: { ...emptyTranslation },
        };

        for (const translation of translationsResult.data ?? []) {
          const locale = translation.locale as Locale;

          if (locale in nextTranslations) {
            nextTranslations[locale] = {
              title: translation.title ?? '',
              subtitle: translation.subtitle ?? '',
              summary: translation.summary ?? '',
              story_lead: translation.story_lead ?? '',
              story_body: translation.story_body ?? '',
              cultural_note: translation.cultural_note ?? '',
              local_life: translation.local_life ?? '',
              image_caption: translation.image_caption ?? '',
              best_season: translation.best_season ?? '',
              access: translation.access ?? '',
              highlight: translation.highlight ?? '',
            };
          }
        }

        setTranslations(nextTranslations);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load place information.',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadEditorData();

    return () => {
      cancelled = true;
    };
  }, [placeId]);

  function updateField<K extends keyof PlaceForm>(
    field: K,
    value: PlaceForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateTranslation(
    field: keyof TranslationForm,
    value: string,
  ) {
    setTranslations((current) => ({
      ...current,
      [activeLocale]: {
        ...current[activeLocale],
        [field]: value,
      },
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    if (!form.id.trim() || !form.slug.trim()) {
      setError('Place ID and slug are required.');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const placePayload = {
        id: form.id.trim(),
        slug: form.slug.trim(),
        delegation_id: form.delegation_id || null,
        dimension: form.dimension || null,
        secondary_dimensions: form.secondary_dimensions
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        elevation_meters: form.elevation_meters
          ? Number(form.elevation_meters)
          : null,
        main_image: form.main_image.trim() || null,
        publication_status: form.publication_status,
        sort_order: Number(form.sort_order) || 0,
      };

      const { error: placeError } = await supabase
        .from('places')
        .upsert(placePayload, { onConflict: 'id' });

      if (placeError) throw placeError;

      const translationRows = locales
        .filter(({ id }) => {
          const translation = translations[id];
          return Object.values(translation).some(
            (value) => value.trim() !== '',
          );
        })
        .map(({ id }) => ({
          place_id: form.id.trim(),
          locale: id,
          ...translations[id],
        }));

      if (translationRows.length > 0) {
        const { error: translationError } = await supabase
          .from('place_translations')
          .upsert(translationRows, {
            onConflict: 'place_id,locale',
          });

        if (translationError) throw translationError;
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save the place.',
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <LoaderCircle className="admin-spin" size={24} />
        <p>Loading place editor...</p>
      </div>
    );
  }

  const currentTranslation = translations[activeLocale];

  return (
    <div className="admin-place-editor">
      <div className="admin-page-heading">
        <div>
          <button
            type="button"
            className="admin-back-button"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back to places
          </button>

          <span className="admin-eyebrow">PLACE MANAGEMENT</span>
          <h2>{placeId ? 'Edit place' : 'Create a place'}</h2>
          <p>
            Manage location details and multilingual content.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-error-message" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="admin-success-message" role="status">
          Place saved successfully.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <section className="admin-editor-card">
          <div className="admin-editor-section-heading">
            <span className="admin-eyebrow">01 / BASIC INFORMATION</span>
            <h3>Place details</h3>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label htmlFor="place-id">Place ID *</label>
              <input
                id="place-id"
                value={form.id}
                onChange={(event) =>
                  updateField('id', event.target.value)
                }
                disabled={Boolean(placeId)}
                required
                placeholder="chenini"
              />
              <small>Unique identifier. Cannot be changed after creation.</small>
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-slug">URL slug *</label>
              <input
                id="place-slug"
                value={form.slug}
                onChange={(event) =>
                  updateField('slug', event.target.value)
                }
                required
                placeholder="chenini-gabes"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-delegation">Delegation</label>
              <select
                id="place-delegation"
                value={form.delegation_id}
                onChange={(event) =>
                  updateField('delegation_id', event.target.value)
                }
              >
                <option value="">Select delegation</option>
                {delegations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-dimension">Main dimension</label>
              <select
                id="place-dimension"
                value={form.dimension}
                onChange={(event) =>
                  updateField('dimension', event.target.value)
                }
              >
                <option value="">Select dimension</option>
                {dimensions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label htmlFor="place-secondary">
                Secondary dimensions
              </label>
              <input
                id="place-secondary"
                value={form.secondary_dimensions}
                onChange={(event) =>
                  updateField(
                    'secondary_dimensions',
                    event.target.value,
                  )
                }
                placeholder="heritage, nature, culture"
              />
              <small>Separate multiple dimension keys with commas.</small>
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-latitude">Latitude</label>
              <input
                id="place-latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={(event) =>
                  updateField('latitude', event.target.value)
                }
                placeholder="33.8869"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-longitude">Longitude</label>
              <input
                id="place-longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={(event) =>
                  updateField('longitude', event.target.value)
                }
                placeholder="10.0982"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-elevation">Elevation (meters)</label>
              <input
                id="place-elevation"
                type="number"
                step="any"
                value={form.elevation_meters}
                onChange={(event) =>
                  updateField('elevation_meters', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-sort">Sort order</label>
              <input
                id="place-sort"
                type="number"
                value={form.sort_order}
                onChange={(event) =>
                  updateField('sort_order', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label htmlFor="place-image">Main image path</label>
              <input
                id="place-image"
                value={form.main_image}
                onChange={(event) =>
                  updateField('main_image', event.target.value)
                }
                placeholder="places/chenini/cover.webp"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-status">Publication status</label>
              <select
                id="place-status"
                value={form.publication_status}
                onChange={(event) =>
                  updateField(
                    'publication_status',
                    event.target.value as PublicationStatus,
                  )
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </section>

        <section className="admin-editor-card">
          <div className="admin-editor-section-heading">
            <span className="admin-eyebrow">02 / MULTILINGUAL CONTENT</span>
            <h3>Translations</h3>
            <p>
              Add the place content in the languages supported by
              the public website.
            </p>
          </div>

          <div className="admin-locale-tabs">
            {locales.map((locale) => (
              <button
                key={locale.id}
                type="button"
                className={
                  activeLocale === locale.id ? 'active' : ''
                }
                onClick={() => setActiveLocale(locale.id)}
              >
                {locale.label}
              </button>
            ))}
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label>Title</label>
              <input
                value={currentTranslation.title}
                onChange={(event) =>
                  updateTranslation('title', event.target.value)
                }
                placeholder="Place title"
              />
            </div>

            <div className="admin-form-field">
              <label>Subtitle</label>
              <input
                value={currentTranslation.subtitle}
                onChange={(event) =>
                  updateTranslation('subtitle', event.target.value)
                }
                placeholder="Short subtitle"
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Summary</label>
              <textarea
                rows={3}
                value={currentTranslation.summary}
                onChange={(event) =>
                  updateTranslation('summary', event.target.value)
                }
                placeholder="Short introduction..."
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Story lead</label>
              <textarea
                rows={3}
                value={currentTranslation.story_lead}
                onChange={(event) =>
                  updateTranslation('story_lead', event.target.value)
                }
                placeholder="Opening paragraph..."
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Story body</label>
              <textarea
                rows={7}
                value={currentTranslation.story_body}
                onChange={(event) =>
                  updateTranslation('story_body', event.target.value)
                }
                placeholder="Full place story..."
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Cultural note</label>
              <textarea
                rows={3}
                value={currentTranslation.cultural_note}
                onChange={(event) =>
                  updateTranslation('cultural_note', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label>Local life</label>
              <textarea
                rows={3}
                value={currentTranslation.local_life}
                onChange={(event) =>
                  updateTranslation('local_life', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field">
              <label>Image caption</label>
              <input
                value={currentTranslation.image_caption}
                onChange={(event) =>
                  updateTranslation('image_caption', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field">
              <label>Best season</label>
              <input
                value={currentTranslation.best_season}
                onChange={(event) =>
                  updateTranslation('best_season', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field">
              <label>Access information</label>
              <textarea
                rows={3}
                value={currentTranslation.access}
                onChange={(event) =>
                  updateTranslation('access', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field">
              <label>Highlight</label>
              <textarea
                rows={3}
                value={currentTranslation.highlight}
                onChange={(event) =>
                  updateTranslation('highlight', event.target.value)
                }
              />
            </div>
          </div>
        </section>

        <div className="admin-editor-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={onBack}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={saving}
          >
            {saving ? (
              <LoaderCircle size={17} className="admin-spin" />
            ) : (
              <Save size={17} />
            )}
            {saving ? 'Saving...' : 'Save place'}
          </button>
        </div>
      </form>
    </div>
  );
}
