import type { Metadata } from 'next';
import Link from 'next/link';
import BoardList from '@/components/ui/BoardList';
import { STORIES_POSTS, NOTICES, BOOKS, ARCHIVE } from '@/data/site-data';

export const metadata: Metadata = {
  title: '느루 이야기',
  description: '마을서재 느루의 일상, 공지, 새로 들인 책, 방명록, 아카이브를 소개합니다.',
};

const TABS = [
  { id: 'daily', label: '일일 소식', posts: STORIES_POSTS },
  { id: 'notice', label: '공지 알림', posts: NOTICES },
  { id: 'books', label: '새로 들인 책', posts: BOOKS },
  { id: 'guestbook', label: '방명록', posts: [] },
  { id: 'archive', label: '아카이브', posts: ARCHIVE },
];

export default function StoriesPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || 'daily';
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="w-full">
      {/* 페이지 헤더 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2">
            <span>느루 이야기</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-8">마을서재 느루의 일상</h1>

          {/* 탭 네비게이션 */}
          <div className="flex gap-0 border-b border-[#e0d8cc] mb-8 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/stories?tab=${tab.id}`}
                className={`flex-shrink-0 px-4 py-3 text-[13px] border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#4a7c59] text-[#4a7c59] font-semibold'
                    : 'border-transparent text-[#666] hover:text-[#2c2c2c]'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* 게시글 목록 */}
          <BoardList posts={currentTab.posts} />

          {/* 페이지네이션 (정적) */}
          {currentTab.posts.length > 0 && (
            <div className="mt-8 flex justify-center gap-2">
              <span className="px-3 py-1.5 text-[13px] bg-[#4a7c59] text-white rounded">1</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
