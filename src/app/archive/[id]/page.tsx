import type { Metadata } from 'next';
import BoardDetailPage from '@/components/board/BoardDetailPage';
import { ARCHIVE } from '@/data/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = ARCHIVE.find((p) => p.id === Number(id));
  return { title: post?.title || '아카이브' };
}

export default async function ArchiveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BoardDetailPage
      postId={Number(id)}
      basePath="/archive"
      categoryLabel="아카이브"
    />
  );
}
