import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Sparkles, ArrowRight, GraduationCap, Users } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide19({ onNext, onPrev, onHome }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-6xl w-full flex flex-col h-[82vh] items-center justify-center text-center relative overflow-hidden"
    >
      {/* EFECTO DE FONDO SUTIL */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        className="z-10"
      >
        <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mb-8 mx-auto border border-white/10 shadow-2xl">
          <Sparkles className="text-accent" size={48} />
        </div>

        <h2 className="text-5xl font-black italic text-white mb-4 tracking-tighter">
          ¡GRACIAS POR <span className="text-accent text-glow">REVOLUCIONAR</span> EL TALENTO!
        </h2>
        
        <p className="max-w-2xl text-slate-400 text-sm leading-relaxed mx-auto mb-12">
          Has completado el programa avanzado de Business Analytics en entornos de Big Data. Ahora tienes las herramientas técnicas 
          y narrativas para transformar cualquier organización mediante el poder de los datos. 
          El futuro del trabajo no es una suposición, es una ciencia que ahora dominas.
        </p>

        {/* Agradecimientos y referencias cortas */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-12">
          <div className="px-6 py-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center gap-3">
            <Users size={18} className="text-accent" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Instructores</p>
              <p className="text-[11px] text-white font-bold">Marcela Devia Barbosa</p>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center gap-3">
            <Heart size={18} className="text-red-400" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Referencias</p>
              <p className="text-[11px] text-white font-bold">CerTIC Certificaciones Internacionales TIC, https://www.youtube.com/watch?v=dHM-kuxz4w4</p>
            </div>
          </div>

          
        </div>
      </motion.div>

      {/* FOOTER DE NAVEGACIÓN */}
      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} hideNext={true} />
    </motion.div>
  );
}