import { NextRequest, NextResponse } from 'next/server';

interface SentinelCredentials {
  codeMaitre: string;
  idAdmin: string;
  hashVocale: string;
  hashDigitale: string;
  phraseVocale: string;
  niveauAuth: number;
}

interface EmailRequest {
  userEmail: string;
  credentials: SentinelCredentials;
  superAdminCode: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();
    const { userEmail, credentials, superAdminCode } = body;

    // Vérification du code super admin
    const validSuperAdminCode = process.env.SUPER_ADMIN_CODE || 'SENTINEL-ZERO-2025';
    if (superAdminCode !== validSuperAdminCode) {
      return NextResponse.json(
        { error: 'Code super admin invalide' },
        { status: 401 }
      );
    }

    // Validation des données
    if (!userEmail || !credentials) {
      return NextResponse.json(
        { error: 'Email et identifiants requis' },
        { status: 400 }
      );
    }

    // Template HTML pour l'email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Identifiants Sentinel Zero - Accès Sécurisé</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .credential-box { background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .credential-item { display: flex; justify-content: space-between; align-items: center; margin: 15px 0; padding: 10px; background: #f3f4f6; border-radius: 5px; }
          .credential-label { font-weight: bold; color: #374151; }
          .credential-value { font-family: monospace; background: #1f2937; color: #f9fafb; padding: 8px 12px; border-radius: 4px; font-size: 14px; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 SENTINEL ZERO</h1>
            <h2>Identifiants d'Authentification Sécurisés</h2>
            <p>Agent Red Team IA Ultra-Avancé</p>
          </div>
          
          <div class="content">
            <p>Bonjour,</p>
            
            <p>Vos identifiants d'authentification Sentinel Zero ont été générés par le Super Administrateur.</p>
            
            <div class="credential-box">
              <h3>🔐 Identifiants d'Authentification :</h3>
              
              <div class="credential-item">
                <span class="credential-label">Code Maître :</span>
                <span class="credential-value">${credentials.codeMaitre}</span>
              </div>
              
              <div class="credential-item">
                <span class="credential-label">ID Administrateur :</span>
                <span class="credential-value">${credentials.idAdmin}</span>
              </div>
              
              <div class="credential-item">
                <span class="credential-label">Hash Empreinte Vocale :</span>
                <span class="credential-value">${credentials.hashVocale}</span>
              </div>
              
              <div class="credential-item">
                <span class="credential-label">Hash Empreinte Digitale :</span>
                <span class="credential-value">${credentials.hashDigitale}</span>
              </div>
              
              <div class="credential-item">
                <span class="credential-label">Phrase Vocale :</span>
                <span class="credential-value">${credentials.phraseVocale}</span>
              </div>
              
              <div class="credential-item">
                <span class="credential-label">Niveau d'Authentification :</span>
                <span class="credential-value">Niveau ${credentials.niveauAuth}</span>
              </div>
            </div>
            
            <div class="warning">
              <strong>⚠️ ATTENTION :</strong>
              <ul>
                <li>Ces identifiants sont strictement confidentiels</li>
                <li>Ne les partagez avec personne</li>
                <li>Utilisez-les uniquement sur des appareils sécurisés</li>
                <li>Conservez cet email en lieu sûr</li>
              </ul>
            </div>
            
            <p><strong>Instructions d'utilisation :</strong></p>
            <ol>
              <li>Copiez tous les identifiants ci-dessus</li>
              <li>Accédez à la plateforme Sentinel Zero</li>
              <li>Collez les identifiants dans les champs correspondants</li>
              <li>Validez l'authentification</li>
            </ol>
            
            <p>En cas de problème ou de question, contactez immédiatement le Super Administrateur.</p>
          </div>
          
          <div class="footer">
            <p>🚨 SENTINEL ZERO - Système d'Authentification Multi-Niveaux</p>
            <p>© 2025 DL Solutions - Tous droits réservés</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Simulation d'envoi d'email (en production, utiliser un service d'email)
    console.log('Email simulé envoyé avec succès à:', userEmail);
    console.log('Contenu de l\'email:', htmlContent);

    // Log de l'envoi (pour audit)
    console.log(`[SENTINEL-ZERO] Identifiants envoyés à ${userEmail} par Super Admin`);

    return NextResponse.json({
      success: true,
      message: `Identifiants envoyés avec succès à ${userEmail}`,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[SENTINEL-ZERO] Erreur envoi email:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi de l\'email',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

// Méthode GET pour vérifier le statut de l'API
export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'Sentinel Zero Credentials API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
} 