import { NextRequest, NextResponse } from 'next/server';

// Configuration pour éviter le pré-rendu
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validation basique
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // En production, on sauvegarderait dans une base de données
    // Pour l'instant, on simule la création d'un utilisateur
    const user = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user' as const
    };

    // Créer un token simple avec Buffer (compatible côté serveur)
    const token = Buffer.from(`${user.id}:${Date.now()}:${user.email}`).toString('base64');

    return NextResponse.json({
      success: true,
      user,
      token
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 