import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import AdminPanel from "@/components/AdminPanel";
import FloatingAdminButton from "@/components/FloatingAdminButton";

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  //todo: remove mock functionality - this will be replaced with real data from the backend
  const timelineData = [
    {
      year: 2024,
      age: "Year 3 - A Mature Companion",
      media: [
        { id: '1', type: 'image' as const, url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400' },
        { id: '2', type: 'image' as const, url: 'https://images.unsplash.com/photo-1612536193211-76c4b1e6e499?w=400' },
        { id: '3', type: 'video' as const, url: '', thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
        { id: '4', type: 'image' as const, url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400' },
        { id: '5', type: 'image' as const, url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
        { id: '6', type: 'image' as const, url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400' },
      ]
    },
    {
      year: 2023,
      age: "Year 2 - Growing Strong",
      media: [
        { id: '7', type: 'image' as const, url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400' },
        { id: '8', type: 'image' as const, url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400' },
        { id: '9', type: 'image' as const, url: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=400' },
        { id: '10', type: 'video' as const, url: '', thumbnail: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400' },
      ]
    },
    {
      year: 2022,
      age: "Year 1 - Puppy Days",
      media: [
        { id: '11', type: 'image' as const, url: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400' },
        { id: '12', type: 'image' as const, url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400' },
        { id: '13', type: 'image' as const, url: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=400' },
      ]
    },
    {
      year: 2021,
      age: "Year 0 - Welcome Home!",
      media: []
    }
  ];

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-l-4 border-primary/20 pl-2 mb-12">
          {timelineData.map((section, index) => (
            <TimelineSection
              key={section.year}
              year={section.year}
              age={section.age}
              media={section.media}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>

      <FloatingAdminButton onClick={() => setShowAdmin(true)} />
    </div>
  );
}
