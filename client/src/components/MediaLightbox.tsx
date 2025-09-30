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

  const handleMediaClick = () => {
    if (media.length > 1) {
      goToNext();
    }
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
      <DialogContent className="max-w-[100vw] w-full h-[100vh] sm:max-w-[95vw] sm:h-[95vh] p-0 bg-black/98 border-none overflow-hidden">
        <div 
          className="relative w-full h-full cursor-pointer" 
          onClick={onClose}
        >
          {/* Conteúdo de mídia */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center z-10 p-4"
            >
              {currentMedia.type === 'image' ? (
                <img
                  src={currentMedia.url}
                  alt={`Gohan ${currentMedia.year || ''}`}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMediaClick();
                  }}
                  data-testid={`img-lightbox-${index}`}
                />
              ) : (
                <video
                  src={currentMedia.url}
                  controls
                  autoPlay
                  loop
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  data-testid={`video-lightbox-${index}`}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Contador */}
          {media.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="text-white/90 text-sm sm:text-base font-medium bg-black/50 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/20 shadow-lg">
                {index + 1} / {media.length}
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
