import type { Metadata } from 'next';
import BoardPageLayout from '@/components/board/BoardPageLayout';
import { BOOKS } from '@/data/site-data';

export const metadata: Metadata = {
  title: '새로 들인 책',
  description: '마을서재 느루에 새로 들어온 책들을 소개합니다.',
};

const staticPosts = BOOKS.map((p) => ({
  id: p.id,
  title: p.title,
  date: p.date,
}));

export default function BooksPage() {
  return (
    <BoardPageLayout
      categorySlug="books"
      categoryLabel="새로 들인 책"
      pageTitle="마을서재 새로 들인 책"
      basePath="/books"
      staticPosts={staticPosts}
    />
  );
}
