import { createClient } from '@supabase/supabase-js';

// Client Supabase pour le côté client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Client Supabase Admin pour le côté serveur
export const supabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Client Supabase pour les composants serveur
export const createServerComponentClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Client Supabase pour les composants client
export const createClientComponentClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
); 