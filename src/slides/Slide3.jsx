import { motion } from 'framer-motion';
import { 
  Database, Zap, BarChart2, TrendingUp, 
  Brain, Settings, Presentation, Award 
} from 'lucide-react';
import SlideNav from '../components/SlideNav';

const modules = [
  { id: 4, title: "ADN de los Datos", icon: Database, color: "text-blue-400" },
  { id: 6, title: "Ecosistema Big Data", icon: Zap, color: "text-yellow-400" },
  { id: 8, title: "Mirando el Pasado", icon: BarChart2, color: "text-purple-400" },
  { id: 10, title: "Anticipando el Futuro", icon: TrendingUp, color: "text-accent" },
  { id: 12, title: "Factor Humano", icon: Brain, color: "text-pink-400" },
  { id: 15, title: "Taller Práctico", icon: Settings, color: "text-slate-300" },
  { id: 17, title: "Data Storytelling", icon: Presentation, color: "text-orange-400" },
  { id: 18, title: "Evaluación Final", icon: Award, color: "text-secondary" },
];

export default function Slide3({ onPrev, onHome, onSelectModule }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full max-w-5xl px-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black tracking-tight">Ruta de Aprendizaje</h2>
        <p className="text-slate-400 mt-2 italic">Selecciona un módulo para comenzar tu formación</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {modules.map((m) => (
          <motion.button
            key={m.id}
            whileHover={{ y: -5, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectModule(m.id)}
            className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl flex flex-col items-center text-center transition-all group shadow-lg"
          >
            <div className={`p-4 rounded-xl bg-slate-900 mb-4 group-hover:scale-110 transition-transform`}>
              <m.icon className={m.color} size={28} />
            </div>
            <span className="text-sm font-bold text-slate-200 leading-tight">{m.title}</span>
          </motion.button>
        ))}
      </div>

      <SlideNav onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}