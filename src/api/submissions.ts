import { supabase } from '../lib/supabase';
import type { Tables, InsertTables } from '../lib/database.types';

export type Submission = Tables<'submissions'>;
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface SubmissionWithProfile extends Submission {
  submitter?: {
    id: string;
    email: string;
    display_name: string | null;
  };
  reviewer?: {
    id: string;
    email: string;
    display_name: string | null;
  } | null;
}

export interface CreateSubmissionData {
  lat: number;
  lng: number;
  images: string[];
  name?: string | null;
  artist?: string | null;
  description?: string | null;
}

export interface UpdateSubmissionData {
  name?: string | null;
  artist?: string | null;
  description?: string | null;
  lat?: number;
  lng?: number;
  images?: string[];
  status?: SubmissionStatus;
  reviewed_by?: string | null;
  review_notes?: string | null;
}

export interface PublishData {
  name: string;
  artist?: string | null;
  year?: number | null;
  description?: string | null;
  materials?: string[];
  address?: string | null;
  city?: string | null;
  tags?: string[];
}

export const submissionsApi = {
  async list(): Promise<SubmissionWithProfile[]> {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        submitter:profiles!submitted_by(id, email, display_name),
        reviewer:profiles!reviewed_by(id, email, display_name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }

    return (data ?? []).map(row => ({
      ...row,
      submitter: row.submitter as SubmissionWithProfile['submitter'],
      reviewer: row.reviewer as SubmissionWithProfile['reviewer'],
    }));
  },

  async get(id: string): Promise<SubmissionWithProfile | null> {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        submitter:profiles!submitted_by(id, email, display_name),
        reviewer:profiles!reviewed_by(id, email, display_name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('Error fetching submission:', error);
      throw error;
    }

    return data ? {
      ...data,
      submitter: data.submitter as SubmissionWithProfile['submitter'],
      reviewer: data.reviewer as SubmissionWithProfile['reviewer'],
    } : null;
  },

  async create(submittedBy: string, data: CreateSubmissionData): Promise<Submission> {
    const insertData: InsertTables<'submissions'> = {
      submitted_by: submittedBy,
      lat: data.lat,
      lng: data.lng,
      images: data.images,
      name: data.name ?? null,
      artist: data.artist ?? null,
      description: data.description ?? null,
      status: 'pending',
    };

    const { data: result, error } = await supabase
      .from('submissions')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating submission:', error);
      throw error;
    }

    return result;
  },

  async update(id: string, data: UpdateSubmissionData): Promise<Submission> {
    const { data: result, error } = await supabase
      .from('submissions')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating submission:', error);
      throw error;
    }

    return result;
  },

  async publish(id: string, reviewerId: string, sculptureData: PublishData): Promise<void> {
    // First get the submission to get location and images
    const submission = await this.get(id);
    if (!submission) {
      throw new Error('Submission not found');
    }

    // Insert into sculptures table
    const { error: sculptureError } = await supabase
      .from('sculptures')
      .insert({
        name: sculptureData.name,
        artist: sculptureData.artist ?? null,
        year: sculptureData.year ?? null,
        description: sculptureData.description ?? null,
        materials: sculptureData.materials ?? [],
        lat: submission.lat,
        lng: submission.lng,
        address: sculptureData.address ?? null,
        city: sculptureData.city ?? null,
        images: submission.images,
        tags: sculptureData.tags ?? [],
        approved_by: reviewerId,
      });

    if (sculptureError) {
      console.error('Error creating sculpture:', sculptureError);
      throw sculptureError;
    }

    // Update submission status
    const { error: updateError } = await supabase
      .from('submissions')
      .update({
        status: 'approved',
        reviewed_by: reviewerId,
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating submission status:', updateError);
      throw updateError;
    }
  },

  async reject(id: string, reviewerId: string, notes: string): Promise<Submission> {
    const { data, error } = await supabase
      .from('submissions')
      .update({
        status: 'rejected',
        reviewed_by: reviewerId,
        review_notes: notes,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error rejecting submission:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  },
};
