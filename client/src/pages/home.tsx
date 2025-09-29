import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import AdminPanel from "@/components/AdminPanel";
import FloatingAdminButton from "@/components/FloatingAdminButton";
import MusicPlayer from "@/components/MusicPlayer";
import { queryClient } from "@/lib/queryClient";
import type { Media } from "@shared/schema";

interface TimelineYear {
  year: number;
  media: Media[];
}

const getAgeLabel = (year: number, birthYear = 2022) => {
  const age = year - birthYear;
  if (age === 0) return "Year 0 - Welcome Home!";
  if (age === 1) return "Year 1 - Puppy Days";
  if (age === 2) return "Year 2 - Growing Strong";
  if (age === 3) return "Year 3 - A Mature Companion";
  return `Year ${age}`;
};

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  const { data: timeline, isLoading } = useQuery<TimelineYear[]>({
    queryKey: ['/api/timeline'],
  });

  const handleUploadSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/timeline'] });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showAdmin ? (
          <AdminPanel 
            key="admin"
            onClose={() => setShowAdmin(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        ) : (
          <div key="timeline">
            <HeroSection />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 sm:py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-muted-foreground text-sm sm:text-base">Carregando timeline...</p>
                  </div>
                </div>
              ) : (
                <div className="border-l-2 sm:border-l-4 border-primary/20 pl-1 sm:pl-2 mb-12">
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
                      />
                    ))
                  ) : (
                    <div className="text-center py-16 sm:py-20">
                      <div className="text-5xl sm:text-6xl mb-4 opacity-20">🐾</div>
                      <p className="text-muted-foreground text-base sm:text-lg mb-4">
                        Nenhuma foto ainda na timeline
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base px-4">
                        Clique no botão de configuração para adicionar as primeiras memórias do Gohan!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <FloatingAdminButton onClick={() => setShowAdmin(true)} />
            <MusicPlayer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
