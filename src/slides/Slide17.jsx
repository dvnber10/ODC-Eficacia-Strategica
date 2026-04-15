import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronRight, Quote, TrendingUp } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide17({ onNext, onPrev, onHome }) {
    const [step, setStep] = useState(0);
    const [impact, setImpact] = useState(0);

    const pitches = [

        {
            title: "Paso 1: El Gancho (Hook)",
            options: [
                { text: "La atrición es del 25% según el último reporte de BI.", score: 10, feedback: "Demasiado frío. Los números sin contexto humano no movilizan a la junta." },
                { text: "He analizado 300 registros y he encontrado patrones interesantes.", score: 5, feedback: "En un pitch ejecutivo, el proceso no importa tanto como el impacto." },
                { text: "Estamos perdiendo 1 de cada 4 ingenieros clave este año.", score: 40, feedback: "¡Excelente! Creaste un sentido de urgencia inmediato y claro." },
                { text: "Nuestra rotación es más alta que la del año pasado.", score: 15, feedback: "Es una verdad a medias. Falta precisión y fuerza en el mensaje." }
            ]
        },
        {
            title: "Paso 2: La Causa Raíz",
            options: [
                { text: "El problema principal es el Manager 402 y el agotamiento extremo.", score: 40, feedback: "¡Directo al grano! Identificaste el foco infeccioso de la rotación." },
                { text: "Los empleados se van por ofertas salariales de la competencia.", score: 0, feedback: "Error. El dataset demostró que el salario no era la causa de renuncia." },
                { text: "Muchos de los que renuncian viajan más de 2 veces al mes.", score: 20, feedback: "Es un síntoma (distractor), pero el origen real es la gestión del líder 402." },
                { text: "La satisfacción general de la empresa ha bajado un 10%.", score: 10, feedback: "Demasiado vago. No permite tomar una acción concreta hoy mismo." }
            ]
        },
        {
            title: "Paso 3: La Propuesta (ROI)",
            options: [
                { text: "Sugerimos contratar 50 ingenieros nuevos para cubrir las bajas.", score: 0, feedback: "Pésimo. Estás intentando llenar un cubo agujereado en lugar de tapar el agujero." },
                { text: "Capacitar a todos los gerentes de la empresa en liderazgo.", score: 15, feedback: "Es una solución 'paracetamol': genérica y cara. Necesitas una cirugía local." },
                { text: "Intervenir al equipo 402 hoy ahorraría $150k en reemplazos futuros.", score: 40, feedback: "¡Brillante! Uniste el hallazgo con un beneficio financiero tangible." },
                { text: "Realizar una nueva encuesta de clima para profundizar más.", score: 5, feedback: "Parálisis por análisis. Los datos ya hablaron, ahora es tiempo de actuar." }
            ]
        }
    ];

    const handleChoice = (score) => {
        setImpact(prev => Math.min(prev + score, 100));
        if (step < pitches.length - 1) {
            setStep(step + 1);
        } else {
            setStep(3);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[82vh] overflow-hidden">

            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold italic">El Arte del <span className="text-purple-400">Storytelling</span></h2>
                <p className="text-slate-400 text-[10px]">Convence a la junta con tus hallazgos de TechNova.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-4 flex-1 min-h-0 mb-16">

                {/* ÁREA DE SIMULACIÓN */}
                <div className="lg:col-span-8 flex flex-col min-h-0">
                    <AnimatePresence mode="wait">
                        {step < 3 ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="bg-slate-900/60 border border-slate-700 rounded-[32px] p-5 flex-1 flex flex-col justify-center"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={14} className="text-purple-400" />
                                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Fase de Presentación</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{pitches[step].title}</h3>

                                {/* GRID DE 2 COLUMNAS PARA OPCIONES */}
                                <div className="grid grid-cols-2 gap-3">
                                    {pitches[step].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleChoice(opt.score)}
                                            className="p-3 bg-slate-800/50 hover:bg-purple-500/10 border border-slate-700 hover:border-purple-500/50 rounded-2xl text-left transition-all group flex items-center justify-between"
                                        >
                                            <span className="text-[11px] text-slate-300 group-hover:text-white leading-tight">{opt.text}</span>
                                            <ChevronRight className="text-slate-600 group-hover:text-purple-400 shrink-0" size={14} />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/30 rounded-[32px] p-6 text-center flex flex-col items-center justify-center h-full"
                            >
                                <Award className="text-yellow-400 mb-3" size={48} />
                                <h3 className="text-2xl font-black mb-2">¡Pitch Completado!</h3>
                                <p className="text-slate-400 text-xs max-w-sm italic">"Has transformado datos en una narrativa estratégica."</p>
                                <button onClick={() => { setStep(0); setImpact(0) }} className="mt-4 text-[9px] font-bold text-purple-400 hover:text-white underline uppercase">Reiniciar</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* PANEL LATERAL COMPACTO */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-[32px] p-5 flex-1 flex flex-col justify-center items-center">
                        <h4 className="text-[9px] font-black uppercase text-slate-500 mb-4 tracking-widest">Impacto en la Junta</h4>

                        <div className="relative h-40 w-10 bg-slate-900 rounded-full border border-slate-700 overflow-hidden">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${impact}%` }}
                                className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-accent"
                            />
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-3xl font-black text-white">{impact}%</span>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-[24px] flex items-start gap-3">
                        <Quote className="text-purple-400 shrink-0" size={16} />
                        <p className="text-[9px] text-slate-500 italic leading-snug">
                            "Habla el lenguaje del negocio para ser escuchado."
                        </p>
                    </div>
                </div>
            </div>

            <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
        </motion.div>
    );
}