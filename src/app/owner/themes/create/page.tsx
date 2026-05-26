'use client';

import ThemeForm from '@/components/owner/ThemeForm';

export default function OwnerThemeCreatePage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-bold text-[#f5f5f5] mb-6">테마 추가</h1>
      <ThemeForm
        onSubmit={async () => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
