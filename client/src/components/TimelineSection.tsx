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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {media.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.08,
                  type: "spring",
                  stiffness: 120,
                  damping: 15
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Card 
                  className="overflow-hidden cursor-pointer transition-all duration-300 group relative border-2"
                  data-testid={`media-${item.id}`}
                  onClick={() => onMediaClick?.(item.id)}
                  style={{
                    boxShadow: hoveredId === item.id 
                      ? "0 25px 60px rgba(245, 158, 11, 0.35), 0 15px 40px rgba(0, 0, 0, 0.25), inset 0 0 30px rgba(245, 158, 11, 0.1)"
                      : "0 8px 20px rgba(0, 0, 0, 0.12), 0 3px 8px rgba(0, 0, 0, 0.08)",
                    borderColor: hoveredId === item.id ? "rgba(245, 158, 11, 0.3)" : "transparent"
                  }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    {/* Gradient overlay for depth */}
                    <div 
                      className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at center, transparent 0%, rgba(245, 158, 11, 0.08) 100%)"
                      }}
                    />
                    
                    {/* Shimmer effect on hover */}
                    {hoveredId === item.id && (
                      <motion.div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                          background: "linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                        }}
                        initial={{ x: "-150%", y: "-150%" }}
                        animate={{ x: "150%", y: "150%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Corner glow effect */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at top right, rgba(251, 191, 36, 0.4), transparent 70%)",
                        opacity: hoveredId === item.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.img 
                      src={item.type === 'video' ? item.thumbnail : item.url} 
                      alt={`Gohan in ${year}`}
                      className="w-full h-full object-cover relative z-10"
                      animate={{ 
                        scale: hoveredId === item.id ? 1.12 : 1,
                        filter: hoveredId === item.id ? "brightness(1.1) saturate(1.1)" : "brightness(1) saturate(1)"
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    {item.type === 'video' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center transition-all duration-300 z-30"
                        style={{
                          background: hoveredId === item.id 
                            ? "radial-gradient(circle, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 100%)"
                            : "radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)"
                        }}
                      >
                        {/* Pulsing rings behind play button */}
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ 
                              scale: hoveredId === item.id ? [1, 2] : 1,
                              opacity: hoveredId === item.id ? [0.4, 0] : 0
                            }}
                            transition={{
                              duration: 1.8,
                              repeat: hoveredId === item.id ? Infinity : 0,
                              delay: i * 0.6,
                              ease: "easeOut"
                            }}
                          >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-3 border-amber-400" />
                          </motion.div>
                        ))}
                        
                        <motion.div 
                          animate={{ 
                            scale: hoveredId === item.id ? [1, 1.15, 1] : 1,
                            rotate: hoveredId === item.id ? [0, 5, -5, 0] : 0
                          }}
                          transition={{ 
                            duration: 0.6,
                            repeat: hoveredId === item.id ? Infinity : 0,
                            repeatDelay: 0.5
                          }}
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                          style={{
                            background: "linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)",
                            boxShadow: hoveredId === item.id 
                              ? "0 0 40px rgba(245, 158, 11, 0.8), 0 15px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)"
                              : "0 0 25px rgba(245, 158, 11, 0.6), 0 10px 30px rgba(0, 0, 0, 0.3)"
                          }}
                        >
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white ml-1" fill="currentColor" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }} />
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
