'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ImageUpload from './ImageUpload';

// SSR 비활성화 (tiptap은 브라우저 전용)
const BoardEditor = dynamic(() => import('./BoardEditor'), { ssr: false });

interface BoardWriteProps {
  basePath: string;            // 예: '/stories'
  categoryId: number;          // DB category_id
  categoryLabel?: string;      // 예: '일일 소식'
  initialData?: {              // 수정 시
    id: number;
    title: string;
    content: string;
    is_pinned: boolean;
    imageUrls?: string[];
  };
}

interface UploadedImage {
  url: string;
  filename: string;
}

export default function BoardWrite({ basePath, categoryId, categoryLabel, initialData }: BoardWriteProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isPinned, setIsPinned] = useState(initialData?.is_pinned || false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    initialData?.imageUrls?.map((url) => ({ url, filename: url.split('/').pop() || '' })) || []
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // 에디터 내 이미지 업로드 (URL 반환)
  const handleEditorImageUpload = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('업로드 실패');
    const data = await res.json();
    setUploadedImages((prev) => [...prev, { url: data.url, filename: file.name }]);
    return data.url;
  }, []);

  const handleImageUpload = useCallback((url: string, filename: string) => {
    setUploadedImages((prev) => [...prev, { url, filename }]);
  }, []);

  const handleImageRemove = useCallback((url: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.url !== url));
  }, []);

  const validate = () => {
    const errs: { title?: string; content?: string } = {};
    if (!title.trim()) errs.title = '제목을 입력해주세요.';
    if (!content.trim() || content === '<p></p>') errs.content = '내용을 입력해주세요.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const body = {
        category_id: categoryId,
        title: title.trim(),
        content,
        is_pinned: isPinned,
        image_urls: uploadedImages.map((img) => img.url),
      };

      const url = isEdit ? `/api/posts/${initialData!.id}` : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '저장에 실패했습니다.');
      }

      const data = await res.json();
      const postId = isEdit ? initialData!.id : data.id;
      router.push(`${basePath}/${postId}`);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm('작성 중인 내용이 사라집니다. 취소하시겠습니까?')) {
      router.back();
    }
  };

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2 items-center">
            <span className="hover:text-[#4a7c59] cursor-pointer" onClick={() => router.push(basePath)}>
              {categoryLabel || '목록'}
            </span>
            <span>›</span>
            <span>{isEdit ? '수정' : '글쓰기'}</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-2xl">
          <h1 className="text-xl font-semibold text-[#1a1a1a] mb-8">
            {isEdit ? '게시글 수정' : '새 글 쓰기'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 공지 여부 */}
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded accent-[#4a7c59]"
              />
              <span className="text-[13px] text-[#555]">공지로 등록</span>
            </label>

            {/* 제목 */}
            <div>
              <label className="block text-[13px] text-[#555] mb-2 font-medium">
                제목 <span className="text-[#cc4444]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className={`w-full px-4 py-3 text-[15px] border rounded-lg bg-white placeholder-[#bbb] outline-none transition-colors ${
                  errors.title
                    ? 'border-[#cc4444] focus:border-[#cc4444]'
                    : 'border-[#e0d8cc] focus:border-[#4a7c59]'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-[12px] text-[#cc4444]">{errors.title}</p>
              )}
            </div>

            {/* 본문 에디터 */}
            <div>
              <label className="block text-[13px] text-[#555] mb-2 font-medium">
                내용 <span className="text-[#cc4444]">*</span>
              </label>
              <BoardEditor
                content={content}
                onChange={setContent}
                onImageUpload={handleEditorImageUpload}
              />
              {errors.content && (
                <p className="mt-1 text-[12px] text-[#cc4444]">{errors.content}</p>
              )}
            </div>

            {/* 이미지 업로드 (별도 첨부) */}
            <div>
              <label className="block text-[13px] text-[#555] mb-2 font-medium">
                이미지 첨부
              </label>
              <ImageUpload
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                uploadedImages={uploadedImages}
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 text-[14px] font-medium bg-[#4a7c59] text-white rounded-lg hover:bg-[#3d7a50] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? '저장 중...' : isEdit ? '수정 완료' : '게시하기'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 text-[14px] border border-[#d4ccc0] text-[#555] rounded-lg hover:bg-[#f0ede6] transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
