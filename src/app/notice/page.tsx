import type { Metadata } from 'next';
import BoardPageLayout from '@/components/board/BoardPageLayout';
import { NOTICES } from '@/data/site-data';

export const metadata: Metadata = {
  title: '공지 알림',
  description: '마을서재 느루의 공지사항을 확인하세요.',
};

const staticPosts = NOTICES.map((p) => ({
  id: p.id,
  title: p.title,
  date: p.date,
}));

export default function NoticePage() {
  return (
    <BoardPageLayout
      categorySlug="notice"
      categoryLabel="공지 알림"
      pageTitle="느루 공지 알림"
      basePath="/notice"
      staticPosts={staticPosts}
    />
  );
}
