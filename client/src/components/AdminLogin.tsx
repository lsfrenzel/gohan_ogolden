import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Lock, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onClose, onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === "Juliana" && password === "euteamo") {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vinda ao painel de administração, Juliana!",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Usuário ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 sm:p-8 relative overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 text-9xl opacity-5"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🐾
          </motion.div>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Login Admin
              </h2>
              <p className="text-sm text-muted-foreground">
                Entre para acessar o painel de administração
              </p>
            </div>
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 sm:h-10 sm:w-10"
                data-testid="button-close-login"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm sm:text-base">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 text-base"
                  required
                  data-testid="input-username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 text-base"
                  required
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-base py-5 sm:py-6 mt-6"
              disabled={isLoading || !username || !password}
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <motion.div
            className="absolute -bottom-10 -left-10 text-7xl opacity-5"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🐕
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
