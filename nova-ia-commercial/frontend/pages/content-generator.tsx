import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface GeneratedContent {
  text: string;
  hashtags: string[];
  character_count: number;
  estimated_engagement: number;
  platform_optimizations: {
    hashtag_count: string;
    caption_length: string;
  };
}

const ContentGenerator: React.FC = () => {
  const [contentType, setContentType] = useState('text');
  const [platform, setPlatform] = useState('instagram');
  const [targetAudience, setTargetAudience] = useState('business');
  const [tone, setTone] = useState('professional');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { id: 'text', label: 'Texte', icon: '📝' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'video', label: 'Vidéo', icon: '🎥' },
    { id: 'audio', label: 'Audio', icon: '🎵' }
  ];

  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵' },
    { id: 'youtube', label: 'YouTube', icon: '📺' },
    { id: 'facebook', label: 'Facebook', icon: '��' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' }
  ];

  const audiences = [
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'general', label: 'Général', icon: '👥' },
    { id: 'youth', label: 'Jeunesse', icon: '🎯' },
    { id: 'professional', label: 'Professionnel', icon: '👔' }
  ];

  const tones = [
    { id: 'professional', label: 'Professionnel', icon: '👔' },
    { id: 'casual', label: 'Décontracté', icon: '😊' },
    { id: 'educational', label: 'Éducatif', icon: '📚' },
    { id: 'entertaining', label: 'Divertissant', icon: '🎭' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulation de génération
    setTimeout(() => {
      const mockContent = {
        text: `🚀 ${keywords || 'Innovation'} - Découvrez comment ${keywords || 'l\'innovation'} peut transformer votre business ! #innovation #business #${keywords?.toLowerCase() || 'tech'}`,
        hashtags: [keywords?.toLowerCase() || 'innovation', 'business', 'tech'],
        character_count: 150,
        estimated_engagement: 0.08,
        platform_optimizations: {
          hashtag_count: '5-10',
          caption_length: '125-150 caractères'
        }
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Générateur de Contenu IA
          </h1>
          <p className="text-gray-300">
            Créez du contenu viral optimisé pour vos plateformes sociales
          </p>
        </div>

        {/* Configuration */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type de contenu */}
            <div>
              <label className="block text-white font-medium mb-3">Type de contenu</label>
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                      contentType === type.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plateforme */}
            <div>
              <label className="block text-white font-medium mb-3">Plateforme</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => setPlatform(plat.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                      platform === plat.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{plat.icon}</span>
                    {plat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience cible */}
            <div>
              <label className="block text-white font-medium mb-3">Audience cible</label>
              <div className="grid grid-cols-2 gap-2">
                {audiences.map((audience) => (
                  <button
                    key={audience.id}
                    onClick={() => setTargetAudience(audience.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                      targetAudience === audience.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{audience.icon}</span>
                    {audience.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ton */}
            <div>
              <label className="block text-white font-medium mb-3">Ton</label>
              <div className="grid grid-cols-2 gap-2">
                {tones.map((toneOption) => (
                  <button
                    key={toneOption.id}
                    onClick={() => setTone(toneOption.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                      tone === toneOption.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-2">{toneOption.icon}</span>
                    {toneOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mots-clés */}
          <div className="mt-6">
            <label className="block text-white font-medium mb-3">Mots-clés</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Entrez vos mots-clés (séparés par des virgules)"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton de génération */}
          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération en cours...
                </span>
              ) : (
                'Générer du Contenu'
              )}
            </button>
          </div>
        </div>

        {/* Contenu généré */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Contenu Généré</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Texte</label>
                <div className="bg-white/10 rounded-lg p-4 text-white">
                  {generatedContent?.text}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Hashtags</label>
                <div className="flex flex-wrap gap-2">
                  {generatedContent?.hashtags?.map((hashtag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                      #{hashtag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Caractères</label>
                  <div className="bg-white/10 rounded-lg p-3 text-white text-center">
                    {generatedContent?.character_count}
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Engagement estimé</label>
                  <div className="bg-white/10 rounded-lg p-3 text-white text-center">
                    {(generatedContent?.estimated_engagement * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Plateforme</label>
                  <div className="bg-white/10 rounded-lg p-3 text-white text-center capitalize">
                    {platform}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentGenerator;
