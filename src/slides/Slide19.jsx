import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Users } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide19({ onNext, onPrev, onHome }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-6xl w-full flex flex-col items-center justify-center text-center relative"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="z-10"
      >
        <div className="w-20 h-20 bg-accent/10 rounded-[32px] flex items-center justify-center mb-8 mx-auto border border-accent/20 shadow-xl">
          <Sparkles className="text-accent" size={40} />
        </div>

        <h2 className="text-4xl sm:text-6xl font-black italic text-white mb-6 tracking-tighter">
          ¡GRACIAS POR <span className="text-accent text-glow">REVOLUCIONAR</span> EL TALENTO!
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <div className="px-6 py-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-3">
            <Users size={20} className="text-accent" />
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Instructora</p>
              <p className="text-sm text-white font-bold">Marcela Devia Barbosa</p>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-3">
            <GraduationCap size={20} className="text-accent" />
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Programa</p>
              <p className="text-sm text-white font-bold">Especialización en Analítica y Ciencia de datos</p>
            </div>
          </div>
        </div>
      </motion.div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}