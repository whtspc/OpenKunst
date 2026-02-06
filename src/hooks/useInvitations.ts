import { useState, useEffect } from 'react';
import { invitationsApi } from '../api/invitations';
import type { InvitationWithStatus } from '../api/invitations';

interface UseInvitationsResult {
  invitations: InvitationWithStatus[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useInvitations(): UseInvitationsResult {
  const [invitations, setInvitations] = useState<InvitationWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await invitationsApi.list();
      setInvitations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch invitations'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return {
    invitations,
    loading,
    error,
    refetch: fetchInvitations,
  };
}
