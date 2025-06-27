import { useState } from 'react';

const faqs = [
  {
    question: "Quels services propose DL Solutions ?",
    answer: "DL Solutions propose des services digitaux sur-mesure : développement web, e-commerce, CRM, IA, intranet, trading, médias, et plus encore."
  },
  {
    question: "Comment prendre rendez-vous pour une étude de projet ?",
    answer: "Cliquez sur le bouton 'Prendre rendez-vous' en bas de page ou contactez-nous via WhatsApp pour une étude personnalisée."
  },
  {
    question: "DL Solutions est-il adapté aux grandes entreprises et PME ?",
    answer: "Oui, nos solutions sont modulaires et s'adaptent aussi bien aux PME qu'aux grandes entreprises, avec accompagnement sur-mesure."
  },
  {
    question: "Comment fonctionne l'assistant IA du site ?",
    answer: "L'assistant IA répond à vos questions 24/7 et vous oriente vers le bon service ou expert selon votre besoin." 
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-8 py-6 text-lg font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-left pr-4">{faq.question}</span>
                <span className="ml-4 text-blue-600 text-2xl font-bold transition-transform duration-200">
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-8 pb-6 text-gray-700 leading-relaxed animate-fade-in border-t border-gray-100 bg-gray-50">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 