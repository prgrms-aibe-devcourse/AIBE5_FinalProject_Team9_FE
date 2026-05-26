import { NextRequest, NextResponse } from 'next/server';

// TODO: 개발 완료 후 인증 로직 복원 필요
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/mypage/:path*', '/reservation/:path*', '/owner/:path*'],
};
