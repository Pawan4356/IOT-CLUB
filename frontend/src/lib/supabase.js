import { createClient } from '@supabase/supabase-js';
import conf from '../conf/conf'

const supabaseUrl = conf.supabaseUrl;
const supabaseAnonKey = conf.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client with auth configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Automatically detect auth callbacks
    flowType: 'pkce', // Use PKCE flow for better security
  },
});
