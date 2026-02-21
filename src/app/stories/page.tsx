import type { Metadata } from 'next';
import { Suspense } from 'react';
import StoriesTabContent from '@/components/board/StoriesTabContent';

export const metadata: Metadata = {
  title: '느루 이야기',
  description: '마을서재 느루의 일상, 공지, 새로 들인 책, 방명록, 아카이브를 소개합니다.',
};

export default function StoriesPage() {
  return (
    <div className="w-full">
      {/* 페이지 헤더 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888]">느루 이야기</nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-8">마을서재 느루의 일상</h1>

          <Suspense fallback={
            <div className="py-20 text-center">
              <div className="inline-block w-5 h-5 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <StoriesTabContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
