'use client';

import { useEffect, useState } from 'react';

export default function AppointmentPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '', date: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si les cookies sont acceptés
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const featuresEnabled = localStorage.getItem('dl_features_enabled');
    
    // Ne pas afficher si les cookies ne sont pas acceptés
    if (cookiesAccepted !== 'true' || featuresEnabled !== 'true') {
      setIsVisible(false);
      return;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <>
      {/* Bouton d'activation du popup de rendez-vous */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-full shadow-2xl hover:scale-105 transition-all text-sm"
        >
          Assistance
        </button>
      )}

      {/* Bouton de rendez-vous */}
      {isVisible && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-all"
        >
          Prendre rendez-vous
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">✕</button>
            <h3 className="text-2xl font-bold mb-4 text-center">Prendre rendez-vous</h3>
            {submitted ? (
              <div className="text-center text-green-600 font-semibold py-8">Merci, nous vous recontacterons rapidement !</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" type="text" required placeholder="Nom complet" value={form.name} onChange={handleChange} className="w-full border rounded px-4 py-2 text-gray-900 placeholder:text-gray-500" />
                <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-4 py-2 text-gray-900 placeholder:text-gray-500" />
                <input name="phone" type="tel" required placeholder="Téléphone" value={form.phone} onChange={handleChange} className="w-full border rounded px-4 py-2 text-gray-900 placeholder:text-gray-500" />
                <input name="date" type="date" required value={form.date} onChange={handleChange} className="w-full border rounded px-4 py-2 text-gray-900" />
                <textarea name="reason" required placeholder="Motif du rendez-vous" value={form.reason} onChange={handleChange} className="w-full border rounded px-4 py-2 text-gray-900 placeholder:text-gray-500" />
                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded font-semibold">Envoyer</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
} 