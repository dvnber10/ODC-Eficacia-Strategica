import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Search, BarChart3, HelpCircle, X, CheckCircle, XCircle, Trophy, RotateCcw, GripVertical } from 'lucide-react';
import SlideNav from '../components/SlideNav';

// ─── Data ─────────────────────────────────────────────────────────────
const KPIS = [
  {
    id: "kpi1", label: "Tasa de Rotación de Personal",
    correct: "rrhh",
    hint: "Mide cuántos empleados dejan la empresa en un periodo. Es un indicador clave de salud organizacional gestionado por RRHH."
  },
  {
    id: "kpi2", label: "Ticket Promedio por Cliente",
    correct: "ventas",
    hint: "Representa el valor promedio que gasta cada cliente por compra. Depende directamente del equipo comercial y de ventas."
  },
  {
    id: "kpi3", label: "% de Pedidos Entregados a Tiempo",
    correct: "operaciones",
    hint: "Evalúa la eficiencia logística. Es responsabilidad del área de operaciones y cadena de suministro."
  },
  {
    id: "kpi4", label: "Ausentismo Laboral Mensual",
    correct: "rrhh",
    hint: "Registra los días de ausencia de los empleados. RRHH lo monitorea para detectar problemas de clima laboral o salud."
  },
  {
    id: "kpi5", label: "Tasa de Conversión de Leads",
    correct: "ventas",
    hint: "Mide qué porcentaje de prospectos se convierten en clientes reales. Es el KPI central del equipo de ventas y marketing."
  },
  {
    id: "kpi6", label: "Costo por Unidad Producida",
    correct: "operaciones",
    hint: "Calcula cuánto cuesta fabricar cada unidad. Lo optimiza el área de operaciones para mejorar márgenes de producción."
  },
];

const AREAS = [
  { id: "rrhh",       label: "🧑‍💼 RRHH",        color: "border-purple-500",  bg: "bg-purple-500/10",  text: "text-purple-300" },
  { id: "ventas",     label: "💰 Ventas",       color: "border-blue-400",    bg: "bg-blue-400/10",    text: "text-blue-300"   },
  { id: "operaciones",label: "🏭 Operaciones",  color: "border-orange-400",  bg: "bg-orange-400/10",  text: "text-orange-300" },
];

// ─── Matching Modal ────────────────────────────────────────────────────
function MatchingModal({ onClose }) {
  // placements: { kpiId: areaId }
  const [placements, setPlacements] = useState({});
  const [dragging, setDragging]     = useState(null); // kpiId being dragged
  const [checked, setChecked]       = useState(false);
  const [finished, setFinished]     = useState(false);
  const dragOver                    = useRef(null);

  const unplaced = KPIS.filter(k => !placements[k.id]);
  const score = checked
    ? KPIS.filter(k => placements[k.id] === k.correct).length
    : 0;

  // ── Drag handlers ──
  const onDragStart = (kpiId) => setDragging(kpiId);
  const onDragOver  = (e, areaId) => { e.preventDefault(); dragOver.current = areaId; };
  const onDrop      = (e, areaId) => {
    e.preventDefault();
    if (!dragging) return;
    setPlacements(prev => ({ ...prev, [dragging]: areaId }));
    setDragging(null);
    dragOver.current = null;
  };
  // Remove from area back to pool
  const removeFromArea = (kpiId) => {
    if (checked) return;
    setPlacements(prev => { const n = {...prev}; delete n[kpiId]; return n; });
  };

  const allPlaced = unplaced.length === 0;

  const getStatus = (kpiId) => {
    if (!checked) return null;
    return placements[kpiId] === KPIS.find(k => k.id === kpiId).correct ? 'correct' : 'wrong';
  };

  const handleReset = () => {
    setPlacements({});
    setChecked(false);
    setFinished(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
      />

      {/* Panel */}
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
            <HelpCircle size={20} className="text-secondary" />
            <span className="font-bold text-sm uppercase tracking-widest text-secondary">
              Actividad: Clasifica los KPIs
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <p className="text-slate-400 text-xs mb-4 text-center">
                  Arrastra cada KPI al área de negocio donde se utiliza. Cuando termines, verifica tus respuestas.
                </p>

                {/* Pool de KPIs sin colocar */}
                <div
                  className="min-h-[52px] flex flex-wrap gap-2 mb-5 p-3 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30"
                  onDragOver={(e) => onDragOver(e, '__pool__')}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dragging) {
                      setPlacements(prev => { const n = {...prev}; delete n[dragging]; return n; });
                      setDragging(null);
                    }
                  }}
                >
                  {unplaced.length === 0 && (
                    <span className="text-slate-600 text-xs italic m-auto">Todos los KPIs han sido asignados ✓</span>
                  )}
                  {unplaced.map(kpi => (
                    <motion.div
                      key={kpi.id}
                      layout
                      draggable
                      onDragStart={() => onDragStart(kpi.id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 cursor-grab active:cursor-grabbing select-none hover:border-secondary transition-colors"
                    >
                      <GripVertical size={12} className="text-slate-500 shrink-0" />
                      {kpi.label}
                    </motion.div>
                  ))}
                </div>

                {/* Áreas */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {AREAS.map(area => (
                    <div
                      key={area.id}
                      onDragOver={(e) => onDragOver(e, area.id)}
                      onDrop={(e) => onDrop(e, area.id)}
                      className={`min-h-[120px] rounded-2xl border-2 border-dashed p-3 flex flex-col gap-2 transition-colors ${area.color} ${area.bg}`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${area.text}`}>
                        {area.label}
                      </span>
                      {KPIS.filter(k => placements[k.id] === area.id).map(kpi => {
                        const status = getStatus(kpi.id);
                        return (
                          <motion.div
                            key={kpi.id}
                            layout
                            className={`relative px-2.5 py-2 rounded-xl text-[11px] font-semibold leading-tight border transition-colors
                              ${status === 'correct' ? 'bg-green-500/20 border-green-400 text-green-200' :
                                status === 'wrong'   ? 'bg-red-500/20 border-red-400 text-red-200' :
                                'bg-slate-700/80 border-slate-600 text-slate-200 cursor-pointer hover:border-white/40'}
                            `}
                            onClick={() => removeFromArea(kpi.id)}
                          >
                            {kpi.label}
                            {status === 'correct' && <CheckCircle size={12} className="inline ml-1 text-green-400" />}
                            {status === 'wrong'   && <XCircle size={12} className="inline ml-1 text-red-400" />}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Feedback por KPI incorrecto */}
                <AnimatePresence>
                  {checked && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-5">
                      {KPIS.filter(k => placements[k.id] !== k.correct).map(kpi => (
                        <div key={kpi.id} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200 leading-relaxed">
                          <span className="font-bold text-red-400">"{kpi.label}"</span> — {kpi.hint}
                        </div>
                      ))}
                      {score === KPIS.length && (
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-200 text-center font-bold">
                          🎉 ¡Perfecto! Clasificaste todos los KPIs correctamente.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Acciones */}
                <div className="flex justify-end gap-3">
                  {!checked ? (
                    <button
                      onClick={() => setChecked(true)}
                      disabled={!allPlaced}
                      className="px-5 py-2.5 rounded-full bg-secondary text-primary text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all active:scale-95"
                    >
                      Verificar respuestas
                    </button>
                  ) : (
                    <button
                      onClick={() => setFinished(true)}
                      className="px-5 py-2.5 rounded-full bg-secondary text-primary text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                    >
                      Ver resultados →
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Results */
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-secondary/10 border-2 border-secondary">
                  <Trophy size={36} className="text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Actividad completada</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Clasificaste correctamente <span className="text-secondary font-bold text-lg">{score}</span> de <span className="font-bold">{KPIS.length}</span> KPIs
                </p>

                <div className="space-y-2 text-left mb-6">
                  {KPIS.map(kpi => {
                    const ok = placements[kpi.id] === kpi.correct;
                    const areaLabel = AREAS.find(a => a.id === kpi.correct)?.label;
                    return (
                      <div key={kpi.id} className={`flex gap-3 p-3 rounded-xl text-xs border items-start ${ok ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                        {ok ? <CheckCircle size={14} className="text-green-400 shrink-0 mt-0.5" /> : <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />}
                        <div>
                          <span className="font-bold">{kpi.label}</span>
                          {!ok && <span className="text-slate-400"> → Pertenece a <strong>{areaLabel}</strong></span>}
                          {!ok && <p className="text-slate-500 mt-0.5">{kpi.hint}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 justify-center">
                  <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600 text-slate-400 text-sm hover:text-white hover:border-slate-400 transition-all">
                    <RotateCcw size={14} /> Reintentar
                  </button>
                  <button onClick={onClose} className="px-5 py-2 rounded-full bg-secondary text-primary text-sm font-bold hover:brightness-110 transition-all active:scale-95">
                    Continuar al editor →
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
export default function Slide8({ onNext, onPrev, onHome }) {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Módulo 3: <span className="text-secondary">Mirando al Pasado</span></h2>
        <p className="text-slate-400 italic text-lg">Analítica Descriptiva: ¿Qué sucedió y por qué?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
          <History className="text-secondary mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3">¿Qué es?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Es la base de la inteligencia de negocios. Consiste en tomar datos históricos y resumirlos para identificar patrones. Sin entender el pasado, no podemos predecir el futuro.
          </p>
          {/* link para recurso adicional para explicar la inteligencia de negocios */}
          <a href="https://www.tableau.com/learn/articles/business-intelligence" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-sm text-secondary hover:underline">
            Saber más sobre Inteligencia de Negocios →
          </a>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
          <Search className="text-accent mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3">Tu Misión</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            En el siguiente slide, actuarás como un analista de datos. Usarás un editor de código para filtrar un dataset real de Recursos Humanos y visualizar las razones por las cuales los empleados dejan la empresa.
          </p>
          {/* link para recurso adicional para aprender power BI y python en analitica de datos */}
          <a href="https://www.youtube.com/watch?v=ui-n9-d1hME" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline">
            Cursos recomendados para aprender Data Analytics →
          </a>
        </div>
      </div>

      {/* Botón actividad */}
      <div className="flex justify-center mb-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowQuiz(true)}
          className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-secondary to-secondary/80 text-primary font-extrabold text-sm shadow-lg shadow-secondary/20 hover:shadow-secondary/30 transition-all"
        >
          <HelpCircle size={20} />
          Poner a prueba lo aprendido →
        </motion.button>
      </div>

      <div className="flex justify-center">
        <div className="px-6 py-3 bg-secondary/10 border border-secondary/30 rounded-full text-secondary text-sm font-bold flex items-center gap-2 animate-pulse">
          <BarChart3 size={18} /> Prepárate para programar tu primer gráfico
        </div>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      <AnimatePresence>
        {showQuiz && <MatchingModal onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}