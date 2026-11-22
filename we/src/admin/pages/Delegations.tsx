
import { useCallback, useEffect, useState } from 'react';
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Save,
  X,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Locale = 'en' | 'ar' | 'fr';

interface LocalizedText {
  en: string;
  ar: string;
  fr: string;
}

interface Delegation {
  id: string;
  name: LocalizedText;
  center_lat: number | null;
  center_lng: number | null;
  landscape: LocalizedText;
  summary: LocalizedText;
}

const emptyLocalizedText = (): LocalizedText => ({
  en: '',
  ar: '',
  fr: '',
});

const emptyDelegation = (): Delegation => ({
  id: '',
  name: emptyLocalizedText(),
  center_lat: null,
  center_lng: null,
  landscape: emptyLocalizedText(),
  summary: emptyLocalizedText(),
});

const locales: { key: Locale; label: string }[] = [
  { key: 'en', label: 'English' },
  { key: 'ar', label: 'العربية' },
  { key: 'fr', label: 'Français' },
];

export default function Delegations() {
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [selected, setSelected] = useState<Delegation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadDelegations = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    const { data, error: queryError } = await supabase
      .from('delegations')
      .select('*')
      .order('id');

    if (queryError) {
      setError(queryError.message);
      setDelegations([]);
    } else {
      setDelegations((data ?? []) as Delegation[]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadDelegations();
  }, [loadDelegations]);

  const updateLocalizedField = (
    field: 'name' | 'landscape' | 'summary',
    locale: Locale,
    value: string,
  ) => {
    if (!selected) return;

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

  const handleSave = async () => {
    if (!supabase || !selected) return;

    if (!selected.id.trim()) {
      setError('Please enter a delegation ID.');
      return;
    }

    if (!selected.name.en.trim()) {
      setError('Please enter the delegation name in English.');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      ...selected,
      id: selected.id.trim(),
    };

    const { error: saveError } = await supabase
      .from('delegations')
      .upsert(payload, { onConflict: 'id' });

    setIsSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setSelected(null);
    setSuccess('Delegation saved successfully.');
    await loadDelegations();
  };

  const handleDelete = async (delegation: Delegation) => {
    if (!supabase) return;

    const confirmed = window.confirm(
      `Delete "${delegation.name.en || delegation.id}"? Places linked to this delegation may prevent deletion.`,
    );

    if (!confirmed) return;

    setError('');
    setSuccess('');

    const { error: deleteError } = await supabase
      .from('delegations')
      .delete()
      .eq('id', delegation.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess('Delegation deleted successfully.');
    await loadDelegations();
  };

  const openEditor = (delegation?: Delegation) => {
    setError('');
    setSuccess('');
    setSelected(
      delegation
        ? {
            ...delegation,
            name: { ...delegation.name },
            landscape: { ...delegation.landscape },
            summary: { ...delegation.summary },
          }
        : emptyDelegation(),
    );
  };

  return (
    <div className="admin-delegations">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">GABÈS TERRITORY</span>
          <h1>Delegations</h1>
          <p>Manage the administrative regions of Gabès.</p>
        </div>

        <div className="admin-heading-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => void loadDelegations()}
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
            Add delegation
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

      <div className="admin-delegations-summary">
        <MapPin size={20} />
        <div>
          <strong>{delegations.length}</strong>
          <span>Registered delegations</span>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-empty-state">
          <RefreshCw size={24} className="admin-loading-icon" />
          <p>Loading delegations...</p>
        </div>
      ) : delegations.length === 0 ? (
        <div className="admin-empty-state">
          <MapPin size={36} />
          <h3>No delegations yet</h3>
          <p>Add your first delegation to get started.</p>
        </div>
      ) : (
        <div className="admin-delegations-grid">
          {delegations.map((delegation) => (
            <article className="admin-delegation-card" key={delegation.id}>
              <div className="admin-delegation-card-top">
                <div className="admin-delegation-icon">
                  <MapPin size={20} />
                </div>

                <span className="admin-delegation-id">
                  {delegation.id}
                </span>
              </div>

              <h3>
                {delegation.name.en || delegation.id}
              </h3>

              <p>
                {delegation.summary.en || 'No description available.'}
              </p>

              <div className="admin-delegation-coordinates">
                <span>
                  Latitude: {delegation.center_lat ?? '—'}
                </span>
                <span>
                  Longitude: {delegation.center_lng ?? '—'}
                </span>
              </div>

              <div className="admin-delegation-actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() => openEditor(delegation)}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  type="button"
                  className="admin-icon-button admin-danger-button"
                  title="Delete delegation"
                  onClick={() => void handleDelete(delegation)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <div className="admin-modal-backdrop">
          <div className="admin-delegation-modal">
            <div className="admin-modal-header">
              <div>
                <span className="admin-eyebrow">TERRITORY MANAGEMENT</span>
                <h2>
                  {selected.id ? 'Edit delegation' : 'New delegation'}
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

            <div className="admin-delegation-form">
              <label className="admin-form-field">
                <span>Delegation ID</span>
                <input
                  type="text"
                  placeholder="e.g. gabes-medina"
                  value={selected.id}
                  disabled={delegations.some(
                    (item) => item.id === selected.id,
                  )}
                  onChange={(event) =>
                    setSelected({
                      ...selected,
                      id: event.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-'),
                    })
                  }
                />
              </label>

              <div className="admin-form-section">
                <h3>Names</h3>

                {locales.map(({ key, label }) => (
                  <label className="admin-form-field" key={key}>
                    <span>{label}</span>
                    <input
                      type="text"
                      value={selected.name[key] ?? ''}
                      dir={key === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(event) =>
                        updateLocalizedField(
                          'name',
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="admin-form-section">
                <h3>Geographical coordinates</h3>

                <div className="admin-form-row">
                  <label className="admin-form-field">
                    <span>Latitude</span>
                    <input
                      type="number"
                      step="any"
                      value={selected.center_lat ?? ''}
                      onChange={(event) =>
                        setSelected({
                          ...selected,
                          center_lat:
                            event.target.value === ''
                              ? null
                              : Number(event.target.value),
                        })
                      }
                    />
                  </label>

                  <label className="admin-form-field">
                    <span>Longitude</span>
                    <input
                      type="number"
                      step="any"
                      value={selected.center_lng ?? ''}
                      onChange={(event) =>
                        setSelected({
                          ...selected,
                          center_lng:
                            event.target.value === ''
                              ? null
                              : Number(event.target.value),
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="admin-form-section">
                <h3>Landscape description</h3>

                {locales.map(({ key, label }) => (
                  <label className="admin-form-field" key={key}>
                    <span>{label}</span>
                    <textarea
                      rows={3}
                      value={selected.landscape[key] ?? ''}
                      dir={key === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(event) =>
                        updateLocalizedField(
                          'landscape',
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="admin-form-section">
                <h3>Summary</h3>

                {locales.map(({ key, label }) => (
                  <label className="admin-form-field" key={key}>
                    <span>{label}</span>
                    <textarea
                      rows={4}
                      value={selected.summary[key] ?? ''}
                      dir={key === 'ar' ? 'rtl' : 'ltr'}
                      onChange={(event) =>
                        updateLocalizedField(
                          'summary',
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </label>
                ))}
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
                {isSaving ? 'Saving...' : 'Save delegation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
