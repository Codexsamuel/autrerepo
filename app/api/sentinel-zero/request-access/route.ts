import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface AccessRequest {
  email: string;
  firstName: string;
  lastName: string;
  profession: string;
  position: string;
  company: string;
  experience: string;
  motivation: string;
  useCase: string;
  securityLevel: string;
}

// Configuration email (à configurer dans les variables d'environnement)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: AccessRequest = await request.json();
    const {
      email,
      firstName,
      lastName,
      profession,
      position,
      company,
      experience,
      motivation,
      useCase,
      securityLevel
    } = body;

    // Validation des données
    if (!email || !firstName || !lastName || !profession || !position || !company || !experience || !motivation || !useCase || !securityLevel) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Générer un ID unique pour la demande
    const requestId = `SENTINEL-REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // 1. Envoyer email de confirmation au candidat
    const candidateEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Demande d'Accès Sentinel Zero - Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .status { background: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 SENTINEL ZERO</h1>
            <h2>Demande d'Accès - Confirmation</h2>
            <p>Agent Red Team IA Ultra-Avancé</p>
          </div>
          
          <div class="content">
            <p>Bonjour ${firstName} ${lastName},</p>
            
            <p>Nous avons bien reçu votre demande d'accès à Sentinel Zero. Votre candidature est maintenant en cours d'évaluation.</p>
            
            <div class="info-box">
              <h3>📋 Détails de votre demande :</h3>
              <p><strong>Profession :</strong> ${profession}</p>
              <p><strong>Poste :</strong> ${position}</p>
              <p><strong>Entreprise :</strong> ${company}</p>
              <p><strong>Expérience :</strong> ${experience}</p>
              <p><strong>Niveau de sécurité souhaité :</strong> ${securityLevel}</p>
              <p><strong>Référence de demande :</strong> <code>${requestId}</code></p>
              <p><strong>Date de soumission :</strong> ${new Date(timestamp).toLocaleDateString('fr-FR')}</p>
            </div>
            
            <div class="status">
              <strong>⏱️ Statut actuel :</strong> En attente d'approbation
            </div>
            
            <p><strong>📧 Prochaines étapes :</strong></p>
            <ol>
              <li>Notre équipe de sécurité évalue votre candidature</li>
              <li>Vérification de vos informations professionnelles</li>
              <li>Analyse de votre motivation et cas d'usage</li>
              <li>Décision d'approbation ou de rejet</li>
              <li>Notification par email de la décision</li>
            </ol>
            
            <p><strong>⏰ Délai d'évaluation :</strong> 24-48 heures selon la complexité de votre demande.</p>
            
            <p>En attendant, nous vous recommandons de :</p>
            <ul>
              <li>Vérifier que votre email est correct</li>
              <li>Conserver cette confirmation</li>
              <li>Préparer vos justificatifs si demandés</li>
            </ul>
            
            <p>Pour toute question, contactez-nous à : <strong>security@dlsolutionssarl.tech</strong></p>
          </div>
          
          <div class="footer">
            <p>🚨 SENTINEL ZERO - Système d'Authentification Multi-Niveaux</p>
            <p>© 2025 DL Solutions - Tous droits réservés</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Envoyer notification au super admin
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>🚨 NOUVELLE DEMANDE SENTINEL ZERO - Action Requise</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .candidate-info { background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .action-required { background: #fee2e2; border: 2px solid #ef4444; color: #991b1b; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 SENTINEL ZERO</h1>
            <h2>NOUVELLE DEMANDE D'ACCÈS</h2>
            <p>Action Super Admin Requise</p>
          </div>
          
          <div class="content">
            <div class="action-required">
              <h3>⚠️ ACTION REQUISE - ÉVALUATION CANDIDATURE</h3>
              <p>Une nouvelle demande d'accès Sentinel Zero nécessite votre évaluation et décision.</p>
            </div>
            
            <div class="candidate-info">
              <h3>👤 Informations du Candidat :</h3>
              <p><strong>Nom complet :</strong> ${firstName} ${lastName}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Profession :</strong> ${profession}</p>
              <p><strong>Poste :</strong> ${position}</p>
              <p><strong>Entreprise :</strong> ${company}</p>
              <p><strong>Expérience :</strong> ${experience}</p>
              <p><strong>Niveau de sécurité souhaité :</strong> ${securityLevel}</p>
              <p><strong>Référence de demande :</strong> <code>${requestId}</code></p>
              <p><strong>Date de soumission :</strong> ${new Date(timestamp).toLocaleDateString('fr-FR')}</p>
            </div>
            
            <h3>💭 Motivation du candidat :</h3>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p><em>"${motivation}"</em></p>
            </div>
            
            <h3>🎯 Cas d'usage prévu :</h3>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p><em>"${useCase}"</em></p>
            </div>
            
            <h3>🔐 Actions disponibles :</h3>
            <ol>
              <li><strong>Approuver :</strong> Accéder à l'interface d'administration pour générer les identifiants</li>
              <li><strong>Rejeter :</strong> Envoyer un email de refus avec justification</li>
              <li><strong>Demander plus d'informations :</strong> Solliciter des détails supplémentaires</li>
            </ol>
            
            <p><strong>🔗 Interface d'administration :</strong> <a href="https://dlsolutionssarl.tech/admin/sentinel-zero" style="color: #dc2626;">Accéder à l'administration</a></p>
            
            <p><strong>⚠️ Important :</strong> Toutes les décisions sont enregistrées et auditées.</p>
          </div>
          
          <div class="footer">
            <p>🚨 SENTINEL ZERO - Système d'Authentification Multi-Niveaux</p>
            <p>© 2025 DL Solutions - Tous droits réservés</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Envoi des emails
    const candidateEmail = {
      from: process.env.SMTP_FROM || 'sentinel-zero@dlsolutionssarl.tech',
      to: email,
      subject: '🚨 SENTINEL ZERO - Confirmation de votre demande d\'accès',
      html: candidateEmailContent,
    };

    const adminEmail = {
      from: process.env.SMTP_FROM || 'sentinel-zero@dlsolutionssarl.tech',
      to: process.env.SUPER_ADMIN_EMAIL || 'admin@dlsolutionssarl.tech',
      subject: '🚨 NOUVELLE DEMANDE SENTINEL ZERO - Action Requise',
      html: adminEmailContent,
    };

    // Envoyer les emails en parallèle
    await Promise.all([
      transporter.sendMail(candidateEmail),
      transporter.sendMail(adminEmail)
    ]);

    // Log de la demande (pour audit)
    console.log(`[SENTINEL-ZERO] Nouvelle demande d'accès de ${email} (${requestId})`);

    // TODO: Stocker la demande en base de données pour suivi

    return NextResponse.json({
      success: true,
      message: 'Demande d\'accès soumise avec succès',
      requestId: requestId,
      timestamp: timestamp,
    });

  } catch (error) {
    console.error('[SENTINEL-ZERO] Erreur traitement demande:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement de la demande',
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
    service: 'Sentinel Zero Access Request API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
} 