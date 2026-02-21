'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SITE, FOOTER_CATEGORIES } from '@/lib/constants';

// SNS 아이콘 SVG 컴포넌트
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function NaverBlogIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
    </svg>
  );
}

export default function Footer() {
  const hasSNS = SITE.sns.instagram || SITE.sns.naverBlog || SITE.sns.youtube;

  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      {/* 메인 푸터 */}
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* 좌측 - 기관 정보 */}
          <div>
            {/* 로고 */}
            <Link href="/" aria-label="마을서재 느루 홈">
              <Image
                src={SITE.logoSrc}
                alt={SITE.name}
                width={80}
                height={50}
                className="h-10 w-auto object-contain mb-5"
              />
            </Link>

            {/* 소개 문구 */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              {SITE.description}
            </p>

            {/* 연락처 */}
            <div className="text-sm space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <span style={{ color: 'var(--text-light)', fontSize: '12px', marginRight: '6px' }}>TEL</span>
                <a href={`tel:${SITE.phone}`} className="hover:text-[var(--accent)] transition-colors">
                  {SITE.phone}
                </a>
              </p>
              <p>
                <span style={{ color: 'var(--text-light)', fontSize: '12px', marginRight: '6px' }}>EMAIL</span>
                <a href={`mailto:${SITE.email}`} className="hover:text-[var(--accent)] transition-colors">
                  {SITE.email}
                </a>
              </p>
              <p>
                <span style={{ color: 'var(--text-light)', fontSize: '12px', marginRight: '6px' }}>사업자</span>
                <span>{SITE.businessNumber}</span>
              </p>
              <p>
                <span style={{ color: 'var(--text-light)', fontSize: '12px', marginRight: '6px' }}>대표</span>
                <span>{SITE.representative}</span>
              </p>
            </div>

            {/* SNS 아이콘 */}
            {hasSNS && (
              <div className="flex items-center gap-3 mt-6">
                {SITE.sns.instagram && (
                  <a
                    href={SITE.sns.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="인스타그램"
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      background: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <InstagramIcon />
                  </a>
                )}
                {SITE.sns.naverBlog && (
                  <a
                    href={SITE.sns.naverBlog}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="네이버 블로그"
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      background: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#03c75a';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <NaverBlogIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 우측 - 사이트 링크 */}
          <div className="grid grid-cols-2 gap-8">
            {/* 사이트맵 */}
            <div>
              <p
                className="text-xs font-semibold mb-4 tracking-widest uppercase"
                style={{ color: 'var(--accent)' }}
              >
                사이트맵
              </p>
              <ul className="space-y-2.5">
                {FOOTER_CATEGORIES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 이용 안내 */}
            <div>
              <p
                className="text-xs font-semibold mb-4 tracking-widest uppercase"
                style={{ color: 'var(--accent)' }}
              >
                이용 안내
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/guide"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    이용 안내
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notice"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    공지 알림
                  </Link>
                </li>
                <li>
                  <Link
                    href="/space"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    공간 소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guestbook"
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    방명록
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 바 */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="text-xs" style={{ color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} {SITE.organization}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-light)' }}>
            <Link href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">
              이용약관
            </Link>
            <span style={{ color: 'var(--border)' }}>|</span>
            <Link href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
