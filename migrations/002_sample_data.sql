-- Migration: 002_sample_data.sql
-- Description: Insert sample data for testing and development
-- Created: 2024-12-19

-- Insert sample users
INSERT INTO users (role, email, password, full_name, phone, avatar_url, status) VALUES
  ('super_admin', 'admin@novacore.com', '$2a$10$hashed_password_here', 'Super Administrator', '+237 123 456 789', 'https://example.com/avatars/admin.jpg', 'active'),
  ('admin', 'manager@novacore.com', '$2a$10$hashed_password_here', 'Manager User', '+237 123 456 790', 'https://example.com/avatars/manager.jpg', 'active'),
  ('employee', 'employee1@novacore.com', '$2a$10$hashed_password_here', 'John Doe', '+237 123 456 791', 'https://example.com/avatars/john.jpg', 'active'),
  ('employee', 'employee2@novacore.com', '$2a$10$hashed_password_here', 'Jane Smith', '+237 123 456 792', 'https://example.com/avatars/jane.jpg', 'active'),
  ('client', 'client1@company.com', '$2a$10$hashed_password_here', 'Client One', '+237 123 456 793', 'https://example.com/avatars/client1.jpg', 'active'),
  ('client', 'client2@company.com', '$2a$10$hashed_password_here', 'Client Two', '+237 123 456 794', 'https://example.com/avatars/client2.jpg', 'active');

-- Insert sample employees
INSERT INTO employees (user_id, position, department, cnps_number, contract_type, date_hired) VALUES
  (3, 'Software Developer', 'IT', 'CNPS001', 'CDI', '2023-01-15'),
  (4, 'Sales Representative', 'Sales', 'CNPS002', 'CDI', '2023-03-20');

-- Insert sample clients
INSERT INTO clients (user_id, company_name, industry, address) VALUES
  (5, 'Tech Solutions Ltd', 'Technology', '123 Tech Street, Douala, Cameroon'),
  (6, 'Global Industries', 'Manufacturing', '456 Industry Avenue, Yaoundé, Cameroon');

-- Insert sample AI interactions
INSERT INTO ai_interactions (user_id, input_text, response_text, intent) VALUES
  (1, 'Hello DAVY, how are you?', 'Hello! I am DAVY, your AI assistant. I am functioning well and ready to help you with any tasks.', 'greeting'),
  (3, 'Generate a contract document', 'I will help you generate a contract document. Please provide the contract details and I will create it for you.', 'document_generation'),
  (5, 'What are my commission rates?', 'Based on your current contract, your commission rate is 25% on all successful deals.', 'commission_inquiry');

-- Insert sample documents
INSERT INTO documents (user_id, doc_type, file_url, status) VALUES
  (3, 'contract', 'https://example.com/documents/contract_001.pdf', 'validé'),
  (5, 'invoice', 'https://example.com/documents/invoice_001.pdf', 'validé'),
  (6, 'proposal', 'https://example.com/documents/proposal_001.pdf', 'en_attente');

-- Insert sample commissions
INSERT INTO commissions (employee_id, client_id, contract_value, commission_rate, date_signed, status) VALUES
  (1, 1, 50000.00, 25.0, '2024-01-15', 'validé'),
  (1, 2, 75000.00, 25.0, '2024-02-20', 'en_attente'),
  (2, 1, 30000.00, 25.0, '2024-03-10', 'validé');

-- Insert sample login logs
INSERT INTO login_logs (user_id, ip_address, device_info) VALUES
  (1, '192.168.1.100', 'Chrome 120.0.0.0 on Windows 10'),
  (3, '192.168.1.101', 'Firefox 121.0.0.0 on macOS'),
  (5, '192.168.1.102', 'Safari 17.0.0.0 on iOS');

-- Assign roles to users (many-to-many relationship)
INSERT INTO user_roles (user_id, role_id) VALUES
  (1, 4), -- super_admin
  (2, 1), -- admin
  (3, 2), -- employee
  (4, 2), -- employee
  (5, 3), -- client
  (6, 3); -- client 