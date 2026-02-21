import type { Metadata } from 'next';
import BoardWrite from '@/components/board/BoardWrite';

export const metadata: Metadata = {
  title: '글쓰기 - 느루 이야기',
};

export default function StoriesWritePage() {
  return (
    <BoardWrite
      basePath="/stories"
      categoryId={1}
      categoryLabel="느루 이야기"
    />
  );
}
