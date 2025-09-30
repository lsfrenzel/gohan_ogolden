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
      <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          {media.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                size="icon"
                variant="ghost"
                className="absolute left-4 z-50 text-white hover:bg-white/20 w-12 h-12"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                onClick={goToNext}
                size="icon"
                variant="ghost"
                className="absolute right-4 z-50 text-white hover:bg-white/20 w-12 h-12"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              {currentMedia.type === 'image' ? (
                <img
                  src={currentMedia.url}
                  alt={`Gohan ${currentMedia.year || ''}`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={currentMedia.url}
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-full"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {media.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {index + 1} / {media.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
