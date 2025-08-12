-- =====================================================
-- NOVAWORLD ENTERPRISE++ - SCHÉMA AVANCÉ
-- =====================================================

-- 1. EXTENSION VECTOR POUR RECHERCHE SÉMANTIQUE
create extension if not exists vector;

-- 2. COLONNE EMBEDDING POUR LES SERVICES
alter table public.services add column if not exists embedding vector(1536);

-- 3. INDEX ANN POUR RECHERCHE RAPIDE
create index if not exists services_embedding_idx
on public.services using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- 4. TABLE IDEMPOTENCY KEYS (ÉVITE LES DOUBLONS)
create table if not exists public.idempotency_keys (
  key text primary key,
  route text not null,
  created_at timestamptz default now()
);

-- 5. TABLE AUDIT CHAIN (LOGS INFALSIFIABLES)
create table if not exists public.audit_chain (
  id bigserial primary key,
  actor uuid,
  action text,
  target text,
  meta jsonb,
  prev_hash text,
  curr_hash text,
  created_at timestamptz default now()
);

-- 6. FONCTION RECHERCHE SÉMANTIQUE
create or replace function public.search_services_semantic(
  query_embedding vector, 
  match_count int default 10,
  similarity_threshold float default 0.7
)
returns table(
  id uuid, 
  title text, 
  description text,
  category text,
  city text,
  business_name text,
  verified boolean,
  price_monthly numeric,
  score float
)
language sql stable as $$
  select 
    s.id, 
    s.title, 
    s.description,
    s.category,
    s.city,
    p.business_name,
    p.verified,
    s.price_monthly,
    1 - (s.embedding <=> query_embedding) as score
  from public.services s
  left join public.provider_profiles p on s.provider_id = p.id
  where s.embedding is not null
    and 1 - (s.embedding <=> query_embedding) >= similarity_threshold
  order by s.embedding <=> query_embedding
  limit match_count;
$$;

-- 7. FONCTION MISE À JOUR EMBEDDING
create or replace function public.update_service_embedding(
  service_id uuid,
  new_embedding vector
)
returns void
language plpgsql
as $$
begin
  update public.services 
  set embedding = new_embedding,
      updated_at = now()
  where id = service_id;
end;
$$;

-- 8. TRIGGER POUR AUDIT AUTOMATIQUE
create or replace function public.audit_trigger_function()
returns trigger
language plpgsql
as $$
declare
  prev_hash text;
  curr_hash text;
  actor_uuid uuid;
begin
  -- Récupérer le dernier hash
  select curr_hash into prev_hash 
  from public.audit_chain 
  order by id desc limit 1;
  
  -- Hash actuel basé sur les données de la ligne
  curr_hash := encode(
    sha256(
      (row_to_json(NEW)::text || prev_hash || extract(epoch from now())::text)::bytea
    ), 
    'hex'
  );
  
  -- Déterminer l'acteur (utilisateur connecté ou système)
  actor_uuid := case 
    when current_setting('request.jwt.claims', true)::json->>'sub' is not null 
    then (current_setting('request.jwt.claims', true)::json->>'sub')::uuid
    else null
  end;
  
  -- Insérer dans l'audit chain
  insert into public.audit_chain (actor, action, target, meta, prev_hash, curr_hash)
  values (
    actor_uuid,
    TG_OP, -- INSERT, UPDATE, DELETE
    TG_TABLE_NAME,
    jsonb_build_object(
      'old', row_to_json(OLD),
      'new', row_to_json(NEW),
      'table', TG_TABLE_NAME,
      'timestamp', now()
    ),
    prev_hash,
    curr_hash
  );
  
  return NEW;
end;
$$;

-- 9. ACTIVATION DES TRIGGERS D'AUDIT
create trigger audit_services_trigger
  after insert or update or delete on public.services
  for each row execute function public.audit_trigger_function();

create trigger audit_bookings_trigger
  after insert or update or delete on public.bookings
  for each row execute function public.audit_trigger_function();

create trigger audit_payments_trigger
  after insert or update or delete on public.payments
  for each row execute function public.audit_trigger_function();

-- 10. RLS POUR LES NOUVELLES TABLES
alter table public.idempotency_keys enable row level security;
alter table public.audit_chain enable row level security;

-- 11. POLICIES RLS
create policy "idempotency_admin_only" on public.idempotency_keys
  for all using (
    exists (
      select 1 from public.users_profiles u 
      where u.user_id = auth.uid() and u.role = 'admin'
    )
  );

create policy "audit_admin_only" on public.audit_chain
  for all using (
    exists (
      select 1 from public.users_profiles u 
      where u.user_id = auth.uid() and u.role = 'admin'
    )
  );

-- 12. INDEX POUR PERFORMANCE
create index if not exists idx_audit_chain_actor on public.audit_chain(actor);
create index if not exists idx_audit_chain_action on public.audit_chain(action);
create index if not exists idx_audit_chain_created on public.audit_chain(created_at);
create index if not exists idx_idempotency_created on public.idempotency_keys(created_at);

-- 13. VUE POUR STATISTIQUES AUDIT
create or replace view public.audit_stats as
select 
  action,
  count(*) as total_actions,
  count(distinct actor) as unique_actors,
  min(created_at) as first_action,
  max(created_at) as last_action
from public.audit_chain
group by action
order by total_actions desc;

-- 14. FONCTION DE NETTOYAGE AUTOMATIQUE
create or replace function public.cleanup_old_audit_logs()
returns void
language plpgsql
as $$
begin
  -- Supprimer les logs de plus de 1 an
  delete from public.audit_chain 
  where created_at < now() - interval '1 year';
  
  -- Supprimer les clés idempotency de plus de 24h
  delete from public.idempotency_keys 
  where created_at < now() - interval '24 hours';
end;
$$;

-- 15. COMMENTAIRES POUR DOCUMENTATION
comment on table public.idempotency_keys is 'Clés d''idempotence pour éviter les doublons dans les API';
comment on table public.audit_chain is 'Chaîne d''audit inviolable pour traçabilité complète';
comment on function public.search_services_semantic is 'Recherche sémantique des services avec pgvector';
comment on function public.update_service_embedding is 'Mise à jour des embeddings pour la recherche IA'; 