import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configuration pour le service role (admin)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types pour les tables
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  original_price: number;
  selling_price: number;
  currency: string;
  images: string[];
  category: string;
  market: 'china' | 'dubai' | 'turkey' | 'cameroon';
  supplier_name: string;
  supplier_contact: string;
  supplier_location: string;
  specifications: any;
  customs_fee: number;
  transport_fee: number;
  stock: number;
  rating: number;
  reviews_count: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  with_customs: boolean;
  with_transport: boolean;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  shipping_address: any;
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
}

export interface NovaWorldPost {
  id: string;
  user_id: string;
  content: string;
  media_urls?: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
}

// Super admin credentials
export const SUPER_ADMIN_EMAIL = 'sobam@daveandlucesolutions.com';
export const SUPER_ADMIN_PASSWORD = '@DavyFrantz2025';

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

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    return await supabase.auth.getUser();
  },

  // Vérifier si l'utilisateur est super admin
  async isSuperAdmin(email: string) {
    return email === SUPER_ADMIN_EMAIL;
  },

  // Connexion super admin
  async signInSuperAdmin(password: string) {
    if (password !== SUPER_ADMIN_PASSWORD) {
      return { error: { message: 'Mot de passe incorrect' } };
    }

    // Créer ou récupérer le super admin
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: 'Super Admin',
        role: 'super_admin',
      },
    });

    if (error && error.message !== 'User already registered') {
      return { error };
    }

    // Connexion
    return await supabase.auth.signInWithPassword({
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
    });
  },
};

// Products functions
export const products = {
  // Récupérer tous les produits
  async getAll() {
    return await supabase.from('products').select('*').order('created_at', { ascending: false });
  },

  // Récupérer par catégorie
  async getByCategory(category: string) {
    return await supabase.from('products').select('*').eq('category', category);
  },

  // Récupérer par marché
  async getByMarket(market: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('market', market)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Ajouter un produit (admin seulement)
  async add(product: any) {
    return await supabase.from('products').insert([product]).select().single();
  },

  // Mettre à jour un produit
  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};

// Orders functions
export const orders = {
  // Créer une commande
  async create(order: any) {
    return await supabase.from('orders').insert([order]).select().single();
  },

  // Récupérer les commandes d'un utilisateur
  async getByUser(userId: string) {
    return await supabase.from('orders').select('*, products(*)').eq('user_id', userId);
  },

  // Mettre à jour le statut d'une commande
  async updateStatus(id: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};

// Fonctions pour NovaWorld
export const novaWorld = {
  // Récupérer les posts
  async getPosts(limit = 20) {
    const { data, error } = await supabase
      .from('nova_world_posts')
      .select(`
        *,
        users (id, full_name, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    return { data, error };
  },

  // Créer un post
  async createPost(post: Omit<NovaWorldPost, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('nova_world_posts')
      .insert([post])
      .select()
      .single();
    return { data, error };
  },
};

// Fonctions pour les utilisateurs
export const users = {
  // Mettre à jour le profil
  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Upload d'avatar
  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) return { error };

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return { data: { url: publicUrl }, error: null };
  },
}; 