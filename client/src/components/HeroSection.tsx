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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-80"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 sm:mb-6 md:mb-8 flex justify-center"
        >
          <div className="relative group">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(218, 165, 32, 0.3)",
                  "0 0 40px rgba(218, 165, 32, 0.5)",
                  "0 0 20px rgba(218, 165, 32, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-3 sm:border-4 md:border-[6px] lg:border-8 border-primary shadow-xl cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={gohanImage} 
                alt="Gohan the golden retriever" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                data-testid="img-hero-gohan"
              />
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-primary text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-lg"
            >
              🐾
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4"
        >
          Jornada do Gohan
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-3 sm:mb-4 md:mb-6 px-4"
        >
          Gohan, O Golden
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Bem-vindo à linha do tempo do Gohan! Acompanhe a incrível jornada do nosso amado golden retriever, desde seus adoráveis dias de filhote até o maravilhoso companheiro que ele é hoje.
        </motion.p>
      </motion.div>
      
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-6 sm:top-10 left-2 sm:left-4 md:left-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-5 select-none"
      >
        🐾
      </motion.div>
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-6 sm:bottom-10 right-2 sm:right-4 md:right-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-5 select-none"
      >
        🐾
      </motion.div>
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          y: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-6 sm:right-10 md:right-20 text-2xl sm:text-3xl md:text-4xl opacity-5 select-none hidden sm:block"
      >
        🐾
      </motion.div>
      
      <MediaLightbox
        media={heroMedia}
        currentIndex={0}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}
