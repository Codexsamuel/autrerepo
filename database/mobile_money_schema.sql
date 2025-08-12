-- NOVAIA MOBILE MONEY PAYMENT SCHEMA
-- Schéma de base de données pour Orange Money et MoMo

-- ============================================================================
-- ORANGE MONEY PAYMENTS
-- ============================================================================

-- Table des paiements Orange Money
CREATE TABLE IF NOT EXISTS orange_money_payments (
    id VARCHAR(255) PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    phone_number VARCHAR(20) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(255),
    error_code VARCHAR(50),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour Orange Money
CREATE INDEX IF NOT EXISTS idx_orange_money_phone ON orange_money_payments(phone_number);
CREATE INDEX IF NOT EXISTS idx_orange_money_status ON orange_money_payments(status);
CREATE INDEX IF NOT EXISTS idx_orange_money_transaction ON orange_money_payments(transaction_id);

-- ============================================================================
-- MOMO (MOBILE MONEY) PAYMENTS
-- ============================================================================

-- Table des paiements MoMo
CREATE TABLE IF NOT EXISTS momo_payments (
    id VARCHAR(255) PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(255),
    momo_transaction_id VARCHAR(255),
    error_code VARCHAR(50),
    error_message TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour MoMo
CREATE INDEX IF NOT EXISTS idx_momo_phone ON momo_payments(phone_number);
CREATE INDEX IF NOT EXISTS idx_momo_status ON momo_payments(status);
CREATE INDEX IF NOT EXISTS idx_momo_transaction ON momo_payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_momo_expires ON momo_payments(expires_at);

-- ============================================================================
-- MOBILE MONEY CONFIGURATION
-- ============================================================================

-- Table de configuration des moyens de paiement
CREATE TABLE IF NOT EXISTS mobile_money_config (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL UNIQUE, -- 'orange_money', 'momo'
    environment VARCHAR(20) NOT NULL DEFAULT 'sandbox', -- 'sandbox', 'production'
    merchant_id VARCHAR(255),
    api_key VARCHAR(255),
    secret_key VARCHAR(255),
    callback_url VARCHAR(500),
    api_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    supported_countries JSONB,
    supported_currencies JSONB,
    fees_percentage DECIMAL(5,2) DEFAULT 0.00,
    fees_fixed DECIMAL(10,2) DEFAULT 0.00,
    min_amount DECIMAL(10,2) DEFAULT 0.00,
    max_amount DECIMAL(10,2) DEFAULT 999999.99,
    processing_time_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Configuration par défaut Orange Money
INSERT INTO mobile_money_config (
    provider, environment, supported_countries, supported_currencies, 
    fees_percentage, fees_fixed, min_amount, max_amount, processing_time_minutes
) VALUES (
    'orange_money',
    'sandbox',
    '["France", "Côte d''Ivoire", "Sénégal", "Mali", "Madagascar", "Cameroun"]',
    '["EUR", "XOF", "XAF", "MGA"]',
    1.50,
    0.20,
    1.00,
    50000.00,
    5
) ON CONFLICT (provider) DO NOTHING;

-- Configuration par défaut MoMo
INSERT INTO mobile_money_config (
    provider, environment, supported_countries, supported_currencies,
    fees_percentage, fees_fixed, min_amount, max_amount, processing_time_minutes
) VALUES (
    'momo',
    'sandbox',
    '["Ghana", "Kenya", "Tanzanie", "Ouganda", "Rwanda"]',
    '["GHS", "KES", "TZS", "UGX", "RWF"]',
    1.00,
    0.15,
    0.50,
    25000.00,
    3
) ON CONFLICT (provider) DO NOTHING;

-- ============================================================================
-- MOBILE MONEY TRANSACTIONS
-- ============================================================================

-- Table des transactions consolidées
CREATE TABLE IF NOT EXISTS mobile_money_transactions (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- 'orange_money', 'momo'
    transaction_type VARCHAR(20) NOT NULL, -- 'payment', 'refund', 'cancellation'
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    reference VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les transactions
CREATE INDEX IF NOT EXISTS idx_mobile_transactions_payment ON mobile_money_transactions(payment_id);
CREATE INDEX IF NOT EXISTS idx_mobile_transactions_provider ON mobile_money_transactions(provider);
CREATE INDEX IF NOT EXISTS idx_mobile_transactions_status ON mobile_money_transactions(status);
CREATE INDEX IF NOT EXISTS idx_mobile_transactions_phone ON mobile_money_transactions(phone_number);

-- ============================================================================
-- MOBILE MONEY WEBHOOKS
-- ============================================================================

-- Table des webhooks reçus
CREATE TABLE IF NOT EXISTS mobile_money_webhooks (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    signature VARCHAR(255),
    timestamp TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les webhooks
CREATE INDEX IF NOT EXISTS idx_webhooks_provider ON mobile_money_webhooks(provider);
CREATE INDEX IF NOT EXISTS idx_webhooks_event_type ON mobile_money_webhooks(event_type);
CREATE INDEX IF NOT EXISTS idx_webhooks_processed ON mobile_money_webhooks(processed);

-- ============================================================================
-- MOBILE MONEY ANALYTICS
-- ============================================================================

-- Vue des statistiques Orange Money
CREATE OR REPLACE VIEW orange_money_stats AS
SELECT 
    DATE(created_at) as payment_date,
    status,
    COUNT(*) as total_payments,
    SUM(amount) as total_amount,
    AVG(amount) as average_amount,
    currency
FROM orange_money_payments
GROUP BY DATE(created_at), status, currency
ORDER BY payment_date DESC, status;

-- Vue des statistiques MoMo
CREATE OR REPLACE VIEW momo_stats AS
SELECT 
    DATE(created_at) as payment_date,
    status,
    COUNT(*) as total_payments,
    SUM(amount) as total_amount,
    AVG(amount) as average_amount,
    currency
FROM momo_payments
GROUP BY DATE(created_at), status, currency
ORDER BY payment_date DESC, status;

-- Vue des statistiques consolidées
CREATE OR REPLACE VIEW mobile_money_consolidated_stats AS
SELECT 
    'orange_money' as provider,
    DATE(created_at) as payment_date,
    status,
    COUNT(*) as total_payments,
    SUM(amount) as total_amount,
    currency
FROM orange_money_payments
GROUP BY DATE(created_at), status, currency

UNION ALL

SELECT 
    'momo' as provider,
    DATE(created_at) as payment_date,
    status,
    COUNT(*) as total_payments,
    SUM(amount) as total_amount,
    currency
FROM momo_payments
GROUP BY DATE(created_at), status, currency

ORDER BY payment_date DESC, provider, status;

-- ============================================================================
-- FONCTIONS UTILITAIRES
-- ============================================================================

-- Fonction pour nettoyer les paiements expirés
CREATE OR REPLACE FUNCTION cleanup_expired_mobile_payments()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    -- Nettoyer les paiements MoMo expirés
    UPDATE momo_payments 
    SET status = 'expired', updated_at = CURRENT_TIMESTAMP
    WHERE status = 'pending' AND expires_at < CURRENT_TIMESTAMP;
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour calculer les revenus par pays
CREATE OR REPLACE FUNCTION calculate_mobile_money_revenue_by_country(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    provider VARCHAR(50),
    country VARCHAR(100),
    total_revenue DECIMAL(10,2),
    total_transactions BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'orange_money' as provider,
        'France' as country, -- Simplifié pour l'exemple
        SUM(amount) as total_revenue,
        COUNT(*) as total_transactions
    FROM orange_money_payments
    WHERE status = 'completed' 
    AND created_at::DATE BETWEEN start_date AND end_date
    
    UNION ALL
    
    SELECT 
        'momo' as provider,
        'Ghana' as country, -- Simplifié pour l'exemple
        SUM(amount) as total_revenue,
        COUNT(*) as total_transactions
    FROM momo_payments
    WHERE status = 'completed' 
    AND created_at::DATE BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS ET MAINTENANCE
-- ============================================================================

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_mobile_money_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger sur toutes les tables
CREATE TRIGGER update_orange_money_updated_at 
    BEFORE UPDATE ON orange_money_payments 
    FOR EACH ROW EXECUTE FUNCTION update_mobile_money_updated_at();

CREATE TRIGGER update_momo_updated_at 
    BEFORE UPDATE ON momo_payments 
    FOR EACH ROW EXECUTE FUNCTION update_mobile_money_updated_at();

CREATE TRIGGER update_mobile_money_config_updated_at 
    BEFORE UPDATE ON mobile_money_config 
    FOR EACH ROW EXECUTE FUNCTION update_mobile_money_updated_at();

-- ============================================================================
-- DONNÉES DE TEST
-- ============================================================================

-- Insérer des données de test pour Orange Money
INSERT INTO orange_money_payments (id, amount, currency, phone_number, description, status) VALUES
('om_test_001', 29.00, 'EUR', '+33612345678', 'Plan Starter NovaIA', 'completed'),
('om_test_002', 99.00, 'EUR', '+33687654321', 'Plan Professional NovaIA', 'pending'),
('om_test_003', 299.00, 'EUR', '+33611223344', 'Plan Enterprise NovaIA', 'completed')
ON CONFLICT (id) DO NOTHING;

-- Insérer des données de test pour MoMo
INSERT INTO momo_payments (id, amount, currency, phone_number, description, status, expires_at) VALUES
('momo_test_001', 29.00, 'GHS', '+233201234567', 'Plan Starter NovaIA', 'completed', CURRENT_TIMESTAMP + INTERVAL '1 hour'),
('momo_test_002', 99.00, 'KES', '+254700123456', 'Plan Professional NovaIA', 'pending', CURRENT_TIMESTAMP + INTERVAL '1 hour'),
('momo_test_003', 299.00, 'TZS', '+255712345678', 'Plan Enterprise NovaIA', 'completed', CURRENT_TIMESTAMP + INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING; 