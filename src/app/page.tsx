'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { STORIES_POSTS, PROGRAMS_POSTS, SPACES } from '@/data/site-data';
import { SITE } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

// 페이드 업 애니메이션 변수
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <div className="w-full">

      {/* ① 히어로 섹션 */}
      <section className="relative w-full h-[520px] md:h-[680px] overflow-hidden">
        <Image
          src="/images/cfbf3dc317ade_2.png"
          alt="마을서재 느루 - 따뜻한 주민의 커뮤니티 공간"
          fill
          className="object-cover object-center"
          priority
        />
        {/* 그라디언트 오버레이 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        />
        {/* 히어로 텍스트 */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-site">
            <p
              className="text-white/70 text-sm tracking-widest uppercase mb-3"
              style={{ fontWeight: 500, letterSpacing: '0.12em' }}
            >
              마을서재 느루
            </p>
            <h1
              className="text-white text-3xl md:text-5xl font-bold leading-tight whitespace-pre-line"
              style={{ letterSpacing: '-0.01em' }}
            >
              {SITE.heroQuote}
            </h1>
            <p className="text-white/60 text-sm mt-3">
              — {SITE.heroQuoteSource}
            </p>
          </div>
        </div>
      </section>

      {/* ② 마을서재 느루 소개 */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="label block mb-4">About</span>
            <h2
              className="text-3xl md:text-4xl font-bold leading-snug mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              마을서재 느루는 따뜻한<br />
              주민의 커뮤니티 공간입니다.
            </h2>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              마을서재 · 공동체활동 · 느루부엌 · 청소년장학사업
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn btn-outline">
                느루 알아보기
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ③ 지도 + 위치 안내 */}
      <section className="section-sm" style={{ background: 'var(--bg-white)' }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '16/7',
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
            <p
              className="text-center text-sm mt-3"
              style={{ color: 'var(--text-light)' }}
            >
              인천광역시 서구 장고개로 &nbsp;|&nbsp; {SITE.phone}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ④ 공간 둘러보기 */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <span className="label block mb-3">Space</span>
              <h2 className="section-title mb-2">공간 둘러보기</h2>
              <p className="section-subtitle">
                서재에서는 홀로 또는 모임이 스터디, 세미나, 워크숍을 할 수 있어요.<br className="hidden md:block" />
                홀로 오셔서 오롯이 책을 읽으셔도 되구요. 가만히 계시다 가셔도 좋습니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {SPACES.slice(0, 3).map((space) => (
                <motion.div key={space.name} variants={fadeUp}>
                  <Link
                    href={space.href}
                    className="group block"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl mb-4"
                      style={{
                        aspectRatio: '4/3',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <Image
                        src={space.imageSrc}
                        alt={space.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-semibold text-base mb-1"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {space.name}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {space.detail}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="flex-shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/space" className="btn btn-outline">
                공간 전체 보기
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ⑤ 느루의 최근 일상 */}
      <section className="section" style={{ background: 'var(--bg-white)' }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
              <div>
                <span className="label block mb-3">Stories</span>
                <h2 className="section-title mb-0">
                  느루의 최근 일상을<br />소개드립니다.
                </h2>
              </div>
              <Link
                href="/stories"
                className="hidden md:flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
                style={{ color: 'var(--accent)' }}
              >
                더보기 <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.ul
              variants={stagger}
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {STORIES_POSTS.slice(0, 5).map((post) => (
                <motion.li
                  key={post.id}
                  variants={fadeUp}
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <Link
                    href={post.url}
                    className="flex items-center justify-between py-4 group transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span
                      className="text-sm leading-relaxed group-hover:text-[var(--accent)] transition-colors"
                    >
                      {post.title}
                    </span>
                    <span
                      className="text-xs flex-shrink-0 ml-6"
                      style={{ color: 'var(--text-light)' }}
                    >
                      {post.date}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-6 md:hidden text-right">
              <Link
                href="/stories"
                className="flex items-center justify-end gap-1.5 text-sm font-medium"
                style={{ color: 'var(--accent)' }}
              >
                더보기 <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ⑥ 문화 프로그램 */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <span className="label block mb-3">Programs</span>
              <h2 className="section-title mb-2">
                느루에서 진행 중인<br />문화프로그램을 소개합니다.
              </h2>
              <p className="section-subtitle">
                동네에서 함께 즐길 수 있는 프로그램이라면<br />
                누구나 열고 참여할 수 있습니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {PROGRAMS_POSTS.map((program) => (
                <motion.div key={program.id} variants={fadeUp}>
                  <Link href={program.url} className="group block">
                    <div
                      className="relative rounded-2xl overflow-hidden mb-4"
                      style={{
                        aspectRatio: '3/4',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <Image
                        src={program.imageSrc}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p
                      className="font-semibold text-sm mb-1 leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {program.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                      {program.date}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/programs" className="btn btn-outline">
                프로그램 둘러보기
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ⑦ 느루의 버팀목 (후원) */}
      <section className="section" style={{ background: 'var(--bg-white)' }}>
        <div className="container-site">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <span className="label block mb-4">Support</span>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              느루의 버팀목이 되어 주세요!
            </h2>
            <p className="section-subtitle mx-auto text-center mb-8">
              느루의 버팀목이 되어주시는 후원자님들께 항상 감사드립니다.<br />
              마을서재 느루를 함께 만들어 가는 &apos;느루의 친구들&apos;이 되어주세요.
            </p>
            <Link href="/support" className="btn btn-primary">
              느루 후원하기
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ⑧ 새로 들인 책 */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="label block mb-3">Books</span>
                <h2 className="section-title mb-0">새로 들인 책을 소개합니다.</h2>
              </div>
              <p className="text-xs hidden md:block" style={{ color: 'var(--text-light)' }}>
                2023. 12. 10
              </p>
            </div>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                예술가의 서재, 식물의 인문학, 숲의 인문학, 꽃으로 박완서를 읽다, 꽃으로 토지를 읽다 등
                새로운 책들이 들어왔습니다. 마을서재 느루에 오셔서 읽어보세요.
              </p>
              <div className="mt-4">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
                  style={{ color: 'var(--accent)' }}
                >
                  더보기 <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⑨ 느루의 친구들 모집 */}
      <section className="section" style={{ background: 'var(--accent)' }}>
        <div className="container-site">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase block mb-4"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Friends
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              마을의 작은 도서관인 마을서재에서<br />
              &apos;느루의 친구들&apos;을 모집합니다.
            </h2>
            <p
              className="text-sm leading-relaxed mb-2"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              주민들이 만든 공간에서 함께 자원 활동으로 운영을 꾸려나가요.
            </p>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              삶의 비빌 언덕이 될 수 있는 친구들을 만날 수가 있습니다.
            </p>
            <Link
              href="/friends"
              className="btn"
              style={{
                background: 'var(--bg-white)',
                color: 'var(--accent)',
              }}
            >
              느루 친구들 신청하기
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
