import type { Metadata } from 'next';
import BoardPageLayout from '@/components/board/BoardPageLayout';
import { ARCHIVE } from '@/data/site-data';

export const metadata: Metadata = {
  title: '이전 기록들',
  description: '마을서재 느루의 이전 기록들을 모아두었습니다.',
};

const staticPosts = ARCHIVE.map((p) => ({
  id: p.id,
  title: p.title,
  date: p.date,
}));

export default function ArchivePage() {
  return (
    <BoardPageLayout
      categorySlug="archive"
      categoryLabel="아카이브"
      pageTitle="느루의 이전 기록들"
      basePath="/archive"
      staticPosts={staticPosts}
    />
  );
}
