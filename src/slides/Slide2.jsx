import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';
import SlideNav from '../components/SlideNav';

const Slide2 = ({ onNext, onPrev, onHome }) => {
  return (
    <div className="flex flex-col min-h-[82vh] w-full items-center justify-center p-4">
      
      {/* Contenedor Principal: Se apila en móvil, se expande en escritorio */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16">

        {/* Bloque REA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/30 border border-slate-700 p-5 sm:p-6 rounded-[24px] md:rounded-[32px] hover:border-secondary/50 transition-colors group flex flex-col items-start text-left"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="text-secondary" size={24} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">Resultado de Aprendizaje</h2>
          <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm leading-relaxed">
            Al finalizar, serás capaz de <span className="text-white font-medium">identificar patrones</span> y gestionar Big Data para optimizar la toma de decisiones estratégicas.
          </p>
        </motion.div>

        {/* Bloque Población */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 border border-slate-700 p-5 sm:p-6 rounded-[24px] md:rounded-[32px] hover:border-accent/50 transition-colors group flex flex-col items-start text-left"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="text-accent" size={24} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">Población Objetivo</h2>
          <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm leading-relaxed">
            Diseñado para <span className="text-white font-medium">líderes y analistas</span> interesados en transformar datos históricos en ventajas competitivas sostenibles.
          </p>
        </motion.div>

        {/* Bloque Metodología */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/30 border border-slate-700 p-5 sm:p-6 rounded-[24px] md:rounded-[32px] hover:border-purple-500/50 transition-colors group flex flex-col items-start text-left"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="text-purple-400" size={24} />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">Metodología</h2>
          <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm leading-relaxed">
            Enfoque <span className="text-white font-medium">Learning by Doing</span>: Resolución de un caso real (TechNova Inc.) con laboratorios de Python y simulaciones.
          </p>
        </motion.div>

      </div>
      
      {/* Navegación: Se mantiene fija o al final del flujo */}
      <SlideNav onPrev={onPrev} onNext={onNext} onHome={onHome} />
    </div>
  );
};

export default Slide2;