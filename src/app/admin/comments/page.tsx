import StatePage from '@/components/common/StatePage';

export default function AdminCommentsPage() {
    return (
        <StatePage
            eyebrow="COMING SOON"
            code="🚧"
            title="준비 중인 기능이에요"
            description="령냥이가 열심히 준비 중이에요. 조금만 기다려주세요!"
            actions={[{ label: '돌아가기', href: '/admin/reviews' }]}
        />
    );
}
