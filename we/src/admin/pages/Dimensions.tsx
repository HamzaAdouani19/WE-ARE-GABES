
import { useCallback, useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Save,
  X,
  Layers,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Locale = 'en' | 'ar' | 'fr';

interface LocalizedText {
  en: string;
  ar: string;
  fr: string;
}

interface CulturalDimension {
  key: string;
  label: LocalizedText;
  description: LocalizedText;
  accent_hex: string;
  sort_order: number;
}

const emptyLocalizedText = (): LocalizedText => ({
  en: '',
  ar: '',
  fr: '',
});

const emptyDimension = (): CulturalDimension => ({
  key: '',
  label: emptyLocalizedText(),
  description: emptyLocalizedText(),
  accent_hex: '#C87945',
  sort_order: 0,
});

const locales: { key: Locale; label: string }[] = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'العربية' },
  { key: 'fr', label: 'Français' },
];

const ALLOWED_DIMENSION_KEYS = new Set([
  'geography',
  'nature',
  'culture',
  'heritage',
  'experiences',
  'local_life',
  'stories',
]);

export default function Dimensions() {
  const [dimensions, setDimensions] = useState<CulturalDimension[]>([]);
  const [selected, setSelected] = useState<CulturalDimension | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadDimensions = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    const { data, error: queryError } = await supabase
      .from('cultural_dimensions')
      .select('*')
      .order('sort_order', { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setDimensions([]);
    } else {
      setDimensions((data ?? []) as CulturalDimension[]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadDimensions();
  }, [loadDimensions]);

  const updateLocalizedField = (
    field: 'label' | 'description',
    locale: Locale,
    value: string,
  ) => {
    setSelected((current) =>
      current
        ? {
            ...current,
            [field]: {
              ...current[field],
              [locale]: value,
            },
          }
        : current,
    );
  };

  const openEditor = (dimension?: CulturalDimension) => {
    setError('');
    setSuccess('');

    setSelected(
      dimension
        ? {
            ...dimension,
            label: { ...dimension.label },
            description: { ...dimension.description },
          }
        : emptyDimension(),
    );
  };

  const handleSave = async () => {
    if (!supabase || !selected) return;

    if (!selected.key.trim()) {
      setError('Please enter a dimension key.');
      return;
    }

    if (!ALLOWED_DIMENSION_KEYS.has(selected.key.trim().toLowerCase())) {
      setError(
        'Dimension key must be one of: geography, nature, culture, heritage, experiences, local_life, stories.',
      );
      return;
    }

    if (!selected.label.en.trim()) {
      setError('Please enter the English label.');
      return;
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(selected.accent_hex)) {
      setError('Please enter a valid HEX color.');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      ...selected,
      key: selected.key.trim().toLowerCase(),
      sort_order: Number(selected.sort_order) || 0,
    };

    const { error: saveError } = await supabase
      .from('cultural_dimensions')
      .upsert(payload, { onConflict: 'key' });

    setIsSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setSelected(null);
    setSuccess('Dimension saved successfully.');
    await loadDimensions();
  };

  const handleDelete = async (dimension: CulturalDimension) => {
    if (!supabase) return;

    const confirmed = window.confirm(
      `Delete "${dimension.label.en || dimension.key}"? Places using this dimension may prevent deletion.`,
    );

    if (!confirmed) return;

    setError('');
    setSuccess('');

    const { error: deleteError } = await supabase
      .from('cultural_dimensions')
      .delete()
      .eq('key', dimension.key);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess('Dimension deleted successfully.');
    await loadDimensions();
  };

  return (
    <div className="admin-dimensions">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">CONTENT STRUCTURE</span>
          <h1>Cultural Dimensions</h1>
          <p>
            Organize the cultural identity and themes of WE ARE GABÈS.
          </p>
        </div>

        <div className="admin-heading-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => void loadDimensions()}
            disabled={isLoading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() => openEditor()}
          >
            <Plus size={17} />
            Add dimension
          </button>
        </div>
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

      <div className="admin-dimensions-summary">
        <Layers size={20} />
        <div>
          <strong>{dimensions.length}</strong>
          <span>Active dimensions</span>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-empty-state">
          <RefreshCw size={24} className="admin-loading-icon" />
          <p>Loading dimensions...</p>
        </div>
      ) : dimensions.length === 0 ? (
        <div className="admin-empty-state">
          <Layers size={36} />
          <h3>No dimensions yet</h3>
          <p>Create your first cultural dimension.</p>
        </div>
      ) : (
        <div className="admin-dimensions-grid">
          {dimensions.map((dimension) => (
            <article
              className="admin-dimension-card"
              key={dimension.key}
            >
              <div
                className="admin-dimension-color"
                style={{ backgroundColor: dimension.accent_hex }}
              />

              <div className="admin-dimension-card-content">
                <div className="admin-dimension-card-top">
                  <span className="admin-dimension-key">
                    {dimension.key}
                  </span>
                  <span className="admin-dimension-order">
                    #{dimension.sort_order}
                  </span>
                </div>

                <h3>{dimension.label.en || dimension.key}</h3>

                <p>
                  {dimension.description.en ||
                    'No description available.'}
                </p>

                <div className="admin-dimension-translations">
                  {locales.map(({ key }) => (
                    <span key={key}>
                      {key.toUpperCase()}:{' '}
                      {dimension.label[key]?.trim() ? '✓' : '—'}
                    </span>
                  ))}
                </div>

                <div className="admin-dimension-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => openEditor(dimension)}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-icon-button admin-danger-button"
                    title="Delete dimension"
                    onClick={() => void handleDelete(dimension)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div className="admin-modal-backdrop">
          <div className="admin-dimension-modal">
            <div className="admin-modal-header">
              <div>
                <span className="admin-eyebrow">
                  CONTENT STRUCTURE
                </span>
                <h2>
                  {dimensions.some((item) => item.key === selected.key)
                    ? 'Edit dimension'
                    : 'New dimension'}
                </h2>
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

            <div className="admin-dimension-form">
              <label className="admin-form-field">
                <span>Dimension key</span>
                <input
                  type="text"
                  placeholder="e.g. heritage"
                  value={selected.key}
                  disabled={dimensions.some(
                    (item) => item.key === selected.key,
                  )}
                  onChange={(event) =>
                    setSelected({
                      ...selected,
                      key: event.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-'),
                    })
                  }
                />
              </label>

              <div className="admin-form-section">
                <h3>Labels</h3>

                {locales.map(({ key, label }) => (
                  <label className="admin-form-field" key={key}>
                    <span>{label}</span>
                    <input
                      type="text"
                      value={selected.label[key] ?? ''}
                      dir={key === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(event) =>
                        updateLocalizedField(
                          'label',
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="admin-form-section">
                <h3>Descriptions</h3>

                {locales.map(({ key, label }) => (
                  <label className="admin-form-field" key={key}>
                    <span>{label}</span>
                    <textarea
                      rows={4}
                      value={selected.description[key] ?? ''}
                      dir={key === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(event) =>
                        updateLocalizedField(
                          'description',
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="admin-form-row">
                <label className="admin-form-field">
                  <span>Accent color</span>
                  <div className="admin-color-input">
                    <input
                      type="color"
                      value={selected.accent_hex}
                      onChange={(event) =>
                        setSelected({
                          ...selected,
                          accent_hex: event.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={selected.accent_hex}
                      onChange={(event) =>
                        setSelected({
                          ...selected,
                          accent_hex: event.target.value,
                        })
                      }
                    />
                  </div>
                </label>

                <label className="admin-form-field">
                  <span>Display order</span>
                  <input
                    type="number"
                    min="0"
                    value={selected.sort_order}
                    onChange={(event) =>
                      setSelected({
                        ...selected,
                        sort_order: Number(event.target.value),
                      })
                    }
                  />
                </label>
              </div>
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
                {isSaving ? 'Saving...' : 'Save dimension'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
