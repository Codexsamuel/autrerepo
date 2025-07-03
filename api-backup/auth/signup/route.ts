import { NextRequest, NextResponse } from 'next/server';

// Simuler une base de données d'utilisateurs
let users = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Utilisateur Demo'
  },
  {
    id: '2',
    email: 'test@example.com',
    password: 'test123',
    name: 'Utilisateur Test'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validation des données
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, mot de passe et nom requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Créer le nouvel utilisateur
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password,
      name
    };

    // Ajouter à la "base de données"
    users.push(newUser);

    // Générer un token
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64');

    // Retourner les données utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 