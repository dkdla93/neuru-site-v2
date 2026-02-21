import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROGRAMS_POSTS } from '@/data/site-data';

export const metadata: Metadata = {
  title: '문화 프로그램',
  description: '마을서재 느루에서 진행 중인 문화프로그램을 소개합니다. 동네에서 함께 즐길 수 있는 프로그램이라면 누구나 열고 참여할 수 있습니다.',
};

export default function ProgramsPage() {
  return (
    <div className="w-full">
      {/* 페이지 헤더 */}
      <div className="border-b border-[#e0d8cc] py-3">
        <div className="container-site">
          <nav className="text-[12px] text-[#888] flex gap-2">
            <span>문화 프로그램</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container-site">
          <h1 className="text-2xl font-semibold text-[#2c2c2c] mb-4">마을서재 문화 프로그램</h1>
          <p className="text-[14px] text-[#666] mb-10">
            동네에서 함께 즐길 수 있는 프로그램이라면 누구나 열고 참여할 수 있습니다.
          </p>

          {/* 프로그램 그리드 (갤러리형) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS_POSTS.map((program) => (
              <Link
                key={program.id}
                href={program.url}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={program.imageSrc}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[14px] font-semibold text-[#2c2c2c] mb-2">{program.title}</p>
                  <p className="text-[12px] text-[#888] mb-2">{program.description}</p>
                  <p className="text-[11px] text-[#bbb]">{program.date}</p>
                </div>
              </Link>
            ))}
          </div>

          {PROGRAMS_POSTS.length === 0 && (
            <div className="py-20 text-center text-[14px] text-[#aaa]">
              진행 중인 프로그램이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
