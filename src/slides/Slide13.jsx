import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Search, UserX, UserCheck, ShieldAlert, Fingerprint, RefreshCcw } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide13({ onNext, onPrev, onHome }) {
  const [auditStep, setAuditStep] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);

  const auditStages = [
    {
      title: "El Problema: Datos Heredados",
      desc: "Si en los últimos 10 años la empresa solo ascendió a hombres, la IA creerá que ser hombre es un requisito para el éxito.",
      icon: <UserX className="text-red-400" size={32} />,
      status: "SESGO DETECTADO",
      color: "border-red-500/50 bg-red-500/5"
    },
    {
      title: "La Auditoría: Limpieza de Variables",
      desc: "Debemos eliminar variables sensibles (género, edad, etnia) que no aportan valor real al desempeño pero sí generan discriminación.",
      icon: <Search className="text-yellow-400" size={32} />,
      status: "PROCESANDO...",
      color: "border-yellow-500/50 bg-yellow-500/5"
    },
    {
      title: "El Resultado: IA Equitativa",
      desc: "Ahora el algoritmo evalúa competencias, resultados y potencial, ignorando etiquetas sociodemográficas.",
      icon: <UserCheck className="text-emerald-400" size={32} />,
      status: "MODELO JUSTO",
      color: "border-emerald-500/50 bg-emerald-500/5"
    }
  ];

  const nextStep = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditStep((prev) => (prev + 1) % auditStages.length);
      setIsAuditing(false);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full flex flex-col items-center h-[85vh]">
      
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Auditoría de <span className="text-orange-400">Sesgos</span></h2>
        <p className="text-slate-400 text-sm italic">"Los algoritmos no son neutrales, son opiniones encerradas en matemáticas."</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 w-full flex-1 min-h-0 items-center">
        
        {/* LADO IZQUIERDO: EXPLICACIÓN CONCEPTUAL */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-[32px]">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">¿Qué es el sesgo?</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Ocurre cuando el modelo de IA replica prejuicios humanos presentes en los datos históricos. 
                  Si no auditamos nuestra IA, terminaremos automatizando la desigualdad.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="p-3 bg-black/20 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-[11px] text-slate-300">Sesgo de Género: Favorecer un sexo por historial de contratación.</span>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-[11px] text-slate-300">Sesgo de Edad: Predecir menor rendimiento en mayores de 50 años.</span>
              </div>
            </div>
          </div>

          <button 
            onClick={nextStep}
            disabled={isAuditing}
            className="w-full bg-orange-500 hover:bg-orange-400 text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-orange-500/20 disabled:opacity-50"
          >
            {isAuditing ? <RefreshCcw className="animate-spin" size={20} /> : <Fingerprint size={20} />}
            {auditStep === 2 ? "REINICIAR AUDITORÍA" : "EJECUTAR PASO DE AUDITORÍA"}
          </button>
        </div>

        {/* LADO DERECHO: VISUALIZADOR DE ETAPAS */}
        <div className="relative flex justify-center items-center h-full">
           <AnimatePresence mode="wait">
              <motion.div
                key={auditStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className={`w-full p-8 rounded-[40px] border-2 shadow-2xl transition-colors duration-500 ${auditStages[auditStep].color}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-6 bg-slate-900 rounded-[30px] shadow-inner">
                    {auditStages[auditStep].icon}
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] opacity-60 mb-2 uppercase">Etapa {auditStep + 1}</span>
                  <h3 className="text-2xl font-black mb-4">{auditStages[auditStep].title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    "{auditStages[auditStep].desc}"
                  </p>
                  <div className="px-4 py-1.5 rounded-full border border-current text-[10px] font-bold">
                    {auditStages[auditStep].status}
                  </div>
                </div>
              </motion.div>
           </AnimatePresence>
        </div>

      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}