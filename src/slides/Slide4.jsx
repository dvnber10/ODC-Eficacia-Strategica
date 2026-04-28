import { motion } from 'framer-motion';
import { Database, ArrowRight, Lightbulb, BarChart } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide4({ onNext, onPrev, onHome }) {
  const steps = [
    { title: "Dato", desc: "Cifra cruda sin contexto.", icon: "📄", color: "bg-slate-700" },
    { title: "Información", desc: "Dato procesado con significado.", icon: "📈", color: "bg-blue-600" },
    { title: "Conocimiento", desc: "Información aplicada a la estrategia.", icon: "🧠", color: "bg-secondary text-primary" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary">Módulo 1: El ADN de los Datos</h2>
        <p className="text-slate-400">La evolución de la materia prima hacia la inteligencia de negocios.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {steps.map((s, i) => (
          <div key={i} className="relative p-6 rounded-3xl bg-slate-800/50 border border-slate-700 flex flex-col items-center text-center group hover:border-secondary transition-all">
            <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            {i < 2 && <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-slate-600" />}
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-2xl italic text-blue-200 text-sm">
        "En la analítica moderna, el éxito no depende de cuántos datos tienes, sino de qué tan rápido puedes moverte de un 'Dato' a un 'Conocimiento' accionable."

        <a
          href="https://biblioguias.cepal.org/GestionDelConocimiento/modulo-1-datos-informacion-conocimiento"
          className="ml-2 text-blue-400 font-semibold underline decoration-2 underline-offset-4 hover:text-blue-300 transition-colors"
        >
          Saber más →
        </a>
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}