import { supabaseAdmin } from '@/lib/supabase';

/**
 * Helper pour assurer l'idempotence des opérations
 * Évite les doublons en vérifiant les clés uniques
 */
export async function ensureIdempotent(key: string, route: string): Promise<any> {
  const supa = supabaseAdmin();
  
  try {
    // Vérifier si la clé existe déjà
    const { data: existing, error: checkError } = await supa
      .from("idempotency_keys")
      .select("key, route, created_at")
      .eq("key", key)
      .single();

    if (existing) {
      // La clé existe déjà, c'est un doublon
      throw new Error("IDEMPOTENCY_CONFLICT");
    }

    // Insérer la nouvelle clé
    const { data, error: insertError } = await supa
      .from("idempotency_keys")
      .insert({ 
        key, 
        route,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erreur insertion clé idempotency:', insertError);
      throw new Error("IDEMPOTENCY_INSERT_ERROR");
    }

    return data;

  } catch (error) {
    if (error instanceof Error && error.message === "IDEMPOTENCY_CONFLICT") {
      throw error;
    }
    
    console.error('Erreur idempotency:', error);
    throw new Error("IDEMPOTENCY_ERROR");
  }
}

/**
 * Génère une clé d'idempotence unique basée sur le contenu de la requête
 */
export function generateIdempotencyKey(
  userId: string | null, 
  action: string, 
  payload: any
): string {
  const timestamp = Date.now().toString();
  const payloadHash = btoa(JSON.stringify(payload)).slice(0, 8);
  const userPart = userId ? userId.slice(0, 8) : 'anon';
  
  return `${userPart}-${action}-${payloadHash}-${timestamp}`;
}

/**
 * Vérifie si une opération est déjà en cours (pour éviter les conflits)
 */
export async function isOperationInProgress(
  key: string, 
  maxAgeMinutes: number = 5
): Promise<boolean> {
  const supa = supabaseAdmin();
  
  try {
    const { data, error } = await supa
      .from("idempotency_keys")
      .select("created_at")
      .eq("key", key)
      .single();

    if (error || !data) {
      return false;
    }

    const createdAt = new Date(data.created_at);
    const now = new Date();
    const ageInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    return ageInMinutes < maxAgeMinutes;

  } catch (error) {
    console.error('Erreur vérification opération en cours:', error);
    return false;
  }
}

/**
 * Nettoie les anciennes clés d'idempotence (maintenance)
 */
export async function cleanupOldIdempotencyKeys(maxAgeHours: number = 24): Promise<number> {
  const supa = supabaseAdmin();
  
  try {
    const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000));
    
    const { data, error } = await supa
      .from("idempotency_keys")
      .delete()
      .lt("created_at", cutoffTime.toISOString())
      .select("key");

    if (error) {
      console.error('Erreur nettoyage clés idempotency:', error);
      return 0;
    }

    return data?.length || 0;

  } catch (error) {
    console.error('Erreur nettoyage idempotency:', error);
    return 0;
  }
}

/**
 * Middleware pour vérifier l'idempotence automatiquement
 */
export function withIdempotency<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator?: (...args: T) => string
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator ? keyGenerator(...args) : generateIdempotencyKey(null, fn.name, args);
    
    try {
      await ensureIdempotent(key, `function:${fn.name}`);
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error && error.message === "IDEMPOTENCY_CONFLICT") {
        throw new Error(`Opération déjà effectuée (clé: ${key})`);
      }
      throw error;
    }
  };
} 