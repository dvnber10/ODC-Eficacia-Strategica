import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Cpu, Globe, Cloud, X, Smartphone, CheckCircle, XCircle, HelpCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import SlideNav from '../components/SlideNav';

// ─── Preguntas del Quiz ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: "Una empresa de logística instala sensores en sus camiones para monitorear la temperatura de la carga y la ubicación GPS en tiempo real. ¿De qué fuente de datos proviene esta información?",
    options: [
      { id: "a", text: "Redes Sociales" },
      { id: "b", text: "Huella Web" },
      { id: "c", text: "IoT y Sensores" },
      { id: "d", text: "Sistemas Internos" },
    ],
    correct: "c",
    explanation: {
      correct: "¡Exacto! Los sensores GPS y de temperatura instalados en camiones son un ejemplo clásico de IoT (Internet of Things). Son dispositivos físicos que generan datos automáticamente sin intervención humana, enviando telemetría en tiempo real.",
      wrong: "La respuesta correcta es IoT y Sensores. Los sensores físicos en camiones (GPS, temperatura) son dispositivos IoT que transmiten datos de máquina a máquina sin intervención humana. Las redes sociales requieren acción humana; la huella web viene de navegadores; y los sistemas internos son bases de datos corporativas."
    }
  },
  {
    id: 2,
    question: "Un retailer online detecta que un usuario visitó tres veces la página de un televisor, lo agregó al carrito pero no completó la compra. ¿Qué fuente de datos captura este comportamiento?",
    options: [
      { id: "a", text: "IoT y Sensores" },
      { id: "b", text: "Huella Web" },
      { id: "c", text: "Sistemas Internos" },
      { id: "d", text: "Redes Sociales" },
    ],
    correct: "b",
    explanation: {
      correct: "¡Correcto! Las visitas a páginas, el tiempo en cada producto, los clics y el historial del carrito forman parte de la Huella Web del usuario. Esta información se captura con cookies y herramientas de analítica web y es clave para estrategias de retargeting.",
      wrong: "La respuesta correcta es Huella Web. El comportamiento de navegación (visitas, clics, carrito abandonado) es el rastro digital que dejamos al navegar por internet. No proviene de redes sociales (que requieren publicar contenido) ni de sensores físicos ni de sistemas internos de la empresa."
    }
  },
  {
    id: 3,
    question: "El equipo de marketing quiere analizar el sentimiento de los consumidores sobre su nuevo producto revisando comentarios y menciones en Instagram y TikTok. ¿Qué fuente de datos están usando?",
    options: [
      { id: "a", text: "Sistemas Internos" },
      { id: "b", text: "IoT y Sensores" },
      { id: "c", text: "Huella Web" },
      { id: "d", text: "Redes Sociales" },
    ],
    correct: "d",
    explanation: {
      correct: "¡Muy bien! Instagram y TikTok son redes sociales, y los comentarios y menciones que generan los usuarios son datos no estructurados que revelan sentimientos, opiniones y tendencias. El análisis de este tipo de datos se llama Social Listening o análisis de sentimiento.",
      wrong: "La respuesta correcta es Redes Sociales. Los comentarios, likes y menciones en Instagram y TikTok son datos generados por interacciones humanas en plataformas sociales. Analizarlos para entender la opinión pública sobre un producto es una práctica llamada Social Listening."
    }
  }
];

// ─── Componente Quiz Modal ─────────────────────────────────────────────
function QuizModal({ onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.correct;

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);
    setAnswers(prev => [...prev, { questionId: q.id, isCorrect: selected === q.correct }]);
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers([]);
    setFinished(false);
  };

  const score = answers.filter(a => a.isCorrect).length;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/60">
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="text-secondary" />
            <span className="font-bold text-sm uppercase tracking-widest text-secondary">Actividad: Orígenes de la Información</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-xl mx-auto my-auto rounded-3xl shadow-2xl overflow-y-auto flex flex-col max-h-[90vh]">
                {/* Progress */}
                <div className="flex gap-2 mb-5">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i < current ? 'bg-secondary' : i === current ? 'bg-secondary/50' : 'bg-slate-700'
                    }`} />
                  ))}
                </div>

                <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest">Pregunta {current + 1} de {QUESTIONS.length}</p>
                <p className="text-base font-semibold text-white leading-relaxed mb-5">{q.question}</p>

                {/* Options */}
                <div className="space-y-2.5 mb-5">
                  {q.options.map(opt => {
                    let base = "w-full text-left px-4 py-3 rounded-2xl border text-sm font-medium transition-all duration-200 ";
                    if (!confirmed) {
                      base += selected === opt.id
                        ? "bg-secondary/20 border-secondary text-white"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700/60";
                    } else {
                      if (opt.id === q.correct) base += "bg-green-500/20 border-green-400 text-green-200";
                      else if (opt.id === selected && !isCorrect) base += "bg-red-500/20 border-red-400 text-red-200";
                      else base += "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
                    }
                    return (
                      <button key={opt.id} disabled={confirmed} onClick={() => setSelected(opt.id)} className={base}>
                        <span className="font-bold mr-2 opacity-60">{opt.id.toUpperCase()}.</span>
                        {opt.text}
                        {confirmed && opt.id === q.correct && <CheckCircle size={16} className="inline ml-2 text-green-400" />}
                        {confirmed && opt.id === selected && !isCorrect && opt.id !== q.correct && <XCircle size={16} className="inline ml-2 text-red-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className={`p-4 rounded-2xl text-sm leading-relaxed mb-5 border ${
                        isCorrect
                          ? "bg-green-500/10 border-green-500/30 text-green-200"
                          : "bg-red-500/10 border-red-500/30 text-red-200"
                      }`}
                    >
                      <p className={`font-bold mb-1 flex items-center gap-1.5 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? <><CheckCircle size={15}/> ¡Correcto!</> : <><XCircle size={15}/> Incorrecto</>}
                      </p>
                      <p>{isCorrect ? q.explanation.correct : q.explanation.wrong}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {!confirmed ? (
                    <button
                      onClick={handleConfirm}
                      disabled={!selected}
                      className="px-5 py-2.5 rounded-full bg-secondary text-primary text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all active:scale-95"
                    >
                      Confirmar respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-primary text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                    >
                      {current < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultado'}
                      <ChevronRight size={16} />
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
                  Obtuviste <span className="text-secondary font-bold text-lg">{score}</span> de <span className="font-bold">{QUESTIONS.length}</span> respuestas correctas
                </p>

                <div className="space-y-2 text-left mb-6">
                  {answers.map((a, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl text-sm border ${a.isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                      {a.isCorrect ? <CheckCircle size={16} className="text-green-400 shrink-0"/> : <XCircle size={16} className="text-red-400 shrink-0"/>}
                      <span className="font-medium">Pregunta {i + 1}:</span>
                      <span className="opacity-80">{a.isCorrect ? 'Correcta' : 'Incorrecta'}</span>
                    </div>
                  ))}
                </div>

                {score < QUESTIONS.length && (
                  <p className="text-xs text-slate-500 italic mb-4">Revisa las tarjetas de arriba para reforzar los orígenes que fallaste.</p>
                )}

                <div className="flex gap-3 justify-center">
                  <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600 text-slate-400 text-sm hover:text-white hover:border-slate-400 transition-all">
                    <RotateCcw size={14} /> Reintentar
                  </button>
                  <button onClick={onClose} className="px-5 py-2 rounded-full bg-secondary text-primary text-sm font-bold hover:brightness-110 transition-all active:scale-95">
                    Finalizar
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
export default function Slide7({ onNext, onPrev, onHome }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

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
            className="cursor-pointer p-6 rounded-3xl border border-slate-700 bg-slate-800/50 flex items-center gap-6 transition-all hover:border-secondary group"
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

      {/* Botón de Actividad */}
      <div className="flex justify-center mb-8">
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

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      {/* MODAL DETALLADO DE CATEGORÍA */}
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

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">{activeCategory.details}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activeCategory.logos.map((logo, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={logo}
                    className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 border border-slate-600 font-black text-[10px] ${activeCategory.color}`}>
                      {logo.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">{logo}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal Quiz */}
        {showQuiz && (
          <QuizModal onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}