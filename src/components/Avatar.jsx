import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Square } from 'lucide-react';
import avatarImg from '../assets/avatar.jpeg';

const Avatar = ({ message, audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. Cleanup previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (audioFile) {
      // 2. Initialize new audio
      const audio = new Audio(audioFile);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);

      // 3. Attempt Autoplay
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          // This will trigger if the browser blocks autoplay
          console.warn("Autoplay blocked: User must interact with the page first.");
          setIsPlaying(false);
        }
      };

      playAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioFile]); // Triggered every time the audioFile (slide) changes

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error manual playback:", err));
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -1000, right: 0, top: -500, bottom: 0 }}
      className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 flex items-end gap-3 sm:gap-4 z-50 pointer-events-auto cursor-grab"
    >
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white text-slate-900 p-2 sm:p-4 rounded-2xl rounded-br-none shadow-2xl max-w-[150px] sm:max-w-[200px] border-2 border-secondary relative select-none"
          >
            <p className="text-[10px] sm:text-xs font-bold italic leading-tight">{message}</p>
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white border-r-2 border-b-2 border-secondary transform rotate-45"></div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAudio();
          }}
          className={`flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase rounded-full transition-all shadow-lg active:scale-90 ${isPlaying
              ? 'bg-red-500 text-white'
              : 'bg-secondary text-primary hover:bg-white hover:text-slate-900 border border-secondary'
            }`}
        >
          {isPlaying ? <Square size={12} fill="currentColor" /> : <Volume2 size={14} />}
          {isPlaying ? 'Detener' : 'Escuchar explicación'}
        </button>
      </div>

      <div className="relative group">
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] } : { y: [0, -5, 0] }}
          transition={isPlaying ? { duration: 0.5, repeat: Infinity } : { duration: 4, repeat: Infinity }}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 shadow-xl bg-slate-800 ${isPlaying ? 'border-accent' : 'border-secondary'
            }`}
        >
          <img src={avatarImg} alt="AI" className="w-full h-full object-cover select-none pointer-events-none" />
        </motion.div>
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
        )}
      </div>
    </motion.div>
  );
};

export default Avatar;