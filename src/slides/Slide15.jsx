import React from 'react';
import { motion } from 'framer-motion';
import { Database, AlertCircle, CheckCircle2, Download, Terminal } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide15({ onNext, onPrev, onHome }) {
  
  const handleDownload = () => {
    // Ruta directa al archivo en tus assets
    const link = document.createElement("a");
    link.href = "/src/assets/dataset/TechNova_Dataset.csv";
    link.download = "TechNova_Dataset.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full flex flex-col h-[82vh] overflow-hidden">
      
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-3">
          <AlertCircle size={14} className="text-yellow-500" />
          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Taller Práctico</span>
        </div>
        <h2 className="text-3xl font-bold italic">El Desafío <span className="text-accent">TechNova Inc.</span></h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 min-h-0  overflow-y-auto pr-2 custom-scrollbar">
        
        {/* LADO IZQUIERDO: CONTEXTO */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="bg-slate-900/40 border border-slate-700 rounded-[32px] p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
              <Terminal size={18} className="text-accent" /> Briefing del Caso
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              TechNova ha perdido talento clave. La gerencia cree que es por **salario**, pero tú debes investigar si el problema es el **liderazgo (ManagerID)** o el **agotamiento (WorkLifeBalance)**.
            </p>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 rounded-[32px] p-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 text-left">Instrucciones:</h4>
            <div className="space-y-3 text-left">
              <p className="text-[11px] text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 1. Descarga el CSV y procésalo (Excel, Python o BI).
              </p>
              <p className="text-[11px] text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 2. Analiza la relación entre Manager y Renuncias.
              </p>
              <p className="text-[11px] text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 3. Vuelve para validar tus respuestas.
              </p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: ACCIÓN DE DESCARGA */}
        <div className="lg:col-span-5">
          <div className="bg-slate-800 border border-slate-700 rounded-[40px] p-8 text-center shadow-2xl h-full flex flex-col justify-center">
            <div className="mb-6 mx-auto w-16 h-16 bg-accent rounded-3xl flex items-center justify-center">
              <Database className="text-slate-900" size={32} />
            </div>
            
            <h3 className="text-xl font-black mb-2 text-white">TECHNOVA_DATA.CSV</h3>
            <p className="text-xs text-slate-400 mb-8">Obtén el archivo para iniciar el análisis local.</p>
            
            {/* BOTÓN CON TEXTO NEGRO VISIBLE */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl text-xs flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span className="uppercase tracking-widest">Descargar Datos</span>
            </motion.button>
            
            <p className="mt-4 text-[9px] text-slate-500 font-bold uppercase">Formato: CSV | 48KB</p>
          </div>
        </div>

      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}