
import { useCallback, useEffect, useState } from 'react';
import {
  Search,
  RefreshCw,
  Languages,
  Save,
  X,
  Pencil,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Locale = 'en' | 'ar' | 'fr';

interface Translation {
  id: string;
  place_id: string;
  locale: Locale;
  title: string | null;
  subtitle: string | null;
  summary: string | null;
  story_lead: string | null;
  story_body: string | null;
  cultural_note: string | null;
  local_life: string | null;
  image_caption: string | null;
  best_season: string | null;
  access: string | null;
  highlight: string | null;
}

const localeLabels: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
};

const fields: {
  key: keyof Omit<Translation, 'id' | 'place_id' | 'locale'>;
  label: string;
  multiline?: boolean;
}[] = [
  { key: 'title', label: 'Title' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'summary', label: 'Summary', multiline: true },
  { key: 'story_lead', label: 'Story lead', multiline: true },
  { key: 'story_body', label: 'Story body', multiline: true },
  { key: 'cultural_note', label: 'Cultural note', multiline: true },
  { key: 'local_life', label: 'Local life', multiline: true },
  { key: 'image_caption', label: 'Image caption' },
  { key: 'best_season', label: 'Best season' },
  { key: 'access', label: 'Access' },
  { key: 'highlight', label: 'Highlight' },
];

const emptyTranslation = (
  placeId: string,
  locale: Locale,
): Omit<Translation, 'id'> => ({
  place_id: placeId,
  locale,
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
});

export default function Translations() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [placeNames, setPlaceNames] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [localeFilter, setLocaleFilter] = useState<'all' | Locale>('all');
  const [selected, setSelected] = useState<Translation | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTranslations = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    const [translationsResult, placesResult] = await Promise.all([
      supabase
        .from('place_translations')
        .select('*')
        .order('locale')
        .order('title'),
      supabase
        .from('places')
        .select('id, slug'),
    ]);

    if (translationsResult.error) {
      setError(translationsResult.error.message);
      setTranslations([]);
      setIsLoading(false);
      return;
    }

    if (placesResult.error) {
      setError(placesResult.error.message);
      setIsLoading(false);
      return;
    }

    const names: Record<string, string> = {};
    (placesResult.data ?? []).forEach((place) => {
      names[place.id] = place.slug || place.id;
    });

    setPlaceNames(names);
    setTranslations((translationsResult.data ?? []) as Translation[]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadTranslations();
  }, [loadTranslations]);

  const updateField = (
    key: keyof Omit<Translation, 'id' | 'place_id' | 'locale'>,
    value: string,
  ) => {
    if (!selected) return;
    setSelected({ ...selected, [key]: value });
  };

  const handleSave = async () => {
    if (!supabase || !selected) return;

    setIsSaving(true);
    setError('');
    setSuccess('');

    const { id, ...values } = selected;

    const { error: saveError } = await supabase
      .from('place_translations')
      .upsert(values, { onConflict: 'place_id,locale' });

    setIsSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setSuccess('Translation saved successfully.');
    setSelected(null);
    await loadTranslations();
  };

  const openTranslation = (translation: Translation) => {
    setSelected({ ...translation });
    setError('');
    setSuccess('');
  };

  const openMissingTranslation = (placeId: string, locale: Locale) => {
    setSelected(emptyTranslation(placeId, locale) as Translation);
    setError('');
    setSuccess('');
  };

  const filteredTranslations = translations.filter((item) => {
    const placeName = placeNames[item.place_id] ?? item.place_id;
    const matchesSearch = [
      item.title,
      item.place_id,
      placeName,
    ].some((value) =>
      (value ?? '').toLowerCase().includes(search.toLowerCase()),
    );

    const matchesLocale =
      localeFilter === 'all' || item.locale === localeFilter;

    return matchesSearch && matchesLocale;
  });

  const localeCounts = {
    en: translations.filter((item) => item.locale === 'en').length,
    ar: translations.filter((item) => item.locale === 'ar').length,
    fr: translations.filter((item) => item.locale === 'fr').length,
  };

  return (
    <div className="admin-translations">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">CONTENT MANAGEMENT</span>
          <h1>Translations</h1>
          <p>Manage multilingual content for your destinations.</p>
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={() => void loadTranslations()}
          disabled={isLoading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-alert admin-alert-error">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')}>
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="admin-alert admin-alert-success">
          <span>{success}</span>
          <button type="button" onClick={() => setSuccess('')}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="admin-language-cards">
        {(['en', 'ar', 'fr'] as Locale[]).map((locale) => (
          <div className="admin-language-card" key={locale}>
            <div className="admin-language-icon">
              <Languages size={19} />
            </div>
            <div>
              <strong>{localeLabels[locale]}</strong>
              <span>{localeCounts[locale]} translations</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-translations-toolbar">
        <div className="admin-search">
          <Search size={17} />
          <input
            type="search"
            placeholder="Search by place or title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={localeFilter}
          onChange={(event) =>
            setLocaleFilter(event.target.value as 'all' | Locale)
          }
        >
          <option value="all">All languages</option>
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
      </div>

      {isLoading ? (
        <div className="admin-empty-state">
          <RefreshCw size={24} className="admin-loading-icon" />
          <p>Loading translations...</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Title</th>
                <th>Language</th>
                <th>Story</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTranslations.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>
                      {placeNames[item.place_id] ?? item.place_id}
                    </strong>
                  </td>
                  <td>{item.title || 'Untitled'}</td>
                  <td>
                    <span className="admin-locale-badge">
                      {item.locale.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {item.story_body?.trim() ? 'Available' : 'Missing'}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-icon-button"
                      title="Edit translation"
                      onClick={() => openTranslation(item)}
                    >
                      <Pencil size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTranslations.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-table-empty">
                      No translations found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-missing-translations">
        <h2>Missing translations</h2>
        <p>
          Create a translation for a language that has not been added yet.
        </p>

        {Object.keys(placeNames).map((placeId) => {
          const missingLocales = (['en', 'ar', 'fr'] as Locale[]).filter(
            (locale) =>
              !translations.some(
                (item) =>
                  item.place_id === placeId && item.locale === locale,
              ),
          );

          if (missingLocales.length === 0) return null;

          return (
            <div className="admin-missing-row" key={placeId}>
              <strong>{placeNames[placeId]}</strong>
              <div>
                {missingLocales.map((locale) => (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    key={locale}
                    onClick={() => openMissingTranslation(placeId, locale)}
                  >
                    + {locale.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="admin-modal-backdrop">
          <div className="admin-translation-modal">
            <div className="admin-modal-header">
              <div>
                <span className="admin-eyebrow">EDIT CONTENT</span>
                <h2>
                  {localeLabels[selected.locale]} translation
                </h2>
                <p>
                  {placeNames[selected.place_id] ?? selected.place_id}
                </p>
              </div>

              <button
                type="button"
                className="admin-icon-button"
                onClick={() => setSelected(null)}
                aria-label="Close editor"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-translation-fields">
              {fields.map((field) => (
                <label
                  className="admin-form-field"
                  key={field.key}
                >
                  <span>{field.label}</span>

                  {field.multiline ? (
                    <textarea
                      rows={field.key === 'story_body' ? 8 : 4}
                      value={selected[field.key] ?? ''}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      dir={selected.locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                  ) : (
                    <input
                      type="text"
                      value={selected[field.key] ?? ''}
                      onChange={(event) =>
                        updateField(field.key, event.target.value)
                      }
                      dir={selected.locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setSelected(null)}
                disabled={isSaving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-primary-button"
                onClick={() => void handleSave()}
                disabled={isSaving}
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : 'Save translation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
