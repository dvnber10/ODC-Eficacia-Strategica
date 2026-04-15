import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, Award, Lock, BarChart, AlertTriangle } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide18({ onNext, onPrev, onHome }) {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // BLOQUEO DE COPIADO (Anti-IA)
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const questions = [
    { id: 1, q: "¿Cuántos empleados totales aparecen en el dataset con Attrition = 'Yes'?", options: ["45", "75", "110", "92"], correct: 1 },
    { id: 2, q: "¿Cuál es el salario promedio aproximado de los que renunciaron (Yes)?", options: ["$5,200", "$6,505", "$7,100", "$4,800"], correct: 1 },
    { id: 3, q: "¿Qué porcentaje de las renuncias pertenecen al ManagerID 402?", options: ["20%", "50%", "Más del 80%", "Menos del 10%"], correct: 2 },
    { id: 4, q: "¿Cuál es el WorkLifeBalance más común entre los que NO renunciaron?", options: ["1", "2", "3 o 4", "N/A"], correct: 2 },
    { id: 5, q: "Si filtras por ManagerID 402, ¿cuántos de sus empleados tienen WLB = 1?", options: ["Todos", "La mitad", "Ninguno", "Solo 5"], correct: 0 },
    { id: 6, q: "¿Qué TravelFrequency predomina en los empleados que renunciaron?", options: ["Non-Travel", "Travel_Rarely", "Travel_Frequently", "No se menciona"], correct: 2 },
    { id: 7, q: "¿Existe una correlación directa entre 'Sueldo Alto' y 'Baja Atrición' en este caso?", options: ["Sí, los que ganan más se quedan", "No, el sueldo es similar en ambos grupos", "Sí, pero solo en gerentes", "Los datos no son claros"], correct: 1 },
    { id: 8, q: "¿Qué ID de empleado es el primero en la lista con Attrition 'Yes'?", options: ["ID: 1", "ID: 10", "ID: 100", "ID: 251"], correct: 0 },
    { id: 9, q: "¿Cuántos Managers distintos hay en el grupo que SÍ renunció?", options: ["15", "Solo 1 (el 402)", "Todos los managers", "5"], correct: 1 },
    { id: 10, q: "¿Cuál es la recomendación técnica final tras el análisis?", options: ["Subir sueldos", "Auditar al Manager 402", "Contratar más gente", "Reducir viajes"], correct: 1 }
  ];

  const handleAnswer = (idx) => {
    setUserAnswers({ ...userAnswers, [currentQ]: idx });
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const score = Object.keys(userAnswers).filter(key => userAnswers[key] === questions[key].correct).length;
  const passed = score >= 8; // Aprueba con 80%

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="max-w-6xl w-full flex flex-col h-[82vh] overflow-hidden select-none"
    >
      
      {!examStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-accent/10 rounded-[30px] flex items-center justify-center border border-accent/20">
            <Lock className="text-accent" size={40} />
          </div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Examen Final de <span className="text-accent">Certificación</span></h2>
          <p className="max-w-md text-slate-400 text-sm leading-relaxed">
            Para obtener tu insignia, debes responder 10 preguntas basadas exclusivamente en el dataset de TechNova. 
            <span className="block mt-2 text-yellow-500 font-bold">Nota: El copiado y el clic derecho están deshabilitados.</span>
          </p>
          <button 
            onClick={() => setExamStarted(true)}
            className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-accent transition-colors uppercase tracking-widest text-xs"
          >
            Comenzar Evaluación
          </button>
        </div>
      ) : showResult ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-slate-900/50 rounded-[40px] border border-slate-700">
          {passed ? (
            <>
              <Award className="text-yellow-400 mb-6" size={80} />
              <h3 className="text-4xl font-black text-white mb-2">¡CERTIFICADO!</h3>
              <p className="text-slate-400 mb-6 text-sm">Has demostrado dominio en People Analytics con un puntaje de {score}/10.</p>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 font-bold text-xs uppercase tracking-widest">
                ID Credencial: PA-2026-{Math.floor(Math.random()*9000)+1000}
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="text-red-500 mb-6" size={80} />
              <h3 className="text-4xl font-black text-white mb-2">PUNTAJE: {score}/10</h3>
              <p className="text-slate-400 mb-6 text-sm">Necesitas al menos 8 aciertos para certificar. <br/> Revisa el dataset de TechNova y vuelve a intentarlo.</p>
              <button onClick={() => {setExamStarted(false); setShowResult(false); setCurrentQ(0); setUserAnswers({})}} className="text-accent underline font-bold uppercase text-xs">Reintentar Examen</button>
            </>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-8">
            <motion.div 
              className="h-full bg-accent" 
              initial={{ width: 0 }} 
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
                <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em]">Pregunta {currentQ + 1} de 10</span>
                <h3 className="text-2xl font-bold text-white mt-4 leading-tight">{questions[currentQ].q}</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-left text-sm text-slate-300 hover:border-accent hover:bg-accent/5 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}