# 느루 사이트 디자인 리뉴얼 + 게시판 구현 계획

## Context

마을서재 느루 사이트가 아임웹에서 Next.js로 1차 이전 완료 (https://neuru-site.vercel.app). 현재는 정적 데이터 기반으로 기존 콘텐츠를 100% 이식한 상태. 이제 **디자인을 미니멀/모던하게 디벨롭**하고, **게시판 글쓰기 기능을 구현**한 뒤 **새로운 Vercel 프로젝트로 배포**하려 함.

핵심 원칙:
- 기존 정보 100% 유지 (콘텐츠, 메뉴 구조, 페이지)
- 현재 따뜻한 베이지+그린 컬러 결 유지하되 더 세련되게
- 미니멀, 깔끔, 모던한 디자인으로 업그레이드
- 사용자가 게시판에서 글을 쓸 수 있는 기능 추가

---

## 에이전트 팀 구성

### 사전 준비
settings.json에 환경변수 추가:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 팀 구조 (리더 + 3 팀원)

| 역할 | 담당 영역 | 작업 내용 |
|------|----------|---------|
| **리더** | 전체 조율 | 작업 분배, 코드 리뷰, 통합, 배포 |
| **디자인 팀원** | UI/UX 리뉴얼 | 전체 디자인 시스템 개선, 각 페이지 스타일링 |
| **백엔드 팀원** | 게시판 기능 | DB 연동, API routes, CRUD 구현 |
| **프론트 팀원** | 게시판 UI + 상세페이지 | 글쓰기 폼, 상세 뷰, 게시판 컴포넌트 |

### 팀 생성 프롬프트
```
마을서재 느루 웹사이트 디자인 리뉴얼과 게시판 기능 구현을 위한 에이전트 팀을 만들어줘.

팀원 3명:
1. "designer" - 디자인 시스템 개선 및 전체 페이지 UI 리뉴얼 담당. src/app/globals.css, 각 page.tsx의 스타일링, Header/Footer 컴포넌트 개선 작업. Sonnet 모델 사용.
2. "backend" - Supabase 연동 게시판 백엔드 구현 담당. DB 스키마, API routes, 인증, 이미지 업로드 작업. Sonnet 모델 사용.
3. "frontend" - 게시판 UI 컴포넌트 구현 담당. 글쓰기 폼, 상세 뷰, 리스트 컴포넌트, 에디터 작업. Sonnet 모델 사용.

각 팀원이 작업 전에 계획 승인을 요청하도록 해줘 (require plan approval).
파일 충돌을 피하기 위해 각 팀원이 다른 파일을 소유하도록 작업을 분배해줘.
```

---

## 1. 디자인 리뉴얼 계획

### 디자인 방향
- **미니멀**: 불필요한 장식 제거, 여백 활용 극대화
- **모던**: 큰 타이포그래피, 깔끔한 그리드, 부드러운 애니메이션
- **따뜻함 유지**: 베이지(#f5f0e8) + 그린(#4a7c59) 톤 유지하되 더 세련되게 조정

### 레퍼런스 디자인 참고
- Open Society Foundations - 강한 타이포그래피, 구조적 그리드
- Battersea - 미니멀 + 마이크로 인터랙션
- 한국 서울도서관 사이트 - 한국적 감성 + 모던
- Korean Cultural Center NY Library - 한국 미니멀리즘

### 디자인 시스템 개선 (globals.css + 컴포넌트)

#### 컬러 팔레트 정제
```css
/* 현재 → 개선 */
--bg: #f5f0e8 → #f7f4ee        /* 약간 더 밝고 부드럽게 */
--bg-white: #ffffff             /* 유지 */
--text-primary: #2c2c2c → #1a1a1a  /* 더 진하게 - 대비 강화 */
--text-secondary: #666 → #6b6b6b
--text-light: #999 → #a0a0a0
--accent: #4a7c59 → #3d7a50     /* 약간 더 깊은 그린 */
--accent-light: #e8f0eb          /* 신규 - 연한 그린 배경 */
--border: #e0d8cc → #e8e2d8     /* 더 부드러운 보더 */
```

#### 타이포그래피 개선
- **폰트**: Noto Sans KR → **Pretendard** (사용자 선택. 더 모던하고 가독성 좋음. pretendard CDN 또는 next/font/local 사용)
- **제목**: 더 큰 사이즈, font-weight 700
- **본문**: 16px로 상향, letter-spacing 조정
- **행간**: 1.7 → 1.8 (더 여유롭게)

#### 레이아웃 개선
- **컨테이너**: 1100px → 1200px (더 넓은 콘텐츠 영역)
- **섹션 패딩**: 80px → 100px (더 여유로운 여백)
- **그리드 갭**: 일관된 간격 시스템 (8px 배수)
- **카드**: 라운드 코너 12px → 16px, 부드러운 그림자

### 페이지별 디자인 개선

#### 메인 페이지 (page.tsx)
- **Hero**: 텍스트 오버레이 개선, gradient overlay 추가
- **소개 섹션**: 더 큰 타이포그래피, 중앙 정렬
- **공간 투어**: 카드 호버 효과 개선, overlay 텍스트
- **이야기 리스트**: 좌측 날짜 + 타이틀 레이아웃 개선
- **프로그램**: 이미지 비율 통일, 카드 그림자 개선
- **후원 CTA**: 더 임팩트 있는 레이아웃

#### Header 리뉴얼
- 1행 심플 레이아웃 (로고 좌측, 네비 우측)
- 모바일: 슬라이드인 사이드 메뉴 (드롭다운 → 사이드바)
- 스크롤 시 배경 blur 효과
- 네비 호버: 밑줄 애니메이션

#### Footer 리뉴얼
- 더 심플한 2-column 레이아웃
- 불필요한 구독 CTA 제거 또는 간소화
- SNS 아이콘 추가

#### 상세 페이지 개선
- 게시글 상세: 깔끔한 타이포그래피, 이미지 최적화
- 프로그램 상세: 큰 히어로 이미지 + 하단 정보

### 디자인 팀원 담당 파일
```
src/app/globals.css
src/app/page.tsx
src/app/about/page.tsx
src/app/space/page.tsx
src/app/support/page.tsx
src/app/friends/page.tsx
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/lib/constants.ts (디자인 관련 상수만)
```

---

## 2. 게시판 기능 구현 계획

### 기술 스택 선택: Supabase

| 항목 | 선택 | 이유 |
|------|------|------|
| DB | Supabase (PostgreSQL) | 무료 2개 프로젝트, 500MB, 실시간 지원 |
| 이미지 | Supabase Storage | 1GB 무료, 간편한 연동 |
| 인증 | Supabase Auth (관리자 로그인) | 관리자 계정으로 로그인해야 글쓰기 가능. 일반 방문자는 읽기만 |
| 에디터 | tiptap 또는 react-quill | WYSIWYG 에디터 |

### DB 스키마
```sql
-- 게시판 카테고리
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,     -- 'stories', 'notice', 'books', 'guestbook', 'archive'
  name TEXT NOT NULL,            -- '일일 소식', '공지 알림', ...
  description TEXT,
  sort_order INT DEFAULT 0
);

-- 게시글
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  title TEXT NOT NULL,
  content TEXT,                  -- HTML 콘텐츠
  author_id UUID REFERENCES auth.users(id),  -- Supabase Auth 사용자
  author_name TEXT DEFAULT '관리자',
  is_pinned BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 게시글 이미지
CREATE TABLE post_images (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  filename TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 인증 방식: 관리자 로그인
- Supabase Auth 사용 (이메일+비밀번호)
- 관리자 계정 1개만 생성 (Supabase 대시보드에서)
- 로그인한 관리자만 글쓰기/수정/삭제 가능
- 일반 방문자는 읽기만 가능
- 로그인 페이지: `/admin/login`
- 로그인 상태일 때만 글쓰기 버튼 노출

### API Routes
```
src/app/api/
├── posts/
│   ├── route.ts           -- GET (목록), POST (작성, 인증 필요)
│   └── [id]/
│       └── route.ts       -- GET (상세), PUT (수정, 인증), DELETE (삭제, 인증)
├── upload/
│   └── route.ts           -- POST (이미지 업로드, 인증 필요)
├── categories/
│   └── route.ts           -- GET (카테고리 목록)
└── auth/
    └── route.ts           -- POST (로그인/로그아웃)
```

### 게시판 UI 컴포넌트
```
src/components/board/
├── BoardList.tsx         -- 게시글 목록 (기존 BoardList 확장)
├── BoardDetail.tsx       -- 게시글 상세 뷰
├── BoardWrite.tsx        -- 글쓰기/수정 폼
├── BoardEditor.tsx       -- WYSIWYG 에디터 래퍼
├── ImageUpload.tsx       -- 이미지 업로드 컴포넌트
├── PasswordModal.tsx     -- 비밀번호 입력 모달
└── Pagination.tsx        -- 페이지네이션
```

### 게시판 페이지 구조
```
src/app/
├── stories/
│   ├── page.tsx          -- 목록 (기존 탭 구조 유지 + DB 연동)
│   ├── [id]/page.tsx     -- 상세 (DB에서 조회)
│   └── write/page.tsx    -- 글쓰기
├── notice/
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── write/page.tsx
├── books/
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── write/page.tsx
├── guestbook/
│   ├── page.tsx          -- 신규 구현
│   └── write/page.tsx
└── archive/
    ├── page.tsx
    ├── [id]/page.tsx
    └── write/page.tsx
```

### 기존 데이터 마이그레이션
- `crawler/output/board-posts-detail.json`의 30개 게시글을 Supabase에 시드 데이터로 입력
- 기존 `src/data/site-data.ts` 정적 데이터를 DB 초기 데이터로 변환
- 마이그레이션 스크립트: `scripts/seed-database.ts`

### 백엔드 팀원 담당 파일
```
src/app/api/**
src/lib/supabase.ts
src/lib/auth.ts
scripts/seed-database.ts
supabase/ (설정)
```

### 프론트 팀원 담당 파일
```
src/components/board/**
src/app/stories/[id]/page.tsx
src/app/stories/write/page.tsx
src/app/notice/[id]/page.tsx
src/app/notice/write/page.tsx
src/app/books/[id]/page.tsx
src/app/guestbook/page.tsx
src/app/guestbook/write/page.tsx
src/app/archive/[id]/page.tsx
```

---

## 3. 작업 순서 및 의존 관계

```
Phase 1 (병렬 작업):
├── [designer] 디자인 시스템 정의 (globals.css, 컬러, 타이포)
├── [backend] Supabase 프로젝트 생성 + DB 스키마 + API routes
└── [frontend] 게시판 컴포넌트 골격 설계

Phase 2 (병렬 작업, Phase 1 완료 후):
├── [designer] 메인 페이지 + Header/Footer 리뉴얼
├── [backend] 이미지 업로드 + 데이터 시딩
└── [frontend] 글쓰기 폼 + 에디터 + 상세 뷰 구현

Phase 3 (병렬 작업):
├── [designer] 서브 페이지 디자인 적용 (about, space, support, friends)
├── [frontend] 게시판 페이지 DB 연동 (stories, notice, books, guestbook, archive)
└── [backend] 비밀번호 인증 + 수정/삭제 기능

Phase 4 (통합):
└── [리더] 전체 통합, 테스트, 반응형 점검, 새 Vercel 배포
```

---

## 4. 새 Vercel 배포

- 기존 배포(neuru-site.vercel.app)는 그대로 유지
- 새 Vercel 프로젝트로 배포 (neuru-site-v2 등)
- 환경변수 설정: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- 완성 후 neuru.org 도메인 연결

---

## 5. 추가 설치 패키지

```bash
# 게시판 관련
npm install @supabase/supabase-js @supabase/ssr
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
# 관리자 로그인 페이지
# (Supabase Auth 자체 처리하므로 bcryptjs 불필요)

# 디자인 관련
npm install framer-motion   # 부드러운 애니메이션
```

---

## 6. 검증 방법

1. **디자인 검증**: 각 페이지 데스크톱/태블릿/모바일 3개 뷰포트 확인
2. **게시판 검증**: 글쓰기 → 목록 확인 → 상세 보기 → 수정 → 삭제 전체 플로우 테스트
3. **데이터 검증**: 기존 30개 게시글이 정상 표시되는지 확인
4. **반응형 검증**: 모바일에서 글쓰기 폼, 에디터 동작 확인
5. **성능 검증**: Lighthouse 점수 확인
6. **배포 검증**: 새 Vercel 프로젝트에서 환경변수 포함 정상 동작 확인
