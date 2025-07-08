# 🧹 Guide de Nettoyage des Variables d'Environnement

## Variables à SUPPRIMER (non essentielles)

### Variables de test/développement

- `HJSESSIONUSER_1WIN`
- `THX_GUID_1WIN`
- `BOT_TOKEN`
- `DISCORD_BOT_TOKEN`
- `DISCORD_CHANNEL_ID`

### Variables redondantes

- `POSTGRES_URL` (remplacé par NETLIFY_DATABASE_URL)
- `POSTGRES_USER` (géré par Neon)
- `SUPABASE_ANON_KEY` (redondant avec NEXT_PUBLIC_SUPABASE_ANON_KEY)
- `SUPABASE_URL` (redondant avec NEXT_PUBLIC_SUPABASE_URL)

### Variables de configuration avancée

- `NEXT_PRIVATE_TARGET`
- `NEXT_USE_NETLIFY_EDGE`
- `WEBHOOK_DOMAIN`

### Variables optionnelles

- `AI_SERVICE_URL` (si non utilisée)
- `BACKUP_S3_SECRET_KEY` (si pas de backup S3)
- `SMTP_USER` (si pas d'email)

## Variables à GARDER (essentielles)

### Supabase (4 variables)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`

### Paiement (5 variables)

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `CINETPAY_API_KEY`
- `CINETPAY_SECRET_KEY`
- `CINETPAY_SITE_ID`

### APIs (5 variables)

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `ELEVENLABS_API_KEY`
- `HUGGINGFACE_API_KEY`
- `RAPIDAPI_KEY`

### Base (8 variables)

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_DESCRIPTION`
- `NEXT_PUBLIC_GA_ID`
- `NODE_ENV`
- `IS_PRODUCTION`
- `NEXT_TELEMETRY_DISABLED`
- `NETLIFY_DATABASE_URL`
- `NETLIFY_DATABASE_URL_UNPOOLED`

### CEO/COO (10 variables)

- `NEXT_PUBLIC_CEO_NAME`
- `NEXT_PUBLIC_CEO_EMAIL`
- `NEXT_PUBLIC_CEO_TITLE`
- `NEXT_PUBLIC_CEO_DESCRIPTION`
- `NEXT_PUBLIC_CEO_LINKEDIN`
- `NEXT_PUBLIC_COO_NAME`
- `NEXT_PUBLIC_COO_EMAIL`
- `NEXT_PUBLIC_COO_TITLE`
- `NEXT_PUBLIC_COO_DESCRIPTION`
- `NEXT_PUBLIC_COO_LINKEDIN`

### Autres (6 variables)

- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

## Résultat après nettoyage

- **Avant** : ~60 variables
- **Après** : ~38 variables
- **Économie** : ~22 variables supprimées
- **Réduction** : ~40% de variables en moins

## Instructions de suppression

1. Aller dans Netlify Dashboard → Environment Variables
2. Supprimer les variables listées ci-dessus
3. Redéployer l'application
4. Tester que tout fonctionne correctement
