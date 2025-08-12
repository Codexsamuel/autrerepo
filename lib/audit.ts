import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Interface pour les métadonnées d'audit
 */
interface AuditMeta {
  [key: string]: any;
}

/**
 * Fonction principale d'audit avec chaîne de hash inviolable
 * Chaque entrée est liée à la précédente par un hash cryptographique
 */
export async function audit(
  actor: string | null, 
  action: string, 
  target: string, 
  meta: AuditMeta = {}
): Promise<void> {
  try {
    const supa = supabaseAdmin();
    
    // Récupérer le dernier hash de la chaîne
    const { data: lastEntry, error: lastError } = await supa
      .from("audit_chain")
      .select("curr_hash")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    const prevHash = lastEntry?.curr_hash || "";
    
    // Créer le hash actuel basé sur les données + hash précédent + timestamp
    const currentData = {
      prev: prevHash,
      actor,
      action,
      target,
      meta,
      timestamp: Date.now(),
      nonce: crypto.randomBytes(16).toString('hex') // Éviter les collisions
    };
    
    const currentHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(currentData))
      .digest("hex");

    // Insérer dans la chaîne d'audit
    const { error: insertError } = await supa
      .from("audit_chain")
      .insert({
        actor,
        action,
        target,
        meta,
        prev_hash: prevHash,
        curr_hash: currentHash,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Erreur insertion audit chain:', insertError);
      throw new Error("AUDIT_INSERT_ERROR");
    }

    // Log de succès
    console.log(`✅ Audit enregistré: ${action} sur ${target} par ${actor || 'système'}`);

  } catch (error) {
    console.error('❌ Erreur audit:', error);
    // Ne pas faire échouer l'opération principale à cause de l'audit
  }
}

/**
 * Vérifie l'intégrité de la chaîne d'audit
 * Retourne true si la chaîne est intacte, false sinon
 */
export async function verifyAuditChainIntegrity(): Promise<{
  isIntact: boolean;
  totalEntries: number;
  corruptedEntries: number;
  details: string[];
}> {
  try {
    const supa = supabaseAdmin();
    
    // Récupérer toute la chaîne d'audit
    const { data: chain, error } = await supa
      .from("audit_chain")
      .select("*")
      .order("id", { ascending: true });

    if (error || !chain || chain.length === 0) {
      return {
        isIntact: false,
        totalEntries: 0,
        corruptedEntries: 0,
        details: ["Chaîne d'audit vide ou inaccessible"]
      };
    }

    let isIntact = true;
    let corruptedEntries = 0;
    const details: string[] = [];
    let expectedPrevHash = "";

    for (let i = 0; i < chain.length; i++) {
      const entry = chain[i];
      
      if (i === 0) {
        // Première entrée
        if (entry.prev_hash !== "") {
          isIntact = false;
          corruptedEntries++;
          details.push(`Entrée ${i + 1}: prev_hash devrait être vide, trouvé: ${entry.prev_hash}`);
        }
      } else {
        // Vérifier la continuité de la chaîne
        if (entry.prev_hash !== expectedPrevHash) {
          isIntact = false;
          corruptedEntries++;
          details.push(`Entrée ${i + 1}: prev_hash incorrect. Attendu: ${expectedPrevHash}, trouvé: ${entry.prev_hash}`);
        }
      }

      // Calculer le hash attendu pour la prochaine entrée
      const currentData = {
        prev: entry.prev_hash,
        actor: entry.actor,
        action: entry.action,
        target: entry.target,
        meta: entry.meta,
        timestamp: new Date(entry.created_at).getTime(),
        nonce: crypto.randomBytes(16).toString('hex')
      };
      
      expectedPrevHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(currentData))
        .digest("hex");
    }

    return {
      isIntact,
      totalEntries: chain.length,
      corruptedEntries,
      details
    };

  } catch (error) {
    console.error('Erreur vérification intégrité audit:', error);
    return {
      isIntact: false,
      totalEntries: 0,
      corruptedEntries: 0,
      details: [`Erreur lors de la vérification: ${error}`]
    };
  }
}

/**
 * Récupère l'historique d'audit pour un utilisateur spécifique
 */
export async function getUserAuditHistory(
  userId: string, 
  limit: number = 50,
  offset: number = 0
): Promise<any[]> {
  try {
    const supa = supabaseAdmin();
    
    const { data, error } = await supa
      .from("audit_chain")
      .select("*")
      .eq("actor", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Erreur récupération historique audit:', error);
      return [];
    }

    return data || [];

  } catch (error) {
    console.error('Erreur historique audit utilisateur:', error);
    return [];
  }
}

/**
 * Récupère les statistiques d'audit
 */
export async function getAuditStats(): Promise<{
  totalActions: number;
  actionsByType: Record<string, number>;
  recentActivity: any[];
  topActors: any[];
}> {
  try {
    const supa = supabaseAdmin();
    
    // Total des actions
    const { count: totalActions } = await supa
      .from("audit_chain")
      .select("*", { count: "exact", head: true });

    // Actions par type
    const { data: actionsByType } = await supa
      .from("audit_chain")
      .select("action")
      .order("created_at", { ascending: false });

    const actionCounts: Record<string, number> = {};
    actionsByType?.forEach(entry => {
      actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1;
    });

    // Activité récente (24h)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const { data: recentActivity } = await supa
      .from("audit_chain")
      .select("action, target, created_at, actor")
      .gte("created_at", yesterday.toISOString())
      .order("created_at", { ascending: false })
      .limit(20);

    // Top acteurs
    const { data: topActors } = await supa
      .from("audit_chain")
      .select("actor, count")
      .not("actor", "is", null)
      .group("actor")
      .order("count", { ascending: false })
      .limit(10);

    return {
      totalActions: totalActions || 0,
      actionsByType: actionCounts,
      recentActivity: recentActivity || [],
      topActors: topActors || []
    };

  } catch (error) {
    console.error('Erreur statistiques audit:', error);
    return {
      totalActions: 0,
      actionsByType: {},
      recentActivity: [],
      topActors: []
    };
  }
}

/**
 * Middleware pour auditer automatiquement les fonctions
 */
export function withAudit<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  action: string,
  target: string,
  metaExtractor?: (...args: T) => AuditMeta
) {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    
    try {
      const result = await fn(...args);
      
      // Audit du succès
      await audit(null, action, target, {
        ...(metaExtractor ? metaExtractor(...args) : {}),
        success: true,
        duration_ms: Date.now() - startTime,
        timestamp: new Date().toISOString()
      });
      
      return result;
      
    } catch (error) {
      // Audit de l'erreur
      await audit(null, `${action}_ERROR`, target, {
        ...(metaExtractor ? metaExtractor(...args) : {}),
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        duration_ms: Date.now() - startTime,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  };
} 