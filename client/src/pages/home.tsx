import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";
import FloatingAdminButton from "@/components/FloatingAdminButton";
import MusicPlayer from "@/components/MusicPlayer";
import MediaLightbox from "@/components/MediaLightbox";
import { queryClient } from "@/lib/queryClient";
import type { Media } from "@shared/schema";

interface TimelineYear {
  year: number;
  media: Media[];
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  year?: number;
}

const getAgeLabel = (year: number, birthYear = 2022) => {
  const age = year - birthYear;
  if (age === 0) return "Ano 0 - Bem-vindo ao Lar!";
  if (age === 1) return "Ano 1 - Dias de Filhote";
  if (age === 2) return "Ano 2 - Crescendo Forte";
  if (age === 3) return "Ano 3 - Um Companheiro Maduro";
  return `Ano ${age}`;
};

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: timeline, isLoading } = useQuery<TimelineYear[]>({
    queryKey: ['/api/timeline'],
  });

  const allMedia = useMemo(() => {
    if (!timeline) return [];
    const media: MediaItem[] = [];
    timeline.forEach(section => {
      section.media.forEach(m => {
        media.push({
          id: m.id,
          type: m.type as 'image' | 'video',
          url: `/uploads/${m.filename}`,
          thumbnail: m.type === 'video' ? `/uploads/${m.filename}` : undefined,
          year: section.year
        });
      });
    });
    return media;
  }, [timeline]);

  const handleMediaClick = (mediaId: string) => {
    const index = allMedia.findIndex(m => m.id === mediaId);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleUploadSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/timeline'] });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowAdmin(true);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    setIsAuthenticated(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleOpenLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showAdmin ? (
          <AdminPanel 
            key="admin"
            onClose={handleCloseAdmin}
            onUploadSuccess={handleUploadSuccess}
          />
        ) : (
          <div key="timeline">
            <HeroSection />
            
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-primary border-t-transparent mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Carregando timeline...</p>
                  </div>
                </div>
              ) : (
                <div className="border-l-2 sm:border-l-3 md:border-l-4 border-primary/20 pl-1 sm:pl-2 mb-8 sm:mb-10 md:mb-12">
                  {timeline && timeline.length > 0 ? (
                    timeline.map((section, index) => (
                      <TimelineSection
                        key={section.year}
                        year={section.year}
                        age={getAgeLabel(section.year)}
                        media={section.media.map(m => ({
                          id: m.id,
                          type: m.type as 'image' | 'video',
                          url: `/uploads/${m.filename}`,
                          thumbnail: m.type === 'video' ? `/uploads/${m.filename}` : undefined
                        }))}
                        isFirst={index === 0}
                        onMediaClick={handleMediaClick}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 sm:py-16 md:py-20">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 opacity-20">🐾</div>
                      <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-3 sm:mb-4 px-4">
                        Nenhuma foto ainda na timeline
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm md:text-base px-4">
                        Clique no botão de configuração para adicionar as primeiras memórias do Gohan!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <FloatingAdminButton onClick={handleOpenLogin} />
            <MusicPlayer />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <AdminLogin
            onClose={handleCloseLogin}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>

      <MediaLightbox
        media={allMedia}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
