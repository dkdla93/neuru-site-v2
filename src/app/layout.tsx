import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | 따뜻한 주민의 커뮤니티 공간`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["마을서재", "느루", "인천", "서구", "청소년", "인문학", "도서관", "커뮤니티", "마을n사람", "문화프로그램"],
  authors: [{ name: SITE.organization }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | 따뜻한 주민의 커뮤니티 공간`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="bg-[#f7f4ee]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
