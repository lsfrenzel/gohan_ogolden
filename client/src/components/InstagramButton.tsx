import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SiInstagram } from "react-icons/si";
import { useState } from "react";

export default function InstagramButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 150, damping: 12 }}
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing rings effect - reduzido em mobile */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-pink-400/30 hidden sm:block"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.8, 2.2],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut"
          }}
        />
      ))}
      
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ 
            scale: 1.15,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <Button
            asChild
            size="icon"
            className="w-16 h-16 rounded-full shadow-2xl relative overflow-hidden border-none cursor-pointer touch-manipulation"
            data-testid="button-instagram"
            style={{
              background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F56040, #FCAF45)",
              backgroundSize: "300% 300%",
              boxShadow: "0 0 40px rgba(131, 58, 180, 0.6), 0 10px 40px rgba(0, 0, 0, 0.3)"
            }}
          >
            <a 
              href="https://www.instagram.com/gohan.ogolden/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
              aria-label="Siga Gohan no Instagram"
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-50 hidden sm:block"
                style={{
                  background: "linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "300% 300%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Instagram icon */}
              <motion.div
                className="relative z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <SiInstagram 
                  className="w-7 h-7 text-white" 
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} 
                />
              </motion.div>
              
              {/* Sparkle effect - apenas no desktop */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full hidden md:block"
                  style={{
                    left: `${25 + i * 15}%`,
                    top: `${25 + i * 15}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </a>
          </Button>
        </motion.div>

        {/* Label animado que aparece ao lado - apenas desktop */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block"
            >
              <div 
                className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg"
                style={{
                  boxShadow: "0 4px 20px rgba(131, 58, 180, 0.4)"
                }}
              >
                @gohan.ogolden
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
