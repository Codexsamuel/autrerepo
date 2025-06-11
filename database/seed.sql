-- =====================================================
-- DAVY Trading Platform - Seed Data
-- =====================================================
-- Description: Sample data for development and testing
-- =====================================================

-- Insert sample users
INSERT INTO users (role, email, password, full_name, phone, status) VALUES
('client', 'john.doe@example.com', '$2b$10$hashed_password', 'John Doe', '+237 612345678', 'active'),
('client', 'jane.smith@example.com', '$2b$10$hashed_password', 'Jane Smith', '+237 623456789', 'active'),
('employee', 'trader1@davy.com', '$2b$10$hashed_password', 'Pierre Trader', '+237 634567890', 'active'),
('employee', 'analyst1@davy.com', '$2b$10$hashed_password', 'Marie Analyst', '+237 645678901', 'active'),
('admin', 'manager@davy.com', '$2b$10$hashed_password', 'Manager Admin', '+237 656789012', 'active');

-- Insert sample employees
INSERT INTO employees (user_id, "position", department, cnps_number, contract_type, date_hired) VALUES
(3, 'Senior Trader', 'Trading', 'CNPS001', 'CDI', '2023-01-15'),
(4, 'Market Analyst', 'Analysis', 'CNPS002', 'CDI', '2023-02-20'),
(5, 'Operations Manager', 'Management', 'CNPS003', 'CDI', '2022-06-10');

-- Insert sample clients
INSERT INTO clients (user_id, company_name, industry, address) VALUES
(1, 'Tech Solutions Ltd', 'Technology', 'Douala, Cameroun'),
(2, 'Finance Corp', 'Finance', 'Yaoundé, Cameroun');

-- Insert sample AI interactions
INSERT INTO ai_interactions (user_id, input_text, response_text, intent) VALUES
(1, 'Quelle est l''analyse d''Apple ?', 'Apple présente un support technique solide...', 'market_analysis'),
(1, 'Dois-je acheter du Bitcoin ?', 'Bitcoin est en consolidation, je recommande...', 'trading_advice'),
(2, 'Comment optimiser mon portefeuille ?', 'Basé sur votre profil de risque...', 'portfolio_optimization'),
(3, 'Analyse du marché des cryptos', 'Le marché crypto montre une volatilité...', 'market_analysis');

-- Insert sample trade history
INSERT INTO trade_history (user_id, asset, entry_price, exit_price, entry_date, exit_date, strategy, result, notes) VALUES
(1, 'AAPL', 180.50, 185.92, '2024-01-10 10:30:00', '2024-01-15 14:20:00', 'Swing Trading', 'win', 'Support technique confirmé'),
(1, 'BTC', 44000.00, 43250.75, '2024-01-12 09:15:00', '2024-01-15 16:45:00', 'Scalping', 'loss', 'Stop loss atteint'),
(2, 'ETH', 2600.00, 2650.45, '2024-01-13 11:20:00', '2024-01-15 15:30:00', 'Position Trading', 'win', 'Tendance haussière confirmée'),
(2, 'TSLA', 240.00, 245.67, '2024-01-14 13:45:00', '2024-01-15 17:00:00', 'Day Trading', 'win', 'Breakout réussi');

-- Insert sample market analysis
INSERT INTO market_analysis (asset, type, analysis, source, confidence) VALUES
('AAPL', 'technical', 'Support technique solide à 180$, RSI en zone de survente, MACD croisement haussier imminent', 'DAVY AI', 85),
('BTC', 'fundamental', 'Halving prévu en avril 2024, adoption institutionnelle en hausse, consolidation technique', 'DAVY AI', 72),
('ETH', 'technical', 'Tendance haussière confirmée, support à 2600$, objectif 2800$', 'DAVY AI', 78),
('TSLA', 'mixed', 'Résistance technique à 250$, fondamentaux solides, volatilité élevée', 'DAVY AI', 65);

-- Insert sample trading advice
INSERT INTO trading_advice (user_id, question, recommended_asset, reasoning, sources, strategy, risk_level) VALUES
(1, 'Quel actif recommandes-tu pour un investissement à 6 mois ?', 'AAPL', 'Support technique solide, lancement de nouveaux produits IA imminent', '{"technical": "RSI, MACD", "fundamental": "Bénéfices Q4"}', 'Swing Trading', 'medium'),
(2, 'Dois-je investir dans les cryptos maintenant ?', 'ETH', 'Tendance haussière confirmée, adoption DeFi en croissance', '{"market": "Crypto trends", "technical": "Support levels"}', 'Position Trading', 'high'),
(1, 'Comment gérer le risque dans mon portefeuille ?', 'Diversification', 'Répartition 60% actions, 30% crypto, 10% cash', '{"risk_management": "Portfolio theory"}', 'Asset Allocation', 'low');

-- Insert sample news feeds
INSERT INTO news_feeds (title, url, source, summary, relevance_score) VALUES
('Apple annonce de nouveaux produits IA', 'https://example.com/apple-ai', 'TechNews', 'Apple lance de nouvelles fonctionnalités IA intégrées', 0.95),
('Bitcoin en consolidation avant halving', 'https://example.com/btc-halving', 'CryptoNews', 'Bitcoin se stabilise avant le halving d''avril 2024', 0.88),
('Tesla dépasse les attentes Q4', 'https://example.com/tesla-q4', 'FinancialNews', 'Tesla annonce des résultats Q4 supérieurs aux attentes', 0.82),
('Marché tech en forte croissance', 'https://example.com/tech-growth', 'MarketNews', 'Le secteur technologique affiche une croissance de 15%', 0.75);

-- Insert sample commissions
INSERT INTO commissions (employee_id, client_id, contract_value, commission_rate, date_signed, status) VALUES
(1, 1, 5000000, 25.0, '2024-01-10', 'validé'),
(1, 2, 3000000, 25.0, '2024-01-12', 'en_attente'),
(2, 1, 2000000, 20.0, '2024-01-14', 'validé');

-- Insert sample documents
INSERT INTO documents (user_id, doc_type, file_url, status) VALUES
(1, 'KYC', 'https://storage.example.com/kyc/john_doe.pdf', 'validé'),
(1, 'Contract', 'https://storage.example.com/contracts/john_doe_contract.pdf', 'validé'),
(2, 'KYC', 'https://storage.example.com/kyc/jane_smith.pdf', 'validé'),
(3, 'Employee_Contract', 'https://storage.example.com/employees/pierre_trader.pdf', 'validé');

-- Insert sample login logs
INSERT INTO login_logs (user_id, ip_address, device_info) VALUES
(1, '192.168.1.100', 'Chrome 120.0.0.0 on Windows 10'),
(1, '192.168.1.100', 'Chrome 120.0.0.0 on Windows 10'),
(2, '192.168.1.101', 'Safari 17.0 on macOS'),
(3, '192.168.1.102', 'Firefox 121.0 on Ubuntu'),
(4, '192.168.1.103', 'Chrome 120.0.0.0 on Windows 11');

-- Insert sample AI logs
INSERT INTO ai_logs (user_id, action, resultat, metadata) VALUES
(1, 'market_analysis', 'success', '{"asset": "AAPL", "confidence": 85, "processing_time": "2.3s"}'),
(1, 'trading_advice', 'success', '{"recommendation": "BUY", "risk_level": "medium", "processing_time": "1.8s"}'),
(2, 'portfolio_optimization', 'success', '{"optimization_score": 0.92, "suggestions": 3, "processing_time": "3.1s"}'),
(3, 'market_analysis', 'success', '{"assets_analyzed": 5, "confidence_avg": 78, "processing_time": "4.2s"}'); 