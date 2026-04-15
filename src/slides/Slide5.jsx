import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Share2, FileText, X, Eye, FileJson, Video } from 'lucide-react';
import SlideNav from '../components/SlideNav';

export default function Slide5({ onNext, onPrev, onHome }) {
  const [activeModal, setActiveModal] = useState(null);

  const dataTypes = [
    { 
      id: "structured",
      title: "Estructurados", 
      icon: <Table size={32} />, 
      color: "text-green-400",
      btnColor: "bg-green-600",
      desc: "Datos con formato rígido y tablas definidas.",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300 border-collapse">
            <thead className="text-xs uppercase bg-slate-700 text-green-400">
              <tr>
                <th className="p-3 border border-slate-600">ID_Cliente</th>
                <th className="p-3 border border-slate-600">Nombre</th>
                <th className="p-3 border border-slate-600">Venta_USD</th>
                <th className="p-3 border border-slate-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 border border-slate-600 font-mono text-xs">001-A</td>
                <td className="p-3 border border-slate-600">Juan Pérez</td>
                <td className="p-3 border border-slate-600">$450.00</td>
                <td className="p-3 border border-slate-600">2024-05-20</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <td className="p-3 border border-slate-600 font-mono text-xs">002-B</td>
                <td className="p-3 border border-slate-600">Ana Gómez</td>
                <td className="p-3 border border-slate-600">$1,200.50</td>
                <td className="p-3 border border-slate-600">2024-05-21</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs text-slate-400 italic text-center">Ejemplo de vista de Hoja de Cálculo / SQL</p>
        </div>
      )
    },
    { 
      id: "semistructured",
      title: "Semi-estructurados", 
      icon: <Share2 size={32} />, 
      color: "text-yellow-400",
      btnColor: "bg-yellow-600",
      desc: "Formatos flexibles como JSON o XML.",
      content: (
        <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-yellow-200 border border-yellow-500/20 leading-relaxed shadow-inner">
          <pre>
{`{
  "cliente": "001-A",
  "datos": {
    "nombre": "Juan Pérez",
    "intereses": ["Tecnología", "IA"],
    "metadatos": {
      "navegador": "Brave",
      "ip": "192.168.1.1"
    }
  }
}`}
          </pre>
          <p className="mt-4 text-xs text-slate-500 italic text-center">Ejemplo de estructura JSON (API/Web)</p>
        </div>
      )
    },
    { 
      id: "unstructured",
      title: "No Estructurados", 
      icon: <FileText size={32} />, 
      color: "text-red-400",
      btnColor: "bg-red-600",
      desc: "Videos, audios y contenido multimedia.",
      content: (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-700 shadow-2xl">
          {/* Reemplaza esta URL por el video que desees */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/dHM-kuxz4w4?si=rxyuyx1QONUFTTfL?autoplay=1" 
            title="Video representativo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl w-full px-4 relative">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">1.2 <span className="text-secondary">Naturaleza de los Datos</span></h2>
        <p className="text-slate-400 italic text-sm">Explora los ejemplos reales haciendo clic en cada categoría.</p>
      </div>

      {/* Tarjetas Principales */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {dataTypes.map((type) => (
          <div key={type.id} className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center shadow-lg">
            <div className={`p-4 bg-slate-900 rounded-2xl mb-5 ${type.color}`}>
              {type.icon}
            </div>
            <h3 className="font-bold text-2xl mb-3">{type.title}</h3>
            <p className="text-sm text-slate-400 mb-6">{type.desc}</p>
            <button 
              onClick={() => setActiveModal(type)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold transition-all hover:brightness-110 active:scale-95 shadow-lg ${type.btnColor}`}
            >
              <Eye size={16} /> Ver ejemplo real
            </button>
          </div>
        ))}
      </div>

      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />

      {/* MODAL FLOTANTE (OVERLAY) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fondo Oscuro / Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Ventana Flotante */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-600 w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden z-10"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <span className={activeModal.color}>{activeModal.icon}</span>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Ejemplo de Datos {activeModal.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                {activeModal.content}
              </div>

              <div className="p-4 bg-slate-900/50 text-center">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-xs font-bold text-slate-500 hover:text-secondary uppercase tracking-widest"
                >
                  Cerrar Ventana
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}