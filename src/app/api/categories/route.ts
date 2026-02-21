import { createServerSupabaseClient } from '@/lib/supabase-server'

// GET /api/categories - 카테고리 목록 조회
export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name, description, sort_order')
      .order('sort_order', { ascending: true })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ categories: data })
  } catch (error) {
    console.error('카테고리 조회 실패:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
