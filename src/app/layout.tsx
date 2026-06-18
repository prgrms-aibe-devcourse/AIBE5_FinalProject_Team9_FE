import type { Metadata } from 'next';
import './globals.css';
import ConditionalLayout from '@/components/common/ConditionalLayout';

export const metadata: Metadata = {
  title: 'GrimGate - 공포 방탈출 예약 플랫폼',
  description: '공포 방탈출 테마 예약과 메이트 모집 커뮤니티 플랫폼 GrimGate',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>

      </body>
    </html>
  );
}
