import type { Metadata } from 'next';
import BoardPageLayout from '@/components/board/BoardPageLayout';

export const metadata: Metadata = {
  title: '방명록',
  description: '마을서재 느루에 방명록을 남겨주세요.',
};

export default function GuestbookPage() {
  return (
    <BoardPageLayout
      categorySlug="guestbook"
      categoryLabel="방명록"
      pageTitle="느루 방명록"
      basePath="/guestbook"
      staticPosts={[]}
      emptyMessage="아직 방명록이 없습니다. 첫 방명록을 남겨주세요!"
    />
  );
}
