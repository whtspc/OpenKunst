import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGPSCapture } from '../hooks/useGPSCapture';
import { submissionsApi } from '../api/submissions';
import { uploadImages } from '../utils/imageUpload';
import { MapPicker } from '../components/MapPicker';
import './NewSubmission.css';

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/heic,image/heif';

type Step = 'capture' | 'details' | 'submitting';

export function NewSubmission() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    location,
    status: gpsStatus,
    accuracy,
    error: gpsError,
    captureGPS,
    setManualLocation,
  } = useGPSCapture();

  const [step, setStep] = useState<Step>('capture');
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Auto-capture GPS on mount
  useEffect(() => {
    captureGPS();
  }, [captureGPS]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    setImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_IMAGES);
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleGallerySelect = () => {
    galleryInputRef.current?.click();
  };

  const handleContinue = () => {
    if (images.length === 0) {
      setError('Please capture at least one photo');
      return;
    }

    if (!location) {
      setError('Location is required. Please enable GPS or enter coordinates manually.');
      return;
    }

    setError(null);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !location) {
      setError('Missing user or location data');
      return;
    }

    setStep('submitting');
    setError(null);
    setUploadProgress(0);

    try {
      // Generate a temporary ID for organizing uploads
      const tempId = crypto.randomUUID();

      // Upload images
      setUploadProgress(10);
      const uploadedImages = await uploadImages(images, user.id, tempId);
      setUploadProgress(70);

      // Create submission
      await submissionsApi.create(user.id, {
        lat: location.lat,
        lng: location.lng,
        images: uploadedImages.map((img) => img.url),
        name: name.trim() || null,
        artist: artist.trim() || null,
        description: description.trim() || null,
      });

      setUploadProgress(100);

      // Navigate to submissions list
      navigate('/admin/submissions');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit');
      setStep('details');
    }
  };

  const handleSkipDetails = async () => {
    if (!user || !location) {
      setError('Missing user or location data');
      return;
    }

    setStep('submitting');
    setError(null);
    setUploadProgress(0);

    try {
      const tempId = crypto.randomUUID();

      setUploadProgress(10);
      const uploadedImages = await uploadImages(images, user.id, tempId);
      setUploadProgress(70);

      await submissionsApi.create(user.id, {
        lat: location.lat,
        lng: location.lng,
        images: uploadedImages.map((img) => img.url),
      });

      setUploadProgress(100);
      navigate('/admin/submissions');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit');
      setStep('capture');
    }
  };

  return (
    <div className="new-submission">
      <header className="new-submission__header">
        <Link to="/admin/submissions" className="new-submission__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Cancel
        </Link>
        <h1 className="new-submission__title">New Submission</h1>
      </header>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        capture="environment"
        onChange={handleFileChange}
        className="new-submission__hidden-input"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        onChange={handleFileChange}
        className="new-submission__hidden-input"
      />

      <div className="new-submission__content">
        {step === 'capture' && (
          <div className="new-submission__capture">
            {/* Image preview grid */}
            {images.length > 0 && (
              <div className="new-submission__preview-grid">
                {images.map((file, index) => (
                  <div key={index} className="new-submission__preview-item">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Captured ${index + 1}`}
                      className="new-submission__preview-image"
                    />
                    <button
                      type="button"
                      className="new-submission__preview-remove"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Camera buttons */}
            <div className="new-submission__camera-buttons">
              <button
                type="button"
                className="new-submission__camera-btn new-submission__camera-btn--primary"
                onClick={handleCameraCapture}
                disabled={images.length >= MAX_IMAGES}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Take Photo
              </button>
              <button
                type="button"
                className="new-submission__camera-btn"
                onClick={handleGallerySelect}
                disabled={images.length >= MAX_IMAGES}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Gallery
              </button>
            </div>

            <p className="new-submission__hint">
              {images.length}/{MAX_IMAGES} photos
            </p>

            {/* GPS Status */}
            <div className="new-submission__gps">
              <div className="new-submission__gps-status">
                {gpsStatus === 'capturing' && (
                  <>
                    <span className="new-submission__gps-icon new-submission__gps-icon--loading">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </span>
                    <span>Getting location...</span>
                  </>
                )}
                {gpsStatus === 'success' && location && (
                  <>
                    <span className="new-submission__gps-icon new-submission__gps-icon--success">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span>
                      {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                      {accuracy && <small> ({Math.round(accuracy)}m accuracy)</small>}
                    </span>
                  </>
                )}
                {gpsStatus === 'manual' && location && (
                  <>
                    <span className="new-submission__gps-icon new-submission__gps-icon--manual">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span>
                      {location.lat.toFixed(5)}, {location.lng.toFixed(5)} (manual)
                    </span>
                  </>
                )}
                {gpsStatus === 'error' && (
                  <>
                    <span className="new-submission__gps-icon new-submission__gps-icon--error">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </span>
                    <span>{gpsError}</span>
                  </>
                )}
                {gpsStatus === 'idle' && (
                  <>
                    <span className="new-submission__gps-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span>Location not captured</span>
                  </>
                )}
              </div>

              <div className="new-submission__gps-actions">
                {(gpsStatus === 'error' || gpsStatus === 'idle') && (
                  <button
                    type="button"
                    className="new-submission__gps-btn"
                    onClick={captureGPS}
                  >
                    Retry GPS
                  </button>
                )}
                <button
                  type="button"
                  className="new-submission__gps-btn"
                  onClick={() => setShowManualLocation(!showManualLocation)}
                >
                  Enter Manually
                </button>
              </div>

              {showManualLocation && (
                <MapPicker
                  location={location}
                  onLocationSelect={(lat, lng) => {
                    setManualLocation(lat, lng);
                    setShowManualLocation(false);
                  }}
                  height={250}
                />
              )}
            </div>

            {error && <div className="new-submission__error">{error}</div>}

            <div className="new-submission__actions">
              <button
                type="button"
                className="new-submission__btn new-submission__btn--primary"
                onClick={handleContinue}
                disabled={images.length === 0 || !location}
              >
                Continue
              </button>
              <button
                type="button"
                className="new-submission__btn new-submission__btn--secondary"
                onClick={handleSkipDetails}
                disabled={images.length === 0 || !location}
              >
                Quick Submit (no details)
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <form className="new-submission__details" onSubmit={handleSubmit}>
            <p className="new-submission__details-hint">
              Add optional details now, or leave blank to fill in later during review.
            </p>

            <div className="new-submission__field">
              <label htmlFor="name" className="new-submission__label">
                Sculpture Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="new-submission__input"
                placeholder="e.g. The Thinker"
              />
            </div>

            <div className="new-submission__field">
              <label htmlFor="artist" className="new-submission__label">
                Artist
              </label>
              <input
                id="artist"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="new-submission__input"
                placeholder="e.g. Auguste Rodin"
              />
            </div>

            <div className="new-submission__field">
              <label htmlFor="description" className="new-submission__label">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="new-submission__textarea"
                placeholder="Describe the sculpture..."
                rows={4}
              />
            </div>

            {error && <div className="new-submission__error">{error}</div>}

            <div className="new-submission__actions">
              <button
                type="button"
                className="new-submission__btn"
                onClick={() => setStep('capture')}
              >
                Back
              </button>
              <button
                type="submit"
                className="new-submission__btn new-submission__btn--primary"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {step === 'submitting' && (
          <div className="new-submission__submitting">
            <div className="new-submission__spinner" />
            <p className="new-submission__submitting-text">
              {uploadProgress < 70 ? 'Uploading images...' : 'Creating submission...'}
            </p>
            <div className="new-submission__progress">
              <div
                className="new-submission__progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
