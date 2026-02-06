import { supabase } from '../lib/supabase';
import type { Tables } from '../lib/database.types';

export type Invitation = Tables<'invitations'>;

export type InvitationStatus = 'pending' | 'accepted' | 'expired';

export interface InvitationWithStatus extends Invitation {
  status: InvitationStatus;
}

function getStatus(invitation: Invitation): InvitationStatus {
  if (invitation.accepted_at) {
    return 'accepted';
  }
  if (new Date(invitation.expires_at) <= new Date()) {
    return 'expired';
  }
  return 'pending';
}

function withStatus(invitation: Invitation): InvitationWithStatus {
  return {
    ...invitation,
    status: getStatus(invitation),
  };
}

export const invitationsApi = {
  async list(): Promise<InvitationWithStatus[]> {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching invitations:', error);
      throw error;
    }

    return (data ?? []).map(withStatus);
  },

  async create(email: string): Promise<InvitationWithStatus> {
    const { data, error } = await supabase
      .from('invitations')
      .insert({ email })
      .select()
      .single();

    if (error) {
      console.error('Error creating invitation:', error);
      throw error;
    }

    return withStatus(data);
  },

  async revoke(id: string): Promise<void> {
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error revoking invitation:', error);
      throw error;
    }
  },

  async resend(id: string): Promise<InvitationWithStatus> {
    // Generate new token and extend expiration
    const newToken = crypto.randomUUID();
    const newExpiration = new Date();
    newExpiration.setDate(newExpiration.getDate() + 7);

    const { data, error } = await supabase
      .from('invitations')
      .update({
        token: newToken,
        expires_at: newExpiration.toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error resending invitation:', error);
      throw error;
    }

    return withStatus(data);
  },
};
