import { supabase } from '../lib/supabase';
import type { Sculpture } from '../types/Sculpture';
import type { Tables } from '../lib/database.types';

// Convert database row to Sculpture type
function dbToSculpture(row: Tables<'sculptures'>): Sculpture {
  return {
    id: row.id,
    name: row.name,
    artist: row.artist ?? 'Unknown Artist',
    year: row.year,
    description: row.description ?? '',
    materials: row.materials,
    location: {
      lat: row.lat,
      lng: row.lng,
      address: row.address ?? '',
      city: row.city ?? '',
    },
    images: row.images,
    tags: row.tags,
  };
}

export const sculpturesApi = {
  // List all approved sculptures
  async list(): Promise<Sculpture[]> {
    const { data, error } = await supabase
      .from('sculptures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sculptures:', error);
      throw error;
    }

    return (data ?? []).map(dbToSculpture);
  },

  // Get single sculpture by ID
  async get(id: string): Promise<Sculpture | null> {
    const { data, error } = await supabase
      .from('sculptures')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error('Error fetching sculpture:', error);
      throw error;
    }

    return data ? dbToSculpture(data) : null;
  },
};
