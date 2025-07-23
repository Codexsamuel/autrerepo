"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Super Admin par défaut
const SUPER_ADMIN = {
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025',
  role: 'super_admin',
  name: 'Samuel OBAM',
  id: 'super-admin'
};

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérifier si c'est le super admin
    if (formData.email === SUPER_ADMIN.email && formData.password === SUPER_ADMIN.password) {
      // Authentification directe du super admin
      const user = {
        id: SUPER_ADMIN.id,
        email: SUPER_ADMIN.email,
        name: SUPER_ADMIN.name,
        role: SUPER_ADMIN.role
      };
      
      // Sauvegarder dans localStorage
      localStorage.setItem('auth_token', btoa(`${user.id}:${Date.now()}:${user.email}`));
      localStorage.setItem('user_data', JSON.stringify(user));
      
      // Rediriger
      router.push('/');
      return;
    }

    // Pour les autres utilisateurs, utiliser l'API
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/'); // Rediriger vers la page d'accueil
    } else {
      setError(result.error || 'Erreur de connexion');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
      <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Connexion</h1>
          <p className="text-gray-400">Accédez à votre compte DL Solutions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#181f2a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Pas encore de compte ?{' '}
            <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">Compte Super Admin</h3>
          <p className="text-xs text-gray-400">
            Email: sobam@daveandlucesolutions.com<br/>
            Mot de passe: @DavyFrantz2025
          </p>
        </div>
      </div>
    </div>
  );
}