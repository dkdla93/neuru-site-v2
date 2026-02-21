/**
 * 마을서재 느루 데이터 시딩 스크립트
 *
 * 사용법:
 *   1. .env.local 파일에 Supabase 환경변수 설정
 *   2. npx tsx scripts/seed-database.ts
 *
 * 필요 패키지:
 *   npm install -D tsx dotenv
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// .env.local 로드
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('환경변수가 설정되지 않았습니다.')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '설정됨' : '없음')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '설정됨' : '없음')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// 크롤러 데이터 경로 → 카테고리 슬러그 매핑
const PAGE_TO_CATEGORY: Record<string, string> = {
  'page_25': 'stories',    // 마을서재 느루의 일상
  'page_26': 'notice',     // 느루 공지 알림
  'page_27': 'books',      // 새로 들인 책
  'page_28': 'stories',    // 마을서재 문화 프로그램 (stories로 병합)
  'page_29': 'guestbook',  // 방명록
  'page_30': 'archive',    // 느루의 이전 기록들
}

// HTML 콘텐츠에서 실제 텍스트 추출 (간단한 정제)
function extractCleanContent(html: string): string {
  if (!html) return ''

  // script, style 태그 제거
  let clean = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // 네비게이션, 위젯 영역 제거
    .replace(/<div[^>]*class="[^"]*sub.menu[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*widget[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')

  return clean
}

type CrawledPost = {
  title: string
  url: string
  date: string
  content: string
  images?: string[]
}

type CrawledData = {
  name: string
  posts: CrawledPost[]
}

async function seedDatabase() {
  console.log('=== 마을서재 느루 데이터 시딩 시작 ===\n')

  // 1. 카테고리 ID 조회
  console.log('1. 카테고리 조회 중...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, slug, name')
    .order('sort_order')

  if (catError || !categories) {
    console.error('카테고리 조회 실패:', catError)
    process.exit(1)
  }

  const categoryMap: Record<string, number> = {}
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.id
    console.log(`  - ${cat.slug}: ${cat.name} (id: ${cat.id})`)
  })
  console.log()

  // 2. 크롤러 데이터 로드
  console.log('2. 크롤러 데이터 로드 중...')
  const crawlerDataPath = path.join(
    process.cwd(),
    '../crawler/output/board-posts-detail.json'
  )

  if (!fs.existsSync(crawlerDataPath)) {
    console.error('크롤러 데이터 파일을 찾을 수 없습니다:', crawlerDataPath)
    process.exit(1)
  }

  const rawData = fs.readFileSync(crawlerDataPath, 'utf-8')
  const crawledData: Record<string, CrawledData> = JSON.parse(rawData)
  console.log(`  로드된 페이지: ${Object.keys(crawledData).length}개\n`)

  // 3. 기존 게시글 삭제 (재시딩 시)
  console.log('3. 기존 시드 데이터 정리 중...')
  const { error: delError } = await supabase
    .from('posts')
    .delete()
    .not('id', 'is', null)

  if (delError) {
    console.warn('  기존 데이터 삭제 실패 (무시):', delError.message)
  } else {
    console.log('  기존 게시글 삭제 완료\n')
  }

  // 4. 게시글 삽입
  console.log('4. 게시글 삽입 중...')
  let totalInserted = 0
  let totalSkipped = 0

  for (const [pageKey, pageData] of Object.entries(crawledData)) {
    const categorySlug = PAGE_TO_CATEGORY[pageKey]
    if (!categorySlug) {
      console.log(`  [SKIP] ${pageKey}: 매핑된 카테고리 없음`)
      continue
    }

    const categoryId = categoryMap[categorySlug]
    if (!categoryId) {
      console.log(`  [SKIP] ${pageKey}: 카테고리 ID 없음 (${categorySlug})`)
      continue
    }

    console.log(`\n  [${pageKey}] ${pageData.name} → ${categorySlug}`)
    console.log(`  게시글 수: ${pageData.posts?.length || 0}개`)

    if (!pageData.posts || pageData.posts.length === 0) continue

    for (const post of pageData.posts) {
      // 방명록 스팸 필터 (소액결제 등)
      if (categorySlug === 'guestbook' &&
        (post.title.includes('소액결제') || post.title.includes('현금화'))) {
        console.log(`    [SKIP 스팸] ${post.title}`)
        totalSkipped++
        continue
      }

      // 날짜 파싱
      let createdAt: string
      try {
        const date = new Date(post.date)
        createdAt = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
      } catch {
        createdAt = new Date().toISOString()
      }

      // 콘텐츠 정제
      const cleanContent = extractCleanContent(post.content || '')

      // 게시글 삽입
      const { data: insertedPost, error: insertError } = await supabase
        .from('posts')
        .insert({
          category_id: categoryId,
          title: post.title || '제목 없음',
          content: cleanContent,
          author_name: '관리자',
          is_pinned: false,
          view_count: 0,
          created_at: createdAt,
          updated_at: createdAt,
        })
        .select('id')
        .single()

      if (insertError) {
        console.log(`    [ERROR] ${post.title}: ${insertError.message}`)
        totalSkipped++
        continue
      }

      console.log(`    [OK] ${post.title} (id: ${insertedPost.id})`)
      totalInserted++

      // 이미지 연결 (있는 경우)
      if (post.images && Array.isArray(post.images) && post.images.length > 0) {
        const validImages = post.images.filter(
          (url: string) => url && url.startsWith('http')
        )
        if (validImages.length > 0) {
          const imageRecords = validImages.map((url: string, idx: number) => ({
            post_id: insertedPost.id,
            url,
            sort_order: idx,
          }))
          const { error: imgError } = await supabase
            .from('post_images')
            .insert(imageRecords)
          if (!imgError) {
            console.log(`      이미지 ${validImages.length}개 연결됨`)
          }
        }
      }
    }
  }

  // 5. 결과 출력
  console.log('\n=== 시딩 완료 ===')
  console.log(`삽입된 게시글: ${totalInserted}개`)
  console.log(`건너뛴 게시글: ${totalSkipped}개`)

  // 6. 최종 확인
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  console.log(`\nDB 총 게시글 수: ${count}개`)
}

seedDatabase().catch((err) => {
  console.error('시딩 실패:', err)
  process.exit(1)
})
