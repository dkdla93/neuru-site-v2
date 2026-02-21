export const SITE = {
  name: '마을서재 느루',
  organization: '마을n사람',
  description: '마을서재, 공동체 활동, 느루부엌, 청소년 장학사업을 운영하는 따뜻한 주민의 커뮤니티 공간입니다.',
  url: 'https://neuru.org',
  phone: '032-576-0106',
  email: 'neuru23@naver.com',
  businessNumber: '137-82-74232',
  representative: '이혜경',
  address: '인천광역시 서구 장고개로',
  logoSrc: '/images/2a3e4d92dbee3_1.png',
  heroQuote: '세상은 너의 상상에\n맡겨져 있지',
  heroQuoteSource: '기러기, 메리 올리버',
  sns: {
    instagram: 'https://www.instagram.com/',
    youtube: '',
    naverBlog: '',
  },
};

export const NAV_ITEMS = [
  { label: '느루 알아보기', href: '/about' },
  { label: '느루 이야기', href: '/stories' },
  { label: '문화 프로그램', href: '/programs' },
  { label: '느루 후원하기', href: '/support' },
];

export const FOOTER_CATEGORIES = [
  { label: '느루 알아보기', href: '/about' },
  { label: '느루 이야기', href: '/stories' },
  { label: '문화프로그램', href: '/programs' },
  { label: '느루 후원하기', href: '/support' },
  { label: '느루 친구들', href: '/friends' },
];

// 아임웹 구 URL → 새 URL 매핑
export const URL_REDIRECTS: Record<string, string> = {
  '/main': '/',
  '/18': '/stories',
  '/19': '/about',
  '/20': '/',
  '/21': '/about',
  '/22': '/space',
  '/23': '/friends',
  '/24': '/guide',
  '/25': '/stories',
  '/26': '/notice',
  '/27': '/books',
  '/28': '/programs',
  '/29': '/guestbook',
  '/30': '/archive',
};
