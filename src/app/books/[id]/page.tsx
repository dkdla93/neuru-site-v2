import type { Metadata } from 'next';
import BoardDetailPage from '@/components/board/BoardDetailPage';
import { BOOKS } from '@/data/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = BOOKS.find((p) => p.id === Number(id));
  return { title: post?.title || '새로 들인 책' };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BoardDetailPage
      postId={Number(id)}
      basePath="/books"
      categoryLabel="새로 들인 책"
    />
  );
}
