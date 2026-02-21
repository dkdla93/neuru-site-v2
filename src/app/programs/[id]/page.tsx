import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROGRAMS_POSTS } from '@/data/site-data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PROGRAMS_POSTS.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = PROGRAMS_POSTS.find((p) => p.id === Number(id));
  if (!post) return { title: '프로그램을 찾을 수 없습니다' };
  return { title: post.title };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = PROGRAMS_POSTS.find((p) => p.id === Number(id));
  if (!post) notFound();

  return (
    <div className="w-full">
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2">
            <Link href="/programs" className="hover:text-[#4a7c59]">문화 프로그램</Link>
            <span>&gt;</span>
            <span>{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site max-w-2xl">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-3">{post.title}</h1>
          <p className="text-[13px] text-[#aaa] mb-8 pb-6 border-b border-[#e0d8cc]">{post.date}</p>

          <div className="rounded-lg overflow-hidden mb-8">
            <Image
              src={post.imageSrc}
              alt={post.title}
              width={800}
              height={600}
              className="w-full object-cover"
            />
          </div>

          <div className="text-[15px] text-[#444] leading-relaxed">
            <p>{post.description}</p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#e0d8cc]">
            <Link href="/programs" className="text-[13px] text-[#4a7c59] hover:underline">
              &larr; 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
