export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
        };
      };
      sculptures: {
        Row: {
          id: string;
          name: string;
          artist: string | null;
          year: number | null;
          description: string | null;
          materials: string[];
          lat: number;
          lng: number;
          address: string | null;
          city: string | null;
          images: string[];
          tags: string[];
          approved_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          artist?: string | null;
          year?: number | null;
          description?: string | null;
          materials?: string[];
          lat: number;
          lng: number;
          address?: string | null;
          city?: string | null;
          images?: string[];
          tags?: string[];
          approved_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          artist?: string | null;
          year?: number | null;
          description?: string | null;
          materials?: string[];
          lat?: number;
          lng?: number;
          address?: string | null;
          city?: string | null;
          images?: string[];
          tags?: string[];
          approved_by?: string | null;
          created_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          name: string | null;
          artist: string | null;
          description: string | null;
          lat: number;
          lng: number;
          images: string[];
          status: 'pending' | 'approved' | 'rejected';
          submitted_by: string;
          reviewed_by: string | null;
          review_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          artist?: string | null;
          description?: string | null;
          lat: number;
          lng: number;
          images: string[];
          status?: 'pending' | 'approved' | 'rejected';
          submitted_by: string;
          reviewed_by?: string | null;
          review_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          artist?: string | null;
          description?: string | null;
          lat?: number;
          lng?: number;
          images?: string[];
          status?: 'pending' | 'approved' | 'rejected';
          submitted_by?: string;
          reviewed_by?: string | null;
          review_notes?: string | null;
          created_at?: string;
        };
      };
      invitations: {
        Row: {
          id: string;
          email: string;
          token: string;
          invited_by: string | null;
          expires_at: string;
          accepted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          token?: string;
          invited_by?: string | null;
          expires_at?: string;
          accepted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          token?: string;
          invited_by?: string | null;
          expires_at?: string;
          accepted_at?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
