import type { Metadata } from 'next';
import Image from 'next/image';
import { SPACES } from '@/data/site-data';

export const metadata: Metadata = {
  title: '공간 안내',
  description: '마을서재 느루의 서재, 부엌, 게스트룸, 스터디룸을 소개합니다.',
};

export default function SpacePage() {
  return (
    <div className="w-full">

      {/* 페이지 히어로 */}
      <div
        className="py-16 md:py-24"
        style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-site max-w-3xl">
          <span className="label block mb-4">Space</span>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            공간 둘러보기
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-base leading-relaxed">
            서재에서는 홀로 또는 모임이 스터디, 세미나, 워크숍을 할 수 있어요.<br />
            홀로 오셔서 오롯이 책을 읽으셔도 되구요. 가만히 계시다 가셔도 좋습니다.
          </p>
        </div>
      </div>

      {/* 공간 목록 */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site max-w-3xl">
          <div className="space-y-20">
            {SPACES.map((space, index) => (
              <section key={space.name}>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-xs font-semibold tracking-widest"
                    style={{ color: 'var(--accent)' }}
                  >
                    0{index + 1}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'var(--border)' }}
                  />
                </div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                >
                  {space.name}
                </h2>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {space.description}
                  {space.detail && (
                    <>
                      <br />
                      <span className="text-sm" style={{ color: 'var(--text-light)' }}>
                        {space.detail}
                      </span>
                    </>
                  )}
                </p>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Image
                    src={space.imageSrc}
                    alt={`마을서재 느루 ${space.name}`}
                    width={900}
                    height={600}
                    className="w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
