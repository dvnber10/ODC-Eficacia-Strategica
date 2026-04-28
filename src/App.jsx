import React, { useState } from 'react';

// Importación de Componentes de Slides
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
// Importación del Avatar
import Avatar from './components/Avatar';

// Importación de Archivos de Audio (Asegúrate de que la ruta sea correcta)
import audioS1 from './assets/audio/s1.mp3';
import audioS2 from './assets/audio/s2.mp3';
import audioS3 from './assets/audio/s3.mp3';
import audioS4 from './assets/audio/s4.mp3';
import audioS5 from './assets/audio/s5.mp3';
import audioS6 from './assets/audio/s6.mp3';
import audioS7 from './assets/audio/s7.mp3';
import audioS8 from './assets/audio/s8.mp3';
import audioS9 from './assets/audio/s9.mp3';
import audioS10 from './assets/audio/s10.mp3';
import audioS11 from './assets/audio/s11.mp3';
import audioS12 from './assets/audio/s12.mp3';
import audioS13 from './assets/audio/s13.mp3';
import audioS14 from './assets/audio/s14.mp3';
import audioS15 from './assets/audio/s15.mp3';
import audioS16 from './assets/audio/s16.mp3';
import audioS17 from './assets/audio/s17.mp3';
import audioS18 from './assets/audio/s18.mp3';
import audioS19 from './assets/audio/s19.mp3';

export default function App() {
  // Estado para controlar en qué slide estamos
  const [currentSlide, setCurrentSlide] = useState(1);

  // Función para cambiar de slide
  const goTo = (num) => setCurrentSlide(num);

  /**
   * Configuración de contenido del Avatar:
   * bubble: Texto corto que aparece en el globo.
   * audio: El archivo importado que se reproducirá.
   */
  const avatarData = {
    1: {
      bubble: "¡Bienvenidos! Soy tu guía en esta ruta estratégica.",
      audio: audioS1
    },
    2: {
      bubble: "Nuestra meta de hoy: El Resultado de Aprendizaje.",
      audio: audioS2
    },
    3: {
      bubble: "Explora los módulos a tu propio ritmo.",
      audio: audioS3
    },
    4: {
      bubble: "Módulo 1: Entendiendo el ADN de los datos.",
      audio: audioS4
    },
    5: {
      bubble: "El 80% de los datos no tienen forma definida. ¡Mira por qué!",
      audio: audioS5
    },
    6: { bubble: "Las 5 V's: El Fundamento inicial del Big Data.", audio: audioS6 },
    7: { bubble: "¿De dónde viene toda esta información?", audio: audioS7 },
    8: { bubble: "Analítica Descriptiva: Aprendiendo del pasado.", audio: audioS8 },
    9: { bubble: "¡Es tu turno de ser el analista! Modifica el código, al lado izquierdo tienes las variables para que cambies lo que quieres ver.", audio: audioS9 },
    10: {
      bubble: "Ahora es el momento de ver hacia el futuro, veremos lo que es el Machine Learning.",
      audio: audioS10
    },
     11: {
      bubble: "Es momento de simular el futuro y ver que sucede al utilizar Machine learning.",
      audio: audioS11
    },
    12: {
      bubble: "Analicemos la etica en los datos, no todo es color de rosa.",
      audio: audioS12
    },
    13: {
      bubble: "Recuerda que los modelos aprenden de los datos historicos, limpia los datos antes de empezar.",
      audio: audioS13
    },
    14: {
      bubble: "Los datos sin resultados no valen nada, demuestra lo que ocultan.",
      audio: audioS14
    },
    15: {
      bubble: "Pon a prueba tus conocimientos, descubre lo que ocultan los datos",
      audio: audioS15
    },
    16: {
      bubble: "Pon a prueba tus conocimientos, descubre lo que ocultan los datos",
      audio: audioS16
    },
    17: {
      bubble: "Pon a prueba tus conocimientos, descubre lo que ocultan los datos",
      audio: audioS17
    },
    18: {
      bubble: "Llego la hora muestra lo que encontraste.",
      audio: audioS18
    },
    19: {
      bubble: "Gracias por seguir este curso. Muchos exitos",
      audio: audioS19
    },
    
  };

  // Obtenemos los datos del slide actual o valores por defecto
  const currentContent = avatarData[currentSlide] || { bubble: "Continuemos...", audio: null };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col overflow-hidden relative font-sans">

      {/* Componente Avatar (Persistente en toda la App) */}
      <Avatar
        message={currentContent.bubble}
        audioFile={currentContent.audio}
      />

      {/* Área de Visualización de Slides */}
      <main className="flex-1 flex items-center justify-center p-4">

        {currentSlide === 1 && (
          <Slide1 onNext={() => goTo(2)} />
        )}

        {currentSlide === 2 && (
          <Slide2
            onNext={() => goTo(3)}
            onPrev={() => goTo(1)}
            onHome={() => goTo(1)}
          />
        )}

        {currentSlide === 3 && (
          <Slide3
            onPrev={() => goTo(2)}
            onHome={() => goTo(1)}
            onSelectModule={(id) => goTo(id)}
          />
        )}

        {currentSlide === 4 && (
          <Slide4
            onNext={() => goTo(5)}
            onPrev={() => goTo(3)}
            onHome={() => goTo(3)}
          />
        )}

        {currentSlide === 5 && (
          <Slide5
            onNext={() => goTo(6)}
            onPrev={() => goTo(4)}
            onHome={() => goTo(3)}
          />
        )}
        {currentSlide === 6 && (
          <Slide6
            onNext={() => goTo(7)}
            onPrev={() => goTo(5)}
            onHome={() => goTo(3)}
          />
        )}
        {currentSlide === 7 && (
          <Slide7
            onNext={() => goTo(8)}
            onPrev={() => goTo(6)}
            onHome={() => goTo(3)}
          />
        )}
        {currentSlide === 8 && <Slide8 onNext={() => goTo(9)} onPrev={() => goTo(7)} onHome={() => goTo(3)} />}
        {currentSlide === 9 && <Slide9 onNext={() => goTo(10)} onPrev={() => goTo(8)} onHome={() => goTo(3)} />}
        {currentSlide === 10 && <Slide10 onNext={() => goTo(11)} onPrev={() => goTo(9)} onHome={() => goTo(3)} />}
        {currentSlide === 11 && <Slide11 onNext={() => goTo(12)} onPrev={() => goTo(10)} onHome={() => goTo(3)} />}
        {currentSlide === 12 && <Slide12 onNext={() => goTo(13)} onPrev={() => goTo(11)} onHome={() => goTo(3)} />}
        {currentSlide === 13 && <Slide13 onNext={() => goTo(14)} onPrev={() => goTo(12)} onHome={() => goTo(3)} />}
        {currentSlide === 14 && <Slide14 onNext={() => goTo(15)} onPrev={() => goTo(13)} onHome={() => goTo(3)} />}
        {currentSlide === 15 && <Slide15 onNext={() => goTo(16)} onPrev={() => goTo(14)} onHome={() => goTo(3)} />}
        {currentSlide === 16 && <Slide16 onNext={() => goTo(17)} onPrev={() => goTo(15)} onHome={() => goTo(3)} />}
        {currentSlide === 17 && <Slide17 onNext={() => goTo(18)} onPrev={() => goTo(16)} onHome={() => goTo(3)} />}
        {currentSlide === 18 && <Slide18 onNext={() => goTo(19)} onPrev={() => goTo(17)} onHome={() => goTo(3)} />}
        {currentSlide === 19 && <Slide19 onNext={() => goTo(1)} onPrev={() => goTo(18)} onHome={() => goTo(3)} />}
      </main>

      {/* Indicador de progreso minimalista (opcional) */}
      <div className="fixed top-4 left-4 flex gap-1 z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((num) => (
          <div
            key={num}
            className={`h-1 w-8 rounded-full transition-all ${currentSlide === num ? 'bg-secondary w-12' : 'bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
}