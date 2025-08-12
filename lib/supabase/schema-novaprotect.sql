-- =====================================================
-- NOVAPROTECT - SYSTÈME D'ESCROW ET LITIGES
-- =====================================================

-- 1. EXTENSIONS NÉCESSAIRES
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. TABLE ESCROW TRANSACTIONS
create table if not exists public.escrow_transactions (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references public.bookings(id) on delete cascade,
  provider_id uuid references public.provider_profiles(id),
  user_id uuid references public.users_profiles(user_id),
  
  -- Montants et devises
  total_amount numeric(10,2) not null,
  escrow_amount numeric(10,2) not null, -- Montant en escrow
  released_amount numeric(10,2) default 0, -- Montant libéré
  refunded_amount numeric(10,2) default 0, -- Montant remboursé
  
  -- Statuts et étapes
  status text not null check (status in ('pending', 'held', 'partial_released', 'completed', 'disputed', 'refunded', 'cancelled')),
  current_stage text not null check (current_stage in ('escrow_created', 'mission_started', 'mission_completed', 'payment_released', 'dispute_opened', 'dispute_resolved')),
  
  -- Détails de paiement
  payment_provider text not null check (payment_provider in ('cinetpay', 'stripe', 'momo', 'orange_money')),
  external_transaction_id text,
  payment_intent_id text,
  
  -- Timeline et dates
  escrow_created_at timestamptz default now(),
  mission_started_at timestamptz,
  mission_completed_at timestamptz,
  payment_released_at timestamptz,
  dispute_opened_at timestamptz,
  dispute_resolved_at timestamptz,
  
  -- Métadonnées
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. TABLE CONTRATS
create table if not exists public.contracts (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references public.bookings(id) on delete cascade,
  escrow_id uuid references public.escrow_transactions(id),
  
  -- Contenu du contrat
  contract_type text not null check (contract_type in ('standard', 'premium', 'enterprise', 'urgent')),
  terms_version text not null default '1.0',
  terms_hash text not null, -- Hash des conditions
  
  -- Statut et signature
  status text not null default 'draft' check (status in ('draft', 'sent', 'signed_client', 'signed_provider', 'active', 'completed', 'cancelled')),
  client_signed_at timestamptz,
  provider_signed_at timestamptz,
  
  -- Fichiers
  contract_pdf_url text,
  signed_pdf_url text,
  
  -- Conditions et SLA
  sla_hours integer default 72, -- Délai de résolution en heures
  cancellation_policy text,
  penalty_terms jsonb,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. TABLE FACTURES
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references public.bookings(id) on delete cascade,
  escrow_id uuid references public.escrow_transactions(id),
  contract_id uuid references public.contracts(id),
  
  -- Informations facture
  invoice_number text unique not null,
  invoice_type text not null check (invoice_type in ('proforma', 'final', 'credit_note')),
  
  -- Montants et TVA
  subtotal_ht numeric(10,2) not null,
  tva_rate numeric(5,2) default 19.25, -- TVA Cameroun
  tva_amount numeric(10,2) not null,
  total_ttc numeric(10,2) not null,
  currency text not null default 'XAF',
  
  -- Statut et paiement
  status text not null default 'draft' check (status in ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_date date not null,
  paid_at timestamptz,
  
  -- Fichiers
  invoice_pdf_url text,
  receipt_pdf_url text,
  
  -- Métadonnées
  billing_address jsonb,
  payment_terms text,
  notes text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. TABLE LITIGES NOVAPROTECT
create table if not exists public.disputes (
  id uuid primary key default uuid_generate_v4(),
  escrow_id uuid references public.escrow_transactions(id) on delete cascade,
  contract_id uuid references public.contracts(id),
  booking_id uuid references public.bookings(id) on delete cascade,
  
  -- Parties impliquées
  opened_by uuid references public.users_profiles(user_id) not null, -- Qui a ouvert le litige
  disputed_party uuid references public.users_profiles(user_id) not null, -- Contre qui
  
  -- Détails du litige
  dispute_type text not null check (dispute_type in ('quality_issue', 'payment_dispute', 'cancellation', 'no_show', 'safety_concern', 'other')),
  dispute_reason text not null,
  description text,
  requested_action text not null check (requested_action in ('full_refund', 'partial_refund', 'service_redone', 'compensation', 'cancellation')),
  
  -- Montants demandés
  requested_refund_amount numeric(10,2),
  requested_compensation numeric(10,2),
  
  -- Statut et résolution
  status text not null default 'opened' check (status in ('opened', 'under_review', 'evidence_collection', 'mediation', 'decision_pending', 'resolved', 'closed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  
  -- Timeline
  opened_at timestamptz default now(),
  under_review_at timestamptz,
  evidence_deadline timestamptz,
  mediation_started_at timestamptz,
  decision_made_at timestamptz,
  resolved_at timestamptz,
  
  -- Résolution
  resolution text,
  resolution_type text check (resolution_type in ('client_win', 'provider_win', 'partial_client', 'partial_provider', 'cancelled', 'mediation')),
  final_amount numeric(10,2),
  admin_notes text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. TABLE PREUVES ET ÉVIDENCES
create table if not exists public.dispute_evidence (
  id uuid primary key default uuid_generate_v4(),
  dispute_id uuid references public.disputes(id) on delete cascade,
  submitted_by uuid references public.users_profiles(user_id) not null,
  
  -- Contenu de la preuve
  evidence_type text not null check (evidence_type in ('photo', 'video', 'document', 'audio', 'witness_statement', 'other')),
  title text not null,
  description text,
  
  -- Fichiers
  file_url text not null,
  file_hash text not null, -- Hash du fichier pour intégrité
  file_size integer,
  mime_type text,
  
  -- Métadonnées
  submitted_at timestamptz default now(),
  is_verified boolean default false,
  verification_notes text,
  
  created_at timestamptz default now()
);

-- 7. TABLE MESSAGES LITIGES
create table if not exists public.dispute_messages (
  id uuid primary key default uuid_generate_v4(),
  dispute_id uuid references public.disputes(id) on delete cascade,
  sender_id uuid references public.users_profiles(user_id) not null,
  
  -- Contenu du message
  message_type text not null check (message_type in ('client_message', 'provider_message', 'admin_message', 'system_message')),
  content text not null,
  
  -- Pièces jointes
  attachments jsonb, -- URLs des fichiers attachés
  
  -- Statut
  is_internal boolean default false, -- Message interne admin
  is_visible_to_client boolean default true,
  is_visible_to_provider boolean default true,
  
  created_at timestamptz default now()
);

-- 8. TABLE ORGANISATIONS B2B
create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  business_name text not null,
  registration_number text, -- Numéro RCCM
  tax_id text, -- Numéro contribuable
  
  -- Informations de contact
  email text not null,
  phone text,
  website text,
  address jsonb,
  
  -- Statut et vérification
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended', 'verified', 'premium')),
  verification_level text not null default 'basic' check (verification_level in ('basic', 'verified', 'premium', 'enterprise')),
  verified_at timestamptz,
  
  -- Métadonnées
  logo_url text,
  description text,
  industry text,
  employee_count integer,
  founded_year integer,
  
  -- Paramètres
  settings jsonb,
  billing_info jsonb,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. TABLE MEMBRES ORGANISATION
create table if not exists public.organization_members (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references public.users_profiles(user_id) on delete cascade,
  
  -- Rôle et permissions
  role text not null check (role in ('owner', 'admin', 'manager', 'agent', 'viewer')),
  permissions jsonb, -- Permissions granulaires
  
  -- Statut
  status text not null default 'active' check (status in ('active', 'inactive', 'suspended')),
  joined_at timestamptz default now(),
  
  -- Métadonnées
  title text,
  department text,
  is_primary_contact boolean default false,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Contrainte unique
  unique(organization_id, user_id)
);

-- 10. TABLE FACTURATION ORGANISATION
create table if not exists public.organization_billing (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade,
  
  -- Plan et abonnement
  plan_type text not null check (plan_type in ('free', 'starter', 'professional', 'enterprise', 'custom')),
  billing_cycle text not null check (billing_cycle in ('monthly', 'quarterly', 'yearly')),
  
  -- Montants
  base_price numeric(10,2) not null,
  additional_fees numeric(10,2) default 0,
  total_price numeric(10,2) not null,
  currency text not null default 'XAF',
  
  -- Statut
  status text not null default 'active' check (status in ('active', 'past_due', 'cancelled', 'expired')),
  
  -- Dates
  start_date date not null,
  end_date date not null,
  next_billing_date date,
  
  -- Métadonnées
  features jsonb, -- Fonctionnalités incluses
  limits jsonb, -- Limites d'usage
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11. INDEX POUR PERFORMANCE
create index if not exists idx_escrow_booking on public.escrow_transactions(booking_id);
create index if not exists idx_escrow_status on public.escrow_transactions(status);
create index if not exists idx_escrow_provider on public.escrow_transactions(provider_id);
create index if not exists idx_escrow_user on public.escrow_transactions(user_id);

create index if not exists idx_contracts_booking on public.contracts(booking_id);
create index if not exists idx_contracts_status on public.contracts(status);

create index if not exists idx_invoices_booking on public.invoices(booking_id);
create index if not exists idx_invoices_status on public.invoices(status);
create index if not exists idx_invoices_number on public.invoices(invoice_number);

create index if not exists idx_disputes_escrow on public.disputes(escrow_id);
create index if not exists idx_disputes_status on public.disputes(status);
create index if not exists idx_disputes_opened_by on public.disputes(opened_by);

create index if not exists idx_org_members_org on public.organization_members(organization_id);
create index if not exists idx_org_members_user on public.organization_members(user_id);
create index if not exists idx_org_members_role on public.organization_members(role);

-- 12. RLS ACTIVATION
alter table public.escrow_transactions enable row level security;
alter table public.contracts enable row level security;
alter table public.invoices enable row level security;
alter table public.disputes enable row level security;
alter table public.dispute_evidence enable row level security;
alter table public.dispute_messages enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.organization_billing enable row level security;

-- 13. POLICIES RLS
-- Escrow : visible par les parties impliquées et admins
create policy "escrow_view_own" on public.escrow_transactions
  for select using (
    auth.uid() = user_id or 
    auth.uid() = provider_id or
    exists (select 1 from public.users_profiles u where u.user_id = auth.uid() and u.role = 'admin')
  );

-- Contrats : visible par les parties et admins
create policy "contracts_view_own" on public.contracts
  for select using (
    exists (
      select 1 from public.bookings b 
      where b.id = booking_id and 
      (b.user_id = auth.uid() or b.provider_id = auth.uid())
    ) or
    exists (select 1 from public.users_profiles u where u.user_id = auth.uid() and u.role = 'admin')
  );

-- Litiges : visible par les parties et admins
create policy "disputes_view_own" on public.disputes
  for select using (
    opened_by = auth.uid() or 
    disputed_party = auth.uid() or
    exists (select 1 from public.users_profiles u where u.user_id = auth.uid() and u.role = 'admin')
  );

-- Organisations : visible par les membres et admins
create policy "organizations_view_members" on public.organizations
  for select using (
    exists (
      select 1 from public.organization_members om 
      where om.organization_id = id and om.user_id = auth.uid()
    ) or
    exists (select 1 from public.users_profiles u where u.user_id = auth.uid() and u.role = 'admin')
  );

-- 14. FONCTIONS UTILITAIRES
-- Fonction pour calculer le montant en escrow
create or replace function public.calculate_escrow_amount(
  total_amount numeric,
  escrow_percentage numeric default 100
) returns numeric language sql stable as $$
  select (total_amount * escrow_percentage) / 100;
$$;

-- Fonction pour vérifier l'éligibilité aux litiges
create or replace function public.can_open_dispute(
  booking_id uuid,
  user_id uuid
) returns boolean language plpgsql as $$
declare
  booking_status text;
  dispute_exists boolean;
begin
  -- Vérifier le statut de la réservation
  select status into booking_status 
  from public.bookings 
  where id = booking_id;
  
  -- Vérifier si un litige existe déjà
  select exists(
    select 1 from public.disputes 
    where booking_id = $1 and opened_by = $2
  ) into dispute_exists;
  
  -- Retourner true si éligible
  return booking_status = 'completed' and not dispute_exists;
end;
$$;

-- 15. TRIGGERS POUR AUDIT
-- Trigger pour escrow
create trigger audit_escrow_trigger
  after insert or update or delete on public.escrow_transactions
  for each row execute function public.audit_trigger_function();

-- Trigger pour litiges
create trigger audit_disputes_trigger
  after insert or update or delete on public.disputes
  for each row execute function public.audit_trigger_function();

-- Trigger pour organisations
create trigger audit_organizations_trigger
  after insert or update or delete on public.organizations
  for each row execute function public.audit_trigger_function();

-- 16. COMMENTAIRES
comment on table public.escrow_transactions is 'Transactions d''escrow pour sécuriser les paiements';
comment on table public.contracts is 'Contrats numériques avec signature électronique';
comment on table public.invoices is 'Factures avec TVA et devises multiples';
comment on table public.disputes is 'Système de litiges NovaProtect avec arbitrage';
comment on table public.dispute_evidence is 'Preuves et évidences pour les litiges';
comment on table public.organizations is 'Organisations B2B avec gestion d''équipe';
comment on table public.organization_members is 'Membres et rôles dans les organisations';
comment on table public.organization_billing is 'Facturation et abonnements des organisations'; 