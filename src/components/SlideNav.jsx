import { ChevronRight, ChevronLeft, Home } from 'lucide-react';

export default function SlideNav({ onNext, onPrev, onHome }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-10 pb-4">
      {onPrev && (
        <button onClick={onPrev} className="flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-slate-300 border border-slate-700">
          <ChevronLeft size={20} /> Atrás
        </button>
      )}

      {onHome && (
        <button onClick={onHome} className="p-3 bg-slate-800 hover:text-secondary border border-slate-700 rounded-full transition-all group">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {onNext && (
        <button onClick={onNext} className="flex items-center gap-2 px-8 py-2 bg-secondary text-primary font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20">
          Siguiente <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}