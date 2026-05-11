// slide de agradecimientos
import { motion } from 'framer-motion';
import SlideNav from '../components/SlideNav';

export default function Slide22({ onNext, onPrev, onHome }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full">
      <h2 className="text-3xl font-bold text-secondary mb-8">Agradecimientos</h2>
      <p className="text-lg text-slate-300 italic leading-relaxed mb-12">
        Quiero expresar mi más profundo agradecimiento a todos los que han hecho posible este curso. A mi instructora Marcela Devia Barbosa por la guia en la creacion de este recurso, a mis compañeros de clase, y a la Universidad de cundinamarca con su especializacion en Analitica y ciencia de datos por su apoyo y colaboración. Este recurso es el resultado de un esfuerzo conjunto y estamos emocionados de compartirlo con ustedes.
      </p>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}