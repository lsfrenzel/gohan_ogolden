import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingAdminButtonProps {
  onClick: () => void;
}

export default function FloatingAdminButton({ onClick }: FloatingAdminButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 150, damping: 12 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50"
    >
      {/* Pulsing rings effect */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-amber-400/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.8, 2.2],
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
          scale: 1.2,
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.85 }}
        className="relative"
      >
        <Button
          onClick={onClick}
          className="w-16 h-16 min-w-16 min-h-16 shrink-0 p-0 rounded-full shadow-2xl relative overflow-hidden border-none"
          data-testid="button-admin-toggle"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)",
            backgroundSize: "200% 200%",
            boxShadow: "0 0 40px rgba(245, 158, 11, 0.6), 0 10px 40px rgba(0, 0, 0, 0.3)"
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: "linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Rotating settings icon */}
          <motion.div
            className="relative z-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Settings className="w-7 h-7 text-white" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
          </motion.div>
          
          {/* Sparkle effect */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
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
        </Button>
      </motion.div>
    </motion.div>
  );
}
