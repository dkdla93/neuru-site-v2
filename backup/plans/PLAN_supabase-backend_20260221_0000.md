# Supabase 백엔드 구현 계획

## 작업 날짜
2026-02-21

## 담당 작업

### Task #5: Supabase 설정 및 DB 스키마 구현
- `src/lib/supabase.ts` - 클라이언트 설정
- `supabase/schema.sql` - DB 스키마
- `.env.local.example` - 환경변수 템플릿
- RLS 정책 포함

### Task #6: 게시판 API Routes 구현
- `src/app/api/posts/route.ts`
- `src/app/api/posts/[id]/route.ts`
- `src/app/api/upload/route.ts`
- `src/app/api/categories/route.ts`

### Task #7: 관리자 로그인 페이지 구현
- `src/app/admin/login/page.tsx`
- `src/lib/auth.ts`

### Task #8: 데이터 시딩 스크립트
- `scripts/seed-database.ts`

## DB 스키마

### categories 테이블
- id: SERIAL PRIMARY KEY
- slug: TEXT UNIQUE NOT NULL (stories, notice, books, guestbook, archive)
- name: TEXT NOT NULL
- description: TEXT
- sort_order: INT DEFAULT 0

### posts 테이블
- id: SERIAL PRIMARY KEY
- category_id: INT REFERENCES categories(id)
- title: TEXT NOT NULL
- content: TEXT (HTML)
- author_id: UUID REFERENCES auth.users(id)
- author_name: TEXT DEFAULT '관리자'
- is_pinned: BOOLEAN DEFAULT false
- view_count: INT DEFAULT 0
- created_at: TIMESTAMPTZ DEFAULT now()
- updated_at: TIMESTAMPTZ DEFAULT now()

### post_images 테이블
- id: SERIAL PRIMARY KEY
- post_id: INT REFERENCES posts(id) ON DELETE CASCADE
- url: TEXT NOT NULL
- filename: TEXT
- sort_order: INT DEFAULT 0
- created_at: TIMESTAMPTZ DEFAULT now()

## 인증
- Supabase Auth (이메일+비밀번호)
- 관리자 계정 1개 (대시보드에서 수동 생성)
- RLS: 읽기는 모두, 쓰기는 인증된 사용자만
