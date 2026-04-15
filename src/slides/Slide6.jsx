import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Database, ShieldCheck, TrendingUp, Layers, MousePointer2, X } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide6({ onNext, onPrev, onHome }) {
  const [selectedV, setSelectedV] = useState(null);

  const vs = [
    { 
      id: "volumen",
      title: "Volumen", 
      icon: <Layers size={40} />, 
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      fullDesc: "Se refiere a la cantidad masiva de datos que se generan cada segundo. Ya no hablamos de Gigabytes, sino de Terabytes, Petabytes y Exabytes. El reto es cómo almacenar y procesar esta montaña de información que crece exponencialmente."
    },
    { 
      id: "velocidad",
      title: "Velocidad", 
      icon: <Zap size={40} />, 
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      fullDesc: "Es la rapidez con la que los datos se crean, se mueven y se analizan. En el mundo actual, los datos pierden valor rápidamente; por eso, el Big Data busca procesar flujos en tiempo real para tomar decisiones al instante."
    },
    { 
      id: "variedad",
      title: "Variedad", 
      icon: <Database size={40} />, 
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      fullDesc: "Los datos vienen en todos los sabores: estructurados (tablas), semi-estructurados (JSON) y no estructurados (videos, audios, fotos). El 80% de los datos del mundo son no estructurados, y el Big Data permite unificarlos."
    },
    { 
      id: "veracidad",
      title: "Veracidad", 
      icon: <ShieldCheck size={40} />, 
      color: "text-green-400",
      bg: "bg-green-400/10",
      fullDesc: "No todos los datos son ciertos o útiles. La veracidad trata sobre la calidad, la limpieza y la confianza que tenemos en la fuente. Un análisis basado en datos falsos o ruidosos llevará a decisiones desastrosas."
    },
    { 
      id: "valor",
      title: "Valor", 
      icon: <TrendingUp size={40} />, 
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      fullDesc: "¡La V más importante! De nada sirve tener billones de datos si no se traducen en un beneficio para la empresa. El valor es convertir ese 'ruido' en conocimiento que ahorre dinero o genere nuevas oportunidades."
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Módulo 2: <span className="text-secondary">Ecosistema Big Data</span></h2>
        <p className="text-slate-400 flex items-center justify-center gap-2 italic">
          <MousePointer2 size={16} /> Haz clic en cada "V" para profundizar
        </p>
      </div>

      {/* Grid de las 5 V's */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {vs.map((v) => (
          <motion.button
            key={v.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedV(v)}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center ${
              selectedV?.id === v.id ? 'border-secondary bg-slate-800' : 'border-slate-700 bg-slate-800/40'
            }`}
          >
            <div className={`mb-3 ${v.color}`}>{v.icon}</div>
            <h3 className="font-bold text-lg">{v.title}</h3>
          </motion.button>
        ))}
      </div>

      {/* Panel Detallado (Aparece al seleccionar una V) */}
      <div className="min-h-[200px] relative">
        <AnimatePresence mode="wait">
          {selectedV ? (
            <motion.div
              key={selectedV.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden ${selectedV.bg}`}
            >
              <div className="flex items-start gap-6">
                <div className={`${selectedV.color} p-4 bg-slate-900/50 rounded-2xl`}>
                  {selectedV.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`text-2xl font-bold ${selectedV.color}`}>{selectedV.title}</h3>
                    <button onClick={() => setSelectedV(null)} className="text-slate-500 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-lg">
                    {selectedV.fullDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl p-10 text-slate-500 italic"
            >
              Selecciona una dimensión para entender su impacto en el Big Data.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}