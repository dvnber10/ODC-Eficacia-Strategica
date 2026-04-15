import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Trophy, ClipboardCheck } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide16({ onNext, onPrev, onHome }) {
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const questions = [
    {
      id: 'm1',
      module: "Módulo 1: Fundamentos",
      text: "¿Cuál es el objetivo principal de People Analytics?",
      options: ["Vigilar el comportamiento diario", "Tomar decisiones de RR.HH. basadas en datos", "Automatizar todos los despidos"],
      correct: 1,
      feedback: "¡Correcto! Se trata de sustituir la intuición por evidencia para mejorar los resultados de negocio."
    },
    {
      id: 'm2',
      module: "Módulo 2: Métricas",
      text: "Si queremos medir cuántos empleados se van voluntariamente, usamos:",
      options: ["Tasa de Absentismo", "eNPS (Net Promoter Score)", "Tasa de Atrición Voluntaria"],
      correct: 2,
      feedback: "¡Exacto! La atrición mide la pérdida de talento y es clave para la salud organizacional."
    },
    {
      id: 'm3',
      module: "Módulo 3: Análisis Descriptivo",
      text: "En nuestro laboratorio de Python, ¿para qué usamos la librería 'Pandas'?",
      options: ["Para limpiar y manipular tablas de datos", "Para crear animaciones 3D", "Para enviar correos automáticos"],
      correct: 0,
      feedback: "¡Así es! Pandas es la herramienta estándar para manejar DataFrames y limpiar información."
    },
    {
      id: 'm4',
      module: "Módulo 4: Análisis Predictivo",
      text: "¿Qué hace un modelo de Machine Learning en RR.HH.?",
      options: ["Adivina el futuro sin datos", "Encuentra patrones históricos para predecir riesgos", "Borra datos antiguos automáticamente"],
      correct: 1,
      feedback: "¡Correcto! Utiliza el pasado para identificar quién tiene alta probabilidad de irse o de tener éxito."
    },
    {
      id: 'm5',
      module: "Módulo 5: Factor Humano",
      text: "Cuando una IA hereda prejuicios históricos (como solo contratar hombres), hablamos de:",
      options: ["Eficiencia algorítmica", "Sesgo (Bias) Algorítmico", "Storytelling de datos"],
      correct: 1,
      feedback: "¡Exacto! Es vital auditar los modelos para evitar que repliquen injusticias del pasado."
    }
  ];

  const handleSelect = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
    setShowFeedback({ ...showFeedback, [qId]: true });
  };

  const score = Object.keys(answers).reduce((acc, qId) => {
    const q = questions.find(item => item.id === qId);
    return acc + (answers[qId] === q.correct ? 1 : 0);
  }, 0);

  const isFinished = Object.keys(answers).length === questions.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[82vh] overflow-hidden">
      
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold italic">Repaso <span className="text-accent">Multimodular</span></h2>
        <p className="text-slate-400 text-xs mt-1">Asegúrate de dominar los conceptos clave antes del gran examen final.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 min-h-0  overflow-y-auto pr-2 custom-scrollbar">
        
        {/* LISTA DE PREGUNTAS */}
        <div className="lg:col-span-8 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-slate-900/40 border border-slate-700 rounded-[32px] p-6 text-left">
              <span className="text-[9px] font-black text-accent uppercase tracking-widest mb-2 block">{q.module}</span>
              <h4 className="text-sm font-bold mb-4 text-white">{q.text}</h4>
              
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(q.id, i)}
                    className={`p-3 rounded-xl text-[11px] text-left border transition-all ${
                      answers[q.id] === i 
                      ? (i === q.correct ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-red-500/20 border-red-500 text-red-400')
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback[q.id] && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex gap-2 items-start border-t border-slate-800 pt-3">
                    {answers[q.id] === q.correct ? <CheckCircle2 className="text-emerald-500" size={14}/> : <XCircle className="text-red-500" size={14}/>}
                    <p className="text-[10px] text-slate-400 italic leading-relaxed">{q.feedback}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* PANEL DE PROGRESO */}
        <div className="lg:col-span-4 self-start sticky top-0">
          <div className="bg-slate-800 border border-slate-700 rounded-[40px] p-8 text-center shadow-2xl">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-4 ${isFinished && score === 5 ? 'border-emerald-500 text-emerald-500' : 'border-slate-700 text-slate-500'}`}>
              {isFinished && score === 5 ? <Trophy size={32}/> : <ClipboardCheck size={32}/>}
            </div>
            <h3 className="text-xl font-black text-white mb-2 uppercase">Tu Progreso</h3>
            <div className="text-4xl font-black text-accent mb-4">
              {score} <span className="text-slate-600 text-xl">/ {questions.length}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed px-4">
              {isFinished 
                ? (score === 5 ? "¡Dominio total! Estás más que listo para el examen final." : "Buen intento. Revisa los módulos donde fallaste antes de avanzar.") 
                : "Responde todas las preguntas para desbloquear el camino al Examen Final."}
            </p>

            {isFinished && (
              <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center gap-3">
                <Lightbulb size={18} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase">Tip: ¡El examen será más difícil!</span>
              </div>
            )}
          </div>
        </div>

      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}