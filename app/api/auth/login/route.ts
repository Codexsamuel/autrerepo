import { NextRequest, NextResponse } from 'next/server';

// Super Admin par défaut
const SUPER_ADMIN = {
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025',
  role: 'super_admin',
  name: 'Samuel OBAM',
  id: 'super-admin'
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Vérifier si c'est le super admin
    if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
      const user = {
        id: SUPER_ADMIN.id,
        email: SUPER_ADMIN.email,
        name: SUPER_ADMIN.name,
        role: SUPER_ADMIN.role
      };

      // Créer un token simple (en production, utiliser JWT)
      const token = btoa(`${user.id}:${Date.now()}:${user.email}`);

      return NextResponse.json({
        success: true,
        user,
        token
      });
    }

    // Pour les autres utilisateurs, vérifier dans le localStorage côté client
    // ou dans une base de données (ici on retourne une erreur)
    return NextResponse.json(
      { success: false, error: 'Email ou mot de passe incorrect' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 