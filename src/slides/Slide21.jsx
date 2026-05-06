import React from 'react';
import { motion } from 'framer-motion';
import SlideNav from '../components/SlideNav';

export default function Slide21({ onNext, onPrev, onHome }) {
  const credits = [
    { 
      t: "Certificaciones Internacionales TIC", 
      a: "CerTIC", 
      s: "https://www.youtube.com/watch?v=dHM-kuxz4w4", 
      l: "Licencia de YouTube Estándar" 
    },
    { 
      t: "Gestión del Conocimiento: Datos e Información", 
      a: "CEPAL", 
      s: "https://biblioguias.cepal.org/GestionDelConocimiento", 
      l: "Creative Commons BY-NC-SA" 
    },
    { 
      t: "Lucide Icons", 
      a: "Lucide Contributors", 
      s: "https://lucide.dev", 
      l: "ISC License" 
    },
    { 
      t: "Framer Motion", 
      a: "Framer B.V.", 
      s: "https://framer.com/motion", 
      l: "MIT License" 
    },
    { 
      t: "Matriz de Revisión de Literatura", 
      a: "Bernal, E. D. & Polanco, V.", 
      s: "Revisión de Literatura propia", 
      l: "Uso Académico / Derechos Reservados" 
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full">
      <h2 className="text-3xl font-bold text-accent mb-8">Créditos de Recursos</h2>
      
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
              <th className="p-4 border-b border-slate-700">Título</th>
              <th className="p-4 border-b border-slate-700">Autor</th>
              <th className="p-4 border-b border-slate-700">Fuente (URL)</th>
              <th className="p-4 border-b border-slate-700">Licencia</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-300 italic">
            {credits.map((item, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-slate-800 font-bold text-white not-italic">{item.t}</td>
                <td className="p-4 border-b border-slate-800">{item.a}</td>
                <td className="p-4 border-b border-slate-800 text-blue-400 truncate max-w-[150px]">{item.s}</td>
                <td className="p-4 border-b border-slate-800 font-mono text-[10px]">{item.l}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
        <p className="text-[11px] text-emerald-400 leading-relaxed italic text-center">
          Este recurso educativo digital se distribuye bajo una licencia <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>. 
          Se permite su uso, distribución y adaptación citando la autoría original.
        </p>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} hideNext={true} />
    </motion.div>
  );
}