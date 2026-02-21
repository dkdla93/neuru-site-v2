import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '느루의 친구들 모집',
  description: '마을의 작은도서관인 마을서재에서 느루의 친구들을 모집합니다.',
};

const FRIEND_BENEFITS = [
  {
    label: '역할',
    value: '느루 자원활동',
  },
  {
    label: '리워드',
    value: '마을에 대한 자긍심, 즐거운 이웃 만남',
  },
  {
    label: '문의',
    value: '032-576-0106',
    href: 'tel:032-576-0106',
  },
];

export default function FriendsPage() {
  return (
    <div className="w-full">

      {/* 페이지 히어로 */}
      <div
        className="py-16 md:py-24"
        style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-site max-w-3xl">
          <span className="label block mb-4">Friends</span>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            느루의 친구들<br />모집합니다
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-base leading-relaxed">
            마을의 작은도서관인 마을서재에서<br />함께 할 &apos;느루의 친구들&apos;을 기다립니다.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site max-w-3xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* 좌측 텍스트 */}
            <div>
              <div
                className="space-y-4 text-base leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                <p>
                  마을의 작은도서관인 마을서재<br />
                  &apos;느루의 친구들&apos;을 모집합니다.
                </p>
                <p>
                  주민들이 함께 만든 공간을<br />
                  자원 활동으로 운영을 꾸려나가요.
                </p>
                <p>
                  느루의 친구들이 되시면,<br />
                  마을에 대한 가치심, 즐거운 이웃께<br />
                  느루의 친구들 연선회 등 삶이가는데
                </p>
                <p>
                  비밀 연락이 될 수 있는<br />
                  동료들을 만날 수가 있습니다.
                </p>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  많은 분께 바랍니다.
                </p>
              </div>

              {/* 안내 카드 */}
              <div
                className="rounded-2xl p-5 mb-6"
                style={{
                  background: 'var(--accent-light)',
                  border: '1px solid var(--border)',
                }}
              >
                <dl className="space-y-3 text-sm">
                  {FRIEND_BENEFITS.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <dt
                        className="font-semibold flex-shrink-0 w-14"
                        style={{ color: 'var(--accent)' }}
                      >
                        {item.label}
                      </dt>
                      <dd style={{ color: 'var(--text-secondary)' }}>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="hover:text-[var(--accent)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 신청 버튼 */}
              <a
                href="mailto:neuru23@naver.com?subject=느루의 친구들 신청"
                className="btn btn-primary"
              >
                느루 친구들 신청하기
                <ArrowRight size={15} />
              </a>
            </div>

            {/* 우측 이미지 */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Image
                src="/images/a11aa49d6c689_43.png"
                alt="느루의 친구들 모집 포스터"
                width={500}
                height={600}
                className="w-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
