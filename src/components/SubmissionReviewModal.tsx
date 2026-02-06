import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { submissionsApi } from '../api/submissions';
import type { SubmissionWithProfile, PublishData } from '../api/submissions';
import './SubmissionReviewModal.css';

const PLACEHOLDER_IMAGE = `${import.meta.env.BASE_URL}no-image.svg`;

interface SubmissionReviewModalProps {
  submission: SubmissionWithProfile;
  onClose: () => void;
}

type ModalView = 'review' | 'reject';

export function SubmissionReviewModal({ submission, onClose }: SubmissionReviewModalProps) {
  const { user } = useAuth();
  const [view, setView] = useState<ModalView>('review');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Form state for publishing
  const [name, setName] = useState(submission.name || '');
  const [artist, setArtist] = useState(submission.artist || '');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState(submission.description || '');
  const [materials, setMaterials] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [tags, setTags] = useState('');

  // Reject state
  const [rejectNotes, setRejectNotes] = useState('');

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEditable = submission.status === 'pending';
  const images = submission.images.length > 0 ? submission.images : [PLACEHOLDER_IMAGE];

  const handlePrevImage = () => {
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleSaveDraft = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await submissionsApi.update(submission.id, {
        name: name.trim() || null,
        artist: artist.trim() || null,
        description: description.trim() || null,
      });
      setSuccess('Draft saved');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user) return;

    if (!name.trim()) {
      setError('Name is required to publish');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const publishData: PublishData = {
        name: name.trim(),
        artist: artist.trim() || null,
        year: year.trim() ? parseInt(year.trim(), 10) : null,
        description: description.trim() || null,
        materials: materials.trim()
          ? materials.split(',').map((m) => m.trim()).filter(Boolean)
          : [],
        address: address.trim() || null,
        city: city.trim() || null,
        tags: tags.trim()
          ? tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      await submissionsApi.publish(submission.id, user.id, publishData);
      setSuccess('Published successfully!');

      // Close modal after a short delay
      setTimeout(onClose, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!user) return;

    if (!rejectNotes.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await submissionsApi.reject(submission.id, user.id, rejectNotes.trim());
      setSuccess('Submission rejected');
      setTimeout(onClose, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission? This cannot be undone.')) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await submissionsApi.delete(submission.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${submission.lng - 0.005}%2C${submission.lat - 0.003}%2C${submission.lng + 0.005}%2C${submission.lat + 0.003}&layer=mapnik&marker=${submission.lat}%2C${submission.lng}`;

  return (
    <div className="submission-modal">
      <div className="submission-modal__backdrop" onClick={onClose} />
      <div className="submission-modal__container">
        <header className="submission-modal__header">
          <button className="submission-modal__close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span
            className={`submission-modal__status submission-modal__status--${submission.status}`}
          >
            {submission.status}
          </span>
        </header>

        <div className="submission-modal__content">
          {view === 'review' && (
            <>
              {/* Image Gallery */}
              <div className="submission-modal__gallery">
                <img
                  src={images[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="submission-modal__image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                  }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      className="submission-modal__nav submission-modal__nav--prev"
                      onClick={handlePrevImage}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className="submission-modal__nav submission-modal__nav--next"
                      onClick={handleNextImage}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <div className="submission-modal__dots">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          className={`submission-modal__dot ${
                            i === currentImageIndex ? 'submission-modal__dot--active' : ''
                          }`}
                          onClick={() => setCurrentImageIndex(i)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Metadata */}
              <div className="submission-modal__meta">
                <p>
                  <strong>Submitted by:</strong>{' '}
                  {submission.submitter?.display_name ||
                    submission.submitter?.email ||
                    'Unknown'}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(submission.created_at)}
                </p>
                {submission.reviewed_by && (
                  <p>
                    <strong>Reviewed by:</strong>{' '}
                    {submission.reviewer?.display_name || submission.reviewer?.email}
                  </p>
                )}
                {submission.review_notes && (
                  <p>
                    <strong>Notes:</strong> {submission.review_notes}
                  </p>
                )}
              </div>

              {/* Edit Form */}
              <div className="submission-modal__form">
                <h2 className="submission-modal__section-title">Sculpture Details</h2>

                <div className="submission-modal__field">
                  <label htmlFor="name" className="submission-modal__label">
                    Name <span className="submission-modal__required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="submission-modal__input"
                    placeholder="e.g. The Thinker"
                    disabled={!isEditable || saving}
                  />
                </div>

                <div className="submission-modal__row">
                  <div className="submission-modal__field">
                    <label htmlFor="artist" className="submission-modal__label">
                      Artist
                    </label>
                    <input
                      id="artist"
                      type="text"
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      className="submission-modal__input"
                      placeholder="e.g. Auguste Rodin"
                      disabled={!isEditable || saving}
                    />
                  </div>
                  <div className="submission-modal__field">
                    <label htmlFor="year" className="submission-modal__label">
                      Year
                    </label>
                    <input
                      id="year"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="submission-modal__input"
                      placeholder="e.g. 1902"
                      disabled={!isEditable || saving}
                    />
                  </div>
                </div>

                <div className="submission-modal__field">
                  <label htmlFor="description" className="submission-modal__label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="submission-modal__textarea"
                    placeholder="Describe the sculpture..."
                    rows={3}
                    disabled={!isEditable || saving}
                  />
                </div>

                <div className="submission-modal__field">
                  <label htmlFor="materials" className="submission-modal__label">
                    Materials
                  </label>
                  <input
                    id="materials"
                    type="text"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    className="submission-modal__input"
                    placeholder="e.g. Bronze, Steel, Glass (comma-separated)"
                    disabled={!isEditable || saving}
                  />
                </div>

                <div className="submission-modal__row">
                  <div className="submission-modal__field">
                    <label htmlFor="address" className="submission-modal__label">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="submission-modal__input"
                      placeholder="e.g. Kerkstraat 1"
                      disabled={!isEditable || saving}
                    />
                  </div>
                  <div className="submission-modal__field">
                    <label htmlFor="city" className="submission-modal__label">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="submission-modal__input"
                      placeholder="e.g. Heerhugowaard"
                      disabled={!isEditable || saving}
                    />
                  </div>
                </div>

                <div className="submission-modal__field">
                  <label htmlFor="tags" className="submission-modal__label">
                    Tags
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="submission-modal__input"
                    placeholder="e.g. Modern, Abstract, Public Art (comma-separated)"
                    disabled={!isEditable || saving}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="submission-modal__location">
                <h2 className="submission-modal__section-title">Location</h2>
                <p className="submission-modal__coords">
                  {submission.lat.toFixed(6)}, {submission.lng.toFixed(6)}
                </p>
                <div className="submission-modal__map-container">
                  <iframe
                    className="submission-modal__map"
                    src={mapUrl}
                    title="Location map"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Feedback */}
              {error && <div className="submission-modal__error">{error}</div>}
              {success && <div className="submission-modal__success">{success}</div>}

              {/* Actions */}
              {isEditable && (
                <div className="submission-modal__actions">
                  <button
                    className="submission-modal__btn submission-modal__btn--secondary"
                    onClick={handleSaveDraft}
                    disabled={saving}
                  >
                    Save Draft
                  </button>
                  <button
                    className="submission-modal__btn submission-modal__btn--danger"
                    onClick={() => setView('reject')}
                    disabled={saving}
                  >
                    Reject
                  </button>
                  <button
                    className="submission-modal__btn submission-modal__btn--primary"
                    onClick={handlePublish}
                    disabled={saving || !name.trim()}
                  >
                    {saving ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              )}

              {!isEditable && (
                <div className="submission-modal__actions">
                  <button
                    className="submission-modal__btn submission-modal__btn--danger"
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    Delete Submission
                  </button>
                </div>
              )}
            </>
          )}

          {view === 'reject' && (
            <div className="submission-modal__reject">
              <h2 className="submission-modal__section-title">Reject Submission</h2>
              <p className="submission-modal__reject-hint">
                Please provide a reason for rejection. This will be visible to the submitter.
              </p>

              <div className="submission-modal__field">
                <label htmlFor="rejectNotes" className="submission-modal__label">
                  Rejection Notes <span className="submission-modal__required">*</span>
                </label>
                <textarea
                  id="rejectNotes"
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  className="submission-modal__textarea"
                  placeholder="e.g. Image quality too low, not a sculpture, duplicate..."
                  rows={4}
                  disabled={saving}
                />
              </div>

              {error && <div className="submission-modal__error">{error}</div>}
              {success && <div className="submission-modal__success">{success}</div>}

              <div className="submission-modal__actions">
                <button
                  className="submission-modal__btn submission-modal__btn--secondary"
                  onClick={() => {
                    setView('review');
                    setError(null);
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="submission-modal__btn submission-modal__btn--danger"
                  onClick={handleReject}
                  disabled={saving || !rejectNotes.trim()}
                >
                  {saving ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
