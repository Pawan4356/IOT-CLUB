import { supabase } from '../lib/supabase';

// Registrations Service
const registrationsService = {
  // Create registration
  async create(registrationData) {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's registrations
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        events (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get registrations for an event
  async getByEventId(eventId) {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        profiles (*)
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Check if user is registered for event
  async isRegistered(userId, eventId) {
    const { data, error } = await supabase
      .from('registrations')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  // Update registration status
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export default registrationsService;