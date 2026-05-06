import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingDown, AlertTriangle, DollarSign, Clock, Home, CheckCircle2, Briefcase, X, ChevronRight, RotateCcw, TrendingUp, Users, Award } from 'lucide-react';
import Papa from 'papaparse';
import SlideNav from '../components/SlideNav';

// ─── CEO Activity Data ─────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "salary",
    label: "Paquete Salarial",
    icon: <DollarSign size={28} />,
    color: "text-green-400",
    border: "border-green-500",
    bg: "bg-green-500/10",
    tagline: "Subir salarios un 20% en toda la organización.",
    cost: "$840,000",
    riskDrop: 9.2,
    retention: "+34%",
    verdict: "EFECTIVO, COSTOSO",
    verdictColor: "text-yellow-400",
    explanation: "El aumento salarial reduce la fuga, pero tiene el mayor costo operativo. Estudios del dataset muestran que el salario solo explica el 28% de la atrición — hay factores como el agotamiento que el dinero no resuelve.",
    pros: ["Impacto inmediato en satisfacción", "Señal fuerte de compromiso"],
    cons: ["Costo fijo permanente", "No resuelve el burnout por overtime"]
  },
  {
    id: "overtime",
    label: "Bienestar Laboral",
    icon: <Clock size={28} />,
    color: "text-orange-400",
    border: "border-orange-500",
    bg: "bg-orange-500/10",
    tagline: "Eliminar horas extra obligatorias + 2 días de descanso adicionales.",
    cost: "$120,000",
    riskDrop: 11.8,
    retention: "+51%",
    verdict: "ÓPTIMO ESTRATÉGICO",
    verdictColor: "text-green-400",
    explanation: "¡La mejor relación costo-impacto! El overtime es el factor #1 de atrición en este dataset (correlación 0.78). Reducirlo tiene un efecto cascada: mejora salud mental, productividad y compromiso. Es la intervención más eficiente.",
    pros: ["Mayor impacto en retención", "Bajo costo vs. beneficio", "Mejora cultura organizacional"],
    cons: ["Requiere rediseño de procesos", "Puede reducir producción a corto plazo"]
  },
  {
    id: "remote",
    label: "Trabajo Híbrido",
    icon: <Home size={28} />,
    color: "text-blue-400",
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    tagline: "Implementar modelo híbrido: 3 días remotos por semana.",
    cost: "$45,000",
    riskDrop: 6.4,
    retention: "+22%",
    verdict: "COMPLEMENTARIO",
    verdictColor: "text-blue-400",
    explanation: "El trabajo remoto reduce el riesgo de empleados con alta distancia desde casa (el 40% del dataset vive a más de 20km). Es la opción más barata, pero su impacto es moderado y varía mucho según el rol. Ideal como complemento de otra estrategia.",
    pros: ["Costo mínimo de implementación", "Muy valorado por millennials"],
    cons: ["Impacto limitado en todos los perfiles", "Requiere infraestructura digital"]
  }
];

// ─── CEO Modal ─────────────────────────────────────────────────────────
function CEOModal({ currentRisk, onClose }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed]  = useState(false);

  const pkg = PACKAGES.find(p => p.id === selected);

  const handleReset = () => { setSelected(null); setRevealed(false); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/88 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/60 shrink-0">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-accent" />
            <span className="font-bold text-sm uppercase tracking-widest text-accent">Actividad: Toma de Decisión CEO</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Context */}
                <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-200 leading-relaxed">
                  <p className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle size={13} /> Situación crítica
                  </p>
                  El modelo predictivo acaba de detectar un riesgo de atrición del <strong>{currentRisk}%</strong> en tu empresa de 200 empleados. El board te pide una intervención inmediata. <strong>¿Qué estrategia presentas?</strong>
                </div>

                <p className="text-slate-400 text-xs mb-4 text-center">Selecciona el paquete que llevarías al board de directores.</p>

                {/* Package cards */}
                <div className="space-y-3 mb-5">
                  {PACKAGES.map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelected(p.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                        selected === p.id
                          ? `${p.border} ${p.bg}`
                          : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`shrink-0 p-2.5 rounded-xl bg-slate-900 ${p.color}`}>{p.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={`font-bold text-sm ${selected === p.id ? p.color : 'text-white'}`}>{p.label}</span>
                            <span className="text-[10px] font-mono text-slate-400 ml-2 shrink-0">Costo: {p.cost}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-snug">{p.tagline}</p>
                        </div>
                        {selected === p.id && <CheckCircle2 size={18} className={`shrink-0 ${p.color}`} />}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setRevealed(true)}
                    disabled={!selected}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-primary text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all active:scale-95"
                  >
                    Presentar al Board <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Verdict screen */
              <motion.div key="verdict" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                {/* Selected package result */}
                <div className={`p-5 rounded-2xl border-2 mb-5 ${pkg.border} ${pkg.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-slate-900 ${pkg.color}`}>{pkg.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Tu elección</p>
                      <p className="font-bold text-white">{pkg.label}</p>
                    </div>
                    <span className={`ml-auto text-xs font-black uppercase tracking-widest ${pkg.verdictColor}`}>
                      {pkg.verdict}
                    </span>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-slate-900/60 rounded-xl">
                      <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Riesgo nuevo</p>
                      <p className="text-base font-black text-white">{Math.max(2, currentRisk - pkg.riskDrop).toFixed(1)}%</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/60 rounded-xl">
                      <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Retención</p>
                      <p className={`text-base font-black ${pkg.color}`}>{pkg.retention}</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/60 rounded-xl">
                      <p className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Inversión</p>
                      <p className="text-base font-black text-white">{pkg.cost}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{pkg.explanation}</p>
                </div>

                {/* Pros / cons */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-[9px] font-black text-green-400 uppercase mb-2 flex items-center gap-1"><TrendingUp size={11}/>A favor</p>
                    {pkg.pros.map((pro, i) => (
                      <p key={i} className="text-[11px] text-green-200 flex items-start gap-1.5 mb-1">
                        <CheckCircle2 size={11} className="shrink-0 mt-0.5 text-green-400" />{pro}
                      </p>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-[9px] font-black text-red-400 uppercase mb-2 flex items-center gap-1"><TrendingDown size={11}/>En contra</p>
                    {pkg.cons.map((con, i) => (
                      <p key={i} className="text-[11px] text-red-200 flex items-start gap-1.5 mb-1">
                        <X size={11} className="shrink-0 mt-0.5 text-red-400" />{con}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Optimal reveal if not chosen */}
                {selected !== "overtime" && (
                  <div className="mb-5 p-4 rounded-2xl bg-accent/10 border border-accent/30 text-xs text-slate-300 leading-relaxed">
                    <p className="font-bold text-accent mb-1 flex items-center gap-1.5">
                      <Award size={13} /> La elección óptima habría sido: Bienestar Laboral
                    </p>
                    Reducir el overtime tiene el mayor impacto a menor costo. El factor overtime explica el 78% de la atrición en el dataset según el modelo Random Forest. A veces la solución no es pagar más, sino trabajar mejor.
                  </div>
                )}
                {selected === "overtime" && (
                  <div className="mb-5 p-4 rounded-2xl bg-accent/10 border border-accent/30 text-xs text-slate-300 leading-relaxed">
                    <p className="font-bold text-accent mb-1 flex items-center gap-1.5">
                      <Award size={13} /> ¡Excelente decisión estratégica!
                    </p>
                    Identificaste el factor de mayor peso en el modelo predictivo. Un buen analista de datos no solo lee los números — sabe traducirlos en decisiones de negocio de alto impacto.
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600 text-slate-400 text-sm hover:text-white hover:border-slate-400 transition-all">
                    <RotateCcw size={14} /> Cambiar estrategia
                  </button>
                  <button onClick={onClose} className="px-5 py-2 rounded-full bg-accent text-primary text-sm font-bold hover:brightness-110 transition-all active:scale-95">
                    Finalizar módulo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Slide Principal ───────────────────────────────────────────────────
export default function Slide11({ onNext, onPrev, onHome }) {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(16.1);
  const [metrics, setMetrics] = useState({ salaryBoost: 0, overtimeReduction: 0, remoteWorkDays: 0 });
  const [showCEO, setShowCEO] = useState(false);

  useEffect(() => {
    fetch('/src/assets/dataset/WA_Fn-UseC_-HR-Employee-Attrition.csv')
      .then(res => res.text())
      .then(csv => {
        const results = Papa.parse(csv, { header: true, dynamicTyping: true });
        setData(results.data.filter(d => d.Age));
      })
      .catch(err => console.error("Error cargando dataset:", err));
  }, []);

  const calculateRisk = (sBoost, otRed, remote) => {
    const baseRisk = 16.1;
    let impact = (sBoost * 0.3) + (otRed * 0.1) + (remote * 0.25);
    setPrediction(parseFloat(Math.max(2, Math.min(40, baseRisk - impact)).toFixed(1)));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const newMetrics = { ...metrics, [name]: parseInt(value) };
    setMetrics(newMetrics);
    calculateRisk(newMetrics.salaryBoost, newMetrics.overtimeReduction, newMetrics.remoteWorkDays);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[88vh] overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">

        {/* PANEL DE DECISIONES */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-700 rounded-[32px] p-6 flex flex-col justify-center self-start">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Zap className="text-accent" size={20} /> Estrategia Proactiva
          </h2>
          <p className="text-slate-500 text-[11px] mb-6 tracking-tight">Modifica condiciones para predecir el impacto en retención.</p>

          <div className="space-y-6 mb-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <DollarSign size={14} className="text-green-400"/> Bono Salarial
                </label>
                <span className="text-accent font-mono text-xs font-bold">+{metrics.salaryBoost}%</span>
              </div>
              <input type="range" name="salaryBoost" min="0" max="30" value={metrics.salaryBoost} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <Clock size={14} className="text-orange-400"/> Reducir Horas Extra
                </label>
                <span className="text-accent font-mono text-xs font-bold">{metrics.overtimeReduction}%</span>
              </div>
              <input type="range" name="overtimeReduction" min="0" max="100" value={metrics.overtimeReduction} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[12px] font-bold flex items-center gap-2 text-slate-300">
                  <Home size={14} className="text-blue-400"/> Home Office
                </label>
                <span className="text-accent font-mono text-xs font-bold">{metrics.remoteWorkDays}d/mes</span>
              </div>
              <input type="range" name="remoteWorkDays" min="0" max="20" value={metrics.remoteWorkDays} onChange={handleSliderChange} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>
          </div>

          {/* CEO Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowCEO(true)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-accent to-accent/70 text-primary font-extrabold text-sm shadow-lg shadow-accent/20 transition-all"
          >
            <Briefcase size={18} />
            Presentar estrategia al Board →
          </motion.button>
        </div>

        {/* PANEL DE RESULTADO */}
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

      <AnimatePresence>
        {showCEO && <CEOModal currentRisk={prediction} onClose={() => setShowCEO(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}