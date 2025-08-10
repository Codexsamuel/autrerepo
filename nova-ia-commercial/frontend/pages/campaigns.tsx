import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const mockCampaigns = [
    {
      id: 1,
      name: 'Campagne Innovation Tech',
      type: 'awareness',
      status: 'active',
      platforms: ['instagram', 'linkedin'],
      budget: 5000,
      duration_days: 14,
      start_date: '2025-01-10',
      end_date: '2025-01-24',
      current_reach: 25000,
      current_engagement: 1800,
      target_reach: 50000,
      target_engagement: 3000,
      progress: 0.5
    },
    {
      id: 2,
      name: 'Campagne Produit Nouveau',
      type: 'conversion',
      status: 'scheduled',
      platforms: ['tiktok', 'instagram'],
      budget: 3000,
      duration_days: 7,
      start_date: '2025-01-20',
      end_date: '2025-01-27',
      current_reach: 0,
      current_engagement: 0,
      target_reach: 30000,
      target_engagement: 2000,
      progress: 0
    },
    {
      id: 3,
      name: 'Campagne Brand Awareness',
      type: 'awareness',
      status: 'completed',
      platforms: ['instagram', 'facebook', 'linkedin'],
      budget: 8000,
      duration_days: 30,
      start_date: '2024-12-01',
      end_date: '2024-12-31',
      current_reach: 75000,
      current_engagement: 4500,
      target_reach: 60000,
      target_engagement: 4000,
      progress: 1
    }
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const campaignTypes = [
    { id: 'awareness', label: 'Notoriété', icon: '🎯', color: 'bg-blue-500' },
    { id: 'conversion', label: 'Conversion', icon: '💰', color: 'bg-green-500' },
    { id: 'engagement', label: 'Engagement', icon: '👥', color: 'bg-purple-500' },
    { id: 'traffic', label: 'Trafic', icon: '🚀', color: 'bg-orange-500' }
  ];

  const platforms = {
    instagram: { icon: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    tiktok: { icon: '🎵', color: 'bg-gradient-to-r from-black to-gray-800' },
    linkedin: { icon: '💼', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    facebook: { icon: '👥', color: 'bg-gradient-to-r from-blue-600 to-blue-700' },
    youtube: { icon: '📺', color: 'bg-gradient-to-r from-red-500 to-red-600' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCreateCampaign = async (campaignData) => {
    setIsCreating(true);
    
    // Simulation de création
    setTimeout(() => {
      const newCampaign = {
        id: campaigns.length + 1,
        ...campaignData,
        status: 'scheduled',
        current_reach: 0,
        current_engagement: 0,
        progress: 0
      };
      
      setCampaigns([...campaigns, newCampaign]);
      setIsCreating(false);
      setShowCreateForm(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gestion des Campagnes
            </h1>
            <p className="text-gray-300">
              Créez et gérez vos campagnes marketing avec l'IA
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            + Nouvelle Campagne
          </button>
        </div>

        {/* Campagnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              {/* Header de la campagne */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                  <p className="text-gray-300 text-sm">
                    {campaignTypes.find(t => t.id === campaign.type)?.label}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full text-white ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>

              {/* Plateformes */}
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className={`px-2 py-1 text-xs rounded-full text-white ${platforms[platform]?.color}`}
                  >
                    {platforms[platform]?.icon} {platform}
                  </span>
                ))}
              </div>

              {/* Métriques */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-300 text-sm">Budget</p>
                  <p className="text-white font-semibold">{campaign.budget.toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Durée</p>
                  <p className="text-white font-semibold">{campaign.duration_days} jours</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Portée actuelle</p>
                  <p className="text-white font-semibold">{campaign.current_reach.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Engagement</p>
                  <p className="text-white font-semibold">{campaign.current_engagement.toLocaleString()}</p>
                </div>
              </div>

              {/* Progression */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Progression</span>
                  <span className="text-white">{(campaign.progress * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${campaign.progress * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Voir détails
                </button>
                {campaign.status === 'active' && (
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                    Pause
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Formulaire de création */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 w-full max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">Nouvelle Campagne</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Nom de la campagne</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Campagne Innovation 2025"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Type de campagne</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {campaignTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Budget (€)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Durée (jours)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="14"
                  />
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleCreateCampaign({})}
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isCreating ? 'Création...' : 'Créer'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Détails de la campagne */}
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{selectedCampaign.name}</h2>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-white hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Informations générales</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Type:</span>
                      <span className="text-white">{campaignTypes.find(t => t.id === selectedCampaign.type)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Statut:</span>
                      <span className="text-white">{selectedCampaign.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Budget:</span>
                      <span className="text-white">{selectedCampaign.budget.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Durée:</span>
                      <span className="text-white">{selectedCampaign.duration_days} jours</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Portée actuelle:</span>
                      <span className="text-white">{selectedCampaign.current_reach.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Engagement:</span>
                      <span className="text-white">{selectedCampaign.current_engagement.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Progression:</span>
                      <span className="text-white">{(selectedCampaign.progress * 100).toFixed(0)}%</span>
                    </div>
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

export default Campaigns;
