import { ChevronRight, ChevronLeft, Home } from 'lucide-react';

export default function SlideNav({ onNext, onPrev, onHome }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-10 pb-4">
      {onPrev && (
        <button onClick={onPrev} className="flex items-center gap-2 px-3 py-1 sm:px-5 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-slate-300 border border-slate-700">
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" /> Atrás
        </button>
      )}

      {onHome && (
        <button onClick={onHome} className="p-2 sm:p-3 bg-slate-800 hover:text-secondary border border-slate-700 rounded-full transition-all group">
          <Home size={20} className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {onNext && (
        <button onClick={onNext} className="flex items-center gap-2 px-4 py-1 sm:px-8 sm:py-2 bg-secondary text-primary font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20">
          Siguiente <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
}