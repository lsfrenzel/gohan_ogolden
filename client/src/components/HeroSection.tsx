import gohanImage from "@assets/gohan_1759242750019.jpg";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
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
          className="mb-6 sm:mb-8 flex justify-center"
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
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 sm:border-[6px] md:border-8 border-primary shadow-xl"
            >
              <img 
                src={gohanImage} 
                alt="Gohan the golden retriever" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-primary text-primary-foreground rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg"
            >
              🐾
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 sm:mb-4"
        >
          Jornada do Gohan
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 sm:mb-6 px-4"
        >
          Gohan o golden retriever
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
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
        className="absolute top-10 left-4 sm:left-10 text-4xl sm:text-6xl opacity-5 select-none"
      >
        🐾
      </motion.div>
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-4 sm:right-10 text-4xl sm:text-6xl opacity-5 select-none"
      >
        🐾
      </motion.div>
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.08, 0.05],
          y: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 right-10 sm:right-20 text-3xl sm:text-4xl opacity-5 select-none hidden sm:block"
      >
        🐾
      </motion.div>
    </div>
  );
}
