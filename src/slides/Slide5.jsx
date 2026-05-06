import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Share2, FileText, X, Eye, CheckCircle, XCircle, HelpCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import SlideNav from '../components/SlideNav';

// ─── Preguntas del Quiz ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: "Una empresa almacena registros de ventas en una hoja de Excel con columnas fijas (ID, Producto, Monto, Fecha). ¿Qué tipo de dato es este?",
    options: [
      { id: "a", text: "No estructurado" },
      { id: "b", text: "Estructurado" },
      { id: "c", text: "Semi-estructurado" },
      { id: "d", text: "Ninguno de los anteriores" },
    ],
    correct: "b",
    explanation: {
      correct: "¡Correcto! Los datos en hojas de cálculo con columnas definidas son el ejemplo clásico de datos estructurados: tienen un esquema rígido, filas y columnas predecibles, y se pueden consultar fácilmente con SQL o herramientas similares.",
      wrong: "No exactamente. Las hojas de cálculo con columnas fijas (ID, Producto, Monto, Fecha) son datos estructurados porque siguen un esquema rígido y predecible. Los no estructurados serían videos o texto libre; los semi-estructurados serían archivos JSON o XML."
    }
  },
  {
    id: 2,
    question: "Una app de delivery guarda cada pedido como un objeto JSON con campos variables (algunos pedidos tienen 'notas_especiales', otros no). ¿Qué tipo de dato es este?",
    options: [
      { id: "a", text: "Estructurado" },
      { id: "b", text: "No estructurado" },
      { id: "c", text: "Semi-estructurado" },
      { id: "d", text: "Dato crudo sin clasificar" },
    ],
    correct: "c",
    explanation: {
      correct: "¡Muy bien! El JSON es el formato semi-estructurado más común. Tiene una jerarquía y etiquetas definidas, pero los campos pueden variar entre registros (algunos pedidos tienen 'notas_especiales' y otros no). Esa flexibilidad lo distingue de los datos estructurados.",
      wrong: "La respuesta correcta es Semi-estructurado. Los archivos JSON tienen cierta organización (etiquetas, jerarquía) pero no un esquema tan rígido como una tabla SQL. La posibilidad de que algunos registros tengan campos que otros no tienen es la clave que los distingue."
    }
  },
  {
    id: 3,
    question: "Un call center graba las llamadas de sus clientes para análisis de satisfacción. ¿Cómo se clasifican esos audios?",
    options: [
      { id: "a", text: "Estructurados" },
      { id: "b", text: "No estructurados" },
      { id: "c", text: "Semi-estructurados" },
      { id: "d", text: "Metadatos" },
    ],
    correct: "b",
    explanation: {
      correct: "¡Exacto! Los archivos de audio (y también videos, imágenes y texto libre) son datos no estructurados. No tienen un formato tabular ni etiquetas predefinidas; para analizarlos se necesitan herramientas especiales como NLP o reconocimiento de voz.",
      wrong: "La respuesta correcta es No estructurado. Los audios, videos e imágenes no tienen esquema ni formato tabular; no se pueden leer directamente con una consulta SQL. Para extraer valor de ellos se requieren técnicas como reconocimiento de voz (STT) o procesamiento de lenguaje natural (NLP)."
    }
  }
];

// ─── Componente Quiz Modal ─────────────────────────────────────────────
function QuizModal({ onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionId, isCorrect }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            <HelpCircle size={20} className="text-yellow-400" />
            <span className="font-bold text-sm uppercase tracking-widest text-yellow-400">Actividad: Naturaleza de los Datos</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-xl 
             mx-auto my-auto rounded-3xl shadow-2xl overflow-y-auto 
             flex flex-col max-h-[90vh]">
                {/* Progress */}
                <div className="flex gap-2 mb-5">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      i < current ? 'bg-yellow-400' : i === current ? 'bg-yellow-400/60' : 'bg-slate-700'
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
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-200"
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
                      className="px-5 py-2.5 rounded-full bg-yellow-500 text-slate-900 text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-400 transition-all active:scale-95"
                    >
                      Confirmar respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-500 text-slate-900 text-sm font-bold hover:bg-yellow-400 transition-all active:scale-95"
                    >
                      {current < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultado'}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Results screen */
              <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-yellow-400/10 border-2 border-yellow-400">
                  <Trophy size={36} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Actividad completada</h3>
                <p className="text-slate-400 text-sm mb-6">Obtuviste <span className="text-yellow-400 font-bold text-lg">{score}</span> de <span className="font-bold">{QUESTIONS.length}</span> respuestas correctas</p>

                {/* Score detail */}
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
                  <p className="text-xs text-slate-500 italic mb-4">Revisa las tarjetas de arriba para reforzar los conceptos que fallaste.</p>
                )}

                <div className="flex gap-3 justify-center">
                  <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-600 text-slate-400 text-sm hover:text-white hover:border-slate-400 transition-all">
                    <RotateCcw size={14} /> Reintentar
                  </button>
                  <button onClick={onClose} className="px-5 py-2 rounded-full bg-yellow-500 text-slate-900 text-sm font-bold hover:bg-yellow-400 transition-all active:scale-95">
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
export default function Slide5({ onNext, onPrev, onHome }) {
  const [activeModal, setActiveModal] = useState(null); // 'example' | 'quiz'
  const [activeExample, setActiveExample] = useState(null);

  const dataTypes = [
    {
      id: "structured",
      title: "Estructurados",
      icon: <Table size={32} />,
      color: "text-green-400",
      btnColor: "bg-green-600",
      desc: "Datos con formato rígido y tablas definidas.",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300 border-collapse">
            <thead className="text-xs uppercase bg-slate-700 text-green-400">
              <tr>
                <th className="p-3 border border-slate-600">ID_Cliente</th>
                <th className="p-3 border border-slate-600">Nombre</th>
                <th className="p-3 border border-slate-600">Venta_USD</th>
                <th className="p-3 border border-slate-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 border border-slate-600 font-mono text-xs">001-A</td>
                <td className="p-3 border border-slate-600">Juan Pérez</td>
                <td className="p-3 border border-slate-600">$450.00</td>
                <td className="p-3 border border-slate-600">2024-05-20</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <td className="p-3 border border-slate-600 font-mono text-xs">002-B</td>
                <td className="p-3 border border-slate-600">Ana Gómez</td>
                <td className="p-3 border border-slate-600">$1,200.50</td>
                <td className="p-3 border border-slate-600">2024-05-21</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs text-slate-400 italic text-center">Ejemplo de vista de Hoja de Cálculo / SQL</p>
        </div>
      )
    },
    {
      id: "semistructured",
      title: "Semi-estructurados",
      icon: <Share2 size={32} />,
      color: "text-yellow-400",
      btnColor: "bg-yellow-600",
      desc: "Formatos flexibles como JSON o XML.",
      content: (
        <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-yellow-200 border border-yellow-500/20 leading-relaxed shadow-inner">
          <pre>{`{
  "cliente": "001-A",
  "datos": {
    "nombre": "Juan Pérez",
    "intereses": ["Tecnología", "IA"],
    "metadatos": {
      "navegador": "Brave",
      "ip": "192.168.1.1"
    }
  }
}`}</pre>
          <p className="mt-4 text-xs text-slate-500 italic text-center">Ejemplo de estructura JSON (API/Web)</p>
        </div>
      )
    },
    {
      id: "unstructured",
      title: "No Estructurados",
      icon: <FileText size={32} />,
      color: "text-red-400",
      btnColor: "bg-red-600",
      desc: "Videos, audios y contenido multimedia.",
      content: (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-700 shadow-2xl">
          <iframe
            width="100%" height="100%"
            src="https://www.youtube.com/embed/dHM-kuxz4w4?si=rxyuyx1QONUFTTfL?autoplay=1"
            title="Video representativo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">1.2 <span className="text-secondary">Naturaleza de los Datos</span></h2>
        <p className="text-slate-400 italic text-sm">Explora los ejemplos reales haciendo clic en cada categoría.</p>
      </div>

      {/* Tarjetas */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {dataTypes.map((type) => (
          <div key={type.id} className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center shadow-lg">
            <div className={`p-4 bg-slate-900 rounded-2xl mb-5 ${type.color}`}>{type.icon}</div>
            <h3 className="font-bold text-2xl mb-3">{type.title}</h3>
            <p className="text-sm text-slate-400 mb-6">{type.desc}</p>
            <button
              onClick={() => { setActiveExample(type); setActiveModal('example'); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-all hover:brightness-110 active:scale-95 shadow-lg ${type.btnColor}`}
            >
              <Eye size={16} /> Ver ejemplo real
            </button>
          </div>
        ))}
      </div>

      {/* Botón de Actividad */}
      <div className="flex justify-center mb-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveModal('quiz')}
          className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-extrabold text-sm shadow-lg shadow-yellow-500/20 hover:shadow-yellow-400/30 transition-all"
        >
          <HelpCircle size={20} />
          Poner a prueba lo aprendido →
        </motion.button>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      {/* Modales */}
      <AnimatePresence>
        {/* Modal de Ejemplo */}
        {activeModal === 'example' && activeExample && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-auto h-[100dvh] max-h-[85vh]">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 bg-slate-900 border border-slate-700 w-full max-w-xl 
             mx-auto my-auto rounded-3xl shadow-2xl overflow-hidden 
             flex flex-col max-h-[90vh]"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <span className={activeExample.color}>{activeExample.icon}</span>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Ejemplo de Datos {activeExample.title}</h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8">{activeExample.content}</div>
              <div className="p-4 bg-slate-900/50 text-center">
                <button onClick={() => setActiveModal(null)} className="text-xs font-bold text-slate-500 hover:text-secondary uppercase tracking-widest">
                  Cerrar Ventana
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal Quiz */}
        {activeModal === 'quiz' && (
          <QuizModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}