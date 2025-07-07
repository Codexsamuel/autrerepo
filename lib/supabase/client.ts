import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Créer le client Supabase seulement si les variables sont configurées
let supabase: any = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Erreur lors de l\'initialisation de Supabase:', error);
  }
}

// Fonction helper pour vérifier si Supabase est disponible
export function isSupabaseAvailable(): boolean {
  return supabase !== null;
}

export { supabase };
export default supabase 