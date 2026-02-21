'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useCallback } from 'react';

interface BoardEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;  // URL 반환
}

export default function BoardEditor({ content, onChange, onImageUpload }: BoardEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'board-editor-content',
      },
    },
  });

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor || !onImageUpload) return;
      try {
        const url = await onImageUpload(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch {
        alert('이미지 업로드에 실패했습니다.');
      }
      // 인풋 초기화
      e.target.value = '';
    },
    [editor, onImageUpload]
  );

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded text-[13px] transition-colors ${
        active
          ? 'bg-[#4a7c59] text-white'
          : 'text-[#555] hover:bg-[#e8f0eb] hover:text-[#4a7c59]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-[#e0d8cc] rounded-lg overflow-hidden bg-white">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-[#e0d8cc] bg-[#faf8f4]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="굵게"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="기울임"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="취소선"
        >
          <span style={{ textDecoration: 'line-through' }}>S</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-[#e0d8cc] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="제목2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="제목3"
        >
          H3
        </ToolbarButton>

        <div className="w-px h-5 bg-[#e0d8cc] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="목록"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="번호 목록"
        >
          1≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="인용"
        >
          "
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          active={false}
          title="구분선"
        >
          —
        </ToolbarButton>

        <div className="w-px h-5 bg-[#e0d8cc] mx-1" />

        {/* 이미지 업로드 버튼 */}
        {onImageUpload && (
          <label
            className="w-8 h-8 flex items-center justify-center rounded text-[13px] text-[#555] hover:bg-[#e8f0eb] hover:text-[#4a7c59] transition-colors cursor-pointer"
            title="이미지 삽입"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        )}

        <div className="flex-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          active={false}
          title="실행 취소"
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          active={false}
          title="다시 실행"
        >
          ↪
        </ToolbarButton>
      </div>

      {/* 에디터 본문 */}
      <EditorContent editor={editor} className="min-h-[300px]" />

      {/* 에디터 내부 스타일 */}
      <style>{`
        .board-editor-content {
          padding: 16px;
          min-height: 300px;
          outline: none;
          font-size: 15px;
          line-height: 1.8;
          color: #333;
        }
        .board-editor-content h2 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 1.2em 0 0.4em;
        }
        .board-editor-content h3 {
          font-size: 1.1em;
          font-weight: 600;
          margin: 1em 0 0.4em;
        }
        .board-editor-content p {
          margin: 0 0 0.8em;
        }
        .board-editor-content ul, .board-editor-content ol {
          padding-left: 1.5em;
          margin: 0.5em 0 0.8em;
        }
        .board-editor-content li { margin: 0.2em 0; }
        .board-editor-content blockquote {
          border-left: 3px solid #4a7c59;
          padding-left: 1em;
          color: #666;
          margin: 0.8em 0;
        }
        .board-editor-content img {
          max-width: 100%;
          border-radius: 6px;
          margin: 0.8em 0;
        }
        .board-editor-content hr {
          border: none;
          border-top: 1px solid #e0d8cc;
          margin: 1.2em 0;
        }
        .board-editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #bbb;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  );
}
