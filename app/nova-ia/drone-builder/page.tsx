import DroneBuilder from '@/components/ui/DroneBuilder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DroneBuilder IA | Sentinel Zero - DL Solutions',
  description: 'Générateur IA de drones militaires avec firmware, G-code et missions tactiques',
  keywords: 'drone, militaire, IA, firmware, G-code, mission, Sentinel Zero',
};

export default function DroneBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚁 DroneBuilder IA
          </h1>
          <p className="text-xl text-gray-300">
            Générateur intelligent de drones militaires avec IA embarquée
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm">
              MILITAIRE
            </span>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
              IA EMBARQUÉE
            </span>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
              SENTINEL ZERO
            </span>
          </div>
        </div>
        
        <DroneBuilder />
      </div>
    </div>
  );
} 