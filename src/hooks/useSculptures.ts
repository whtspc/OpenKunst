import { useState, useEffect } from 'react';
import type { Sculpture } from '../types/Sculpture';
import { sculpturesApi } from '../api/sculptures';

interface UseSculpturesResult {
  sculptures: Sculpture[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSculptures(): UseSculpturesResult {
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSculptures = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sculpturesApi.list();
      setSculptures(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch sculptures'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSculptures();
  }, []);

  return {
    sculptures,
    loading,
    error,
    refetch: fetchSculptures,
  };
}
