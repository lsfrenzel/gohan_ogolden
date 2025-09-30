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
          initial={{ scale: 0, rotateY: -180, opacity: 0 }}
          animate={isInView ? { scale: 1, rotateY: 0, opacity: 1 } : { scale: 0, rotateY: -180, opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 150,
            delay: 0.2
          }}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5 }
          }}
          className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-2xl flex items-center justify-center cursor-pointer ${isFirst ? '' : 'mt-4 sm:mt-6 md:mt-8'} relative`}
          style={{
            background: "linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)",
            boxShadow: "0 0 30px rgba(245, 158, 11, 0.5), 0 10px 40px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Rotating ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-amber-300/50"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing glow effect */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-amber-400/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
          
          <span className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            {year}
          </span>
        </motion.div>
        
        {/* Animated timeline connector */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={isInView ? { height: "100%", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-1 flex-1 mt-4 relative overflow-hidden rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(245, 158, 11, 0.6), rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.1))"
          }}
        >
          {/* Flowing light effect */}
          <motion.div
            className="absolute inset-0 w-full"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
              height: "30%"
            }}
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
      
      <div className="flex-1 pt-3 sm:pt-4 md:pt-6">
        <motion.div 
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
          className="mb-3 sm:mb-4 md:mb-6"
        >
          <motion.h2 
            className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 relative inline-block"
            whileHover={{ scale: 1.05, x: 5 }}
            style={{
              background: "linear-gradient(135deg, #92400E, #F59E0B, #FBBF24)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(135deg, #92400E, #F59E0B, #FBBF24, #F59E0B)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block"
              }}
            >
              Ano {year}
            </motion.span>
          </motion.h2>
          <motion.p 
            className="font-heading text-sm sm:text-base md:text-lg lg:text-xl text-amber-700/80 font-medium"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {age}
          </motion.p>
        </motion.div>
        
        {media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {media.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -12,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card 
                  className="overflow-hidden cursor-pointer transition-all duration-300 group relative"
                  data-testid={`media-${item.id}`}
                  onClick={() => onMediaClick?.(item.id)}
                  style={{
                    boxShadow: hoveredId === item.id 
                      ? "0 20px 50px rgba(245, 158, 11, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)"
                      : "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* Shimmer effect on hover */}
                    {hoveredId === item.id && (
                      <motion.div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                        }}
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                    
                    <motion.img 
                      src={item.type === 'video' ? item.thumbnail : item.url} 
                      alt={`Gohan in ${year}`}
                      className="w-full h-full object-cover"
                      animate={{ 
                        scale: hoveredId === item.id ? 1.15 : 1,
                        filter: hoveredId === item.id ? "brightness(1.1)" : "brightness(1)"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    {item.type === 'video' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          background: hoveredId === item.id 
                            ? "radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)"
                            : "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)"
                        }}
                      >
                        {/* Pulsing rings behind play button */}
                        {hoveredId === item.id && [0, 1].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ 
                              scale: [1, 1.8],
                              opacity: [0.3, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.75,
                              ease: "easeOut"
                            }}
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400" />
                          </motion.div>
                        ))}
                        
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                          style={{
                            background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                            boxShadow: "0 0 30px rgba(245, 158, 11, 0.6), 0 10px 30px rgba(0, 0, 0, 0.3)"
                          }}
                        >
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
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
