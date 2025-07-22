import dynamic from 'next/dynamic';

const Drone3DView = dynamic(() => import('@/components/Drone3DView'), { ssr: false });

export default function DroneBusinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Section 3D immersive */}
      <section className="w-full h-[500px] flex items-center justify-center border-b border-gray-200 bg-white/60">
        <div className="w-full h-full max-w-4xl mx-auto">
          <Drone3DView />
        </div>
      </section>

      {/* Sections business/technique/visuel */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Business Proposal – Drones DL Solutions</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Découvrez nos drones intelligents, fabriqués localement, pour la sécurité, l'industrie et l'agriculture de précision.
        </p>
        {/* Placeholders pour chaque section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Objectif du projet</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Détails techniques</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Plan de fabrication</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Budget prévisionnel</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Business Plan</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Maquettes & visuels</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Avantages stratégiques</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
            <h2 className="text-2xl font-semibold mb-2">Marchés cibles</h2>
            <div className="bg-white rounded-lg shadow p-4 mb-6 min-h-[120px]">[À compléter]</div>
          </div>
        </div>
      </section>
    </div>
  );
} 