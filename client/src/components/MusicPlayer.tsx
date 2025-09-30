import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        setShowPlayButton(true);
      });
    }
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setShowPlayButton(false);
      });
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop
        autoPlay
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
      />
      
      {showPlayButton && (
        <Button
          onClick={handlePlay}
          size="icon"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl"
          data-testid="button-music-play"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      )}
    </>
  );
}
