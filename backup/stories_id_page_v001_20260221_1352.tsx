import type { Metadata } from 'next';
import Link from 'next/link';
import { STORIES_POSTS } from '@/data/site-data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return STORIES_POSTS.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = STORIES_POSTS.find((p) => p.id === Number(id));
  if (!post) return { title: '글을 찾을 수 없습니다' };
  return { title: post.title };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = STORIES_POSTS.find((p) => p.id === Number(id));
  if (!post) notFound();

  return (
    <div className="w-full">
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2">
            <Link href="/stories" className="hover:text-[#4a7c59]">느루 이야기</Link>
            <span>&gt;</span>
            <span>일일 소식</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-2xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-3">{post.title}</h1>
          <p className="text-[13px] text-[#aaa] mb-8 pb-6 border-b border-[#e0d8cc]">{post.date}</p>

          <div className="text-[15px] text-[#444] leading-relaxed">
            <p className="text-[#888]">원본 글은 아임웹 사이트에서 이전 중입니다.</p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#e0d8cc]">
            <Link href="/stories" className="text-[13px] text-[#4a7c59] hover:underline">
              &larr; 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
