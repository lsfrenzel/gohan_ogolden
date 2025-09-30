import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingAdminButtonProps {
  onClick: () => void;
}

export default function FloatingAdminButton({ onClick }: FloatingAdminButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50"
    >
      <Button
        onClick={onClick}
        size="icon"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-2xl relative overflow-hidden"
        data-testid="button-admin-toggle"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </motion.div>
      </Button>
    </motion.div>
  );
}
