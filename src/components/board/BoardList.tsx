'use client';

import Link from 'next/link';
import Pagination from './Pagination';

export interface Post {
  id: number;
  title: string;
  date: string;
  category?: string;
  is_pinned?: boolean;
  view_count?: number;
}

interface BoardListProps {
  posts: Post[];
  basePath: string;           // 예: '/stories', '/notice'
  emptyMessage?: string;
  showWriteButton?: boolean;  // 관리자일 때 true
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function BoardList({
  posts,
  basePath,
  emptyMessage = '게시글이 없습니다.',
  showWriteButton = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: BoardListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };

  return (
    <div>
      {/* 상단: 게시글 수 + 글쓰기 버튼 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] text-[#888]">
          총 <strong className="text-[#4a7c59]">{posts.length}</strong>개의 글
        </span>
        {showWriteButton && (
          <Link
            href={`${basePath}/write`}
            className="inline-flex items-center gap-1 px-4 py-2 text-[13px] bg-[#4a7c59] text-white rounded hover:bg-[#3d7a50] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            글쓰기
          </Link>
        )}
      </div>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <div className="py-20 text-center text-[14px] text-[#aaa] border-t border-[#e0d8cc]">
          {emptyMessage}
        </div>
      ) : (
        <ul className="divide-y divide-[#e0d8cc] border-t border-[#2c2c2c]">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`${basePath}/${post.id}`}
                className="flex items-center justify-between py-4 group hover:bg-[#faf8f4] px-2 -mx-2 rounded transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {post.is_pinned && (
                    <span className="flex-shrink-0 text-[11px] font-semibold text-[#4a7c59] border border-[#4a7c59] px-1.5 py-0.5 rounded-sm leading-none">
                      공지
                    </span>
                  )}
                  <span className="text-[14px] text-[#2c2c2c] group-hover:text-[#4a7c59] transition-colors truncate">
                    {post.title}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  {post.view_count !== undefined && (
                    <span className="text-[12px] text-[#bbb] hidden sm:block">
                      조회 {post.view_count}
                    </span>
                  )}
                  <span className="text-[12px] text-[#aaa]">{formatDate(post.date)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* 페이지네이션 */}
      {onPageChange && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
