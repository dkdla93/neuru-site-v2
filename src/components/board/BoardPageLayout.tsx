'use client';

import { useState, useEffect, useCallback } from 'react';
import BoardList, { Post } from './BoardList';
import { useAdmin } from '@/hooks/useAdmin';

interface BoardPageLayoutProps {
  categorySlug: string;      // 'stories', 'notice', 'books', 'archive'
  categoryLabel: string;     // '일일 소식', '공지 알림', ...
  pageTitle: string;
  basePath: string;
  staticPosts?: Post[];      // 정적 fallback 데이터
  postsPerPage?: number;
  emptyMessage?: string;
}

export default function BoardPageLayout({
  categorySlug,
  categoryLabel,
  pageTitle,
  basePath,
  staticPosts = [],
  postsPerPage = 15,
  emptyMessage,
}: BoardPageLayoutProps) {
  const { isAdmin } = useAdmin();
  const [posts, setPosts] = useState<Post[]>(staticPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  const fetchPosts = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: categorySlug,
          page: String(page),
          limit: String(postsPerPage),
        });
        const res = await fetch(`/api/posts?${params}`);
        if (!res.ok) throw new Error('API 오류');
        const data = await res.json();

        // API가 반환하는 구조: { posts, total, page, totalPages }
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
        // API 없으면 정적 데이터 사용
        const start = (page - 1) * postsPerPage;
        setPosts(staticPosts.slice(start, start + postsPerPage));
        setTotalPages(Math.ceil(staticPosts.length / postsPerPage) || 1);
        setUsingStatic(true);
      } finally {
        setLoading(false);
      }
    },
    [categorySlug, postsPerPage, staticPosts]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* 브레드크럼 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888]">{categoryLabel}</nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-3xl">
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-8">{pageTitle}</h1>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-5 h-5 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <BoardList
              posts={posts}
              basePath={basePath}
              showWriteButton={isAdmin && !usingStatic}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={totalPages > 1 ? handlePageChange : undefined}
              emptyMessage={emptyMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
