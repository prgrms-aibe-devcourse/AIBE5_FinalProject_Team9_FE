import OwnerSidebar from '@/components/owner/OwnerSidebar';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <OwnerSidebar />
      <div className="flex-1 bg-[#0d0d0d] overflow-auto">
        {children}
      </div>
    </div>
  );
}
