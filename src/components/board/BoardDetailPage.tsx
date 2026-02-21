'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BoardDetail from './BoardDetail';
import { useAdmin } from '@/hooks/useAdmin';

interface BoardDetailPageProps {
  postId: number;
  basePath: string;
  categoryLabel?: string;
  staticContent?: string;  // 정적 fallback 본문
}

export default function BoardDetailPage({
  postId,
  basePath,
  categoryLabel,
  staticContent,
}: BoardDetailPageProps) {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [post, setPost] = useState<{
    id: number;
    title: string;
    content: string;
    author_name: string;
    created_at: string;
    view_count: number;
    is_pinned: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error('API 오류');
        const data = await res.json();
        setPost(data.post || data);
      } catch {
        // API 실패 시 정적 fallback 표시
        if (staticContent) {
          setPost({
            id: postId,
            title: '게시글',
            content: staticContent,
            author_name: '관리자',
            created_at: new Date().toISOString(),
            view_count: 0,
            is_pinned: false,
          });
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, staticContent]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
      router.push(basePath);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container-site flex justify-center py-20">
          <div className="w-5 h-5 border-2 border-[#4a7c59] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="section">
        <div className="container-site max-w-2xl text-center py-20">
          <p className="text-[#888] text-[14px]">게시글을 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push(basePath)}
            className="mt-4 text-[13px] text-[#4a7c59] hover:underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <BoardDetail
      post={post}
      basePath={basePath}
      categoryLabel={categoryLabel}
      showAdminButtons={isAdmin}
      onDelete={handleDelete}
    />
  );
}
