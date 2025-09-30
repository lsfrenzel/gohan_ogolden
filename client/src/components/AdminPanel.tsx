import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface AdminPanelProps {
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export default function AdminPanel({ onClose, onUploadSuccess }: AdminPanelProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/') || file.type.startsWith('video/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!selectedYear || files.length === 0) return;
    
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('year', selectedYear.toString());
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      setUploading(false);
      setUploadSuccess(true);
      
      toast({
        title: "Upload bem-sucedido!",
        description: `${result.count} arquivo(s) adicionado(s) à timeline de ${selectedYear}`,
      });

      setTimeout(() => {
        setFiles([]);
        setSelectedYear(null);
        setUploadSuccess(false);
        onUploadSuccess?.();
        onClose();
      }, 1500);
    } catch (error) {
      setUploading(false);
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer o upload dos arquivos. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-start justify-between mb-6 sm:mb-8 gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
              Painel de Administração
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Envie novas fotos e vídeos para a linha do tempo do Gohan
            </p>
          </div>
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-10 sm:w-10"
              data-testid="button-close-admin"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>
        </div>

        <Card className="p-4 sm:p-6 md:p-8">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Label className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 block">
                Selecionar Ano
              </Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {years.map((year, index) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant={selectedYear === year ? "default" : "outline"}
                      onClick={() => setSelectedYear(year)}
                      className="w-full font-display text-sm sm:text-base md:text-lg py-2 sm:py-2.5"
                      data-testid={`button-year-${year}`}
                    >
                      {year}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 block">
                Enviar Fotos e Vídeos
              </Label>
              <motion.div
                animate={{ 
                  borderColor: dragActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                  backgroundColor: dragActive ? "hsl(var(--primary) / 0.05)" : "transparent"
                }}
                className="border-2 border-dashed rounded-xl p-6 sm:p-8 md:p-12 text-center transition-colors"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileInput}
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer"
                  data-testid="label-file-upload"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-40"
                  >
                    🐾
                  </motion.div>
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                  <p className="text-sm sm:text-base md:text-lg font-medium text-foreground mb-1 sm:mb-2">
                    Solte arquivos aqui ou clique para enviar
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Suporte para imagens e vídeos
                  </p>
                </label>
              </motion.div>
            </div>

            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Label className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 block">
                    Arquivos Selecionados ({files.length})
                  </Label>
                  <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
                    {files.map((file, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg gap-2"
                      >
                        <span className="text-xs sm:text-sm truncate flex-1 min-w-0">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="flex-shrink-0 h-8 w-8"
                          data-testid={`button-remove-${index}`}
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleUpload}
              disabled={!selectedYear || files.length === 0 || uploading}
              className="w-full text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6"
              data-testid="button-upload"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                  Enviando...
                </>
              ) : uploadSuccess ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Envio bem-sucedido!
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Enviar para a Linha do Tempo
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
