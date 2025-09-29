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
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
    >
      <Button
        onClick={onClick}
        size="icon"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl relative overflow-hidden"
        data-testid="button-admin-toggle"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.div>
      </Button>
    </motion.div>
  );
}
