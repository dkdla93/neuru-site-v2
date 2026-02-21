import { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'

// GET /api/posts/[id] - 게시글 상세 조회 + 조회수 증가
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const postId = parseInt(id)

  if (isNaN(postId)) {
    return Response.json({ error: '유효하지 않은 게시글 ID입니다.' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    // 게시글 조회
    const { data: post, error } = await supabase
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
        post_images(id, url, filename, sort_order)
      `)
      .eq('id', postId)
      .single()

    if (error || !post) {
      return Response.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 조회수 증가 (비동기, 실패해도 무시)
    supabase
      .from('posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', postId)
      .then(() => {})

    return Response.json({ post })
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// PUT /api/posts/[id] - 게시글 수정 (인증 필요)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await isAuthenticated()
  if (!auth) return unauthorizedResponse()

  const { id } = await params
  const postId = parseInt(id)

  if (isNaN(postId)) {
    return Response.json({ error: '유효하지 않은 게시글 ID입니다.' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { title, content, category_slug, is_pinned, author_name, image_urls } = body

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    // 카테고리 ID 조회
    let category_id: number | undefined
    if (category_slug !== undefined) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category_slug)
        .single()
      category_id = category?.id
    }

    // 게시글 업데이트
    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (category_id !== undefined) updateData.category_id = category_id
    if (is_pinned !== undefined) updateData.is_pinned = is_pinned
    if (author_name !== undefined) updateData.author_name = author_name

    const { data: post, error: updateError } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single()

    if (updateError) {
      return Response.json({ error: updateError.message }, { status: 500 })
    }

    // 이미지 업데이트 (기존 이미지 삭제 후 재삽입)
    if (image_urls !== undefined && Array.isArray(image_urls)) {
      await supabase.from('post_images').delete().eq('post_id', postId)
      if (image_urls.length > 0) {
        const images = image_urls.map((url: string, index: number) => ({
          post_id: postId,
          url,
          sort_order: index,
        }))
        await supabase.from('post_images').insert(images)
      }
    }

    return Response.json({ post })
  } catch (error) {
    console.error('게시글 수정 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// DELETE /api/posts/[id] - 게시글 삭제 (인증 필요)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await isAuthenticated()
  if (!auth) return unauthorizedResponse()

  const { id } = await params
  const postId = parseInt(id)

  if (isNaN(postId)) {
    return Response.json({ error: '유효하지 않은 게시글 ID입니다.' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ message: '게시글이 삭제되었습니다.' })
  } catch (error) {
    console.error('게시글 삭제 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
