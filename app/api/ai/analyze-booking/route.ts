import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { bookingData, context } = await request.json();

    // Analyser la réservation avec IA
    const analysis = await analyzeBookingWithAI(bookingData, context);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('❌ Erreur analyse réservation:', error);
    return NextResponse.json(
      { error: 'Erreur analyse réservation' },
      { status: 500 }
    );
  }
}

async function analyzeBookingWithAI(bookingData: any, context: string) {
  const prompt = `
Analysez cette réservation hôtelière pour détecter les risques et anomalies :

Données de réservation :
- Client: ${bookingData.guestName}
- Email: ${bookingData.guestEmail}
- Téléphone: ${bookingData.guestPhone}
- Dates: ${bookingData.checkIn} au ${bookingData.checkOut}
- Montant: ${bookingData.totalAmount} ${bookingData.currency}
- Statut: ${bookingData.status}
- Paiement: ${bookingData.paymentStatus}
- Source: ${bookingData.source}
- Demandes spéciales: ${bookingData.specialRequests?.join(', ') || 'Aucune'}

Contexte: ${context}

Analysez les éléments suivants :
1. Risque de fraude (0-1)
2. Anomalies dans les données
3. Patterns suspects
4. Recommandations d'action
5. Niveau d'urgence (low/medium/high)

Répondez au format JSON :
{
  "riskScore": 0.0-1.0,
  "anomalies": ["liste des anomalies"],
  "patterns": ["patterns suspects détectés"],
  "recommendations": ["actions recommandées"],
  "urgency": "low/medium/high",
  "confidence": 0.0-1.0,
  "riskFactors": ["facteurs de risque identifiés"]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en sécurité hôtelière et détection de fraude. Analysez les réservations pour identifier les risques et anomalies."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
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
      anomalies: analysis.anomalies || [],
      patterns: analysis.patterns || [],
      recommendations: analysis.recommendations || [],
      urgency: analysis.urgency || 'low',
      confidence: Math.min(Math.max(analysis.confidence || 0.5, 0), 1),
      riskFactors: analysis.riskFactors || []
    };

  } catch (error) {
    console.error('❌ Erreur analyse IA:', error);
    
    // Retourner une analyse par défaut en cas d'erreur
    return {
      riskScore: 0.1,
      anomalies: ['Erreur analyse IA'],
      patterns: [],
      recommendations: ['Vérifier manuellement la réservation'],
      urgency: 'low',
      confidence: 0.1,
      riskFactors: ['Erreur technique']
    };
  }
} 