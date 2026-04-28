import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, BrainCircuit, X, Binary, Search, Lightbulb, Info } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide10({ onNext, onPrev, onHome }) {
  const [activeModal, setActiveModal] = useState(null);

  const detailContent = {
    probabilidad: {
      title: "Ciencia de Probabilidad",
      icon: <Binary className="text-accent" size={32} />,
      desc: "No somos adivinos; usamos matemáticas para convertir la incertidumbre en porcentajes de riesgo.",
      points: [
        { t: "Clasificación Binaria", d: "Es la técnica para predecir si un evento ocurre (1) o no ocurre (0). En nuestro caso: ¿Se queda o se va?" },
        { t: "Regresión Logística", d: "Algoritmo base que mide la relación entre una variable dependiente y varias independientes (sueldo, edad, etc.)." },
        { t: "Score de Riesgo", d: "Cada empleado recibe un valor de 0 a 100 que representa su probabilidad de atrición en los próximos 6 meses." }
      ]
    },
    patrones: {
      title: "Patrones Ocultos",
      icon: <Search className="text-purple-400" size={32} />,
      desc: "La IA encuentra relaciones que son invisibles para un analista humano revisando una tabla de Excel.",
      points: [
        { t: "Correlación no Lineal", d: "Detecta que el impacto del sueldo cambia según la edad. Un joven valora más el crecimiento; un veterano, la estabilidad." },
        { t: "Random Forest", d: "Usamos 'Bosques Aleatorios', un algoritmo que combina cientos de árboles de decisión para evitar sesgos." },
        { t: "Importancia de Variables", d: "El modelo nos dice exactamente qué factor está 'empujando' a la gente a renunciar en este momento." }
      ]
    },
    decisiones: {
      title: "Acción Prescriptiva",
      icon: <Lightbulb className="text-yellow-400" size={32} />,
      desc: "La predicción solo tiene valor si genera una intervención que ahorre dinero y retenga talento.",
      points: [
        { t: "Intervención Temprana", d: "Detectar el riesgo 3 meses antes permite a RR.HH. ofrecer un plan de carrera antes de que el empleado busque afuera." },
        { t: "ROI de Retención", d: "Evitar una renuncia ahorra hasta 1.5 veces el salario anual del puesto en costos de reclutamiento." },
        { t: "Ética de Datos", d: "Usamos la predicción para ayudar al empleado, no para penalizarlo. El objetivo es mejorar su experiencia." }
      ]
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col items-center h-[75vh] overflow-y-auto custom-scrollbar">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 italic">Anticipando el <span className="text-accent">Futuro</span></h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Haz clic en cada pilar para descubrir la tecnología y las estrategias que hacen posible la analítica predictiva.
        </p>
      </div>

      {/* TARJETAS DISPARADORAS */}
      <div className="grid md:grid-cols-3 gap-8 w-full mb-12">
        {Object.keys(detailContent).map((key) => (
          <motion.div 
            key={key}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => setActiveModal(key)}
            className="bg-slate-800/40 p-8 rounded-[40px] border border-slate-700 cursor-pointer group hover:border-accent/50 transition-all flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-slate-600 group-hover:text-accent transition-colors">
              <Info size={18} />
            </div>
            <div className="mb-6 p-4 bg-slate-900 rounded-3xl group-hover:bg-accent/10 transition-colors">
              {key === 'probabilidad' && <Target className="text-accent" size={40} />}
              {key === 'patrones' && <BrainCircuit className="text-purple-400" size={40} />}
              {key === 'decisiones' && <Zap className="text-yellow-400" size={40} />}
            </div>
            <h3 className="text-xl font-bold capitalize">{key}</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">Click para expandir detalles técnicos</p>
          </motion.div>
        ))}
      </div>

      {/* MODAL FLOTANTE */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl relative z-10"
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-8 border-b border-slate-800 pb-8">
                <div className="p-5 bg-slate-800 rounded-3xl">{detailContent[activeModal].icon}</div>
                <div>
                  <h3 className="text-3xl font-bold">{detailContent[activeModal].title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{detailContent[activeModal].desc}</p>
                </div>
              </div>

              <div className="space-y-6">
                {detailContent[activeModal].points.map((p, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0 group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="text-accent font-bold text-sm tracking-wide uppercase">{p.t}</h4>
                      <p className="text-slate-300 text-sm mt-1 leading-relaxed">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}