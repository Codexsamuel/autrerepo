# Database Migrations

This directory contains the database migration files for the NovaCore application.

## Migration Files

### 001_initial_schema.sql
Contains the initial database schema with all tables:
- `users` - User accounts and authentication
- `employees` - Employee-specific information
- `clients` - Client-specific information
- `ai_interactions` - AI assistant interaction logs
- `roles` - User roles and permissions
- `user_roles` - Many-to-many relationship between users and roles
- `login_logs` - User login history and security logs
- `documents` - Document management
- `commissions` - Commission tracking for employees

### 002_sample_data.sql
Contains sample data for testing and development:
- Sample users (admin, employees, clients)
- Sample employees with positions and departments
- Sample clients with company information
- Sample AI interactions
- Sample documents
- Sample commissions
- Sample login logs

## How to Apply Migrations

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `001_initial_schema.sql`
4. Execute the SQL
5. Repeat for `002_sample_data.sql` (optional, for development)

### Option 2: Using Supabase CLI

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Apply migrations:
   ```bash
   supabase db push
   ```

### Option 3: Using psql (if you have direct database access)

1. Connect to your database:
   ```bash
   psql -h YOUR_HOST -U YOUR_USER -d YOUR_DATABASE
   ```

2. Run the migration files:
   ```sql
   \i migrations/001_initial_schema.sql
   \i migrations/002_sample_data.sql
   ```

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema Overview

### Users Table
- Primary user accounts with authentication
- Supports multiple roles: client, employee, admin, super_admin
- Tracks login history and account status

### Employees Table
- Extended information for employees
- Links to users table via user_id
- Stores position, department, CNPS number, contract details

### Clients Table
- Extended information for clients
- Links to users table via user_id
- Stores company information and industry

### AI Interactions Table
- Logs all interactions with the DAVY AI assistant
- Tracks user input, AI responses, and intent classification
- Useful for analytics and improving AI responses

### Commissions Table
- Tracks commission agreements between employees and clients
- Stores contract values, commission rates, and status
- Supports commission management workflows

### Documents Table
- Manages document storage and status
- Links documents to users
- Supports document approval workflows

## Row Level Security (RLS)

The schema includes basic RLS policies for data security:
- Users can only view their own data
- Employees can only view their own employee records
- Clients can only view their own client records

You may need to customize these policies based on your specific requirements.

## Indexes

The schema includes performance indexes on:
- Email addresses for fast user lookups
- User roles and status for filtering
- Timestamps for chronological queries
- Foreign keys for relationship queries

## Sample Data

The sample data includes:
- 1 super admin user
- 1 admin user
- 2 employee users
- 2 client users
- Sample commissions and documents
- Sample AI interactions

## Next Steps

After applying the migrations:

1. Set up your Supabase environment variables
2. Test the database connection using the helper functions in `lib/database-helpers.ts`
3. Integrate the database with your existing components
4. Customize the RLS policies as needed
5. Add additional indexes based on your query patterns

## Troubleshooting

### Common Issues

1. **Permission Errors**: Make sure your Supabase service role has the necessary permissions
2. **RLS Policy Conflicts**: Check that your RLS policies allow the operations you're trying to perform
3. **Foreign Key Violations**: Ensure that referenced records exist before creating relationships

### Getting Help

- Check the Supabase documentation: https://supabase.com/docs
- Review the database helper functions in `lib/database-helpers.ts`
- Test queries in the Supabase SQL Editor before implementing in code 