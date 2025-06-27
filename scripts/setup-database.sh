#!/bin/bash

# DAVY Trading Platform - Database Setup Script
# Author: Samuel OBAM & Sabine NGA Lucie
# Version: 1.0.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="davy_trading_db"
DB_USER="davy_admin"
DB_PASSWORD="DavySecure2024!"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-key"

# Logging
LOG_FILE="database-setup.log"

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a $LOG_FILE
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}" | tee -a $LOG_FILE
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root"
    fi
}

# Check dependencies
check_dependencies() {
    log "Checking dependencies..."
    
    # Check for Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed. Please install Node.js 18+ first."
    fi
    
    # Check for npm
    if ! command -v npm &> /dev/null; then
        error "npm is not installed. Please install npm first."
    fi
    
    # Check for PostgreSQL client
    if ! command -v psql &> /dev/null; then
        warning "PostgreSQL client not found. Some features may not work."
    fi
    
    # Check for curl
    if ! command -v curl &> /dev/null; then
        error "curl is not installed. Please install curl first."
    fi
    
    log "Dependencies check completed"
}

# Create .env file
create_env_file() {
    log "Creating .env file..."
    
    cat > .env << EOF
# DAVY Trading Platform Environment Variables
# Database Configuration
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
SUPABASE_URL="$SUPABASE_URL"
SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY"
SUPABASE_SERVICE_KEY="$SUPABASE_SERVICE_KEY"

# Security Configuration
JWT_SECRET="DavyJWTSecret2024!SuperSecure"
OTP_SECRET="DavyOTPSecret2024!SuperSecure"
ENCRYPTION_KEY="DavyEncryptionKey2024!32Chars"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-clerk-key"
CLERK_SECRET_KEY="sk_test_your-clerk-secret"

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="davy@trading.com"
SMTP_PASS="your-smtp-password"

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Redis Configuration
REDIS_URL="redis://localhost:6379"

# Security Settings
RATE_LIMIT_WINDOW="15m"
RATE_LIMIT_MAX_REQUESTS="100"
OTP_EXPIRY_MINUTES="5"
SESSION_TIMEOUT_HOURS="24"

# SEO Configuration
NEXT_PUBLIC_SITE_URL="https://davy-trading.com"
NEXT_PUBLIC_SITE_NAME="DAVY Trading Platform"
NEXT_PUBLIC_SITE_DESCRIPTION="Plateforme de trading innovante avec IA"

# AI Surveillance
AI_SURVEILLANCE_ENABLED="true"
AI_THREAT_DETECTION_ENABLED="true"
AI_ANOMALY_DETECTION_ENABLED="true"

# Production Settings
NODE_ENV="development"
NEXT_PUBLIC_APP_ENV="development"
EOF

    log ".env file created successfully"
}

# Setup Supabase
setup_supabase() {
    log "Setting up Supabase..."
    
    # Create supabase config
    mkdir -p supabase
    cat > supabase/config.toml << EOF
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "davy-trading-platform"

[api]
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. public and storage are always included.
schemas = ["public", "storage", "graphql_public"]
# Extra schemas to add to the search_path of every request. public is always included.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returned from a table or view. Limits payload size for accidental or
# malicious requests.
max_rows = 1000

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 15

[db.pooler]
# Port to use for the local connection pooler.
port = 54329

[realtime]
# Set to false to disable realtime functionality.
enabled = true

[studio]
# Port to use for Supabase Studio.
port = 54323

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
# Port to use for the email testing server web interface.
port = 54324
smtp_port = 54325
pop3_port = 54326

[storage]
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

[auth]
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://localhost:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604800 (1 week).
jwt_expiry = 3600
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email addresses.
# If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = true
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending a confirmation OTP via SMS.
template = "Your confirmation code is {{ .Code }} ."

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
secret = ""
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
EOF

    log "Supabase configuration created"
}

# Create database schema
create_schema() {
    log "Creating database schema..."
    
    cat > supabase/migrations/001_initial_schema.sql << EOF
-- DAVY Trading Platform - Initial Database Schema
-- Created by: Samuel OBAM & Sabine NGA Lucie

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'superadmin', 'moderator');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE product_category AS ENUM ('electronics', 'fashion', 'home', 'beauty', 'sports', 'books', 'toys', 'other');
CREATE TYPE security_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Users table (extends Clerk users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role user_role DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    address JSONB,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security logs
CREATE TABLE IF NOT EXISTS security_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    location JSONB,
    threat_level security_level DEFAULT 'low',
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OTP sessions
CREATE TABLE IF NOT EXISTS otp_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    category product_category,
    brand VARCHAR(100),
    supplier VARCHAR(100),
    supplier_url TEXT,
    images JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    shipping_address JSONB,
    billing_address JSONB,
    payment_method VARCHAR(50),
    payment_status payment_status DEFAULT 'pending',
    stripe_payment_intent_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_url VARCHAR(500),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    event_type VARCHAR(100),
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI surveillance logs
CREATE TABLE IF NOT EXISTS ai_surveillance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    threat_type VARCHAR(100),
    threat_level security_level,
    confidence_score DECIMAL(3,2),
    detection_method VARCHAR(100),
    details JSONB,
    action_taken VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_supplier ON products(supplier);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_surveillance_logs_created_at ON ai_surveillance_logs(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
\$\$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO users (clerk_id, email, first_name, last_name, role, is_verified, is_active) 
VALUES 
    ('superadmin', 'samuel.obam@davy-trading.com', 'Samuel', 'OBAM', 'superadmin', TRUE, TRUE),
    ('admin', 'sabine.nga@davy-trading.com', 'Sabine', 'NGA Lucie', 'superadmin', TRUE, TRUE)
ON CONFLICT (clerk_id) DO NOTHING;

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_surveillance_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (clerk_id = current_user);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (clerk_id = current_user);

-- Products are publicly readable
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);

-- Orders are user-specific
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (user_id = (SELECT id FROM users WHERE clerk_id = current_user));
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE clerk_id = current_user));

-- Analytics are admin-only
CREATE POLICY "Analytics are admin-only" ON analytics FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE clerk_id = current_user AND role IN ('admin', 'superadmin'))
);

-- Security logs are admin-only
CREATE POLICY "Security logs are admin-only" ON security_logs FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE clerk_id = current_user AND role IN ('admin', 'superadmin'))
);

EOF

    log "Database schema created"
}

# Setup Redis
setup_redis() {
    log "Setting up Redis configuration..."
    
    cat > redis.conf << EOF
# Redis configuration for DAVY Trading Platform
port 6379
bind 127.0.0.1
timeout 300
tcp-keepalive 60
loglevel notice
logfile "redis.log"
databases 16
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir ./
maxmemory 256mb
maxmemory-policy allkeys-lru
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
EOF

    log "Redis configuration created"
}

# Main execution
main() {
    log "Starting DAVY Trading Platform database setup..."
    
    check_root
    check_dependencies
    create_env_file
    setup_supabase
    create_schema
    setup_redis
    
    log "Database setup completed successfully!"
    info "Next steps:"
    info "1. Update .env file with your actual API keys"
    info "2. Run: npm run db:create"
    info "3. Run: npm run db:migrate"
    info "4. Run: npm run db:seed"
    info "5. Start the development server: npm run dev"
}

# Parse command line arguments
case "${1:-}" in
    --auto)
        main
        ;;
    --db)
        create_schema
        ;;
    --migrate)
        log "Running database migrations..."
        # Add migration logic here
        ;;
    --seed)
        log "Seeding database with initial data..."
        # Add seeding logic here
        ;;
    --backup)
        log "Creating database backup..."
        # Add backup logic here
        ;;
    --verify)
        log "Verifying database setup..."
        # Add verification logic here
        ;;
    --help)
        echo "Usage: $0 [OPTION]"
        echo "Options:"
        echo "  --auto     Complete setup (default)"
        echo "  --db       Create database schema only"
        echo "  --migrate  Run database migrations"
        echo "  --seed     Seed database with initial data"
        echo "  --backup   Create database backup"
        echo "  --verify   Verify database setup"
        echo "  --help     Show this help message"
        ;;
    *)
        main
        ;;
esac 