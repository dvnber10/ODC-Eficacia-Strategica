import React from 'react';
import { motion } from 'framer-motion';
import SlideNav from '../components/SlideNav';

export default function Slide20({ onNext, onPrev, onHome }) {
  // Lista de referencias (Ordenada alfabéticamente)
  const references = [
    "Anónimo. (2024). Decisiones empresariales mediante la analítica de datos [Tesis de grado]. Repositorio Institucional. https://hdl.handle.net/1992/74868",
    "CerTIC. (2023). Certificaciones Internacionales TIC [Archivo de Video]. YouTube. https://www.youtube.com/watch?v=dHM-kuxz4w4",
    "IBM. (s.f.). ¿Qué es la procedencia de los datos? Recuperado el 5 de mayo de 2026 de https://www.ibm.com/mx-es/think/topics/data-provenance",
    "Mustafa Cagri, I. (2022). Analítica de datos en la logística moderna. Mecalux. https://www.mecalux.com.ar/articulos-de-logistica/mustafa-cagri-analitica-datos-wms",
    "Ramírez, S. (2021). Big Data: Preprocesamiento y calidad de datos. Universidad de Sevilla. http://150.214.190.154/sites/default/files/ficherosPublicaciones/2133_Nv237-Digital-sramirez.pdf",
    "The Bridge. (2023). Diferencias entre datos estructurados, no estructurados y semiestructurados. Blog de Tecnología. https://thebridge.tech/blog/diferencias-entre-datos-estructurados-no-estructurados-y-semiestructurados/",
    "Vincula Tégica. (2020). La analítica de datos como ventaja competitiva en las organizaciones. Revista de la UANL. https://vinculategica.uanl.mx/index.php/v/article/view/520",
    "Zapata-Cano, A., & otros. (2022). Recursos y estrategias para la enseñanza de la estadística y la analítica de datos. Formación Universitaria, 15(3). https://doi.org/10.4067/S0718-50062022000300061",
    "Awasthi, A., et al. (2025). Cerrando las brechas de madurez en la ciencia de datos industrial (IoT). Technologies, 13(1), 22.",
  "Chang, Y. T., et al. (2025). Analizando las interrelaciones de los indicadores en la industria de servicios de datos abiertos. Technology in Society, 82, 102880.",
  "Ciampi, F., Demi, S., Magrini, A., Marzi, G., & Papa, A. (2021). Exploring the impact of big data analytics capabilities on business model innovation. Journal of Business Research, 123, 1–13.",
  "Expósito, A., & Rodríguez-Díaz, B. (2026). Business Digitalization and Innovation. International Encyclopedia of Business Management. Elsevier Inc.",
  "Gökalp, M. O., et al. (2022). Un modelo de evaluación de procesos para la analítica de datos masivos. Computer Standards & Interfaces, 80, 103585.",
  "Gupta, S., et al. (2021). Big data y rendimiento de marketing de la empresa: hallazgos desde una visión basada en el conocimiento. Technological Forecasting and Social Change, 171, 120986.",
  "Iqbal, N., et al. (2021). Un nuevo sistema de gestión de información de clínicas veterinarias confiable y basado en blockchain. IEEE Access, 9, 8069-8098.",
  "Korayim, D., Chotia, V., Jain, G., Hassan, S., & Paolone, F. (2024). How big data analytics can create competitive advantage in high-stake decision forecasting? Technological Forecasting & Social Change, 199, 123040.",
  "Merhi, M. I. (2021). Evaluating the critical success factors of data intelligence implementation in the public sector using analytical hierarchy process. Technological Forecasting & Social Change, 173, 121180.",
  "Münter, M. T. (2026). Data-Driven Organizations. International Encyclopedia of Business Management. Elsevier Inc.",
  "Naif Bin Sulaiman Al-Mutlaq & Nazem Mahmoud Malkawi. (2026). The Impact of Artificial Intelligence on the Quality of Strategic Decisions. IEEE Access. DOI: 10.1109/ACCESS.2026.3666947",
  "Rafiq, U., et al. (2025). Analítica de datos en startups de software: comprendiendo conceptos clave y desafíos críticos. Information and Software Technology, 180, 107652.",
  "Rahman, M. M., et al. (2024). Análisis de grandes datos de codificación: Perspectivas y aplicaciones. IEEE Access, 12, 3521383.",
  "Ranjan, J., & Foropon, C. (2021). Analítica de Datos Masivos para Construir la Inteligencia Competitiva de las Organizaciones. International Journal of Information Management, 56, 102231.",
  "Santos, E., & Oliveira, M. F. (2026). Análisis de datos en la toma de decisiones. International Encyclopedia of Business Management. Elsevier.",
  "Sasaki, Y. (2022). Una encuesta sobre sistemas analíticos de datos masivos de IoT. IEEE Internet of Things Journal, 9(12), 9400-9414.",
  "Saura, J. R., et al. (2019). Comparando un enfoque tradicional frente a una técnica de Big Data en comunicación financiera. IEEE Access, 7, 37100-37108.",
  "Shah, T. R. (2022). Can big data analytics help organisations achieve sustainable competitive advantage? Technology in Society, 68, 101801.",
  "Taherdoost, H. (2023). Navigating the ethical and privacy concerns of big data and machine learning in decision making. Intelligent and Converged Networks, 4(4), 280-295.",
  "Wamba, S. F., et al. (2017). Big data analytics and firm performance: Effects of dynamic capabilities. Journal of Business Research, 70, 356-365.",
  "Xian Zhu. (2026). Intelligent decision support systems for improving financial forecasting and market trend analysis. Expert Systems With Applications, 297, 129462.",
  "Zhang JianGang & Hazirah Bee Yusof Ali. (2025). Predictive Analytics Model for AI-Enhanced Decision Support in Corporate Management. Journal of Computers, Mechanical and Management, 4(6)."
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full flex flex-col h-full">
      <div className="mb-6 flex justify-between items-end border-b border-slate-800 pb-4">
        <h2 className="text-3xl font-bold text-accent">Referencias</h2>
        <span className="text-[10px] text-slate-500 font-mono italic">Norma APA 7ma Edición</span>
      </div>
      
      <div className="bg-slate-900/30 rounded-3xl p-8 overflow-y-auto max-h-[60vh] custom-scrollbar border border-white/5">
        <div className="space-y-6 text-left text-slate-300">
          {references.sort().map((ref, index) => (
            <p key={index} className="text-[12px] pl-8 -indent-8 leading-relaxed hover:text-white transition-colors">
              {ref}
            </p>
          ))}
        </div>
      </div>
      
      <SlideNav onNext={onNext} onPrev={onPrev} onHome={onHome} />
    </motion.div>
  );
}