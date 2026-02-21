import type { Metadata } from 'next';
import BoardWrite from '@/components/board/BoardWrite';

export const metadata: Metadata = {
  title: '글쓰기 - 새로 들인 책',
};

export default function BooksWritePage() {
  return (
    <BoardWrite
      basePath="/books"
      categoryId={3}
      categoryLabel="새로 들인 책"
    />
  );
}
