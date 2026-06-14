import StatePage from '@/components/common/StatePage';

export default function Error403() {
  return (
    <StatePage
      eyebrow="FORBIDDEN"
      code="403"
      title="이 문은 아직 열 수 없어요"
      description="령냥이가 확인해봤지만 현재 계정으로는 접근 권한이 없어요."
      actions={[{ label: '홈으로 가기', href: '/' }]}
    />
  );
}
