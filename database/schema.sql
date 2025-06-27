-- =====================================================
-- DAVY Trading Platform - Database Schema
-- =====================================================
-- Description: Complete database schema for AI-powered trading platform
-- Version: 1.0.0
-- Created: 2024-01-15
-- =====================================================

-- =====================================================
-- CORE USER MANAGEMENT
-- =====================================================

-- Users table - Central user management
CREATE TABLE users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  role TEXT CHECK (
    role IN ('client', 'employee', 'admin', 'super_admin')
  ),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted'))
);

-- Employees table - Employee specific information
CREATE TABLE employees (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  "position" TEXT,
  department TEXT,
  cnps_number TEXT,
  contract_type TEXT,
  date_hired DATE
);

-- Clients table - Client specific information
CREATE TABLE clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  company_name TEXT,
  industry TEXT,
  address TEXT
);

-- =====================================================
-- AI & INTERACTION MANAGEMENT
-- =====================================================

-- AI Interactions table - Track all AI conversations
CREATE TABLE ai_interactions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE SET NULL,
  input_text TEXT,
  response_text TEXT,
  intent TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Logs table - System-wide AI activity logs
CREATE TABLE ai_logs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  action TEXT,
  resultat TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- ROLE & PERMISSION MANAGEMENT
-- =====================================================

-- Roles table - Available system roles
CREATE TABLE roles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE,
  description TEXT
);

-- User Roles table - Many-to-many user-role relationship
CREATE TABLE user_roles (
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  role_id BIGINT REFERENCES roles (id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- =====================================================
-- SECURITY & AUDIT
-- =====================================================

-- Login Logs table - Track user login activity
CREATE TABLE login_logs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  ip_address TEXT,
  device_info TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DOCUMENT MANAGEMENT
-- =====================================================

-- Documents table - User document storage
CREATE TABLE documents (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  doc_type TEXT,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'validé'
);

-- =====================================================
-- BUSINESS LOGIC
-- =====================================================

-- Commissions table - Track employee commissions
CREATE TABLE commissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees (id),
  client_id BIGINT REFERENCES clients (id),
  contract_value NUMERIC,
  commission_rate NUMERIC DEFAULT 25.0,
  date_signed DATE,
  status TEXT DEFAULT 'en_attente'
);

-- =====================================================
-- TRADING & MARKET DATA
-- =====================================================

-- Trade History table - User trading records
CREATE TABLE trade_history (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  asset TEXT,
  entry_price NUMERIC,
  exit_price NUMERIC,
  entry_date TIMESTAMP,
  exit_date TIMESTAMP,
  strategy TEXT,
  result TEXT,
  notes TEXT
);

-- Market Analysis table - AI-generated market analysis
CREATE TABLE market_analysis (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  asset TEXT,
  type TEXT,
  analysis TEXT,
  source TEXT,
  confidence NUMERIC,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Trading Advice table - AI trading recommendations
CREATE TABLE trading_advice (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  question TEXT,
  recommended_asset TEXT,
  reasoning TEXT,
  sources JSONB,
  strategy TEXT,
  risk_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- News Feeds table - Market news and updates
CREATE TABLE news_feeds (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  url TEXT,
  source TEXT,
  summary TEXT,
  relevance_score NUMERIC,
  detected_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- AI interaction indexes
CREATE INDEX idx_ai_interactions_user_id ON ai_interactions(user_id);
CREATE INDEX idx_ai_interactions_timestamp ON ai_interactions("timestamp");
CREATE INDEX idx_ai_interactions_intent ON ai_interactions(intent);

-- Trading indexes
CREATE INDEX idx_trade_history_user_id ON trade_history(user_id);
CREATE INDEX idx_trade_history_asset ON trade_history(asset);
CREATE INDEX idx_trade_history_entry_date ON trade_history(entry_date);
CREATE INDEX idx_trade_history_result ON trade_history(result);

-- Market analysis indexes
CREATE INDEX idx_market_analysis_asset ON market_analysis(asset);
CREATE INDEX idx_market_analysis_type ON market_analysis(type);
CREATE INDEX idx_market_analysis_generated_at ON market_analysis(generated_at);

-- Trading advice indexes
CREATE INDEX idx_trading_advice_user_id ON trading_advice(user_id);
CREATE INDEX idx_trading_advice_asset ON trading_advice(recommended_asset);
CREATE INDEX idx_trading_advice_created_at ON trading_advice(created_at);

-- News feeds indexes
CREATE INDEX idx_news_feeds_relevance ON news_feeds(relevance_score);
CREATE INDEX idx_news_feeds_detected_at ON news_feeds(detected_at);
CREATE INDEX idx_news_feeds_source ON news_feeds(source);

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('client', 'Regular trading client with access to basic features'),
('employee', 'Company employee with enhanced access'),
('admin', 'System administrator with management capabilities'),
('super_admin', 'Super administrator with full system access');

-- Insert default admin user (password should be properly hashed in production)
INSERT INTO users (role, email, password, full_name, status) VALUES
('super_admin', 'admin@davy-trading.com', '$2b$10$default_hash_here', 'DAVY System Administrator', 'active');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- User summary view
CREATE VIEW user_summary AS
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.role,
  u.status,
  u.created_at,
  u.last_login,
  CASE 
    WHEN e.id IS NOT NULL THEN 'employee'
    WHEN c.id IS NOT NULL THEN 'client'
    ELSE 'user'
  END as user_type
FROM users u
LEFT JOIN employees e ON u.id = e.user_id
LEFT JOIN clients c ON u.id = c.user_id;

-- Trading performance view
CREATE VIEW trading_performance AS
SELECT 
  th.user_id,
  u.full_name,
  th.asset,
  COUNT(*) as total_trades,
  AVG(th.exit_price - th.entry_price) as avg_profit,
  SUM(CASE WHEN th.result = 'win' THEN 1 ELSE 0 END) as wins,
  SUM(CASE WHEN th.result = 'loss' THEN 1 ELSE 0 END) as losses
FROM trade_history th
JOIN users u ON th.user_id = u.id
GROUP BY th.user_id, u.full_name, th.asset;

-- AI interaction summary view
CREATE VIEW ai_interaction_summary AS
SELECT 
  ai.user_id,
  u.full_name,
  COUNT(*) as total_interactions,
  COUNT(DISTINCT ai.intent) as unique_intents,
  MAX(ai."timestamp") as last_interaction
FROM ai_interactions ai
JOIN users u ON ai.user_id = u.id
GROUP BY ai.user_id, u.full_name;

-- SQL schema for DL Solutions - CRM/ERP multi-sector
-- Compatible with Supabase/PostgreSQL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  logo_url TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  website VARCHAR(255),
  siret VARCHAR(50),
  tva_number VARCHAR(50),
  rcs VARCHAR(100),
  capital NUMERIC(15,2),
  legal_form VARCHAR(100),
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  clerk_user_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  permissions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  company_name VARCHAR(255),
  position VARCHAR(100),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'lead',
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL,
  amount NUMERIC(15,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'EUR',
  status VARCHAR(50) DEFAULT 'pending',
  description TEXT,
  reference VARCHAR(100),
  payment_method VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hotel_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  number VARCHAR(20) NOT NULL,
  type VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL,
  price_per_night NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  amenities TEXT[],
  floor INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hotel_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  room_id UUID REFERENCES hotel_rooms(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  check_in TIMESTAMPTZ NOT NULL,
  check_out TIMESTAMPTZ NOT NULL,
  guests INTEGER NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS real_estate_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) DEFAULT 'France',
  surface_area NUMERIC(10,2),
  rooms INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  price NUMERIC(15,2) NOT NULL,
  rent_price NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'available',
  features TEXT[],
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  account_number VARCHAR(50) NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  balance NUMERIC(15,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'EUR',
  status VARCHAR(50) DEFAULT 'active',
  interest_rate NUMERIC(5,4),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS insurance_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  policy_number VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  premium NUMERIC(10,2) NOT NULL,
  coverage_amount NUMERIC(15,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  terms JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
); 