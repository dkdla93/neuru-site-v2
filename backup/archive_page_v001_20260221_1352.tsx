import type { Metadata } from 'next';
import BoardList from '@/components/ui/BoardList';
import { ARCHIVE } from '@/data/site-data';

export const metadata: Metadata = {
  title: '이전 기록들',
  description: '마을서재 느루의 이전 기록들을 모아두었습니다.',
};

export default function ArchivePage() {
  return (
    <div className="w-full">
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888]">느루의 이전 기록들</nav>
        </div>
      </div>
      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-8">느루의 이전 기록들</h1>
          <BoardList posts={ARCHIVE} />
        </div>
      </div>
    </div>
  );
}
