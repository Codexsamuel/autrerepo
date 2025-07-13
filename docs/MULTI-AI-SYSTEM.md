# Système Multi-IA avec Mode Dark

## Vue d'ensemble

Le système Multi-IA est une plateforme avancée qui intègre plusieurs modèles d'intelligence artificielle (OpenAI GPT-4, Google Gemini, Dark GPT) avec un mode "Dark" spécial pour des capacités étendues.

## Fonctionnalités principales

### 🔮 Mode Dark

Le mode Dark offre trois niveaux de capacités étendues :

#### Niveau Basic

- Analyse technique approfondie
- Génération de code complexe
- Résolution de problèmes avancés
- Suggestions d'optimisation

#### Niveau Advanced

- Capacités système étendues
- Optimisation de performances
- Automatisation de tâches
- Analyse de sécurité

#### Niveau Extreme

- Capacités maximales
- Analyse système avancée
- Automatisation complète
- Architecture complexe

### 🤖 Modèles IA disponibles

#### OpenAI

- **GPT-4** : Modèle standard pour la conversation et l'analyse
- **GPT-4 Turbo** : Version rapide avec plus de tokens

#### Google Gemini

- **Gemini Pro** : Modèle multimodal pour l'analyse et la conversation
- **Gemini Pro Vision** : Modèle avec capacités visuelles

#### Dark GPT

- **Dark GPT Basic** : Capacités étendues de base
- **Dark GPT Advanced** : Accès système et automatisation
- **Dark GPT Extreme** : Capacités maximales

## Utilisation

### Activation du Mode Dark

#### Via l'interface

1. Ouvrez l'assistant IA avancé
2. Cliquez sur "Paramètres"
3. Activez le switch "Mode Dark"
4. Sélectionnez le niveau (Basic/Advanced/Extreme)

#### Via commande vocale

- "Activer le mode Dark" → Niveau Basic
- "Activer le mode Dark advanced" → Niveau Advanced
- "Activer le mode Dark extreme" → Niveau Extreme

### Exemples de prompts

#### Génération de code

```
"Générer une API REST avec Node.js et Express"
"Créer un système de cache intelligent avec Redis"
"Développer un algorithme de tri optimisé"
```

#### Analyse et optimisation

```
"Analyser cette fonction et l'optimiser"
"Déboguer ce code JavaScript"
"Réviser cette architecture de base de données"
```

#### Automatisation

```
"Créer un script d'automatisation pour le déploiement"
"Développer un système de monitoring intelligent"
"Générer des tests automatisés pour cette API"
```

## API Endpoints

### POST /api/ai/multi-ai

Génère une réponse avec le modèle IA sélectionné.

**Paramètres :**

```json
{
  "prompt": "Votre question ou demande",
  "modelId": "gpt-4",
  "darkMode": false,
  "darkLevel": "basic",
  "maxTokens": 4000,
  "temperature": 0.7,
  "customContext": {}
}
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "content": "Réponse générée",
    "model": "GPT-4",
    "provider": "openai",
    "isDarkMode": false,
    "confidence": 85,
    "metadata": {
      "tokens": 150,
      "latency": 1200,
      "cost": 0.0045
    },
    "actions": []
  }
}
```

### GET /api/ai/multi-ai?action=models

Récupère la liste des modèles disponibles.

### GET /api/ai/multi-ai?action=dark-mode-status

Récupère le statut actuel du mode Dark.

### PUT /api/ai/multi-ai

Active ou désactive le mode Dark.

**Activation :**

```json
{
  "action": "activate-dark-mode",
  "level": "basic"
}
```

**Désactivation :**

```json
{
  "action": "deactivate-dark-mode"
}
```

## Hook React : useMultiAI

### Installation

```typescript
import { useMultiAI } from "@/hooks/useMultiAI";
```

### Utilisation de base

```typescript
const {
  isLoading,
  selectedModel,
  darkMode,
  generateResponse,
  activateDarkMode,
  deactivateDarkMode,
} = useMultiAI({
  defaultModel: "gpt-4",
  defaultDarkMode: false,
  onResponse: (response) => console.log(response),
  onError: (error) => console.error(error),
});
```

### Exemple complet

```typescript
import { useMultiAI } from "@/hooks/useMultiAI";

function MyComponent() {
  const {
    isLoading,
    selectedModel,
    darkMode,
    generateResponse,
    activateDarkMode,
    lastResponse,
    error,
  } = useMultiAI();

  const handleSubmit = async (prompt: string) => {
    // Détecter automatiquement le mode Dark
    if (prompt.includes("mode dark")) {
      await activateDarkMode("basic");
    }

    const response = await generateResponse(prompt);
    console.log("Réponse:", response);
  };

  return (
    <div>
      {isLoading && <div>Chargement...</div>}
      {error && <div>Erreur: {error}</div>}
      {lastResponse && (
        <div>
          <h3>Réponse de {lastResponse.model}</h3>
          <p>{lastResponse.content}</p>
          <p>Confiance: {lastResponse.confidence}%</p>
        </div>
      )}
    </div>
  );
}
```

## Composants React

### AdvancedAIChatbot

Interface complète de chat avec tous les modèles IA.

```typescript
import AdvancedAIChatbot from "@/components/ai/AdvancedAIChatbot";

function App() {
  return (
    <div className="h-screen">
      <AdvancedAIChatbot />
    </div>
  );
}
```

## Sécurité et éthique

### Restrictions du Mode Dark

- Pas d'accès système non autorisé
- Pas de modification de fichiers système
- Pas d'accès réseau non autorisé
- Respect des lois et éthique

### Contrôles de sécurité

- Validation des prompts
- Limitation des tokens
- Surveillance des coûts
- Logs d'activité

## Métriques et monitoring

### Statistiques disponibles

- Nombre de messages
- Total des tokens utilisés
- Coût total
- Latence moyenne
- Taux de confiance

### Monitoring en temps réel

- Métriques de performance
- Utilisation des modèles
- Coûts par session
- Erreurs et exceptions

## Configuration

### Variables d'environnement

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Configuration Dark Mode
DARK_MODE_ENABLED=true
DARK_MODE_LEVEL=basic
```

### Configuration avancée

```typescript
// lib/ai/multi-ai-service.ts
const config = {
  maxTokens: 4000,
  temperature: 0.7,
  darkModeCapabilities: {
    codeGeneration: true,
    systemAccess: false,
    automation: false,
  },
};
```

## Déploiement

### Prérequis

- Node.js 18+
- API keys pour OpenAI et Google Gemini
- Configuration des variables d'environnement

### Installation

```bash
npm install
npm run build
npm start
```

### Déploiement sur Netlify

1. Configurez les variables d'environnement
2. Déployez avec `npm run build:netlify`
3. Vérifiez les logs de déploiement

## Support et maintenance

### Logs

- Logs d'erreur dans la console
- Métriques de performance
- Historique des interactions

### Dépannage

1. Vérifiez les API keys
2. Consultez les logs d'erreur
3. Testez avec un modèle simple
4. Vérifiez la configuration

### Mise à jour

- Mise à jour automatique des modèles
- Nouvelles fonctionnalités
- Corrections de bugs
- Améliorations de sécurité

## Exemples d'utilisation avancée

### Intégration avec le trading

```typescript
// Utilisation avec l'API de trading
const tradingAnalysis = await generateResponse(
  "Analyser les tendances du marché pour AAPL",
  {
    modelId: "dark-gpt-advanced",
    darkMode: true,
    darkLevel: "advanced",
    customContext: { marketData: currentMarketData },
  }
);
```

### Génération de code complexe

```typescript
const codeGeneration = await generateResponse(
  "Créer un système de cache distribué avec Redis et Node.js",
  {
    modelId: "dark-gpt-extreme",
    darkMode: true,
    darkLevel: "extreme",
    maxTokens: 8000,
  }
);
```

### Automatisation de tâches

```typescript
const automation = await generateResponse(
  "Créer un script d'automatisation pour le déploiement continu",
  {
    modelId: "dark-gpt-advanced",
    darkMode: true,
    darkLevel: "advanced",
  }
);
```

## Conclusion

Le système Multi-IA avec mode Dark offre une plateforme puissante et flexible pour l'intelligence artificielle, combinant plusieurs modèles avec des capacités étendues tout en maintenant des contrôles de sécurité appropriés.
