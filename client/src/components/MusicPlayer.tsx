import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import backgroundMusicUrl from "@assets/Falling In Love_1759257959225.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tryPlayAudio = () => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.play().then(() => {
        setShowPlayButton(false);
        setHasInteracted(true);
      }).catch(() => {
        setShowPlayButton(true);
      });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      tryPlayAudio();
    }

    const handleFirstInteraction = () => {
      tryPlayAudio();
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setShowPlayButton(false);
        setHasInteracted(true);
      });
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop
        autoPlay
        src={backgroundMusicUrl}
      />
      
      {showPlayButton && (
        <Button
          onClick={handlePlay}
          size="icon"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl animate-pulse"
          data-testid="button-music-play"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      )}
    </>
  );
}
