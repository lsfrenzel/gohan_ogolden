import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Upload new photos and videos to Gohan's timeline
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            data-testid="button-close-admin"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Select Year
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {years.map(year => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    onClick={() => setSelectedYear(year)}
                    className="font-display text-lg"
                    data-testid={`button-year-${year}`}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">
                Upload Photos & Videos
              </Label>
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
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
                  <div className="text-6xl mb-4 opacity-40">🐾</div>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop files here or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Support for images and videos
                  </p>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Selected Files ({files.length})
                </Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0"
                        data-testid={`button-remove-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedYear || files.length === 0 || uploading}
              className="w-full text-lg py-6"
              data-testid="button-upload"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                  Uploading...
                </>
              ) : uploadSuccess ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Upload Successful!
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload to Timeline
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
