import { motion } from 'framer-motion';
import { Target, Users } from 'lucide-react';
import SlideNav from '../components/SlideNav';

const Slide2 = ({ onNext, onPrev, onHome }) => {
  return (
    <div>
      <SlideNav onHome={onHome}/>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-4">

        {/* Bloque REA */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/30 border border-slate-700 p-10 rounded-3xl hover:border-secondary/50 transition-colors group"
        >
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="text-secondary" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Resultado de Aprendizaje</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Al finalizar la interacción, serás capaz de <span className="text-white font-medium">identificar patrones</span> y categorizar capacidades dinámicas para la gestión de Big Data, optimizando la eficacia en la toma de decisiones estratégicas mediante el uso de Analitica de datos.
          </p>
        </motion.div>

        {/* Bloque Población */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}z
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 border border-slate-700 p-10 rounded-3xl hover:border-accent/50 transition-colors group"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Users className="text-accent" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Población Objetivo</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Diseñado para <span className="text-white font-medium">líderes empresariales, analistas de datos</span> y estudiantes de posgrado que esten interesados en aprender a transformar los datos históricos en ventajas competitivas sostenibles.
          </p>
        </motion.div>
        <SlideNav onPrev={onPrev} />
        <SlideNav onNext={onNext} />
      </div>
    </div>
  );
};

export default Slide2;