import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface FloatingAdminButtonProps {
  onClick: () => void;
}

export default function FloatingAdminButton({ onClick }: FloatingAdminButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50"
      data-testid="button-admin-toggle"
    >
      <Settings className="w-7 h-7" />
    </Button>
  );
}
