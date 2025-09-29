import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface TimelineSectionProps {
  year: number;
  age: string;
  media: MediaItem[];
  isFirst?: boolean;
}

export default function TimelineSection({ year, age, media, isFirst = false }: TimelineSectionProps) {
  return (
    <div className="relative flex gap-8 pb-16">
      <div className="flex flex-col items-center">
        <div className={`flex-shrink-0 w-24 h-24 rounded-full bg-primary border-4 border-background shadow-lg flex items-center justify-center ${isFirst ? '' : 'mt-8'}`}>
          <span className="font-display text-2xl font-bold text-primary-foreground">
            {year}
          </span>
        </div>
        <div className="w-1 flex-1 bg-primary/30 mt-4"></div>
      </div>
      
      <div className="flex-1 pt-6">
        <div className="mb-6">
          <h2 className="font-display text-4xl font-bold text-foreground mb-2">
            Year {year}
          </h2>
          <p className="font-heading text-xl text-muted-foreground">
            {age}
          </p>
        </div>
        
        {media.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {media.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-transform duration-300"
                data-testid={`media-${item.id}`}
              >
                <div className="relative aspect-square">
                  <img 
                    src={item.type === 'video' ? item.thumbnail : item.url} 
                    alt={`Gohan in ${year}`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed">
            <div className="text-6xl mb-4 opacity-20">🐾</div>
            <p className="text-muted-foreground text-lg">
              No photos yet - add Gohan's first memories!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
