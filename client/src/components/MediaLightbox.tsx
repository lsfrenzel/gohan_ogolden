import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  year?: number;
}

interface MediaLightboxProps {
  media: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaLightbox({ media, currentIndex, isOpen, onClose }: MediaLightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    if (isOpen) {
      setIndex(currentIndex);
    }
  }, [currentIndex, isOpen]);

  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, media.length]);

  if (media.length === 0) return null;

  const currentMedia = media[index];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black/98 border-none overflow-hidden">
        <div className="relative w-full h-full">
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 z-[200] text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-md bg-black/40 rounded-full w-12 h-12 border border-white/20 transition-all duration-200 hover:scale-110"
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </Button>

          {media.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[200] text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-md bg-black/40 rounded-full w-14 h-14 sm:w-16 sm:h-16 border border-white/20 transition-all duration-200 hover:scale-110 shadow-2xl"
                data-testid="button-previous-media"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
              </Button>

              <Button
                onClick={goToNext}
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[200] text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-md bg-black/40 rounded-full w-14 h-14 sm:w-16 sm:h-16 border border-white/20 transition-all duration-200 hover:scale-110 shadow-2xl"
                data-testid="button-next-media"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </Button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 z-[10]"
              style={{ 
                paddingTop: '4rem',
                paddingBottom: '5rem',
                paddingLeft: '5rem',
                paddingRight: '5rem'
              }}
            >
              {currentMedia.type === 'image' ? (
                <img
                  src={currentMedia.url}
                  alt={`Gohan ${currentMedia.year || ''}`}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  data-testid={`img-lightbox-${index}`}
                />
              ) : (
                <video
                  src={currentMedia.url}
                  controls
                  autoPlay
                  loop
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  data-testid={`video-lightbox-${index}`}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {media.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
                {index + 1} / {media.length}
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
