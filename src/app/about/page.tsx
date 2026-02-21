import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '느루 알아보기',
  description: '지역기반 주민조직인 마을n사람이 운영하는 작은도서관 마을서재 느루를 소개합니다.',
};

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* 페이지 히어로 */}
      <div
        className="py-16 md:py-24"
        style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-site max-w-2xl">
          <span className="label block mb-4">About</span>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            마을서재 느루<br />스토리
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-base leading-relaxed">
            지역기반 주민조직인 마을n사람이 운영하는<br />작은도서관 마을서재 느루를 소개합니다.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site max-w-2xl">

          {/* 스토리 텍스트 */}
          <div
            className="space-y-5 text-base leading-relaxed mb-14"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              지역기반 주민조직인 <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>&lt;마을n사람&gt;</strong>이 운영하는<br />
              작은도서관 「마을서재 느루」는 2011년에 만들어졌어요.
            </p>
            <p>
              원래는 「청소년인문학도서관 느루」였지요.<br />
              그런데 지역에 청소년수련원이 크게 생겼습니다.<br />
              그래서 아이들은 공공에서 만든 청소년공간으로 모이고 있구요.<br />
              느루는 지역주민 누구나 이용하는 서재공간으로 탈바꿈 하였답니다.
            </p>
            <p>
              작은도서관 「마을서재 느루」는 누구나 이용할 수 있답니다.
            </p>
            <p>
              마을n사람은 지역의 청소년 장학금인<br />
              &apos;함께 키우는 장학금&apos;을 9년째 배분하고 있는데요.<br />
              &apos;함께 키우는 장학금&apos;은 서울대 건축학과 40기 동기회와<br />
              운생동건축사가 함께 만들고 있습니다.
            </p>
            <p>
              커뮤니티도서관으로 거듭난 만큼<br />
              마을의 아이들, 청소년부터 어른과 노인까지<br />
              서로에게 좋은 영향을 주고받는 즐거운 콘텐츠와<br />
              모두의 공간으로 함께 만들어가길 바랍니다.
            </p>
            <p>
              다양한 주민모임의 공간으로 작은도서관<br />
              마을서재느루를 많이 이용 바랍니다.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              ps. 마을서재 느루 운영은 자원활동으로 만들어갑니다. ^^
            </p>
          </div>

          {/* 공간 사진 */}
          <div
            className="rounded-2xl overflow-hidden mb-14"
            style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <Image
              src="/images/54a4aafaa522d_36.png"
              alt="마을서재 느루 내부"
              width={800}
              height={500}
              className="w-full object-cover"
            />
          </div>

          {/* 이용 안내 카드 */}
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h2
              className="text-lg font-bold mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              이용 안내
            </h2>
            <dl className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex gap-4">
                <dt className="font-semibold flex-shrink-0 w-20" style={{ color: 'var(--text-primary)' }}>개방시간</dt>
                <dd>
                  화~금 오후 1시~5시 / 토: 탄력적 개방 / 일·월·공휴일 휴관
                  <br />
                  <span className="text-xs" style={{ color: 'var(--text-light)' }}>※ 그 밖에 필요에 따라 탄력적 운영</span>
                </dd>
              </div>
              <div
                className="flex gap-4 py-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold flex-shrink-0 w-20" style={{ color: 'var(--text-primary)' }}>공간</dt>
                <dd>
                  총 58평<br />
                  느루서재 1개(40평) / 세미나실 2개(각 2평) / OA 공간 1개(3평) / 게스트 공간 1개(3평) / 공유부엌 1개(10평)
                </dd>
              </div>
              <div
                className="flex gap-4 py-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold flex-shrink-0 w-20" style={{ color: 'var(--text-primary)' }}>주소</dt>
                <dd>
                  인천광역시 서구 장고개로 272, 해창빌딩 3층<br />
                  <span className="text-xs" style={{ color: 'var(--text-light)' }}>주차: 가로변, 골목</span>
                </dd>
              </div>
              <div
                className="flex gap-4 py-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold flex-shrink-0 w-20" style={{ color: 'var(--text-primary)' }}>전화</dt>
                <dd>
                  <a href="tel:032-576-0106" className="hover:text-[var(--accent)] transition-colors">
                    032-576-0106
                  </a>
                </dd>
              </div>
              <div
                className="flex gap-4 py-3"
                style={{ borderTop: '1px solid var(--border-light)' }}
              >
                <dt className="font-semibold flex-shrink-0 w-20" style={{ color: 'var(--text-primary)' }}>이메일</dt>
                <dd>
                  <a href="mailto:neuru23@naver.com" className="hover:text-[var(--accent)] transition-colors">
                    neuru23@naver.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* 지도 */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              aspectRatio: '16/9',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <iframe
              src="https://map.naver.com/p/entry/place/1033289856?c=15.00,0,0,0,dh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="마을서재 느루 위치"
              loading="lazy"
            />
          </div>

          {/* 공간 보기 링크 */}
          <div className="mt-8 flex justify-center">
            <Link href="/space" className="btn btn-outline">
              공간 둘러보기
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
