import type { Metadata } from 'next';
import BoardDetailPage from '@/components/board/BoardDetailPage';
import { NOTICES } from '@/data/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = NOTICES.find((p) => p.id === Number(id));
  return { title: post?.title || '공지 알림' };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BoardDetailPage
      postId={Number(id)}
      basePath="/notice"
      categoryLabel="공지 알림"
    />
  );
}
