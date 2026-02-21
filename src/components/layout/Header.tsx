'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE, NAV_ITEMS } from '@/lib/constants';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // 스크롤 감지 → blur 효과
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* 헤더 바 */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(247, 244, 238, 0.88)'
            : 'rgba(247, 244, 238, 1)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid var(--border)',
          height: 'var(--header-height)',
        }}
      >
        <div
          className="container-site h-full flex items-center justify-between gap-8"
        >
          {/* 로고 */}
          <Link href="/" className="flex-shrink-0" aria-label="마을서재 느루 홈">
            <Image
              src={SITE.logoSrc}
              alt={SITE.name}
              width={80}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  }}
                >
                  {item.label}
                  {/* 활성 밑줄 */}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: 'var(--accent)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* 데스크톱 우측 - 후원 버튼 */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/support"
              className="btn btn-outline text-sm py-2 px-5"
            >
              느루 후원하기
            </Link>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>
      </header>

      {/* 헤더 높이만큼 공간 확보 */}
      <div style={{ height: 'var(--header-height)' }} aria-hidden="true" />

      {/* 모바일 사이드 메뉴 오버레이 */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          style={{ background: 'rgba(0,0,0,0.3)' }}
          aria-hidden="true"
        />
      )}

      {/* 모바일 사이드 메뉴 패널 */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
        style={{
          width: '72vw',
          maxWidth: '320px',
          background: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
        }}
      >
        {/* 사이드 메뉴 헤더 */}
        <div
          className="flex items-center justify-between p-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <Image
            src={SITE.logoSrc}
            alt={SITE.name}
            width={64}
            height={40}
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="메뉴 닫기"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* 사이드 메뉴 링크 */}
        <nav className="flex-1 p-5">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors"
                    style={{
                      background: isActive ? 'var(--accent-light)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 사이드 메뉴 하단 후원 버튼 */}
        <div className="p-5" style={{ borderTop: '1px solid var(--border)' }}>
          <Link
            href="/support"
            className="btn btn-primary w-full"
            onClick={() => setMenuOpen(false)}
          >
            느루 후원하기
          </Link>
          <p className="text-center text-xs mt-3" style={{ color: 'var(--text-light)' }}>
            {SITE.phone}
          </p>
        </div>
      </div>
    </>
  );
}
