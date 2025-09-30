import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface TimelineSectionProps {
  year: number;
  age: string;
  media: MediaItem[];
  isFirst?: boolean;
  onMediaClick?: (mediaId: string) => void;
}

export default function TimelineSection({ year, age, media, isFirst = false, onMediaClick }: TimelineSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex gap-4 sm:gap-6 md:gap-8 pb-12 sm:pb-16"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary border-2 sm:border-[3px] md:border-4 border-background shadow-lg flex items-center justify-center ${isFirst ? '' : 'mt-4 sm:mt-6 md:mt-8'}`}
        >
          <span className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-foreground">
            {year}
          </span>
        </motion.div>
        <motion.div 
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-0.5 sm:w-1 flex-1 bg-primary/30 mt-4"
        />
      </div>
      
      <div className="flex-1 pt-3 sm:pt-4 md:pt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 sm:mb-4 md:mb-6"
        >
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            Ano {year}
          </h2>
          <p className="font-heading text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            {age}
          </p>
        </motion.div>
        
        {media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {media.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Card 
                  className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 group"
                  data-testid={`media-${item.id}`}
                  onClick={() => onMediaClick?.(item.id)}
                >
                  <div className="relative aspect-square">
                    <motion.img 
                      src={item.type === 'video' ? item.thumbnail : item.url} 
                      alt={`Gohan in ${year}`}
                      className="w-full h-full object-cover"
                      animate={{ 
                        scale: hoveredId === item.id ? 1.1 : 1 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {item.type === 'video' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg"
                        >
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary-foreground ml-0.5 sm:ml-1" fill="currentColor" />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 sm:p-8 md:p-10 lg:p-12 text-center border-dashed">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 opacity-20"
              >
                🐾
              </motion.div>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Ainda não há fotos - adicione as primeiras memórias do Gohan!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
