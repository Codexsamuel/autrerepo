import { DatabaseService } from '@/lib/database';
import { supabase } from '@/lib/supabase/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // Authentification via JWT/session (exemple avec cookie ou header Authorization)
  const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies['auth_token'];
  if (!token) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  // Vérifier le token avec Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  // Vérifier le rôle superadmin
  // On suppose que le rôle est stocké dans user.user_metadata.role ou user.role
  const role = user.user_metadata?.role || user.role;
  if (role !== 'super_admin') {
    return res.status(403).json({ error: 'Accès refusé : superadmin requis' });
  }

  // Appliquer la modification
  const { userId, updates } = req.body;
  if (!userId || !updates) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  try {
    const updated = await DatabaseService.updateUser(userId, updates);
    return res.status(200).json({ success: true, user: updated });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
} 