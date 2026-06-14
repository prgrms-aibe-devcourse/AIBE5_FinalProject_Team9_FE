import StatePage from '@/components/common/StatePage';

export default function NotFound() {
  return (
    <StatePage
      eyebrow="NOT FOUND"
      code="404"
      title="페이지를 찾을 수 없어요"
      description="령냥이가 문 너머를 살펴봤지만 아무것도 없었어요."
      actions={[{ label: '홈으로 돌아가기', href: '/' }]}
    />
  );
}
