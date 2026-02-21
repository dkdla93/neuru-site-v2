import type { Metadata } from 'next';
import BoardDetailPage from '@/components/board/BoardDetailPage';

export const metadata: Metadata = {
  title: '방명록',
};

export default async function GuestbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BoardDetailPage
      postId={Number(id)}
      basePath="/guestbook"
      categoryLabel="방명록"
    />
  );
}
