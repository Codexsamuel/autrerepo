import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { asset, action, targetPrice, stopLoss } = body;

    // TODO: Implémenter la logique de trading ici
    // Pour l'instant, on simule juste un succès
    console.log("Ordre enregistré :", { asset, action, targetPrice, stopLoss });

    return NextResponse.json({ 
      success: true,
      message: `Action ${action} sur ${asset} enregistrée avec succès`
    });
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'ordre :", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'exécution de l'ordre" },
      { status: 500 }
    );
  }
} 