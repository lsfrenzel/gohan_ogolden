import TimelineSection from '../TimelineSection';

export default function TimelineSectionExample() {
  const mockMedia = [
    { id: '1', type: 'image' as const, url: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400' },
    { id: '2', type: 'image' as const, url: 'https://images.unsplash.com/photo-1612536193211-76c4b1e6e499?w=400' },
    { id: '3', type: 'video' as const, url: '', thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
    { id: '4', type: 'image' as const, url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400' },
  ];

  return (
    <div className="bg-background p-8">
      <TimelineSection 
        year={2024}
        age="Year 3 - Growing Strong"
        media={mockMedia}
        isFirst={true}
      />
    </div>
  );
}
