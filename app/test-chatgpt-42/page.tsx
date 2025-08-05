import { Metadata } from 'next';
import { ChatGPT42Test } from '@/components/ui/ChatGPT42Test';

export const metadata: Metadata = {
  title: 'Test ChatGPT-42 API - DL Solutions',
  description: 'Test de l\'API ChatGPT-42 via RapidAPI avec toutes ses fonctionnalités',
  keywords: [
    'ChatGPT-42',
    'RapidAPI',
    'IA',
    'GPT-4',
    'GPT-3.5',
    'conversation',
    'génération de contenu',
    'analyse de texte',
    'DL Solutions'
  ]
};

export default function TestChatGPT42Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ChatGPT42Test />
        
        {/* Informations supplémentaires */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🤖 Fonctionnalités ChatGPT-42</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Conversation simple</strong> avec GPT-4/GPT-3.5</li>
              <li>✅ <strong>Génération de contenu</strong> spécialisé</li>
              <li>✅ <strong>Analyse de texte</strong> avancée</li>
              <li>✅ <strong>Suggestions créatives</strong></li>
              <li>✅ <strong>Paramètres configurables</strong></li>
              <li>✅ <strong>Gestion d'erreurs</strong> robuste</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📊 Modèles Disponibles</h3>
            <ul className="space-y-2 text-sm">
              <li>🧠 <strong>GPT-4</strong> - Modèle le plus avancé</li>
              <li>⚡ <strong>GPT-4 Turbo</strong> - Version optimisée</li>
              <li>🔧 <strong>GPT-3.5 Turbo</strong> - Équilibré</li>
              <li>📝 <strong>GPT-3.5 Turbo 16k</strong> - Contexte étendu</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">💡 Utilisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">API Endpoints:</h4>
              <ul className="space-y-1">
                <li><code>GET /api/ai/chatgpt-42?action=stats</code></li>
                <li><code>POST /api/ai/chatgpt-42</code> (conversation)</li>
                <li><code>POST /api/ai/chatgpt-42</code> (contenu)</li>
                <li><code>POST /api/ai/chatgpt-42</code> (analyse)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Exemples de requêtes:</h4>
              <ul className="space-y-1">
                <li>• <code>curl -X POST /api/ai/chatgpt-42 -d '{"action":"chat","message":"Hello"}'</code></li>
                <li>• <code>curl -X POST /api/ai/chatgpt-42 -d '{"action":"content","message":"Write an article"}'</code></li>
                <li>• <code>curl -X POST /api/ai/chatgpt-42 -d '{"action":"analyze","message":"Analyze this text"}'</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 