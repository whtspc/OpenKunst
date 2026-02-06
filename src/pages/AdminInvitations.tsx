import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInvitations } from '../hooks/useInvitations';
import { invitationsApi } from '../api/invitations';
import type { InvitationWithStatus } from '../api/invitations';
import './AdminInvitations.css';

export function AdminInvitations() {
  const { invitations, loading, error, refetch } = useInvitations();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setSubmitting(true);

    try {
      await invitationsApi.create(email);
      setFormSuccess(`Invitation sent to ${email}`);
      setEmail('');
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create invitation');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyLink = async (invitation: InvitationWithStatus) => {
    const url = `${window.location.origin}/accept-invite?token=${invitation.token}`;
    try {
      await navigator.clipboard.writeText(url);
      setFormSuccess('Invitation link copied to clipboard');
      setFormError(null);
    } catch {
      setFormError('Failed to copy link');
      setFormSuccess(null);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this invitation?')) {
      return;
    }

    setActionLoading(id);
    setFormError(null);
    setFormSuccess(null);

    try {
      await invitationsApi.revoke(id);
      setFormSuccess('Invitation revoked');
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to revoke invitation');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResend = async (id: string) => {
    setActionLoading(id);
    setFormError(null);
    setFormSuccess(null);

    try {
      await invitationsApi.resend(id);
      setFormSuccess('Invitation resent with new link');
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to resend invitation');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="admin-invitations">
      <div className="admin-invitations__container">
        <header className="admin-invitations__header">
          <Link to="/" className="admin-invitations__back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to sculptures
          </Link>
          <h1 className="admin-invitations__title">Manage Invitations</h1>
        </header>

        <div className="admin-invitations__card">
          <h2 className="admin-invitations__card-title">Send New Invitation</h2>
          <form onSubmit={handleSubmit} className="admin-invitations__form">
            <div className="admin-invitations__field">
              <label htmlFor="email" className="admin-invitations__label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-invitations__input"
                placeholder="user@example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="admin-invitations__submit"
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </form>
          {formSuccess && (
            <div className="admin-invitations__success">{formSuccess}</div>
          )}
          {formError && (
            <div className="admin-invitations__error">{formError}</div>
          )}
        </div>

        <div className="admin-invitations__card">
          <h2 className="admin-invitations__card-title">Invitations</h2>
          {loading ? (
            <div className="admin-invitations__loading">Loading invitations...</div>
          ) : error ? (
            <div className="admin-invitations__error">{error.message}</div>
          ) : invitations.length === 0 ? (
            <div className="admin-invitations__empty">No invitations yet</div>
          ) : (
            <table className="admin-invitations__table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Sent</th>
                  <th>Expires/Accepted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((invitation) => (
                  <tr key={invitation.id}>
                    <td className="admin-invitations__email">{invitation.email}</td>
                    <td>
                      <span
                        className={`admin-invitations__status admin-invitations__status--${invitation.status}`}
                      >
                        {invitation.status}
                      </span>
                    </td>
                    <td>{formatDate(invitation.created_at)}</td>
                    <td>
                      {invitation.accepted_at
                        ? formatDate(invitation.accepted_at)
                        : formatDate(invitation.expires_at)}
                    </td>
                    <td>
                      <div className="admin-invitations__actions">
                        {invitation.status === 'pending' && (
                          <>
                            <button
                              className="admin-invitations__action"
                              onClick={() => handleCopyLink(invitation)}
                              disabled={actionLoading === invitation.id}
                            >
                              Copy Link
                            </button>
                            <button
                              className="admin-invitations__action"
                              onClick={() => handleResend(invitation.id)}
                              disabled={actionLoading === invitation.id}
                            >
                              Resend
                            </button>
                            <button
                              className="admin-invitations__action admin-invitations__action--danger"
                              onClick={() => handleRevoke(invitation.id)}
                              disabled={actionLoading === invitation.id}
                            >
                              Revoke
                            </button>
                          </>
                        )}
                        {invitation.status === 'expired' && (
                          <>
                            <button
                              className="admin-invitations__action"
                              onClick={() => handleResend(invitation.id)}
                              disabled={actionLoading === invitation.id}
                            >
                              Resend
                            </button>
                            <button
                              className="admin-invitations__action admin-invitations__action--danger"
                              onClick={() => handleRevoke(invitation.id)}
                              disabled={actionLoading === invitation.id}
                            >
                              Revoke
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
