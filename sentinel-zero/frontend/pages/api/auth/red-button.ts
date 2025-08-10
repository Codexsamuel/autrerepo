import { NextApiRequest, NextApiResponse } from 'next';

interface RedButtonPayload {
  confirmation: string;
  reason: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { confirmation, reason }: RedButtonPayload = req.body;

    if (confirmation !== "DESTROY_ALL_DATA") {
      return res.status(400).json({ error: 'Confirmation invalide' });
    }

    if (!["SECURITY_BREACH", "SYSTEM_COMPROMISED", "ADMIN_REQUEST"].includes(reason)) {
      return res.status(400).json({ error: 'Raison invalide' });
    }

    // Simulation de destruction
    const destruction_tasks = [
      "Nettoyage des logs",
      "Suppression des données sensibles",
      "Désactivation des modules",
      "Purge des connexions",
      "Destruction des clés de chiffrement"
    ];

    return res.status(200).json({
      status: "DESTROYED",
      message: "Protocole Red Button activé - Toutes les données ont été détruites",
      destruction_tasks,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in red button:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
