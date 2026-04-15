import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, EyeOff, Scale, Info, CheckCircle, AlertCircle } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide12({ onNext, onPrev, onHome }) {
  const [selectedDilemma, setSelectedDilemma] = useState(null);

  const dilemmas = [
    {
      id: 1,
      title: "Transparencia",
      icon: <EyeOff className="text-blue-400" />,
      question: "¿Debe un empleado saber que un algoritmo predice su renuncia?",
      verdict: "Sí. La 'Caja Negra' es peligrosa. La ética moderna exige que los modelos sean explicables y que el empleado entienda cómo se usan sus datos.",
      status: "Protección de Privacidad"
    },
    {
      id: 2,
      title: "El Factor de Decisión",
      icon: <Scale className="text-purple-400" />,
      question: "¿Puede una IA despedir a alguien automáticamente?",
      verdict: "Nunca. El algoritmo propone, pero el humano dispone. La IA es un soporte a la decisión, no un sustituto del criterio humano.",
      status: "Juicio Humano"
    },
    {
      id: 3,
      title: "Uso del Dato",
      icon: <ShieldCheck className="text-emerald-400" />,
      question: "¿Es ético usar datos de redes sociales personales?",
      verdict: "Generalmente no. Debemos limitarnos a datos profesionales y consentidos. La frontera entre vida privada y laboral debe respetarse.",
      status: "Límite Ético"
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

      {/* MODAL DE RESPUESTA ÉTICA */}
      <AnimatePresence>
        {selectedDilemma && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-8 flex gap-6 items-start"
          >
            <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-400">
              <CheckCircle size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black bg-emerald-500 text-slate-900 px-2 py-0.5 rounded">ESTÁNDAR DE ORO</span>
                <h4 className="text-xl font-bold text-emerald-400">{selectedDilemma.status}</h4>
              </div>
              <p className="text-slate-200 leading-relaxed italic">"{selectedDilemma.verdict}"</p>
              <button 
                onClick={() => setSelectedDilemma(null)}
                className="mt-4 text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors"
              >
                Cerrar dilema
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}