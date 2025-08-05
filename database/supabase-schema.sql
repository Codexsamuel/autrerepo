-- Schéma Supabase pour les produits scrapés
-- Table principale pour stocker les produits avec traduction et marges

CREATE TABLE IF NOT EXISTS scraped_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    external_id TEXT NOT NULL,
    title TEXT NOT NULL,
    title_fr TEXT,
    price TEXT NOT NULL,
    original_price TEXT,
    price_eur DECIMAL(10,2),
    price_usd DECIMAL(10,2),
    price_fcfa DECIMAL(10,2),
    image_url TEXT,
    product_url TEXT NOT NULL,
    source TEXT NOT NULL,
    rating DECIMAL(3,2),
    reviews_count INTEGER,
    seller TEXT,
    location TEXT,
    shipping_info TEXT,
    availability TEXT,
    description TEXT,
    description_fr TEXT,
    category TEXT,
    tags TEXT[],
    profit_margin DECIMAL(10,2),
    selling_price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_scraped TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_scraped_products_source ON scraped_products(source);
CREATE INDEX IF NOT EXISTS idx_scraped_products_external_id ON scraped_products(external_id);
CREATE INDEX IF NOT EXISTS idx_scraped_products_updated_at ON scraped_products(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraped_products_is_active ON scraped_products(is_active);
CREATE INDEX IF NOT EXISTS idx_scraped_products_title_search ON scraped_products USING gin(to_tsvector('french', title));
CREATE INDEX IF NOT EXISTS idx_scraped_products_title_fr_search ON scraped_products USING gin(to_tsvector('french', title_fr));

-- Index composite pour éviter les doublons
CREATE UNIQUE INDEX IF NOT EXISTS idx_scraped_products_unique ON scraped_products(external_id, source);

-- Table pour les statistiques de scraping
CREATE TABLE IF NOT EXISTS scraping_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,
    total_products INTEGER DEFAULT 0,
    last_scraped TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    success_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    avg_response_time DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les statistiques
CREATE INDEX IF NOT EXISTS idx_scraping_stats_source ON scraping_stats(source);
CREATE INDEX IF NOT EXISTS idx_scraping_stats_updated_at ON scraping_stats(updated_at DESC);

-- Table pour les logs de scraping
CREATE TABLE IF NOT EXISTS scraping_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,
    keyword TEXT NOT NULL,
    action TEXT NOT NULL, -- 'scrape', 'save', 'update', 'error'
    status TEXT NOT NULL, -- 'success', 'error', 'partial'
    products_count INTEGER DEFAULT 0,
    saved_count INTEGER DEFAULT 0,
    updated_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    response_time DECIMAL(5,2),
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les logs
CREATE INDEX IF NOT EXISTS idx_scraping_logs_source ON scraping_logs(source);
CREATE INDEX IF NOT EXISTS idx_scraping_logs_created_at ON scraping_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraping_logs_status ON scraping_logs(status);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_scraped_products_updated_at 
    BEFORE UPDATE ON scraped_products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scraping_stats_updated_at 
    BEFORE UPDATE ON scraping_stats 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour calculer les statistiques
CREATE OR REPLACE FUNCTION get_scraping_statistics()
RETURNS TABLE (
    total_products BIGINT,
    products_by_source JSON,
    last_update TIMESTAMP WITH TIME ZONE,
    active_sources INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_products,
        json_object_agg(source, count) as products_by_source,
        MAX(updated_at) as last_update,
        COUNT(DISTINCT source)::INTEGER as active_sources
    FROM (
        SELECT source, COUNT(*) as count, MAX(updated_at) as updated_at
        FROM scraped_products 
        WHERE is_active = TRUE 
        GROUP BY source
    ) subquery;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour nettoyer les anciens logs
CREATE OR REPLACE FUNCTION cleanup_old_logs(days_to_keep INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM scraping_logs 
    WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour désactiver les produits obsolètes
CREATE OR REPLACE FUNCTION deactivate_old_products(days_threshold INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE scraped_products 
    SET is_active = FALSE 
    WHERE updated_at < NOW() - INTERVAL '1 day' * days_threshold 
    AND is_active = TRUE;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Vues utiles pour l'analyse
CREATE OR REPLACE VIEW products_summary AS
SELECT 
    source,
    COUNT(*) as total_products,
    COUNT(*) FILTER (WHERE is_active = TRUE) as active_products,
    AVG(price_eur) as avg_price_eur,
    AVG(profit_margin) as avg_profit_margin,
    MAX(updated_at) as last_update
FROM scraped_products 
GROUP BY source
ORDER BY total_products DESC;

CREATE OR REPLACE VIEW recent_products AS
SELECT 
    id,
    title_fr,
    price_eur,
    selling_price,
    profit_margin,
    source,
    updated_at
FROM scraped_products 
WHERE is_active = TRUE 
ORDER BY updated_at DESC 
LIMIT 100;

-- Politiques RLS (Row Level Security) pour la sécurité
ALTER TABLE scraped_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_logs ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des produits actifs
CREATE POLICY "Allow public read access to active products" ON scraped_products
    FOR SELECT USING (is_active = TRUE);

-- Politique pour permettre l'écriture par le service role
CREATE POLICY "Allow service role full access" ON scraped_products
    FOR ALL USING (auth.role() = 'service_role');

-- Politique similaire pour les autres tables
CREATE POLICY "Allow service role access to stats" ON scraping_stats
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role access to logs" ON scraping_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Commentaires pour la documentation
COMMENT ON TABLE scraped_products IS 'Table principale pour stocker les produits scrapés avec traduction et marges';
COMMENT ON COLUMN scraped_products.external_id IS 'ID unique du produit dans la source originale';
COMMENT ON COLUMN scraped_products.title_fr IS 'Titre traduit en français';
COMMENT ON COLUMN scraped_products.profit_margin IS 'Marge bénéficiaire calculée en EUR';
COMMENT ON COLUMN scraped_products.selling_price IS 'Prix de vente final (prix_eur + marge)';
COMMENT ON COLUMN scraped_products.is_active IS 'Indique si le produit est actuellement disponible';

-- Données d'exemple (optionnel)
INSERT INTO scraping_stats (source, total_products, success_count) VALUES
('AliExpress', 0, 0),
('eBay', 0, 0),
('Taobao', 0, 0),
('1688', 0, 0),
('Google Shopping', 0, 0)
ON CONFLICT DO NOTHING; 