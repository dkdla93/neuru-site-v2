import type { Metadata } from 'next';
import BoardDetailPage from '@/components/board/BoardDetailPage';
import { STORIES_POSTS } from '@/data/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = STORIES_POSTS.find((p) => p.id === Number(id));
  return { title: post?.title || '느루 이야기' };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <BoardDetailPage
      postId={Number(id)}
      basePath="/stories"
      categoryLabel="느루 이야기"
    />
  );
}
