import AdminPanel from '../AdminPanel';

export default function AdminPanelExample() {
  return (
    <AdminPanel 
      onClose={() => console.log('Close clicked')}
      onUploadSuccess={() => console.log('Upload success')}
    />
  );
}
