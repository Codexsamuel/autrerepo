-- NOVAIA PAYMENT SYSTEM DATABASE SCHEMA
-- Schéma de base de données pour le système de paiements NovaIA

-- Table des produits
CREATE TABLE IF NOT EXISTS novaia_products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    type VARCHAR(50) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    features JSONB,
    metadata JSONB,
    stripe_price_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS novaia_payments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES novaia_products(id)
);

-- Table de facturation
CREATE TABLE IF NOT EXISTS novaia_billing (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    stripe_subscription_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des permissions utilisateur
CREATE TABLE IF NOT EXISTS user_permissions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    agent_features JSONB,
    plan VARCHAR(50) NOT NULL,
    marketplace_access JSONB,
    battle_arena_access JSONB,
    premium_features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des webhooks Stripe
CREATE TABLE IF NOT EXISTS stripe_webhooks (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(255) UNIQUE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sessions de paiement
CREATE TABLE IF NOT EXISTS payment_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    plan VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    status VARCHAR(50) DEFAULT 'pending',
    stripe_session_id VARCHAR(255),
    metadata JSONB,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_novaia_payments_user_id ON novaia_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_novaia_payments_status ON novaia_payments(status);
CREATE INDEX IF NOT EXISTS idx_novaia_payments_type ON novaia_payments(type);
CREATE INDEX IF NOT EXISTS idx_novaia_billing_user_id ON novaia_billing(user_id);
CREATE INDEX IF NOT EXISTS idx_novaia_billing_status ON novaia_billing(status);
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhooks_event_id ON stripe_webhooks(event_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_user_id ON payment_sessions(user_id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_novaia_products_updated_at 
    BEFORE UPDATE ON novaia_products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_novaia_payments_updated_at 
    BEFORE UPDATE ON novaia_payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_novaia_billing_updated_at 
    BEFORE UPDATE ON novaia_billing 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_permissions_updated_at 
    BEFORE UPDATE ON user_permissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_sessions_updated_at 
    BEFORE UPDATE ON payment_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertion des produits par défaut
INSERT INTO novaia_products (id, name, description, price, currency, type, plan, features, metadata) VALUES
('agent_subscription_free', 'Plan Gratuit', 'Plan gratuit avec fonctionnalités de base', 0.00, 'EUR', 'agent_subscription', 'free', 
 '["basic_agents", "limited_queries", "community_support"]', '{"max_agents": 2, "max_queries": 100}'),

('agent_subscription_starter', 'Plan Starter', 'Plan starter pour développeurs et petites équipes', 29.00, 'EUR', 'agent_subscription', 'starter',
 '["basic_agents", "standard_queries", "basic_analytics", "email_support"]', '{"max_agents": 5, "max_queries": 1000}'),

('agent_subscription_professional', 'Plan Professional', 'Plan professionnel pour équipes et entreprises', 99.00, 'EUR', 'agent_subscription', 'professional',
 '["advanced_agents", "unlimited_queries", "advanced_analytics", "priority_support"]', '{"max_agents": 20, "max_queries": -1}'),

('enterprise_license_enterprise', 'Plan Enterprise', 'Solution sur mesure pour grandes entreprises', 299.00, 'EUR', 'enterprise_license', 'enterprise',
 '["enterprise_agents", "unlimited_queries", "enterprise_analytics", "dedicated_support"]', '{"max_agents": -1, "max_queries": -1}'),

('marketplace_purchase_premium', 'Marketplace Premium', 'Accès premium au marketplace NovaIA', 49.00, 'EUR', 'marketplace_purchase', 'premium',
 '["premium_agents", "priority_access", "exclusive_content"]', '{"access_level": "premium"}'),

('battle_arena_entry_pro', 'Battle Arena Pro', 'Accès professionnel au Battle Arena', 19.00, 'EUR', 'battle_arena_entry', 'pro',
 '["pro_rankings", "advanced_metrics", "tournament_access"]', '{"arena_level": "pro"}');

-- Vues utiles
CREATE OR REPLACE VIEW user_subscription_summary AS
SELECT 
    ub.user_id,
    ub.plan,
    ub.status,
    ub.current_period_start,
    ub.current_period_end,
    up.agent_features,
    up.marketplace_access,
    up.battle_arena_access
FROM novaia_billing ub
LEFT JOIN user_permissions up ON ub.user_id = up.user_id
WHERE ub.status = 'active';

CREATE OR REPLACE VIEW payment_analytics AS
SELECT 
    DATE(created_at) as payment_date,
    plan,
    type,
    COUNT(*) as total_payments,
    SUM(amount) as total_revenue,
    AVG(amount) as average_payment
FROM novaia_payments
WHERE status = 'completed'
GROUP BY DATE(created_at), plan, type
ORDER BY payment_date DESC;

-- Fonction pour calculer les revenus mensuels
CREATE OR REPLACE FUNCTION calculate_monthly_revenue(year_month TEXT)
RETURNS TABLE (
    plan VARCHAR(50),
    total_revenue DECIMAL(10,2),
    total_payments BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        np.plan,
        SUM(np.amount) as total_revenue,
        COUNT(*) as total_payments
    FROM novaia_payments np
    WHERE np.status = 'completed'
    AND TO_CHAR(np.created_at, 'YYYY-MM') = year_month
    GROUP BY np.plan
    ORDER BY total_revenue DESC;
END;
$$ LANGUAGE plpgsql; 