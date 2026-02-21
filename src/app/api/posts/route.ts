import { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'

// GET /api/posts - 게시글 목록 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = (page - 1) * limit

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        author_name,
        is_pinned,
        view_count,
        created_at,
        updated_at,
        categories(id, slug, name),
        post_images(url, sort_order)
      `, { count: 'exact' })
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // 카테고리 필터
    if (categorySlug) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

      if (category) {
        query = query.eq('category_id', category.id)
      }
    }

    const { data, error, count } = await query

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({
      posts: data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// POST /api/posts - 게시글 작성 (인증 필요)
export async function POST(request: NextRequest) {
  const auth = await isAuthenticated()
  if (!auth) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { title, content, category_slug, is_pinned, author_name, image_urls } = body

    if (!title) {
      return Response.json({ error: '제목은 필수입니다.' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    // 카테고리 ID 조회
    let category_id: number | null = null
    if (category_slug) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category_slug)
        .single()
      category_id = category?.id ?? null
    }

    // 현재 사용자 조회
    const { data: { user } } = await supabase.auth.getUser()

    // 게시글 삽입
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        content: content || '',
        category_id,
        author_id: user?.id ?? null,
        author_name: author_name || '관리자',
        is_pinned: is_pinned || false,
      })
      .select()
      .single()

    if (postError) {
      return Response.json({ error: postError.message }, { status: 500 })
    }

    // 이미지 연결
    if (image_urls && Array.isArray(image_urls) && image_urls.length > 0) {
      const images = image_urls.map((url: string, index: number) => ({
        post_id: post.id,
        url,
        sort_order: index,
      }))
      await supabase.from('post_images').insert(images)
    }

    return Response.json({ post }, { status: 201 })
  } catch (error) {
    console.error('게시글 작성 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
