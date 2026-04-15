import { motion } from 'framer-motion';
import { History, Search, BarChart3, ArrowRight } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide8({ onNext, onPrev, onHome }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Módulo 3: <span className="text-secondary">Mirando al Pasado</span></h2>
        <p className="text-slate-400 italic text-lg">Analítica Descriptiva: ¿Qué sucedió y por qué?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
          <History className="text-secondary mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3">¿Qué es?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Es la base de la inteligencia de negocios. Consiste en tomar datos históricos  y resumirlos para identificar patrones. Sin entender el pasado, no podemos predecir el futuro.
          </p>
        </div>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
          <Search className="text-accent mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3">Tu Misión</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            En el siguiente slide, actuarás como un analista de datos. Usarás un editor de código para filtrar un dataset real de Recursos Humanos y visualizar las razones por las cuales los empleados dejan la empresa.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-6 py-3 bg-secondary/10 border border-secondary/30 rounded-full text-secondary text-sm font-bold flex items-center gap-2 animate-pulse">
           <BarChart3 size={18} /> Prepárate para programar tu primer gráfico
        </div>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}