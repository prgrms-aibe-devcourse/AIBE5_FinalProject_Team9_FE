import StatePage from '@/components/common/StatePage';

export default function Error500() {
  return (
    <StatePage
      eyebrow="SERVER ERROR"
      code="500"
      title="문 너머에서 문제가 생겼어요"
      description="령냥이가 길을 다시 찾고 있어요. 잠시 후 다시 시도해주세요."
      actions={[{ label: '홈으로 가기', href: '/' }]}
    />
  );
}
