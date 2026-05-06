import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, EyeOff, Scale, Info, CheckCircle, X } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide12({ onNext, onPrev, onHome }) {
  const [selectedDilemma, setSelectedDilemma] = useState(null);

  const dilemmas = [
    {
      id: 1,
      title: "Transparencia",
      icon: <EyeOff className="text-blue-400" size={28} />,
      question: "¿Debe un empleado saber que un algoritmo predice su renuncia?",
      verdict: "Sí. La 'Caja Negra' es peligrosa. La ética moderna exige que los modelos sean explicables y que el empleado entienda cómo se usan sus datos.",
      status: "Protección de Privacidad",
      accent: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      badge: "bg-blue-500",
    },
    {
      id: 2,
      title: "El Factor de Decisión",
      icon: <Scale className="text-purple-400" size={28} />,
      question: "¿Puede una IA despedir a alguien automáticamente?",
      verdict: "Nunca. El algoritmo propone, pero el humano dispone. La IA es un soporte a la decisión, no un sustituto del criterio humano.",
      status: "Juicio Humano",
      accent: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-500/5",
      badge: "bg-purple-500",
    },
    {
      id: 3,
      title: "Uso del Dato",
      icon: <ShieldCheck className="text-emerald-400" size={28} />,
      question: "¿Es ético usar datos de redes sociales personales?",
      verdict: "Generalmente no. Debemos limitarnos a datos profesionales y consentidos. La frontera entre vida privada y laboral debe respetarse.",
      status: "Límite Ético",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      badge: "bg-emerald-500",
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col items-center">

      <div className="text-center mb-10">
        <span className="px-4 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
          Módulo 5: Ética y Personas
        </span>
        <h2 className="text-4xl font-bold mt-4">La Ética detrás del <span className="text-emerald-400">Dato</span></h2>
        <p className="text-slate-400 text-sm mt-2">La analítica de personas no es vigilancia, es cuidado.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full mb-8">
        {dilemmas.map((d) => (
          <motion.div
            key={d.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedDilemma(d)}
            className="bg-slate-800/30 border border-slate-700 p-6 rounded-[32px] cursor-pointer hover:bg-slate-800/50 transition-all group relative overflow-hidden"
          >
            <div className="mb-4 p-3 bg-slate-900 w-fit rounded-2xl group-hover:scale-110 transition-transform">
              {d.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{d.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{d.question}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500/70 uppercase tracking-wider">
              <Info size={12} /> Ver postura ética
            </div>
          </motion.div>
        ))}
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      {/* MODAL FLOTANTE */}
      <AnimatePresence>
        {selectedDilemma && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDilemma(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`relative z-10 bg-slate-900 border w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden ${selectedDilemma.border}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 rounded-xl">{selectedDilemma.icon}</div>
                  <h3 className={`text-lg font-bold ${selectedDilemma.accent}`}>{selectedDilemma.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedDilemma(null)}
                  className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-7">
                {/* Question */}
                <p className="text-slate-300 text-sm italic mb-6 leading-relaxed border-l-4 border-slate-600 pl-4">
                  "{selectedDilemma.question}"
                </p>

                {/* Verdict */}
                <div className={`p-5 rounded-2xl border ${selectedDilemma.border} ${selectedDilemma.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle size={18} className={selectedDilemma.accent} />
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black text-slate-900 px-2 py-0.5 rounded ${selectedDilemma.badge}`}>
                        ESTÁNDAR DE ORO
                      </span>
                      <span className={`text-sm font-bold ${selectedDilemma.accent}`}>{selectedDilemma.status}</span>
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedDilemma.verdict}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-7 pb-5 text-center">
                <button
                  onClick={() => setSelectedDilemma(null)}
                  className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Cerrar dilema
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}