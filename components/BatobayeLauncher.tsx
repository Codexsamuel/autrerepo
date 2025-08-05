'use client';

import { useState } from 'react';
import { Play, ExternalLink, Github, Download, Settings, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface BatobayeLauncherProps {
  onLaunch?: () => void;
  className?: string;
}

export default function BatobayeLauncher({ onLaunch, className = '' }: BatobayeLauncherProps) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState<'idle' | 'cloning' | 'installing' | 'starting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const launchBatobaye = async () => {
    setIsLaunching(true);
    setLaunchStatus('cloning');
    setErrorMessage('');

    try {
      // Simuler le processus de lancement
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLaunchStatus('installing');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLaunchStatus('starting');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLaunchStatus('success');
      
      // Ouvrir le projet dans un nouvel onglet
      window.open('http://localhost:3000', '_blank');
      
      if (onLaunch) {
        onLaunch();
      }
    } catch (error) {
      setLaunchStatus('error');
      setErrorMessage('Erreur lors du lancement du projet');
    } finally {
      setIsLaunching(false);
    }
  };

  const getStatusMessage = () => {
    switch (launchStatus) {
      case 'cloning':
        return 'Clonage du repository...';
      case 'installing':
        return 'Installation des dépendances...';
      case 'starting':
        return 'Démarrage du serveur...';
      case 'success':
        return 'Projet lancé avec succès !';
      case 'error':
        return 'Erreur lors du lancement';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (launchStatus) {
      case 'cloning':
      case 'installing':
      case 'starting':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl mr-4">
          <Play className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Lanceur Batobaye</h3>
          <p className="text-gray-600">Démarrage automatique du projet</p>
        </div>
      </div>

      {launchStatus !== 'idle' && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-3 text-gray-700">{getStatusMessage()}</span>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={launchBatobaye}
          disabled={isLaunching}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
            isLaunching
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          }`}
        >
          {isLaunching ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Lancement en cours...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-3" />
              Lancer Batobaye
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://github.com/Codexsamuel/batobaye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            Code
          </a>
          <a
            href="https://batobaye.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live
          </a>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Le projet sera accessible sur http://localhost:3000
        </div>
      </div>
    </div>
  );
} 