'use client';

import { useState, useCallback } from 'react';

interface UploadedImage {
  url: string;
  filename: string;
}

interface ImageUploadProps {
  onUpload: (url: string, filename: string) => void;
  onRemove?: (url: string) => void;
  uploadedImages?: UploadedImage[];
  maxCount?: number;
}

export default function ImageUpload({
  onUpload,
  onRemove,
  uploadedImages = [],
  maxCount = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      if (uploadedImages.length >= maxCount) {
        alert(`최대 ${maxCount}개까지 업로드 가능합니다.`);
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || '업로드 실패');
        }

        const data = await res.json();
        onUpload(data.url, file.name);
      } catch (err) {
        alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
      } finally {
        setUploading(false);
      }
    },
    [uploadedImages.length, maxCount, onUpload]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(uploadFile);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(uploadFile);
  };

  return (
    <div className="space-y-3">
      {/* 업로드 영역 */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? 'border-[#4a7c59] bg-[#e8f0eb]'
            : 'border-[#d4ccc0] hover:border-[#4a7c59] hover:bg-[#faf8f4]'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <label className="cursor-pointer block">
          <div className="flex flex-col items-center gap-2">
            <svg
              width="28" height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dragOver ? '#4a7c59' : '#aaa'}
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {uploading ? (
              <span className="text-[13px] text-[#4a7c59]">업로드 중...</span>
            ) : (
              <>
                <span className="text-[13px] text-[#666]">
                  이미지를 드래그하거나 <span className="text-[#4a7c59] font-medium">클릭</span>하여 업로드
                </span>
                <span className="text-[11px] text-[#aaa]">
                  JPG, PNG, GIF, WebP · 최대 {maxCount}개
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {/* 업로드된 이미지 미리보기 */}
      {uploadedImages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {uploadedImages.map((img) => (
            <div key={img.url} className="relative group w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.filename}
                className="w-20 h-20 object-cover rounded-lg border border-[#e0d8cc]"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(img.url)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#cc4444] text-white rounded-full text-[11px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  title="삭제"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
