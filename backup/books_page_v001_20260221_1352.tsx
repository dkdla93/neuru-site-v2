import type { Metadata } from 'next';
import BoardList from '@/components/ui/BoardList';
import { BOOKS } from '@/data/site-data';

export const metadata: Metadata = {
  title: '새로 들인 책',
  description: '마을서재 느루에 새로 들어온 책들을 소개합니다.',
};

export default function BooksPage() {
  return (
    <div className="w-full">
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888]">새로 들인 책</nav>
        </div>
      </div>
      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-8">마을서재 새로 들인 책</h1>
          <BoardList posts={BOOKS} />
        </div>
      </div>
    </div>
  );
}
