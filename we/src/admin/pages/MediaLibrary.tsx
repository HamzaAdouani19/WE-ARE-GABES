
import { useCallback, useEffect, useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  RefreshCw,
  Search,
  X,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  createImageStorageName,
  getImageUploadErrorMessage,
  IMAGE_UPLOAD_ACCEPT,
  validateImageUpload,
  type ImageUploadValidationError,
} from '../utils/imageUploads';

const BUCKET_NAME = 'gabes-media';

interface MediaFile {
  name: string;
  id: string;
  created_at: string | null;
  updated_at: string | null;
  metadata: {
    size?: number;
    mimetype?: string;
  } | null;
  path: string;
  publicUrl: string;
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadFiles = useCallback(async () => {
    const client = supabase;
    if (!client) {
      setError('Supabase is not configured.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    const allFiles: Array<{
      name: string;
      id: string | null;
      created_at: string | null;
      updated_at: string | null;
      metadata: { size?: number; mimetype?: string } | null;
    }> = [];
    let offset = 0;
    const pageSize = 100;

    while (true) {
      const { data: page, error: listError } = await client.storage
        .from(BUCKET_NAME)
        .list('', {
          limit: pageSize,
          offset,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (listError) {
        setError(listError.message);
        setFiles([]);
        setIsLoading(false);
        return;
      }

      allFiles.push(...(page ?? []));
      if (!page || page.length < pageSize) break;
      offset += pageSize;
    }

    const mediaFiles: MediaFile[] = allFiles
      .filter(
        (file): file is typeof file & { id: string; name: string } =>
          Boolean(file.id && file.name),
      )
      .map((file) => {
        const path = file.name;
        const { data: publicData } = client.storage
          .from(BUCKET_NAME)
          .getPublicUrl(path);

        return {
          ...file,
          path,
          publicUrl: publicData.publicUrl,
        };
      })
      .filter((file) => file.metadata?.mimetype?.startsWith('image/'));

    setFiles(mediaFiles);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadFiles();
  }, [loadFiles]);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (!supabase || selectedFiles.length === 0) return;

    const validationErrors = new Set<ImageUploadValidationError>();
    for (const file of selectedFiles) {
      const validationError = validateImageUpload(file);
      if (validationError) validationErrors.add(validationError);
    }

    if (validationErrors.size > 0) {
      setError(
        [...validationErrors]
          .map(getImageUploadErrorMessage)
          .join(' '),
      );
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    let uploadedCount = 0;
    const failedFiles: string[] = [];

    for (const file of selectedFiles) {
      const filePath = createImageStorageName(file);

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        failedFiles.push(`${file.name}: ${uploadError.message}`);
      } else {
        uploadedCount++;
      }
    }

    setIsUploading(false);

    if (uploadedCount > 0) {
      setSuccess(
        `${uploadedCount} image${uploadedCount > 1 ? 's' : ''} uploaded successfully.`,
      );
      await loadFiles();
    }

    if (failedFiles.length > 0) {
      setError(failedFiles.join('\n'));
    }
  };

  const handleDelete = async (path: string) => {
    if (!supabase) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this image?',
    );

    if (!confirmed) return;

    setDeletingPath(path);
    setError('');
    setSuccess('');

    try {
      const [mainImageResult, galleryResult] = await Promise.all([
        supabase
          .from('places')
          .select('id')
          .or(`main_image.eq.${path},main_image.eq.gabes-media/${path}`)
          .limit(1),
        supabase
          .from('place_gallery')
          .select('id')
          .or(`image_path.eq.${path},image_path.eq.gabes-media/${path}`)
          .limit(1),
      ]);

      if (mainImageResult.error) throw mainImageResult.error;
      if (galleryResult.error) throw galleryResult.error;

      if (
        (mainImageResult.data?.length ?? 0) > 0 ||
        (galleryResult.data?.length ?? 0) > 0
      ) {
        setDeletingPath(null);
        setError(
          'This image is still referenced by a place or gallery and cannot be deleted.',
        );
        return;
      }
    } catch (err) {
      setDeletingPath(null);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to verify image references.',
      );
      return;
    }

    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    setDeletingPath(null);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess('Image deleted successfully.');
    await loadFiles();
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setSuccess('Image URL copied.');
    } catch {
      setError('Could not copy the URL. Please copy it manually.');
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()),
  );

  const formatSize = (bytes?: number) => {
    if (bytes === undefined) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="admin-media">
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">CONTENT MANAGEMENT</span>
          <h1>Media Library</h1>
          <p>Manage the images used across WE ARE GABÈS.</p>
        </div>

        <div className="admin-heading-actions">
          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => void loadFiles()}
            disabled={isLoading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <label className="admin-primary-button">
            <Upload size={16} />
            {isUploading ? 'Uploading...' : 'Upload images'}
            <input
              type="file"
              accept={IMAGE_UPLOAD_ACCEPT}
              multiple
              hidden
              disabled={isUploading}
              onChange={handleUpload}
            />
          </label>
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

      <div className="admin-media-toolbar">
        <div className="admin-media-count">
          <ImageIcon size={18} />
          <strong>{files.length}</strong>
          <span>images</span>
        </div>

        <div className="admin-search">
          <Search size={17} />
          <input
            type="search"
            placeholder="Search images..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {isUploading && (
        <div className="admin-upload-status">
          Uploading your images. Please keep this page open.
        </div>
      )}

      {isLoading ? (
        <div className="admin-empty-state">
          <RefreshCw className="admin-loading-icon" size={24} />
          <p>Loading media library...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="admin-empty-state">
          <ImageIcon size={36} />
          <h3>{search ? 'No matching images' : 'Your media library is empty'}</h3>
          <p>
            {search
              ? 'Try another search term.'
              : 'Upload your first image to get started.'}
          </p>
        </div>
      ) : (
        <div className="admin-media-grid">
          {filteredFiles.map((file) => (
            <article className="admin-media-card" key={file.id}>
              <div className="admin-media-preview">
                <img
                  src={file.publicUrl}
                  alt={file.name}
                  loading="lazy"
                />
              </div>

              <div className="admin-media-info">
                <strong title={file.name}>{file.name}</strong>
                <span>{formatSize(file.metadata?.size)}</span>
              </div>

              <div className="admin-media-actions">
                <button
                  type="button"
                  title="Copy public URL"
                  onClick={() => void copyUrl(file.publicUrl)}
                >
                  <Copy size={15} />
                  Copy URL
                </button>

                <a
                  href={file.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open image"
                >
                  <ExternalLink size={15} />
                </a>

                <button
                  type="button"
                  className="admin-media-delete"
                  title="Delete image"
                  disabled={deletingPath === file.path}
                  onClick={() => void handleDelete(file.path)}
                >
                  {deletingPath === file.path ? (
                    <RefreshCw size={15} />
                  ) : (
                    <Trash2 size={15} />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
