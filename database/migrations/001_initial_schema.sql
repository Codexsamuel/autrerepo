-- Migration: Initial Schema for DAVY Trading Platform
-- Description: Creates all tables for the AI-powered trading platform
-- Date: 2024-01-15

-- Users table - Core user management
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

-- Employees table - Employee specific data
CREATE TABLE employees (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  "position" TEXT,
  department TEXT,
  cnps_number TEXT,
  contract_type TEXT,
  date_hired DATE
);

-- Clients table - Client specific data
CREATE TABLE clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  company_name TEXT,
  industry TEXT,
  address TEXT
);

-- AI Interactions table - Track AI conversations
CREATE TABLE ai_interactions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE SET NULL,
  input_text TEXT,
  response_text TEXT,
  intent TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table - Role management
CREATE TABLE roles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE,
  description TEXT
);

-- User Roles table - Many-to-many relationship
CREATE TABLE user_roles (
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  role_id BIGINT REFERENCES roles (id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Login Logs table - Security tracking
CREATE TABLE login_logs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  ip_address TEXT,
  device_info TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table - Document management
CREATE TABLE documents (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  doc_type TEXT,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'validé'
);

-- Commissions table - Commission tracking
CREATE TABLE commissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees (id),
  client_id BIGINT REFERENCES clients (id),
  contract_value NUMERIC,
  commission_rate NUMERIC DEFAULT 25.0,
  date_signed DATE,
  status TEXT DEFAULT 'en_attente'
);

-- Trade History table - Trading records
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

-- Market Analysis table - AI-generated analysis
CREATE TABLE market_analysis (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  asset TEXT,
  type TEXT,
  analysis TEXT,
  source TEXT,
  confidence NUMERIC,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- Trading Advice table - AI recommendations
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

-- AI Logs table - AI system logs
CREATE TABLE ai_logs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  action TEXT,
  resultat TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- News Feeds table - Market news
CREATE TABLE news_feeds (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  url TEXT,
  source TEXT,
  summary TEXT,
  relevance_score NUMERIC,
  detected_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_ai_interactions_user_id ON ai_interactions(user_id);
CREATE INDEX idx_ai_interactions_timestamp ON ai_interactions("timestamp");
CREATE INDEX idx_trade_history_user_id ON trade_history(user_id);
CREATE INDEX idx_trade_history_asset ON trade_history(asset);
CREATE INDEX idx_market_analysis_asset ON market_analysis(asset);
CREATE INDEX idx_trading_advice_user_id ON trading_advice(user_id);
CREATE INDEX idx_news_feeds_relevance ON news_feeds(relevance_score);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('client', 'Regular trading client'),
('employee', 'Company employee'),
('admin', 'System administrator'),
('super_admin', 'Super administrator with full access');

-- Insert default admin user (password should be hashed in production)
INSERT INTO users (role, email, password, full_name, status) VALUES
('super_admin', 'admin@davy-trading.com', '$2b$10$default_hash_here', 'DAVY Admin', 'active'); 