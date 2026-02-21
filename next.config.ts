import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.imweb.me' },
    ],
  },

  // 아임웹 구 URL → 새 URL 301 리다이렉트
  async redirects() {
    return [
      { source: '/main', destination: '/', permanent: true },
      { source: '/18', destination: '/stories', permanent: true },
      { source: '/19', destination: '/about', permanent: true },
      { source: '/20', destination: '/', permanent: true },
      { source: '/21', destination: '/about', permanent: true },
      { source: '/22', destination: '/space', permanent: true },
      { source: '/23', destination: '/friends', permanent: true },
      { source: '/24', destination: '/guide', permanent: true },
      { source: '/25', destination: '/stories', permanent: true },
      { source: '/26', destination: '/notice', permanent: true },
      { source: '/27', destination: '/books', permanent: true },
      { source: '/28', destination: '/programs', permanent: true },
      { source: '/29', destination: '/guestbook', permanent: true },
      { source: '/30', destination: '/archive', permanent: true },
    ];
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
