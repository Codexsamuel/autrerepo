import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utilisateurs en mémoire (pour la démo)
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@davytrading.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', // password123
    role: 'admin'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'demo@davytrading.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', // password123
    role: 'user'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export const auth = {
  // Inscription
  async signUp(name: string, email: string, password: string): Promise<AuthResult> {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'Un compte avec cet email existe déjà' };
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Créer le nouvel utilisateur
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password: hashedPassword,
        role: 'user'
      };

      users.push(newUser);

      // Générer le token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la création du compte' };
    }
  },

  // Connexion
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      // Trouver l'utilisateur
      const user = users.find(u => u.email === email);
      if (!user) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Vérifier le mot de passe
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      }

      // Générer le token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la connexion' };
    }
  },

  // Vérifier le token
  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = users.find(u => u.id === decoded.userId);
      
      if (!user) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  },

  // Obtenir l'utilisateur par ID
  getUserById(id: string): User | null {
    const user = users.find(u => u.id === id);
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}; 