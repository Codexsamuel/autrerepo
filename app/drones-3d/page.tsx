"use client";

import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const Drone3DModal = dynamic(() => import("@/components/Drone3DModal"), { ssr: false });
const FeatureDetailModal = dynamic(() => import("@/components/FeatureDetailModal"), { ssr: false });

const featuresSentinel = [
  {
    label: 'Vision nocturne thermique',
    description: 'Permet de voir dans l’obscurité totale grâce à une caméra thermique embarquée. Idéal pour les missions de nuit ou en conditions difficiles.',
    icon: '🌙',
  },
  {
    label: 'Détection de mines',
    description: 'Détecte les mines et explosifs grâce à des capteurs spécialisés et à l’IA embarquée.',
    icon: '💣',
  },
  {
    label: 'Mode kamikaze avec charge explosive',
    description: 'Option tactique permettant au drone de neutraliser une cible en mode kamikaze (fonction désactivée par défaut, usage militaire strict).',
    icon: '⚡',
  },
  {
    label: 'Pilotage FPV casque + télécommande',
    description: 'Contrôle immersif via casque FPV et radiocommande longue portée, pour une précision maximale.',
    icon: '🎮',
  },
  {
    label: 'Portée 20 km, autonomie 40 minutes',
    description: 'Permet des missions longues distances avec une autonomie optimisée et une portée de communication jusqu’à 20 km.',
    icon: '🛰️',
  },
];
const featuresAtlas = [
  {
    label: 'Pulvérisation d’engrais et pesticides',
    description: 'Système de pulvérisation intelligent pour l’agriculture de précision, avec réservoir intégré.',
    icon: '🌾',
  },
  {
    label: 'Analyse sous-sol pétrolier',
    description: 'Capteurs avancés pour l’analyse géologique et la détection de ressources souterraines.',
    icon: '🛢️',
  },
  {
    label: 'Transport médical d’urgence',
    description: 'Capacité à transporter du matériel médical ou des échantillons en urgence, même dans des zones difficiles d’accès.',
    icon: '🚑',
  },
  {
    label: 'Caméra 4K stabilisée + IA embarquée',
    description: 'Caméra ultra haute définition avec stabilisation et analyse d’image en temps réel par IA.',
    icon: '📷',
  },
  {
    label: 'Charge utile jusqu’à 3 kg',
    description: 'Peut transporter des charges lourdes pour des missions industrielles ou logistiques.',
    icon: '📦',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Drones3DPage() {
  const { user, loading } = useAuth();
  const [show3D, setShow3D] = useState(false);
  const [featureDetail, setFeatureDetail] = useState<null | { label: string; description: string; icon: string }>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <span className="text-xl">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Accès réservé</h2>
          <p className="mb-6 text-lg">Cette page premium est réservée aux membres inscrits.<br/>Merci de vous connecter ou de créer un compte pour découvrir le projet drone en détail.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition">Se connecter</Link>
            <Link href="/sign-up" className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition">Créer un compte</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0f17] text-white min-h-screen font-sans">
      {/* Hero Section améliorée façon Apple */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-b from-[#181f2a] to-[#0b0f17] overflow-hidden">
        {/* Fond vidéo ou image dynamique */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/videos/drone-hero.mp4" type="video/mp4" />
        </video>
        {/* Effet de lumière animée (halo) */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/10 blur-3xl z-0 animate-pulse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 text-center pt-40 pb-24"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            DL DRONES
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            L’excellence technologique pour la défense, l’industrie et l’agriculture de demain.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Deux drones, deux révolutions : <span className="text-blue-300 font-semibold">Sentinel V1</span> (militaire) & <span className="text-pink-300 font-semibold">Atlas X1</span> (industriel). Fabrication locale, IA embarquée, modularité extrême.
          </motion.p>
          <motion.a
            href="#sentinel"
            className="inline-block mt-8 px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(80,80,255,0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Découvrir Sentinel V1
          </motion.a>
        </motion.div>
      </section>

      {/* Sentinel V1 Section */}
      <motion.section id="sentinel" className="max-w-7xl mx-auto py-32 px-4 flex flex-col md:flex-row gap-20 items-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2 className="text-5xl font-bold mb-6 text-blue-300" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>Sentinel V1</motion.h2>
          <motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
            Drone militaire tactique autonome pour la reconnaissance, la détection de mines, la vision nocturne et les missions spéciales.
          </motion.p>
          <ul className="space-y-4 mb-8">
            {featuresSentinel.map((f, i) => (
              <motion.li
                key={f.label}
                className="flex items-center gap-3 text-lg bg-[#1a2233] rounded-xl px-5 py-3 shadow-md cursor-pointer hover:bg-blue-800/40 transition"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setFeatureDetail(f)}
                title="Voir le détail"
              >
                <span className="inline-block w-6 h-6 text-2xl">{f.icon}</span>
                {f.label}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* 3D/vidéo/visuel premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center cursor-pointer group"
            onClick={() => setShow3D(true)}
            title="Voir le drone en 3D interactif"
          >
            <iframe src="https://sketchfab.com/models/YOUR_MODEL_ID_EMBED_1/embed" allowFullScreen className="w-full h-full min-h-[350px] group-hover:opacity-80 transition-opacity duration-200" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/80 text-lg font-semibold bg-black/40 px-4 py-2 rounded-full shadow-lg group-hover:scale-105 transition-transform">Cliquez pour manipuler en 3D</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modale 3D interactive */}
      {show3D && <Drone3DModal onClose={() => setShow3D(false)} />}
      {/* Modale détail feature */}
      {featureDetail && <FeatureDetailModal feature={featureDetail} onClose={() => setFeatureDetail(null)} />}

      {/* Atlas X1 Section */}
      <motion.section id="atlas" className="max-w-7xl mx-auto py-32 px-4 flex flex-col md:flex-row-reverse gap-20 items-center" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2 className="text-5xl font-bold mb-6 text-pink-300" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>Atlas X1</motion.h2>
          <motion.p className="text-xl text-gray-200 mb-8" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
            Drone industriel polyvalent pour la pulvérisation, l’analyse environnementale, le transport médical et l’inspection avancée.
          </motion.p>
          <ul className="space-y-4 mb-8">
            {featuresAtlas.map((f, i) => (
              <motion.li
                key={f.label}
                className="flex items-center gap-3 text-lg bg-[#1a2233] rounded-xl px-5 py-3 shadow-md cursor-pointer hover:bg-pink-800/40 transition"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setFeatureDetail(f)}
                title="Voir le détail"
              >
                <span className="inline-block w-6 h-6 text-2xl">{f.icon}</span>
                {f.label}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* 3D/vidéo/visuel premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center cursor-pointer group"
            // onClick={() => setShow3DAtlas(true)}
            title="Voir le drone en 3D interactif (bientôt)"
          >
            <iframe src="https://sketchfab.com/models/YOUR_MODEL_ID_EMBED_2/embed" allowFullScreen className="w-full h-full min-h-[350px] group-hover:opacity-80 transition-opacity duration-200" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/80 text-lg font-semibold bg-black/40 px-4 py-2 rounded-full shadow-lg group-hover:scale-105 transition-transform">Cliquez pour manipuler en 3D</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modale détail feature */}
      {featureDetail && <FeatureDetailModal feature={featureDetail} onClose={() => setFeatureDetail(null)} />}

      {/* Applications Slider Section (placeholder) */}
      <motion.section className="max-w-6xl mx-auto py-24 px-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="text-3xl font-bold mb-8 text-center text-gradient">Applications & Cas d’usage</h3>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <motion.div className="bg-[#181f2a] rounded-xl p-8 shadow-lg w-full md:w-1/3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-2 text-blue-200">Défense & Sécurité</h4>
            <p className="text-gray-200">Surveillance de frontières, détection de menaces, missions spéciales, soutien tactique.</p>
          </motion.div>
          <motion.div className="bg-[#181f2a] rounded-xl p-8 shadow-lg w-full md:w-1/3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-2 text-pink-200">Agriculture & Environnement</h4>
            <p className="text-gray-200">Pulvérisation intelligente, analyse de sol, cartographie, détection de maladies.</p>
          </motion.div>
          <motion.div className="bg-[#181f2a] rounded-xl p-8 shadow-lg w-full md:w-1/3" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="text-xl font-semibold mb-2 text-green-200">Logistique & Urgence</h4>
            <p className="text-gray-200">Transport médical, livraison urgente, inspection d’infrastructures, secours rapide.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Specs Section */}
      <motion.section id="specs" className="max-w-5xl mx-auto py-20 px-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="text-3xl font-bold mb-8 text-center text-gradient">Spécifications Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#181f2a] rounded-xl p-8 shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-blue-200">Sentinel V1</h4>
            <ul className="text-gray-200 space-y-2">
              <li>Autonomie : jusqu'à 45 min</li>
              <li>Charge utile : 900g</li>
              <li>Modules : thermique, GPS, IA embarquée</li>
              <li>Portée : jusqu'à 20 km</li>
              <li>Vision nocturne, mode kamikaze</li>
            </ul>
          </div>
          <div className="bg-[#181f2a] rounded-xl p-8 shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-pink-200">Atlas X1</h4>
            <ul className="text-gray-200 space-y-2">
              <li>Autonomie : jusqu'à 45 min</li>
              <li>Charge utile : 3kg</li>
              <li>Modules : pulvérisation, GPS, IA embarquée</li>
              <li>Portée : jusqu'à 20 km</li>
              <li>Capteurs agricoles, caméra 4K</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Bloc éditeur / fabricant */}
      <motion.section className="max-w-3xl mx-auto py-12 px-4 mt-8 bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-pink-900/60 rounded-2xl shadow-xl border border-blue-800/30" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="text-2xl font-bold mb-2 text-center text-blue-200">Éditeur / Fabricant</h3>
        <div className="text-center text-lg text-gray-200 mb-2">DL Solutions SARL – Division Drone & Défense</div>
        <div className="text-center text-gray-400 mb-2">📍 Yaoundé – Cameroun</div>
        <div className="text-center text-gray-400 mb-2">📧 <a href="mailto:contact@dl-solutions.tech" className="underline">contact@dl-solutions.tech</a></div>
        <div className="text-center text-gray-400 mb-2">📞 +237 6 89 67 29 32</div>
        <div className="text-center text-gray-400">🌐 (site à venir)</div>
      </motion.section>

      <footer className="bg-[#111] text-center py-6 text-gray-400 mt-12">
        &copy; 2025 DL Solutions SARL | Tous droits réservés
      </footer>
    </div>
  );
} 