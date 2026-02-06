import { useState, useEffect, useCallback } from 'react';
import { submissionsApi } from '../api/submissions';
import type { SubmissionWithProfile } from '../api/submissions';

interface UseSubmissionsResult {
  submissions: SubmissionWithProfile[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSubmissions(): UseSubmissionsResult {
  const [submissions, setSubmissions] = useState<SubmissionWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await submissionsApi.list();
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch submissions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    submissions,
    loading,
    error,
    refetch: fetchSubmissions,
  };
}

interface UseSubmissionResult {
  submission: SubmissionWithProfile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSubmission(id: string | null): UseSubmissionResult {
  const [submission, setSubmission] = useState<SubmissionWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubmission = useCallback(async () => {
    if (!id) {
      setSubmission(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await submissionsApi.get(id);
      setSubmission(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch submission'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return {
    submission,
    loading,
    error,
    refetch: fetchSubmission,
  };
}
