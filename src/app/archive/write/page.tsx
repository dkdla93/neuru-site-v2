import type { Metadata } from 'next';
import BoardWrite from '@/components/board/BoardWrite';

export const metadata: Metadata = {
  title: '글쓰기 - 아카이브',
};

export default function ArchiveWritePage() {
  return (
    <BoardWrite
      basePath="/archive"
      categoryId={5}
      categoryLabel="아카이브"
    />
  );
}
