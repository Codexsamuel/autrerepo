-- Schéma de base de données pour l'authentification NovaCore
-- Protection anti-bot, OTP, super admin

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
    avatar VARCHAR(500),
    two_factor_enabled BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des tentatives de connexion (anti-bot)
CREATE TABLE IF NOT EXISTS login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    otp_verified BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des codes OTP
CREATE TABLE IF NOT EXISTS otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des permissions
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des rôles permissions
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) NOT NULL,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(role, permission_id)
);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip);
CREATE INDEX IF NOT EXISTS idx_login_attempts_timestamp ON login_attempts(timestamp);
CREATE INDEX IF NOT EXISTS idx_otp_codes_user_id ON otp_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertion des permissions de base
INSERT INTO permissions (name, description) VALUES
('access_novacore', 'Accès au hub NovaCore'),
('access_intranet', 'Accès à l\'intranet'),
('access_trading', 'Accès à la plateforme de trading'),
('access_admin', 'Accès à l\'administration'),
('manage_users', 'Gestion des utilisateurs'),
('view_analytics', 'Voir les analytics'),
('manage_documents', 'Gestion des documents'),
('super_admin', 'Toutes les permissions')
ON CONFLICT (name) DO NOTHING;

-- Attribution des permissions aux rôles
INSERT INTO role_permissions (role, permission_id) 
SELECT 'super_admin', id FROM permissions
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO role_permissions (role, permission_id) 
SELECT 'admin', id FROM permissions WHERE name IN ('access_novacore', 'access_intranet', 'access_trading', 'view_analytics', 'manage_documents')
ON CONFLICT (role, permission_id) DO NOTHING;

INSERT INTO role_permissions (role, permission_id) 
SELECT 'user', id FROM permissions WHERE name IN ('access_novacore', 'access_intranet')
ON CONFLICT (role, permission_id) DO NOTHING;

-- Nettoyage automatique des anciennes données
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
    -- Supprimer les tentatives de connexion de plus de 30 jours
    DELETE FROM login_attempts WHERE timestamp < NOW() - INTERVAL '30 days';
    
    -- Supprimer les codes OTP expirés
    DELETE FROM otp_codes WHERE expires_at < NOW();
    
    -- Supprimer les sessions expirées
    DELETE FROM user_sessions WHERE expires_at < NOW();
END;
$$ language 'plpgsql';

-- Créer un job pour nettoyer les anciennes données (à exécuter manuellement ou via cron)
-- SELECT cleanup_old_data(); 