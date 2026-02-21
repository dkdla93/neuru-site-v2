import { createServerSupabaseClient } from './supabase-server'

// 현재 로그인한 사용자 반환 (서버 전용)
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

// 인증 여부 확인 (서버 전용)
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

// 미인증 시 에러 응답 반환 헬퍼
export function unauthorizedResponse() {
  return Response.json(
    { error: '로그인이 필요합니다.' },
    { status: 401 }
  )
}
