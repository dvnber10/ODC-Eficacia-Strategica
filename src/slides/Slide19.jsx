import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Sparkles, ArrowRight, GraduationCap, Users } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide19({ onNext, onPrev, onHome }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-6xl w-full flex flex-col   items-center justify-center text-center relative overflow-hidden"
    >
      {/* EFECTO DE FONDO SUTIL */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="z-10"
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-[40px] flex items-center justify-center mb-6 sm:mb-8 mx-auto border border-white/10 shadow-2xl">
          <Sparkles className="text-accent" size={48} />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black italic text-white mb-4 tracking-tighter">
          ¡GRACIAS POR <span className="text-accent text-glow">REVOLUCIONAR</span> EL TALENTO!
        </h2>
        
        <p className="max-w-full sm:max-w-2xl text-slate-400 text-xs sm:text-sm leading-relaxed mx-auto mb-8 sm:mb-12">
          Has completado el programa de Business Analytics en entornos de Big Data. Ahora tienes las herramientas técnicas 
          para transformar cualquier organización mediante el poder de los datos.
        </p>

        {/* Agradecimientos y referencias cortas */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-full sm:max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="px-4 py-2 sm:px-6 sm:py-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center gap-2 sm:gap-3">
            <Users size={18} className="text-accent" />
            <div className="text-left">
              <p className="text-[10px] sm:text-[9px] font-black uppercase text-slate-500 tracking-widest">Instructores</p>
              <p className="text-[12px] sm:text-[11px] text-white font-bold">Marcela Devia Barbosa</p>
            </div>
          </div>

          <div className="px-4 py-2 sm:px-6 sm:py-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center gap-2 sm:gap-3">
            <Heart size={18} className="text-red-400" />
            <div className="text-left">
              <p className="text-[10px] sm:text-[9px] font-black uppercase text-slate-500 tracking-widest">Referencias</p>
              <p className="text-[12px] sm:text-[11px] text-white font-bold">CerTIC Certificaciones Internacionales TIC, https://www.youtube.com/watch?v=dHM-kuxz4w4</p>
            </div>
          </div>

          
        </div>
      </motion.div>

      {/* FOOTER DE NAVEGACIÓN */}
      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} hideNext={true} />
    </motion.div>
  );
}