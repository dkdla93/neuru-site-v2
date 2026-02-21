// 크롤링 데이터 기반 정적 콘텐츠

export const STORIES_POSTS = [
  { id: 1, title: '2025년 마을서재 느루 콘텐츠 개요', date: '2025-01-01', url: '/stories/1' },
  { id: 2, title: '느루 가을편지', date: '2024-10-01', url: '/stories/2' },
  { id: 3, title: '마을서재 느루 열 세살', date: '2024-09-01', url: '/stories/3' },
  { id: 4, title: '<느루 동아리> 디지털디톡스 첫스타트', date: '2024-07-01', url: '/stories/4' },
  { id: 5, title: '마을활력포럼/작은도서관, 어린이 청소년을 품다.', date: '2024-06-01', url: '/stories/5' },
  { id: 6, title: '텃밭냠냠 시즌2', date: '2024-05-01', url: '/stories/6' },
  { id: 7, title: '화성시 봉담마을공동체 _ 마을서재 느루 탐방', date: '2024-04-01', url: '/stories/7' },
  { id: 8, title: '<텃밭 냠냠 모임> 시작합니다. ^^', date: '2024-03-01', url: '/stories/8' },
  { id: 9, title: '느루, 텃밭 임대했습니다.', date: '2024-02-01', url: '/stories/9' },
  { id: 10, title: '마을서재 느루 실무자 워크숍', date: '2024-01-01', url: '/stories/10' },
];

export const PROGRAMS_POSTS = [
  {
    id: 1,
    title: '공동체영화 상영 <문명의 끝에서>',
    description: '우리가 매일 버리는 쓰레기, 어디로 가는거죠? 인천에서 함께 보아요.',
    date: '2024-08-11',
    url: '/programs/1',
    imageSrc: '/images/31c29f1d54582_39.png',
  },
  {
    id: 2,
    title: '텃밭냠냠 시즌2',
    description: '봄여름 작물을 다 마치고, 냠냠은 시즌2로 접어들었어요. 시원한 서재에서 함께해요.',
    date: '2024-07-01',
    url: '/programs/2',
    imageSrc: '/images/87668566c58ec_40.png',
  },
  {
    id: 3,
    title: '<텃밭 냠냠 모임> 시작합니다.',
    description: '일곱 분의 주민분들이 신청하셨어요. 함께 텃밭을 가꾸어요.',
    date: '2024-05-01',
    url: '/programs/3',
    imageSrc: '/images/d42adc262ffb1_41.png',
  },
];

export const NOTICES = [
  { id: 1, title: '1~2월 마을서재 느루 상근 일정', date: '2025-01-01', url: '/notice/1' },
  { id: 2, title: '12월 마을서재 느루 상근 일정', date: '2024-12-01', url: '/notice/2' },
  { id: 3, title: '11월 마을서재 느루 소식 (24년 4분기)', date: '2024-11-01', url: '/notice/3' },
  { id: 4, title: '11월 마을서재 느루 상근 일정', date: '2024-11-01', url: '/notice/4' },
  { id: 5, title: '8월 마을서재 느루 상근 일정', date: '2024-08-01', url: '/notice/5' },
  { id: 6, title: '마을n사람 운영위 13차', date: '2024-07-01', url: '/notice/6' },
  { id: 7, title: '7월 마을서재 느루 상근 일정', date: '2024-07-01', url: '/notice/7' },
  { id: 8, title: '6월 마을서재 느루 상근 일정', date: '2024-06-01', url: '/notice/8' },
  { id: 9, title: '4월 마을서재 느루 소식 (24년 2분기)', date: '2024-04-01', url: '/notice/9' },
  { id: 10, title: '[공지] 느루의 친구들 모집', date: '2024-03-01', url: '/notice/10' },
];

export const BOOKS = [
  {
    id: 1,
    title: '예술가의 서재, 식물의 인문학, 숲의 인문학, 꽃으로 박완서를 읽다, 꽃으로 토지를 읽다',
    date: '2023-12-10',
    url: '/books/1',
  },
];

export const ARCHIVE = [
  { id: 1, title: '우리 동네는 살아있는 학교_고영직(2015)', date: '2015-01-01', url: '/archive/1' },
  { id: 2, title: '인문적 삶에 대한 고민을 나누는 작은도서관(2014)', date: '2014-01-01', url: '/archive/2' },
  { id: 3, title: '삶이 예술이 되는 공간(2019)', date: '2019-01-01', url: '/archive/3' },
  { id: 4, title: '느루에서 세상과 접속하다(2012)', date: '2012-01-01', url: '/archive/4' },
  { id: 5, title: "청소년을 '위한' 공간? 청소년'의' 공간! 청소년인문학도서관 느루를 만나다(2016)", date: '2016-01-01', url: '/archive/5' },
];

export const SPACES = [
  {
    name: '서재',
    description: '서재에서는 홀로 또는 모임이 스터디, 세미나, 워크숍을 할 수 있어요. 홀로 오셔서 오롯이 책을 읽으셔도 되구요. 가만히 계시다 가셔도 좋습니다.',
    detail: '좋은 책, 독립잡지, 향기로운 차와 커피가 준비되어 있습니다.',
    imageSrc: '/images/54a4aafaa522d_36.png',
    href: '/space',
  },
  {
    name: '부엌',
    description: '커피머신, 커피메이커, 오븐, 인덕션이 갖추어져 있습니다.',
    detail: '주민들이 함께 요리하고 나눌 수 있는 공간입니다.',
    imageSrc: '/images/8bb0c989f95a6_37.png',
    href: '/space',
  },
  {
    name: '게스트룸',
    description: 'TBD',
    detail: '',
    imageSrc: '/images/6ae2a1bfd2103_38.png',
    href: '/space',
  },
  {
    name: '스터디룸1',
    description: 'TBD',
    detail: '',
    imageSrc: '/images/31c29f1d54582_39.png',
    href: '/space',
  },
  {
    name: '스터디룸2',
    description: 'TBD',
    detail: '',
    imageSrc: '/images/87668566c58ec_40.png',
    href: '/space',
  },
];
