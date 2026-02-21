import type { Metadata } from 'next';
import BoardWrite from '@/components/board/BoardWrite';

export const metadata: Metadata = {
  title: '글쓰기 - 공지 알림',
};

export default function NoticeWritePage() {
  return (
    <BoardWrite
      basePath="/notice"
      categoryId={2}
      categoryLabel="공지 알림"
    />
  );
}
