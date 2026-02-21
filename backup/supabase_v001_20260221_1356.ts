import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 타입 정의
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          slug: string
          name: string
          description: string | null
          sort_order: number
        }
        Insert: {
          slug: string
          name: string
          description?: string | null
          sort_order?: number
        }
        Update: {
          slug?: string
          name?: string
          description?: string | null
          sort_order?: number
        }
      }
      posts: {
        Row: {
          id: number
          category_id: number | null
          title: string
          content: string | null
          author_id: string | null
          author_name: string
          is_pinned: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          category_id?: number | null
          title: string
          content?: string | null
          author_id?: string | null
          author_name?: string
          is_pinned?: boolean
          view_count?: number
        }
        Update: {
          category_id?: number | null
          title?: string
          content?: string | null
          author_id?: string | null
          author_name?: string
          is_pinned?: boolean
          view_count?: number
          updated_at?: string
        }
      }
      post_images: {
        Row: {
          id: number
          post_id: number
          url: string
          filename: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          post_id: number
          url: string
          filename?: string | null
          sort_order?: number
        }
        Update: {
          post_id?: number
          url?: string
          filename?: string | null
          sort_order?: number
        }
      }
    }
  }
}

// 브라우저용 클라이언트 (클라이언트 컴포넌트에서 사용)
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// 서버용 클라이언트 (서버 컴포넌트, API Routes에서 사용)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // 서버 컴포넌트에서는 쿠키 설정 불가 (무시)
        }
      },
    },
  })
}

// 서비스 롤 클라이언트 (관리자 작업용, 서버에서만 사용)
export function createServiceRoleClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다.')
  }
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
