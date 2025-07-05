import { optimizeVideoUrl } from '@/lib/cloudinary-utils';
import { useState } from 'react';

const medias = [
  { type: 'video', src: optimizeVideoUrl('https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4', { quality: 'auto', format: 'mp4' }), title: 'Institut Français' },
  { type: 'image', src: 'https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg', title: 'DL Event' },
  { type: 'video', src: optimizeVideoUrl('https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4', { quality: 'auto', format: 'mp4' }), title: 'Reportage Agence' },
  { type: 'image', src: 'https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg', title: 'DL Team' }
];

export default function MediaSection() {
  const [current, setCurrent] = useState(0);
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Nos Réalisations Médias
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez nos productions vidéo et photos professionnelles
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
          <div className="flex items-center justify-center h-96 bg-gray-900">
            {medias[current].type === 'video' ? (
              <video 
                src={medias[current].src} 
                controls 
                className="h-full w-full object-cover" 
                poster="/images/video-poster.jpg"
              />
            ) : (
              <img 
                src={medias[current].src} 
                alt={medias[current].title} 
                className="h-full w-full object-cover" 
              />
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <h3 className="text-white font-semibold text-lg">{medias[current].title}</h3>
          </div>
          <div className="flex justify-center mt-6 mb-6 space-x-3">
            {medias.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  current === idx 
                    ? 'bg-blue-600 shadow-lg scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Voir ${m.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 