import type { Metadata } from 'next';
import BoardWrite from '@/components/board/BoardWrite';

export const metadata: Metadata = {
  title: '방명록 쓰기',
};

export default function GuestbookWritePage() {
  return (
    <BoardWrite
      basePath="/guestbook"
      categoryId={4}
      categoryLabel="방명록"
    />
  );
}
