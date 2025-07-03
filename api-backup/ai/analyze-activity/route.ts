import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { activity, context } = await request.json();

    // Analyser l'activité avec IA
    const analysis = await analyzeActivityWithAI(activity, context);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('❌ Erreur analyse activité:', error);
    return NextResponse.json(
      { error: 'Erreur analyse activité' },
      { status: 500 }
    );
  }
}

async function analyzeActivityWithAI(activity: any, context: string) {
  const prompt = `
Analysez cette activité immobilière pour détecter les comportements suspects et risques de sécurité :

Données d'activité :
- Type: ${activity.type}
- Utilisateur: ${activity.userId}
- Rôle: ${activity.userRole}
- Action: ${activity.action}
- Propriété: ${activity.propertyId}
- Détails: ${JSON.stringify(activity.details)}
- Localisation: ${activity.location?.city}, ${activity.location?.country}
- Appareil: ${activity.deviceInfo?.type} - ${activity.deviceInfo?.os}
- Navigateur: ${activity.deviceInfo?.browser}
- Résolution: ${activity.deviceInfo?.screenResolution}

Contexte: ${context}

Analysez les éléments suivants :
1. Score de risque (0-1)
2. Comportements suspects
3. Anomalies de sécurité
4. Patterns d'activité inhabituels
5. Recommandations d'action
6. Niveau d'urgence (low/medium/high)

Répondez au format JSON :
{
  "riskScore": 0.0-1.0,
  "flagged": true/false,
  "suspiciousBehaviors": ["comportements suspects détectés"],
  "securityAnomalies": ["anomalies de sécurité"],
  "unusualPatterns": ["patterns inhabituels"],
  "recommendations": ["actions recommandées"],
  "urgency": "low/medium/high",
  "confidence": 0.0-1.0,
  "reasons": ["raisons du flagging"],
  "riskFactors": ["facteurs de risque identifiés"]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en cybersécurité et surveillance d'activité immobilière. Analysez les activités pour identifier les comportements suspects et risques de sécurité."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 1200
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('Pas de réponse de l\'IA');
    }

    // Parser la réponse JSON
    const analysis = JSON.parse(response);

    // Validation et normalisation
    return {
      riskScore: Math.min(Math.max(analysis.riskScore || 0, 0), 1),
      flagged: analysis.flagged || false,
      suspiciousBehaviors: analysis.suspiciousBehaviors || [],
      securityAnomalies: analysis.securityAnomalies || [],
      unusualPatterns: analysis.unusualPatterns || [],
      recommendations: analysis.recommendations || [],
      urgency: analysis.urgency || 'low',
      confidence: Math.min(Math.max(analysis.confidence || 0.5, 0), 1),
      reasons: analysis.reasons || [],
      riskFactors: analysis.riskFactors || []
    };

  } catch (error) {
    console.error('❌ Erreur analyse IA:', error);
    
    // Retourner une analyse par défaut en cas d'erreur
    return {
      riskScore: 0.1,
      flagged: false,
      suspiciousBehaviors: ['Erreur analyse IA'],
      securityAnomalies: [],
      unusualPatterns: [],
      recommendations: ['Vérifier manuellement l\'activité'],
      urgency: 'low',
      confidence: 0.1,
      reasons: ['Erreur technique'],
      riskFactors: ['Erreur technique']
    };
  }
} 