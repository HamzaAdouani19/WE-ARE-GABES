
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';

import {
  ArrowLeft,
  Save,
  LoaderCircle,
  Plus,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';

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

interface MediaFile {
  name: string;
  url: string;
}

interface GalleryItem {
  id: string | null;
  image_path: string;
  sort_order: number;
  captions: Record<Locale, string>;
}

const BUCKET_NAME = 'gabes-media';
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

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

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (error && typeof error === 'object') {
    const details = error as Record<string, unknown>;
    const parts = [
      details.message,
      details.details,
      details.hint ? `Hint: ${details.hint}` : null,
      details.code ? `Code: ${details.code}` : null,
    ].filter((part): part is string => typeof part === 'string' && part.length > 0);

    if (parts.length > 0) return parts.join(' — ');

    try {
      return JSON.stringify(error);
    } catch {
      return 'Unknown Supabase error.';
    }
  }

  return typeof error === 'string' ? error : 'Unknown error.';
}

function emptyCaptions(): Record<Locale, string> {
  return { en: '', ar: '', fr: '' };
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
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]);
  const [newGalleryPath, setNewGalleryPath] = useState('');

  const [loading, setLoading] = useState(Boolean(placeId));
  const [saving, setSaving] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryImageInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function loadMediaFiles() {
    if (!supabase) return;

    const client = supabase;

    setMediaLoading(true);

    try {
      const { data, error: mediaError } = await client.storage
        .from(BUCKET_NAME)
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: {
            column: 'created_at',
            order: 'desc',
          },
        });

      if (mediaError) throw mediaError;

      const files = (data ?? [])
        .filter((file) => {
          return (
            file.name &&
            file.metadata?.mimetype?.startsWith('image/')
          );
        })
        .map((file) => {
          const { data: urlData } = client.storage
            .from(BUCKET_NAME)
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: urlData.publicUrl,
          };
        });

      setMediaFiles(files);
    } catch (err) {
      console.error('Unable to load media library:', err);
      setError(
        `Unable to load media library: ${getErrorMessage(err)}`,
      );
    } finally {
      setMediaLoading(false);
    }
  }

  async function uploadImage(
    file: File,
    target: 'main' | 'gallery',
  ) {
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    if (
      !ALLOWED_IMAGE_TYPES.has(file.type) ||
      file.size > MAX_UPLOAD_BYTES
    ) {
      setError(
        'Please select a JPEG, PNG, WebP, GIF or AVIF image up to 10 MB.',
      );
      return;
    }

    const setUploading =
      target === 'main' ? setUploadingMain : setUploadingGallery;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const client = supabase;

      const safeName = file.name
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9._-]/g, '-')
        .replace(/-+/g, '-');

      const uniqueName =
        `${Date.now()}-${crypto.randomUUID()}-${safeName}`;

      const { data, error: uploadError } = await client.storage
        .from(BUCKET_NAME)
        .upload(uniqueName, file, {
          upsert: false,
          cacheControl: '3600',
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = client.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      const uploadedFile: MediaFile = {
        name: data.path,
        url: urlData.publicUrl,
      };

      setMediaFiles((current) => [
        uploadedFile,
        ...current.filter((item) => item.name !== data.path),
      ]);

      if (target === 'main') {
        setForm((current) => ({
          ...current,
          main_image: data.path,
        }));
      } else {
        setGallery((current) => [
          ...current,
          {
            id: null,
            image_path: data.path,
            sort_order: current.length,
            captions: emptyCaptions(),
          },
        ]);
      }

      setSuccess(true);
    } catch (err) {
      setError(`Image upload failed: ${getErrorMessage(err)}`);
    } finally {
      setUploading(false);
    }
  }

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
          galleryResult,
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

          placeId
            ? supabase
                .from('place_gallery')
                .select('*')
                .eq('place_id', placeId)
                .order('sort_order')
            : Promise.resolve({ data: [], error: null }),
        ]);

        // Keep the failing resource in the message so the actual
        // Supabase/PostgREST problem is visible in the editor.
        if (delegationsResult.error) {
          throw new Error(
            `Delegations query failed: ${getErrorMessage(delegationsResult.error)}`,
          );
        }

        if (dimensionsResult.error) {
          throw new Error(
            `Cultural dimensions query failed: ${getErrorMessage(dimensionsResult.error)}`,
          );
        }

        if (placeResult.error) {
          throw new Error(
            `Place query failed for ID "${placeId}": ${getErrorMessage(placeResult.error)}`,
          );
        }

        if (translationsResult.error) {
          throw new Error(
            `Place translations query failed: ${getErrorMessage(translationsResult.error)}`,
          );
        }

        if (galleryResult.error) {
          throw new Error(
            `Place gallery query failed: ${getErrorMessage(galleryResult.error)}`,
          );
        }

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

        const nextTranslations: Record<Locale, TranslationForm> = {
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

        setGallery(
          (galleryResult.data ?? []).map((item) => {
            const captions =
              (item.captions ?? {}) as Partial<Record<Locale, string>>;

            return {
              id: item.id,
              image_path: item.image_path,
              sort_order: item.sort_order ?? 0,
              captions: {
                en: captions.en ?? '',
                ar: captions.ar ?? '',
                fr: captions.fr ?? '',
              },
            };
          }),
        );

        setDeletedGalleryIds([]);
      } catch (err) {
        if (!cancelled) {
          setError(
            `Unable to load place information: ${getErrorMessage(err)}`,
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadEditorData();
    void loadMediaFiles();

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

  function addGalleryImage() {
    if (!newGalleryPath.trim()) return;

    if (
      gallery.some(
        (item) => item.image_path === newGalleryPath.trim(),
      )
    ) {
      setError('This image is already in the gallery.');
      return;
    }

    setGallery((current) => [
      ...current,
      {
        id: null,
        image_path: newGalleryPath.trim(),
        sort_order: current.length,
        captions: emptyCaptions(),
      },
    ]);

    setNewGalleryPath('');
    setError(null);
  }

  function removeGalleryImage(index: number) {
    const item = gallery[index];

    if (!item) return;

    if (
      item.id &&
      !window.confirm(
        'Remove this image from the place gallery? The original Storage file will not be deleted.',
      )
    ) {
      return;
    }

    if (item.id) {
      setDeletedGalleryIds((current) => [...current, item.id!]);
    }

    setGallery((current) =>
      current
        .filter((_, itemIndex) => itemIndex !== index)
        .map((entry, itemIndex) => ({
          ...entry,
          sort_order: itemIndex,
        })),
    );
  }

  function updateGalleryCaption(
    index: number,
    locale: Locale,
    value: string,
  ) {
    setGallery((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              captions: {
                ...item.captions,
                [locale]: value,
              },
            }
          : item,
      ),
    );
  }

  async function saveGallery(placeIdentifier: string) {
    if (!supabase) throw new Error('Supabase is not configured.');

    for (const id of deletedGalleryIds) {
      const { error: deleteError } = await supabase
        .from('place_gallery')
        .delete()
        .eq('id', id)
        .eq('place_id', placeIdentifier);

      if (deleteError) throw deleteError;
    }

    for (let index = 0; index < gallery.length; index += 1) {
      const item = gallery[index];

      const payload = {
        place_id: placeIdentifier,
        image_path: item.image_path,
        sort_order: index,
        captions: item.captions,
      };

      const result = item.id
        ? await supabase
            .from('place_gallery')
            .update(payload)
            .eq('id', item.id)
            .eq('place_id', placeIdentifier)
        : await supabase
            .from('place_gallery')
            .insert(payload);

      if (result.error) throw result.error;
    }

    setGallery((current) =>
      current.map((item, index) => ({
        ...item,
        sort_order: index,
      })),
    );

    setDeletedGalleryIds([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    const identifier = form.id.trim();
    const slug = form.slug.trim();

    if (!identifier || !slug) {
      setError('Place ID and slug are required.');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(identifier)) {
      setError(
        'Place ID can only contain letters, numbers, underscores and hyphens.',
      );
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError(
        'Slug must use lowercase letters, numbers and hyphens.',
      );
      return;
    }

    if (!form.dimension) {
      setError('Please select a main cultural dimension.');
      return;
    }

    if (!dimensions.some((item) => item.id === form.dimension)) {
      setError('The selected cultural dimension is not valid.');
      return;
    }

    if (
      form.delegation_id &&
      !delegations.some((item) => item.id === form.delegation_id)
    ) {
      setError('The selected delegation is not valid.');
      return;
    }

    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);
    const elevation =
      form.elevation_meters.trim() === ''
        ? 0
        : Number(form.elevation_meters);

    if (
      form.latitude.trim() === '' ||
      form.longitude.trim() === '' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setError('Enter valid latitude and longitude values.');
      return;
    }

    if (!Number.isFinite(elevation) || elevation < 0) {
      setError('Elevation must be a valid non-negative number.');
      return;
    }

    const sortOrder = Number(form.sort_order);

    if (
      form.sort_order.trim() === '' ||
      !Number.isInteger(sortOrder) ||
      sortOrder < 0
    ) {
      setError('Sort order must be a non-negative whole number.');
      return;
    }

    const secondaryDimensions = [
      ...new Set(
        form.secondary_dimensions
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      ),
    ];

    const invalidDimensions = secondaryDimensions.filter(
      (key) =>
        !dimensions.some((dimension) => dimension.id === key),
    );

    if (invalidDimensions.length > 0) {
      setError(
        `Unknown secondary dimensions: ${invalidDimensions.join(', ')}`,
      );
      return;
    }

    if (secondaryDimensions.includes(form.dimension)) {
      setError(
        'The main dimension cannot also be a secondary dimension.',
      );
      return;
    }

    if (form.publication_status === 'published') {
      if (
        !window.confirm(
          'You are saving this place with Published status. It may become visible on the public website. Continue?',
        )
      ) {
        return;
      }
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    const isCreating = !placeId;
    let saveStage = 'saving place record';

    try {
      const placePayload = {
        id: identifier,
        slug,
        delegation_id: form.delegation_id || null,
        dimension: form.dimension,
        secondary_dimensions: secondaryDimensions,
        latitude,
        longitude,
        elevation_meters: elevation,
        main_image: form.main_image.trim() || null,
        publication_status: form.publication_status,
        sort_order: sortOrder,
      };

      const { error: placeError } = await supabase
        .from('places')
        .upsert(placePayload, { onConflict: 'id' });

      if (placeError) throw placeError;

      saveStage = 'saving translations';

      const translationRows = locales
        .filter(({ id }) => {
          const translation = translations[id];

          return Object.values(translation).some(
            (value) => value.trim() !== '',
          );
        })
        .map(({ id }) => ({
          place_id: identifier,
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

      saveStage = 'saving gallery';
      await saveGallery(identifier);

      setSuccess(true);
    } catch (err) {
      console.error(`Place editor: ${saveStage} failed:`, err);

      if (isCreating) {
        try {
          const { error: cleanupError } = await supabase
            .from('places')
            .delete()
            .eq('id', identifier);
          if (cleanupError) throw cleanupError;
        } catch {
          // The original save error is more useful to the editor than a
          // secondary cleanup failure.
        }
      }

      setError(
        `Save failed while ${saveStage}: ${getErrorMessage(err)}. Some earlier changes may already have been saved; review the place before retrying.`,
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

  const mainImageMedia = mediaFiles.find(
    (file) => file.name === form.main_image,
  );

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
          {uploadingMain || uploadingGallery
            ? 'Image uploaded successfully.'
            : 'Place saved or image uploaded successfully.'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <section className="admin-editor-card">
          <div className="admin-editor-section-heading">
            <span className="admin-eyebrow">
              01 / BASIC INFORMATION
            </span>
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
              <small>
                Unique identifier. Cannot be changed after creation.
              </small>
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
              <label htmlFor="place-dimension">
                Main dimension *
              </label>
              <select
                id="place-dimension"
                value={form.dimension}
                onChange={(event) =>
                  updateField('dimension', event.target.value)
                }
                required
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
              <small>
                Separate dimension keys with commas. Keys must exist
                in Cultural Dimensions.
              </small>
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-latitude">Latitude *</label>
              <input
                id="place-latitude"
                type="number"
                step="any"
                value={form.latitude}
                onChange={(event) =>
                  updateField('latitude', event.target.value)
                }
                placeholder="33.8869"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-longitude">Longitude *</label>
              <input
                id="place-longitude"
                type="number"
                step="any"
                value={form.longitude}
                onChange={(event) =>
                  updateField('longitude', event.target.value)
                }
                placeholder="10.0982"
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-elevation">
                Elevation (meters)
              </label>
              <input
                id="place-elevation"
                type="number"
                min="0"
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
                min="0"
                step="1"
                value={form.sort_order}
                onChange={(event) =>
                  updateField('sort_order', event.target.value)
                }
              />
            </div>

            <div className="admin-form-field admin-form-field-full">
              <label htmlFor="place-image">Main image path</label>

              <select
                id="place-image-picker"
                value={
                  mediaFiles.some(
                    (file) => file.name === form.main_image,
                  )
                    ? form.main_image
                    : ''
                }
                onChange={(event) =>
                  updateField('main_image', event.target.value)
                }
              >
                <option value="">Choose from Media Library</option>
                {mediaFiles.map((file) => (
                  <option key={file.name} value={file.name}>
                    {file.name}
                  </option>
                ))}
              </select>

              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    void uploadImage(file, 'main');
                  }

                  event.target.value = '';
                }}
              />

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => mainImageInputRef.current?.click()}
                disabled={uploadingMain}
              >
                {uploadingMain ? (
                  <LoaderCircle size={15} className="admin-spin" />
                ) : (
                  <Upload size={15} />
                )}
                {uploadingMain ? 'Uploading...' : 'Upload Main Image'}
              </button>

              <input
                id="place-image"
                value={form.main_image}
                onChange={(event) =>
                  updateField('main_image', event.target.value)
                }
                placeholder="Image path in gabes-media"
              />

              {form.main_image && (
                <div style={{ marginTop: 12 }}>
                  {mainImageMedia ? (
                    <img
                      src={mainImageMedia.url}
                      alt="Main image preview"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                      style={{
                        width: '100%',
                        maxWidth: 280,
                        aspectRatio: '16 / 9',
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <small>
                      Preview unavailable. Check the image path.
                    </small>
                  )}
                </div>
              )}

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => void loadMediaFiles()}
                disabled={mediaLoading}
              >
                {mediaLoading ? (
                  <LoaderCircle size={15} className="admin-spin" />
                ) : (
                  <RefreshCw size={15} />
                )}
                Refresh media
              </button>
            </div>

            <div className="admin-form-field">
              <label htmlFor="place-status">
                Publication status
              </label>
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
              <small>
                Published places may appear on the public website.
              </small>
            </div>
          </div>
        </section>

        <section className="admin-editor-card">
          <div className="admin-editor-section-heading">
            <span className="admin-eyebrow">
              02 / MULTILINGUAL CONTENT
            </span>
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
                  updateTranslation(
                    'cultural_note',
                    event.target.value,
                  )
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
                  updateTranslation(
                    'image_caption',
                    event.target.value,
                  )
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

        <section className="admin-editor-card">
          <div className="admin-editor-section-heading">
            <span className="admin-eyebrow">03 / PLACE GALLERY</span>
            <h3>Gallery images</h3>
            <p>
              Upload images directly from your device or choose
              existing files from gabes-media.
            </p>
          </div>

          <div className="admin-form-field">
            <label htmlFor="gallery-image-picker">
              Select an image
            </label>

            <input
              ref={galleryImageInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  void uploadImage(file, 'gallery');
                }

                event.target.value = '';
              }}
            />

            <button
              type="button"
              className="admin-secondary-button"
              onClick={() => galleryImageInputRef.current?.click()}
              disabled={uploadingGallery}
            >
              {uploadingGallery ? (
                <LoaderCircle size={15} className="admin-spin" />
              ) : (
                <Upload size={15} />
              )}
              {uploadingGallery
                ? 'Uploading...'
                : 'Upload Gallery Image'}
            </button>

            <div className="admin-form-grid">
              <div className="admin-form-field">
                <select
                  id="gallery-image-picker"
                  value={newGalleryPath}
                  onChange={(event) =>
                    setNewGalleryPath(event.target.value)
                  }
                >
                  <option value="">Choose an image</option>
                  {mediaFiles.map((file) => (
                    <option key={file.name} value={file.name}>
                      {file.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-field">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={addGalleryImage}
                  disabled={!newGalleryPath}
                >
                  <Plus size={16} />
                  Add to gallery
                </button>
              </div>
            </div>

            <button
              type="button"
              className="admin-secondary-button"
              onClick={() => void loadMediaFiles()}
              disabled={mediaLoading}
            >
              {mediaLoading ? (
                <LoaderCircle size={15} className="admin-spin" />
              ) : (
                <RefreshCw size={15} />
              )}
              Refresh media files
            </button>
          </div>

          {gallery.length === 0 ? (
            <div className="admin-empty-state">
              <ImageIcon size={28} />
              <p>No gallery images added yet.</p>
            </div>
          ) : (
            <div className="admin-gallery-list">
              {gallery.map((item, index) => {
                const media = mediaFiles.find(
                  (file) => file.name === item.image_path,
                );

                return (
                  <div
                    key={item.id ?? `${item.image_path}-${index}`}
                    className="admin-gallery-item"
                    style={{
                      padding: 16,
                      marginBottom: 16,
                      border: '1px solid var(--admin-border, #ddd)',
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <strong>Image {index + 1}</strong>

                      <button
                        type="button"
                        className="admin-secondary-button"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>

                    {media && (
                      <img
                        src={media.url}
                        alt={`Gallery image ${index + 1}`}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                        style={{
                          width: '100%',
                          maxWidth: 360,
                          aspectRatio: '16 / 9',
                          objectFit: 'cover',
                          borderRadius: 8,
                          marginBottom: 12,
                        }}
                      />
                    )}

                    <div className="admin-form-field">
                      <label>Image path</label>
                      <input
                        value={item.image_path}
                        onChange={(event) =>
                          setGallery((current) =>
                            current.map((entry, itemIndex) =>
                              itemIndex === index
                                ? {
                                    ...entry,
                                    image_path: event.target.value,
                                  }
                                : entry,
                            ),
                          )
                        }
                      />
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-field">
                        <label>Caption — English</label>
                        <input
                          value={item.captions.en}
                          onChange={(event) =>
                            updateGalleryCaption(
                              index,
                              'en',
                              event.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="admin-form-field">
                        <label>Caption — العربية</label>
                        <input
                          value={item.captions.ar}
                          onChange={(event) =>
                            updateGalleryCaption(
                              index,
                              'ar',
                              event.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="admin-form-field">
                        <label>Caption — Français</label>
                        <input
                          value={item.captions.fr}
                          onChange={(event) =>
                            updateGalleryCaption(
                              index,
                              'fr',
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="admin-editor-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={onBack}
            disabled={saving || uploadingMain || uploadingGallery}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={saving || uploadingMain || uploadingGallery}
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
