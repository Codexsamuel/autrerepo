'use client';

import dynamic from 'next/dynamic';

const Drone3DViewer = dynamic(() => import('@/components/drone/Drone3DViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96">Chargement du modèle 3D...</div>
});

export default function DroneBusinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Drone Business</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <Drone3DViewer droneType="sentinel" viewMode="external" droneState={{ altitude: 120, speed: 15.5, battery: 85, heading: 45, status: "active", mode: "manual" }} isPlaying={false} />
        </div>
      </div>
    </div>
  );
} 