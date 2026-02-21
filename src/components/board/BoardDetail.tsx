'use client';

import Link from 'next/link';

interface PostDetail {
  id: number;
  title: string;
  content: string;   // HTML 또는 plain text
  author_name?: string;
  created_at: string;
  view_count?: number;
  is_pinned?: boolean;
}

interface BoardDetailProps {
  post: PostDetail;
  basePath: string;          // 예: '/stories', '/notice'
  categoryLabel?: string;    // 예: '일일 소식', '공지 알림'
  showAdminButtons?: boolean; // 관리자일 때 true
  onDelete?: () => void;
}

export default function BoardDetail({
  post,
  basePath,
  categoryLabel,
  showAdminButtons = false,
  onDelete,
}: BoardDetailProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}년 ${m}월 ${d}일`;
  };

  const handleDelete = async () => {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
    onDelete?.();
  };

  return (
    <div className="w-full">
      {/* 브레드크럼 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2 items-center">
            <Link href={basePath} className="hover:text-[#4a7c59] transition-colors">
              {categoryLabel || '목록'}
            </Link>
            <span>›</span>
            <span className="text-[#444] truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-2xl">
          {/* 제목 */}
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-4 leading-snug">
            {post.is_pinned && (
              <span className="inline-block text-[12px] font-semibold text-[#4a7c59] border border-[#4a7c59] px-1.5 py-0.5 rounded-sm mr-2 align-middle">
                공지
              </span>
            )}
            {post.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 text-[13px] text-[#aaa] pb-6 border-b border-[#e0d8cc]">
            <span>{post.author_name || '관리자'}</span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
            {post.view_count !== undefined && (
              <>
                <span>·</span>
                <span>조회 {post.view_count}</span>
              </>
            )}
          </div>

          {/* 본문 */}
          <div
            className="post-content mt-8 text-[15px] text-[#333] leading-[1.9]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 관리자 버튼 */}
          {showAdminButtons && (
            <div className="mt-10 pt-6 border-t border-[#e0d8cc] flex gap-3">
              <Link
                href={`${basePath}/write?id=${post.id}`}
                className="px-4 py-2 text-[13px] border border-[#4a7c59] text-[#4a7c59] rounded hover:bg-[#e8f0eb] transition-colors"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-[13px] border border-[#cc4444] text-[#cc4444] rounded hover:bg-[#fde8e8] transition-colors"
              >
                삭제
              </button>
            </div>
          )}

          {/* 목록 돌아가기 */}
          <div className="mt-8 pt-6 border-t border-[#e0d8cc]">
            <Link
              href={basePath}
              className="inline-flex items-center gap-1 text-[13px] text-[#4a7c59] hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 게시글 본문 스타일 */}
      <style>{`
        .post-content h1, .post-content h2, .post-content h3 {
          font-weight: 600;
          margin: 1.5em 0 0.5em;
          color: #1a1a1a;
        }
        .post-content h2 { font-size: 1.2em; }
        .post-content h3 { font-size: 1.05em; }
        .post-content p { margin: 0 0 1em; }
        .post-content ul, .post-content ol {
          margin: 0.5em 0 1em 1.5em;
        }
        .post-content li { margin: 0.25em 0; }
        .post-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1em 0;
        }
        .post-content a {
          color: #4a7c59;
          text-decoration: underline;
        }
        .post-content blockquote {
          border-left: 3px solid #4a7c59;
          padding-left: 1em;
          margin: 1em 0;
          color: #666;
        }
        .post-content strong { font-weight: 600; }
        .post-content em { font-style: italic; }
        .post-content hr {
          border: none;
          border-top: 1px solid #e0d8cc;
          margin: 1.5em 0;
        }
      `}</style>
    </div>
  );
}
