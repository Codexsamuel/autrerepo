# Utiliser l'image Node.js officielle
FROM node:18-alpine AS base

# Installer les dépendances uniquement quand nécessaire
FROM base AS deps
# Vérifier https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine pour comprendre pourquoi libc6-compat pourrait être nécessaire.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Installer les dépendances basées sur le gestionnaire de paquets préféré
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild le code source uniquement quand nécessaire
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collecte des métadonnées complètement anonymes sur l'utilisation générale.
# En savoir plus ici : https://nextjs.org/telemetry
# Décommenter la ligne suivante au cas où vous voudriez désactiver la télémétrie pendant le build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Image de production, copier tous les fichiers et exécuter next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Décommenter la ligne suivante au cas où vous voudriez désactiver la télémétrie pendant l'exécution.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Définir automatiquement la sortie de sortie pour capturer les logs de Next.js
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js est créé par next build à partir du fichier standalone
CMD ["node", "server.js"] 