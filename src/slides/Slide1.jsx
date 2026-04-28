import { motion } from 'framer-motion';
import SlideNav from '../components/SlideNav';

const Slide1 = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-4 sm:space-y-8"
    >
      <div className="inline-block px-4 py-1 border border-secondary/50 rounded-full text-secondary text-sm font-medium tracking-widest uppercase mb-4">
        Proyecto de Grado - 2026
      </div>
      
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-tight">
        EFICACIA <br />
        <span className=" bg-clip-text bg-gradient-to-r from-secondary via-accent to-secondary animate-gradient-x">
          ESTRATÉGICA
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
        El impacto de Big Data y Analítica Predictiva en la toma de decisiones empresariales.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 pt-6 sm:pt-12">
        <div className="text-right border-r border-slate-700 pr-6">
          <p className="text-slate-500 text-xs uppercase tracking-tighter">Investigadores</p>
          <p className="font-semibold">Edgar Duvan Bernal Acero</p>
          <p className="font-semibold">Valentina Medina Polanco</p>
        </div>
        <div className="text-left pl-2">
          <p className="text-slate-500 text-xs uppercase tracking-tighter">Institución</p>
          <p className="font-medium text-slate-300">Universidad de Cundinamarca</p>
          <p className="text-xs text-secondary italic">Especialización en Analítica y Ciencia de Datos</p>
        </div>
        <SlideNav onNext={onNext} />
      </div>
    </motion.div>
  );
};

export default Slide1;