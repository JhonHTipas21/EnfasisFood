// ================================================================
// ÉNFASIS FOOD — Music Player (Ambientación Salsa)
// ================================================================
import { useState, useEffect, useRef } from 'react';
import salsaAudio from '../../assets/audio/ambientacion_salsa.mp3';
import './MusicPlayer.css';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(salsaAudio);
    audio.loop = true;
    audio.volume = 1.0; // Adaptado al volumen real del dispositivo (100% de ganancia)
    audioRef.current = audio;

    // Intentar reproducción automática continua
    const startAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Si el navegador bloquea autoplay sin gesto del usuario,
          // adjuntar listener para arrancar en la primera interacción
          setIsPlaying(false);
          const handleFirstInteraction = () => {
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
          window.addEventListener('scroll', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
        });
    };

    startAudio();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <button
      id="music-player-toggle"
      className={`music-player-widget ${isPlaying ? 'music-player-widget--playing' : ''}`}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
      title={isPlaying ? 'Pausar música salsa' : 'Activar música salsa'}
    >
      <div className="music-player__icon-wrap">
        <div className="music-player__equalizer" aria-hidden="true">
          <span className="music-player__bar" />
          <span className="music-player__bar" />
          <span className="music-player__bar" />
          <span className="music-player__bar" />
        </div>
      </div>

      <div className="music-player__info">
        <span className="music-player__label">
          {isPlaying ? 'Salsa en Vivo 🎺' : 'Música Pausada 🔇'}
        </span>
        <span className="music-player__badge">
          {isPlaying ? 'Tocando · Click para pausar' : 'Click para activar'}
        </span>
      </div>
    </button>
  );
};
