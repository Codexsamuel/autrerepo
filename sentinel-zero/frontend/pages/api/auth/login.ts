import { NextApiRequest, NextApiResponse } from 'next';

interface LoginPayload {
  master_code: string;
  admin_id: string;
  voice_hash: string;
  fingerprint_hash: string;
  vocal_phrase: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { master_code, admin_id, voice_hash, fingerprint_hash, vocal_phrase }: LoginPayload = req.body;

    // Vérification des identifiants Sentinel Zero
    const MASTER_CODE = "0987612345";
    const SUPER_ADMIN_ID = "DL-SUPER-01";
    const BIOMETRIC_VOICE_HASH = "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0";
    const BIOMETRIC_FP_HASH = "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1";
    const RED_BUTTON_PHRASE = "i am sentinel";

    // Authentification 5 niveaux
    if (master_code !== MASTER_CODE) {
      return res.status(401).json({ error: 'Code maître invalide' });
    }

    if (admin_id !== SUPER_ADMIN_ID) {
      return res.status(401).json({ error: 'ID administrateur invalide' });
    }

    if (voice_hash !== BIOMETRIC_VOICE_HASH) {
      return res.status(401).json({ error: 'Empreinte vocale invalide' });
    }

    if (fingerprint_hash !== BIOMETRIC_FP_HASH) {
      return res.status(401).json({ error: 'Empreinte digitale invalide' });
    }

    if (vocal_phrase !== RED_BUTTON_PHRASE) {
      return res.status(401).json({ error: 'Phrase vocale invalide' });
    }

    // Génération du token
    const token = `sentinel_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return res.status(200).json({
      status: 'success',
      message: 'Authentification réussie - Accès Sentinel Zero autorisé',
      token,
      access_level: 'SUPER_ADMIN',
      expires_in: 3600
    });

  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
