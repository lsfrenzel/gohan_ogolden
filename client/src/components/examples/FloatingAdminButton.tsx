import FloatingAdminButton from '../FloatingAdminButton';

export default function FloatingAdminButtonExample() {
  return (
    <div className="relative h-96 bg-background">
      <FloatingAdminButton onClick={() => console.log('Admin button clicked')} />
    </div>
  );
}
