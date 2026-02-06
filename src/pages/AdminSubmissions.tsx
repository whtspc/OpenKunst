import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubmissions } from '../hooks/useSubmissions';
import { SubmissionReviewModal } from '../components/SubmissionReviewModal';
import type { SubmissionWithProfile, SubmissionStatus } from '../api/submissions';
import './AdminSubmissions.css';

type FilterTab = 'all' | SubmissionStatus;

const PLACEHOLDER_IMAGE = `${import.meta.env.BASE_URL}no-image.svg`;

export function AdminSubmissions() {
  const { submissions, loading, error, refetch } = useSubmissions();
  const [activeTab, setActiveTab] = useState<FilterTab>('pending');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithProfile | null>(null);

  const filteredSubmissions = submissions.filter((s) => {
    if (activeTab === 'all') return true;
    return s.status === activeTab;
  });

  const getStatusCount = (status: SubmissionStatus) =>
    submissions.filter((s) => s.status === status).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleCloseModal = () => {
    setSelectedSubmission(null);
    refetch();
  };

  return (
    <div className="admin-submissions">
      <div className="admin-submissions__container">
        <header className="admin-submissions__header">
          <Link to="/" className="admin-submissions__back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to sculptures
          </Link>
          <div className="admin-submissions__header-row">
            <h1 className="admin-submissions__title">Submissions</h1>
            <Link to="/admin/submissions/new" className="admin-submissions__new-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Submission
            </Link>
          </div>
        </header>

        {/* Filter Tabs */}
        <div className="admin-submissions__tabs">
          <button
            className={`admin-submissions__tab ${activeTab === 'pending' ? 'admin-submissions__tab--active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
            <span className="admin-submissions__tab-count">{getStatusCount('pending')}</span>
          </button>
          <button
            className={`admin-submissions__tab ${activeTab === 'approved' ? 'admin-submissions__tab--active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
            <span className="admin-submissions__tab-count">{getStatusCount('approved')}</span>
          </button>
          <button
            className={`admin-submissions__tab ${activeTab === 'rejected' ? 'admin-submissions__tab--active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
            <span className="admin-submissions__tab-count">{getStatusCount('rejected')}</span>
          </button>
          <button
            className={`admin-submissions__tab ${activeTab === 'all' ? 'admin-submissions__tab--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
            <span className="admin-submissions__tab-count">{submissions.length}</span>
          </button>
        </div>

        {/* Submissions List */}
        <div className="admin-submissions__list">
          {loading ? (
            <div className="admin-submissions__loading">Loading submissions...</div>
          ) : error ? (
            <div className="admin-submissions__error">{error.message}</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="admin-submissions__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>No {activeTab === 'all' ? '' : activeTab} submissions</p>
              {activeTab === 'pending' && (
                <Link to="/admin/submissions/new" className="admin-submissions__empty-action">
                  Create your first submission
                </Link>
              )}
            </div>
          ) : (
            <div className="admin-submissions__grid">
              {filteredSubmissions.map((submission) => (
                <button
                  key={submission.id}
                  className="admin-submissions__card"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="admin-submissions__card-image">
                    <img
                      src={submission.images[0] || PLACEHOLDER_IMAGE}
                      alt={submission.name || 'Untitled submission'}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    {submission.images.length > 1 && (
                      <span className="admin-submissions__card-count">
                        +{submission.images.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="admin-submissions__card-content">
                    <div className="admin-submissions__card-header">
                      <h3 className="admin-submissions__card-title">
                        {submission.name || 'Untitled'}
                      </h3>
                      <span
                        className={`admin-submissions__status admin-submissions__status--${submission.status}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    {submission.artist && (
                      <p className="admin-submissions__card-artist">{submission.artist}</p>
                    )}
                    <div className="admin-submissions__card-meta">
                      <span className="admin-submissions__card-submitter">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        {submission.submitter?.display_name ||
                          submission.submitter?.email?.split('@')[0] ||
                          'Unknown'}
                      </span>
                      <span className="admin-submissions__card-date">
                        {formatDate(submission.created_at)} at {formatTime(submission.created_at)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedSubmission && (
        <SubmissionReviewModal
          submission={selectedSubmission}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
