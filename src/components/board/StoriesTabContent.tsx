'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import BoardList, { Post } from './BoardList';
import Pagination from './Pagination';
import { useAdmin } from '@/hooks/useAdmin';
import { STORIES_POSTS, NOTICES, BOOKS, ARCHIVE } from '@/data/site-data';

const TABS = [
  { id: 'stories',   slug: 'stories',   label: '일일 소식',    staticPosts: STORIES_POSTS.map(p => ({ id: p.id, title: p.title, date: p.date })),   basePath: '/stories' },
  { id: 'notice',    slug: 'notice',    label: '공지 알림',    staticPosts: NOTICES.map(p => ({ id: p.id, title: p.title, date: p.date })),           basePath: '/notice' },
  { id: 'books',     slug: 'books',     label: '새로 들인 책', staticPosts: BOOKS.map(p => ({ id: p.id, title: p.title, date: p.date })),             basePath: '/books' },
  { id: 'guestbook', slug: 'guestbook', label: '방명록',       staticPosts: [],                                                                       basePath: '/guestbook' },
  { id: 'archive',   slug: 'archive',   label: '아카이브',     staticPosts: ARCHIVE.map(p => ({ id: p.id, title: p.title, date: p.date })),           basePath: '/archive' },
];

const POSTS_PER_PAGE = 15;

export default function StoriesTabContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAdmin } = useAdmin();

  const activeTabId = searchParams.get('tab') || 'stories';
  const currentPage = Number(searchParams.get('page') || '1');

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  const [posts, setPosts] = useState<Post[]>(activeTab.staticPosts);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  const fetchPosts = useCallback(
    async (slug: string, page: number, staticPosts: Post[]) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: slug,
          page: String(page),
          limit: String(POSTS_PER_PAGE),
        });
        const res = await fetch(`/api/posts?${params}`);
        if (!res.ok) throw new Error('API 오류');
        const data = await res.json();

        const apiPosts: Post[] = (data.posts || []).map(
          (p: { id: number; title: string; created_at: string; is_pinned?: boolean; view_count?: number }) => ({
            id: p.id,
            title: p.title,
            date: p.created_at,
            is_pinned: p.is_pinned,
            view_count: p.view_count,
          })
        );
        setPosts(apiPosts);
        setTotalPages(data.totalPages || 1);
        setUsingStatic(false);
      } catch {
        const start = (page - 1) * POSTS_PER_PAGE;
        setPosts(staticPosts.slice(start, start + POSTS_PER_PAGE));
        setTotalPages(Math.ceil(staticPosts.length / POSTS_PER_PAGE) || 1);
        setUsingStatic(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPosts(activeTab.slug, currentPage, activeTab.staticPosts);
  }, [activeTab.slug, currentPage, activeTab.staticPosts, fetchPosts]);

  const handleTabChange = (tabId: string) => {
    router.push(`/stories?tab=${tabId}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/stories?tab=${activeTabId}&page=${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 탭 네비게이션 */}
      <div className="flex gap-0 border-b border-[#e0d8cc] mb-8 overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 px-4 py-3 text-[13px] border-b-2 transition-colors ${
              activeTabId === tab.id
                ? 'border-[#4a7c59] text-[#4a7c59] font-semibold'
                : 'border-transparent text-[#666] hover:text-[#2c2c2c]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-5 h-5 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <BoardList
            posts={posts}
            basePath={activeTab.basePath}
            showWriteButton={isAdmin && !usingStatic}
            emptyMessage={activeTabId === 'guestbook' ? '아직 방명록이 없습니다.' : '게시글이 없습니다.'}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
