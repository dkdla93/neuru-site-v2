import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '느루 후원하기',
  description: '마을서재 느루의 버팀목이 되어주세요. 후원금은 마을서재 운영과 청소년 장학사업에 사용됩니다.',
};

const SUPPORT_USES = [
  {
    title: '마을서재 운영',
    description: '공간 유지, 도서 구입, 프로그램 재료비 등 일상적인 서재 운영에 사용됩니다.',
  },
  {
    title: '공동체 활동',
    description: '주민 모임, 커뮤니티 프로그램, 문화 행사 등의 활동 지원에 사용됩니다.',
  },
  {
    title: '청소년 장학사업',
    description: '지역 청소년에게 장학금을 지원하는 \'함께 키우는 장학금\'에 사용됩니다.',
  },
];

export default function SupportPage() {
  return (
    <div className="w-full">

      {/* 페이지 히어로 */}
      <div
        className="py-16 md:py-24"
        style={{ background: 'var(--accent)' }}
      >
        <div className="container-site max-w-2xl text-white">
          <span
            className="text-xs font-semibold tracking-widest uppercase block mb-4"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Support
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            느루의 버팀목이<br />되어 주세요!
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            느루의 버팀목이 되어주시는 후원자님들께 항상 감사드립니다.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site max-w-2xl">

          {/* 소개 텍스트 */}
          <div
            className="text-base leading-relaxed space-y-4 mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              마을서재 느루는 주민들의 자원활동으로 운영되는 공간입니다.<br />
              여러분의 후원이 마을서재를 지탱하는 힘이 됩니다.
            </p>
          </div>

          {/* 후원 사용처 */}
          <div className="mb-12">
            <h2
              className="text-lg font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              후원금 사용처
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SUPPORT_USES.map((use, index) => (
                <div
                  key={use.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mb-4 text-sm font-bold"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    className="font-semibold mb-2 text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {use.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {use.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 후원 계좌 카드 */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-light)' }}
              >
                <Heart size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                후원 안내
              </h2>
            </div>
            <dl className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex gap-4">
                <dt className="font-semibold w-16 flex-shrink-0" style={{ color: 'var(--text-primary)' }}>예금주</dt>
                <dd>마을n사람</dd>
              </div>
              <div
                className="flex gap-4 pt-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold w-16 flex-shrink-0" style={{ color: 'var(--text-primary)' }}>문의</dt>
                <dd>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div
                className="flex gap-4 pt-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold w-16 flex-shrink-0" style={{ color: 'var(--text-primary)' }}>이메일</dt>
                <dd>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p
              className="text-xs mt-5 pt-4"
              style={{
                color: 'var(--text-light)',
                borderTop: '1px solid var(--border-light)',
              }}
            >
              후원 문의는 전화 또는 이메일로 연락해주시면 자세히 안내드립니다.
            </p>
          </div>

          {/* 친구들 모집 링크 */}
          <div
            className="mt-8 rounded-2xl p-6 flex items-center justify-between gap-4"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--border)' }}
          >
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--accent)' }}>
                느루의 친구들 되기
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                후원 외에도 자원활동으로 함께할 수 있어요.
              </p>
            </div>
            <Link href="/friends" className="btn btn-outline flex-shrink-0 py-2 px-4 text-xs">
              알아보기 <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
