import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Cpu, Globe, Cloud, X, Smartphone, MessageSquare, Database } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide7({ onNext, onPrev, onHome }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const sources = [
    { 
      id: "social",
      name: "Redes Sociales", 
      icon: <Share2 />, 
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      desc: "Interacciones humanas digitales que generan sentimientos y tendencias.",
      logos: ["WhatsApp", "Instagram", "TikTok", "X (Twitter)"],
      details: "Cada like, comentario o mensaje de voz es un dato no estructurado que revela el comportamiento del consumidor."
    },
    { 
      id: "iot",
      name: "IoT y Sensores", 
      icon: <Cpu />, 
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      desc: "Máquinas hablando con máquinas sin intervención humana.",
      logos: ["Smartwatches", "GPS Camiones", "Sensores Industriales", "Cámaras"],
      details: "Telemetría en tiempo real: desde la presión de una llanta hasta el ritmo cardíaco de un deportista."
    },
    { 
      id: "web",
      name: "Huella Web", 
      icon: <Globe />, 
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      desc: "El rastro que dejas al navegar por cualquier sitio de internet.",
      logos: ["Google Search", "Cookies", "Historial de Clics", "Carritos de Compra"],
      details: "Analizamos qué productos miraste, cuánto tiempo estuviste en la página y qué te hizo decidir la compra."
    },
    { 
      id: "internal",
      name: "Sistemas Internos", 
      icon: <Cloud />, 
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      desc: "La información histórica y operativa propia de cada empresa.",
      logos: ["Bancos", "Facturación", "CRM (Salesforce)", "Inventarios"],
      details: "Datos maestros que permiten entender la rentabilidad y el stock histórico de la organización."
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">2.2 <span className="text-secondary">Orígenes de la Información</span></h2>
        <p className="text-slate-400">¿De dónde extraemos los datos para la eficacia estratégica?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {sources.map((source) => (
          <motion.div 
            key={source.id}
            layoutId={source.id}
            onClick={() => setActiveCategory(source)}
            whileHover={{ scale: 1.02 }}
            className={`cursor-pointer p-6 rounded-3xl border border-slate-700 bg-slate-800/50 flex items-center gap-6 transition-all hover:border-secondary group`}
          >
            <div className={`p-4 rounded-2xl bg-slate-900 group-hover:scale-110 transition-transform ${source.color}`}>
              {source.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{source.name}</h3>
              <p className="text-sm text-slate-400 leading-tight">{source.desc}</p>
            </div>
            <div className="text-slate-600 group-hover:text-secondary">
               <Smartphone size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      {/* MODAL DETALLADO CON "LOGOS" */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            <motion.div 
              layoutId={activeCategory.id}
              className="bg-slate-800 border border-slate-600 w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden z-10 p-10"
            >
              <button onClick={() => setActiveCategory(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X /></button>
              
              <div className="flex items-center gap-4 mb-6">
                 <div className={`p-4 rounded-2xl bg-slate-900 ${activeCategory.color}`}>{activeCategory.icon}</div>
                 <h3 className="text-3xl font-bold">{activeCategory.name}</h3>
              </div>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {activeCategory.details}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activeCategory.logos.map((logo, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={logo} 
                    className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    {/* Placeholder para los logos reales */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 border border-slate-600 font-black text-[10px] ${activeCategory.color}`}>
                       {logo.substring(0,2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">{logo}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}