-- Migration: 001_initial_schema.sql
-- Description: Initial database schema for the application
-- Created: 2024-12-19

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
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

-- Create employees table
CREATE TABLE employees (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  "position" TEXT,
  department TEXT,
  cnps_number TEXT,
  contract_type TEXT,
  date_hired DATE
);

-- Create clients table
CREATE TABLE clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  company_name TEXT,
  industry TEXT,
  address TEXT
);

-- Create ai_interactions table
CREATE TABLE ai_interactions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id) ON DELETE SET NULL,
  input_text TEXT,
  response_text TEXT,
  intent TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE roles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE,
  description TEXT
);

-- Create user_roles table (many-to-many relationship)
CREATE TABLE user_roles (
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  role_id BIGINT REFERENCES roles (id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Create login_logs table
CREATE TABLE login_logs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  ip_address TEXT,
  device_info TEXT,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE documents (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users (id),
  doc_type TEXT,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'validé'
);

-- Create commissions table
CREATE TABLE commissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees (id),
  client_id BIGINT REFERENCES clients (id),
  contract_value NUMERIC,
  commission_rate NUMERIC DEFAULT 25.0,
  date_signed DATE,
  status TEXT DEFAULT 'en_attente'
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_users_status ON users (status);
CREATE INDEX idx_employees_user_id ON employees (user_id);
CREATE INDEX idx_clients_user_id ON clients (user_id);
CREATE INDEX idx_ai_interactions_user_id ON ai_interactions (user_id);
CREATE INDEX idx_ai_interactions_timestamp ON ai_interactions ("timestamp");
CREATE INDEX idx_login_logs_user_id ON login_logs (user_id);
CREATE INDEX idx_login_logs_timestamp ON login_logs ("timestamp");
CREATE INDEX idx_documents_user_id ON documents (user_id);
CREATE INDEX idx_commissions_employee_id ON commissions (employee_id);
CREATE INDEX idx_commissions_client_id ON commissions (client_id);
CREATE INDEX idx_commissions_status ON commissions (status);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Administrator with full system access'),
  ('employee', 'Employee with limited access'),
  ('client', 'Client with basic access'),
  ('super_admin', 'Super administrator with all privileges');

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can customize these based on your needs)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Employees can view their own data" ON employees
  FOR SELECT USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

CREATE POLICY "Clients can view their own data" ON clients
  FOR SELECT USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated; 