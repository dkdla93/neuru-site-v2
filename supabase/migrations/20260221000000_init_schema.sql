-- =============================================
-- 마을서재 느루 게시판 DB 스키마
-- =============================================

-- 기존 테이블 삭제 (재실행 시)
DROP TABLE IF EXISTS post_images CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- =============================================
-- 1. 게시판 카테고리 테이블
-- =============================================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0
);

-- 기본 카테고리 데이터 삽입
INSERT INTO categories (slug, name, description, sort_order) VALUES
  ('stories', '일일 소식', '마을서재 느루의 일상 이야기를 전합니다.', 1),
  ('notice', '공지 알림', '중요한 공지사항을 안내합니다.', 2),
  ('books', '이달의 책', '이달에 추천하는 책을 소개합니다.', 3),
  ('guestbook', '방명록', '방문하신 분들의 이야기를 들려주세요.', 4),
  ('archive', '아카이브', '지난 이야기들을 모아두었습니다.', 5);

-- =============================================
-- 2. 게시글 테이블
-- =============================================
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT '관리자',
  is_pinned BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_is_pinned ON posts(is_pinned);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- =============================================
-- 3. 게시글 이미지 테이블
-- =============================================
CREATE TABLE post_images (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  filename TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_post_images_post_id ON post_images(post_id);

-- =============================================
-- 4. RLS (Row Level Security) 정책
-- =============================================

-- categories: 모든 사용자 읽기 가능, 인증된 사용자만 수정
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select_all"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "categories_insert_auth"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "categories_update_auth"
  ON categories FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "categories_delete_auth"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- posts: 모든 사용자 읽기 가능, 인증된 사용자만 쓰기/수정/삭제
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select_all"
  ON posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "posts_insert_auth"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "posts_update_auth"
  ON posts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "posts_delete_auth"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- post_images: 모든 사용자 읽기 가능, 인증된 사용자만 쓰기/수정/삭제
ALTER TABLE post_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "post_images_select_all"
  ON post_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "post_images_insert_auth"
  ON post_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "post_images_update_auth"
  ON post_images FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "post_images_delete_auth"
  ON post_images FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- 5. Storage 버킷 설정 (Supabase 대시보드에서 실행)
-- =============================================
-- 아래 SQL은 Supabase 대시보드 Storage 탭에서 버킷 생성 후 실행

-- 이미지 업로드용 버킷 정책 (버킷명: post-images)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- 스토리지 정책: 모든 사용자 읽기, 인증된 사용자만 업로드
-- CREATE POLICY "storage_select_all"
--   ON storage.objects FOR SELECT
--   TO public
--   USING (bucket_id = 'post-images');

-- CREATE POLICY "storage_insert_auth"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'post-images');

-- CREATE POLICY "storage_delete_auth"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'post-images');
