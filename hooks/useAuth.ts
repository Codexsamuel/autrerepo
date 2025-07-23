import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin' | 'super_admin';
}

// Super Admin par défaut
const SUPER_ADMIN = {
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025',
  role: 'super_admin',
  name: 'Samuel OBAM',
  id: 'super-admin'
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser({
          id: parsed.id,
          email: parsed.email,
          name: parsed.name,
          role: parsed.role || 'user',
        });
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Vérifier si c'est le super admin
      if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
        const user: User = {
          id: SUPER_ADMIN.id,
          email: SUPER_ADMIN.email,
          name: SUPER_ADMIN.name,
          role: 'super_admin'
        };
        
        setUser(user);
        localStorage.setItem('auth_token', btoa(`${user.id}:${Date.now()}:${user.email}`));
        localStorage.setItem('user_data', JSON.stringify(user));
        return { success: true };
      }

      // Pour les autres utilisateurs, essayer l'API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role || 'user',
        });
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Email ou mot de passe incorrect' };
      }
    } catch (error) {
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role || 'user',
        });
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Erreur d\'inscription' };
      }
    } catch (error) {
      return { success: false, error: 'Erreur d\'inscription' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };
} 