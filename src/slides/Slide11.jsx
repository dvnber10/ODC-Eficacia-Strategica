import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingDown, AlertTriangle, DollarSign, Clock, Home, CheckCircle2 } from 'lucide-react';
import Papa from 'papaparse';
import SlideNav from '../components/SlideNav';

export default function Slide11({ onNext, onPrev, onHome }) {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(16.1);
  const [metrics, setMetrics] = useState({
    salaryBoost: 0,
    overtimeReduction: 0,
    remoteWorkDays: 0
  });

  useEffect(() => {
    fetch('/src/assets/dataset/WA_Fn-UseC_-HR-Employee-Attrition.csv')
      .then(res => res.text())
      .then(csv => {
        const results = Papa.parse(csv, { header: true, dynamicTyping: true });
        const cleanData = results.data.filter(d => d.Age);
        setData(cleanData);
      })
      .catch(err => console.error("Error cargando dataset:", err));
  }, []);

  const calculateRisk = (sBoost, otRed, remote) => {
    const baseRisk = 16.1;
    let impact = (sBoost * 0.3) + (otRed * 0.1) + (remote * 0.25);
    let newRisk = baseRisk - impact;
    const finalValue = Math.max(2, Math.min(40, newRisk)).toFixed(1);
    setPrediction(parseFloat(finalValue));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value);
    const newMetrics = { ...metrics, [name]: val };
    setMetrics(newMetrics);
    calculateRisk(newMetrics.salaryBoost, newMetrics.overtimeReduction, newMetrics.remoteWorkDays);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[88vh] overflow-hidden">
      
      {/* Contenedor Principal con Scroll si es necesario, pero limitado para no chocar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0  overflow-y-auto pr-2 custom-scrollbar">
        
        {/* PANEL DE DECISIONES: Más compacto */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-700 rounded-[32px] p-6 flex flex-col justify-center self-start">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Zap className="text-accent" size={20} /> Estrategia Proactiva
          </h2>
          <p className="text-slate-500 text-[11px] mb-6 tracking-tight">Modifica condiciones para predecir el impacto en retención.</p>
          
          <div className="space-y-6">
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <DollarSign size={14} className="text-green-400"/> Bono Salarial
                </label>
                <span className="text-accent font-mono text-xs font-bold">+{metrics.salaryBoost}%</span>
              </div>
              <input type="range" name="salaryBoost" min="0" max="30" value={metrics.salaryBoost} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <Clock size={14} className="text-orange-400"/> Reducir Horas Extra
                </label>
                <span className="text-accent font-mono text-xs font-bold">{metrics.overtimeReduction}%</span>
              </div>
              <input type="range" name="overtimeReduction" min="0" max="100" value={metrics.overtimeReduction} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <Home size={14} className="text-blue-400"/> Home Office
                </label>
                <span className="text-accent font-mono text-xs font-bold">{metrics.remoteWorkDays}d/mes</span>
              </div>
              <input type="range" name="remoteWorkDays" min="0" max="20" value={metrics.remoteWorkDays} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>
          </div>
        </div>

        {/* PANEL DE RESULTADO: Círculo más pequeño */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-[32px] p-6 flex flex-col items-center justify-center relative shadow-2xl min-h-[300px]">
            
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="82" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                <motion.circle 
                  cx="96" cy="96" r="82" 
                  stroke={prediction > 15 ? "#ef4444" : "#00f2ff"} 
                  strokeWidth="12" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 82}
                  animate={{ strokeDashoffset: 2 * Math.PI * 82 * (1 - prediction / 100) }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span key={prediction} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl sm:text-5xl font-black text-white">{prediction}%</motion.span>
                <span className="text-[10px] sm:text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Riesgo</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-sm">
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[9px] sm:text-[8px] text-slate-500 uppercase font-black mb-1">Ahorro Est.</p>
                <p className="text-lg font-bold text-green-400">${Math.round(Math.max(0, 16.1 - prediction) * 12500).toLocaleString()}</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[9px] sm:text-[8px] text-slate-500 uppercase font-black mb-1">Precisión IA</p>
                <p className="text-lg font-bold text-blue-400">87.4%</p>
              </div>
            </div>
          </div>

          {/* ALERTA DINÁMICA: Texto más pequeño */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${prediction > 15 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
            <div className="shrink-0">
               {prediction > 15 ? <AlertTriangle size={18} className="animate-pulse" /> : <CheckCircle2 size={18} />}
            </div>
            <p className="text-[11px] font-bold leading-tight italic">
              {prediction > 20 
                ? "PELIGRO: El agotamiento por horas extra es crítico." 
                : "ESTRATEGIA: Has optimizado los factores de retención."}
            </p>
          </div>
        </div>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}