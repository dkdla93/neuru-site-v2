import type { Metadata } from 'next';
import BoardList from '@/components/ui/BoardList';
import { NOTICES } from '@/data/site-data';

export const metadata: Metadata = {
  title: '공지사항',
  description: '마을서재 느루의 공지사항을 확인하세요.',
};

export default function NoticePage() {
  return (
    <div className="w-full">
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888]">공지 알림</nav>
        </div>
      </div>
      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-8">느루 공지 알림</h1>
          <BoardList posts={NOTICES} />
        </div>
      </div>
    </div>
  );
}
