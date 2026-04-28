import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, MessageSquare, TrendingUp, PiggyBank, Users, Megaphone, ChevronRight, Sparkles } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide14({ onNext, onPrev, onHome }) {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      label: "El Dato Frío",
      data: "La atrición en Ventas es del 18.5% anual.",
      story: "Estamos perdiendo a nuestros mejores vendedores antes del primer año. Es una fuga de conocimiento que nos impedirá alcanzar las metas del próximo trimestre.",
      impact: "Fuga de Capital",
      icon: <Users className="text-blue-400" size={18} />
    },
    {
      label: "Impacto Financiero",
      data: "Cada renuncia cuesta $15,000 USD en promedio.",
      story: "Si no invertimos hoy en el plan de flexibilidad que la IA sugiere, gastaremos $200,000 el próximo año solo en reclutamiento. Es inversión, no gasto.",
      impact: "Ahorro: $150k",
      icon: <PiggyBank className="text-emerald-400" size={18} />
    },
    {
      label: "Acción Predictiva",
      data: "Riesgo de fuga del 70% en talentos IT.",
      story: "La IA nos avisó con 4 meses de antelación. Tenemos una ventana de oportunidad para ajustar sus planes de carrera hoy, antes de que se vayan mañana.",
      impact: "Retención Proactiva",
      icon: <TrendingUp className="text-purple-400" size={18} />
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[82vh] overflow-hidden">
      
      {/* Header más pequeño */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold italic">De Dashboards a <span className="text-purple-400">Historias</span></h2>
        <p className="text-slate-400 text-xs mt-1">Traduciendo analítica al lenguaje de negocio.</p>
      </div>

      {/* Contenedor Principal con scroll interno si es necesario */}
      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0  overflow-y-auto pr-2 custom-scrollbar">
        
        {/* SELECTOR DE ESCENARIOS - Columna izquierda */}
        <div className="lg:col-span-4 flex flex-col gap-2 self-start">
          {stories.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStory(i)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeStory === i 
                ? 'bg-purple-500/10 border-purple-500/40' 
                : 'bg-slate-900/40 border-slate-700 opacity-60'
              }`}
            >
              <div className={`p-2 rounded-xl ${activeStory === i ? 'bg-purple-500 text-slate-900 ' : 'bg-slate-800 text-slate-400 '}`}>
                {s.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-[9px] font-black uppercase opacity-50 tracking-tighter">{s.label}</p>
                <h4 className="text-xs font-bold truncate">{s.impact}</h4>
              </div>
            </button>
          ))}

          <div className="mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 italic">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              <Sparkles size={12} className="inline mr-1 text-yellow-400"/>
              "El dato es el mapa, pero tú debes proponer el camino."
            </p>
          </div>
        </div>

        {/* VISUALIZADOR DE STORYTELLING - Columna derecha */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-700 rounded-[32px] p-6 relative flex flex-col justify-center min-h-[300px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="relative pl-6 overflow-y-auto max-h-[150px]">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-700 rounded-full" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Lo que dice tu reporte:</span>
                <p className="text-lg font-mono text-slate-400 mt-1">"{stories[activeStory].data}"</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full" />
                <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                  <Megaphone size={10}/> Cómo lo vendes en la junta:
                </span>
                <p className="text-base font-medium text-white mt-2 leading-relaxed">
                  {stories[activeStory].story}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20">
                   Impacto: {stories[activeStory].impact}
                </div>
                <div className="text-slate-500 text-[9px] font-medium italic">Enfoque: Negocio y ROI</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <MessageSquare className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32" />
        </div>

      </div>

      {/* Botones de navegación garantizados al final */}
      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}