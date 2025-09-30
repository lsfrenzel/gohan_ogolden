import gohanImage from "@assets/gohan_1759242750019.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
import MediaLightbox from "./MediaLightbox";

export default function HeroSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const heroMedia = [
    {
      id: 'hero-gohan-1',
      type: 'image' as const,
      url: gohanImage,
    },
    {
      id: 'hero-gohan-2',
      type: 'image' as const,
      url: '/uploads/1759186370726-488456491.jpg',
    },
    {
      id: 'hero-gohan-3',
      type: 'image' as const,
      url: '/uploads/1759234937338-748657691.jpg',
    },
    {
      id: 'hero-gohan-4',
      type: 'image' as const,
      url: '/uploads/1759240740973-264380440.jpg',
    },
  ];

  return (
    <div className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 animate-gradient opacity-90"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className={`rounded-full ${i % 3 === 0 ? 'bg-amber-300' : i % 3 === 1 ? 'bg-orange-300' : 'bg-yellow-300'}`} 
                 style={{ width: `${4 + Math.random() * 8}px`, height: `${4 + Math.random() * 8}px` }} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="mb-4 sm:mb-6 md:mb-8 flex justify-center perspective-1000"
        >
          <div className="relative group">
            {/* Rotating gradient ring behind */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #F59E0B, #FBBF24, #FCD34D, #F59E0B)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-amber-400"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ 
                  scale: [1, 1.3, 1.6],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl cursor-pointer magical-glow"
              style={{
                background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))",
                border: "4px solid transparent",
                backgroundClip: "padding-box",
              }}
              onClick={() => setIsLightboxOpen(true)}
            >
              <div className="absolute inset-[3px] rounded-full overflow-hidden">
                <motion.img 
                  src={gohanImage} 
                  alt="Gohan the golden retriever" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  data-testid="img-hero-gohan"
                />
              </div>
            </motion.div>
            
            {/* Animated paw badge with bounce */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
              }}
              transition={{ 
                delay: 0.8, 
                type: "spring", 
                stiffness: 200,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
              className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.6), 0 10px 30px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🐾
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 relative"
          style={{
            background: "linear-gradient(135deg, #92400E, #F59E0B, #FBBF24, #F59E0B, #92400E)",
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
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(135deg, #92400E, #F59E0B, #FBBF24, #F59E0B, #92400E)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block"
            }}
          >
            Jornada do Gohan
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-700 mb-3 sm:mb-4 md:mb-6 px-4 font-semibold"
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 10px rgba(245, 158, 11, 0.3)",
                "0 0 20px rgba(245, 158, 11, 0.5)",
                "0 0 10px rgba(245, 158, 11, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Gohan, O Golden
          </motion.span>
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm sm:text-base md:text-lg text-amber-800/80 max-w-2xl mx-auto px-4 leading-relaxed"
        >
          Bem-vindo à linha do tempo do Gohan! Acompanhe a incrível jornada do nosso amado golden retriever, desde seus adoráveis dias de filhote até o maravilhoso companheiro que ele é hoje.
        </motion.p>
      </motion.div>
      
      {/* Animated decorative paws */}
      {[
        { top: '10%', left: '5%', delay: 0, duration: 5 },
        { top: '20%', right: '8%', delay: 1, duration: 6 },
        { top: '70%', left: '10%', delay: 2, duration: 7 },
        { bottom: '15%', right: '5%', delay: 1.5, duration: 5.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl sm:text-5xl md:text-6xl select-none pointer-events-none"
          style={{ ...pos }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 360],
            y: [0, -30, 0],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeInOut"
          }}
        >
          🐾
        </motion.div>
      ))}
      
      <MediaLightbox
        media={heroMedia}
        currentIndex={0}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
