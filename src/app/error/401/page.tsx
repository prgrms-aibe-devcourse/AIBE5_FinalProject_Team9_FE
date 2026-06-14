import StatePage from '@/components/common/StatePage';

export default function Error401() {
  return (
    <StatePage
      eyebrow="AUTH REQUIRED"
      code="401"
      title="로그인이 필요해요"
      description="령냥이가 문을 열기 전에 먼저 신원을 확인해야 해요."
      actions={[
        { label: '로그인하기', href: '/login' },
        { label: '홈으로 가기', href: '/', variant: 'secondary' },
      ]}
    />
  );
}
