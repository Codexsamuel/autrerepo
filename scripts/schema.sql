-- Création de la table des produits
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  priceCNY DECIMAL(10,2) NOT NULL,
  priceFCFA DECIMAL(10,2) NOT NULL,
  imageUrl TEXT NOT NULL,
  source TEXT NOT NULL,
  deliveryTime TEXT,
  rating DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Création d'un index sur le titre pour la recherche
CREATE INDEX IF NOT EXISTS products_title_idx ON products USING GIN (to_tsvector('french', title));

-- Fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Allow public read access"
  ON products FOR SELECT
  USING (true);

-- Politique pour permettre l'insertion/update uniquement aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated users to insert/update"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated'); 