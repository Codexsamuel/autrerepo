import { supabase } from "@/lib/supabase/client";

// Super admin credentials
export const SUPER_ADMIN_EMAIL = "sobam@daveandlucesolutions.com";
export const SUPER_ADMIN_PASSWORD = "@DavyFrantz2025";

// Authentication functions
export const auth = {
  // Connexion avec email/mot de passe
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // Inscription
  async signUp(email: string, password: string, fullName: string) {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  },

  // Déconnexion
  async signOut() {
    return await supabase.auth.signOut();
  },

  // Récupérer l"utilisateur actuel
  async getCurrentUser() {
    return await supabase.auth.getUser();
  },

  // Vérifier si l"utilisateur est super admin
  async isSuperAdmin(email: string) {
    return email === SUPER_ADMIN_EMAIL;
  },

  // Connexion super admin
  async signInSuperAdmin(password: string) {
    if (password !== SUPER_ADMIN_PASSWORD) {
      return { error: { message: "Mot de passe incorrect" } };
    }

    // Connexion
    return await supabase.auth.signInWithPassword({
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
    });
  },
};
