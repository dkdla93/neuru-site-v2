import { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'

// Supabase Storage 버킷명
const BUCKET_NAME = 'post-images'

// POST /api/upload - 이미지 업로드 (인증 필요)
export async function POST(request: NextRequest) {
  const auth = await isAuthenticated()
  if (!auth) return unauthorizedResponse()

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    // 파일 유형 검사
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'JPG, PNG, GIF, WebP 형식만 업로드 가능합니다.' },
        { status: 400 }
      )
    }

    // 파일 크기 검사 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return Response.json(
        { error: '파일 크기는 5MB 이하여야 합니다.' },
        { status: 400 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    // 파일명 생성 (타임스탬프 + 확장자)
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}.${ext}`
    const path = `posts/${filename}`

    // Supabase Storage에 업로드
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('이미지 업로드 실패:', uploadError)
      return Response.json({ error: '이미지 업로드에 실패했습니다.' }, { status: 500 })
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)

    return Response.json({
      url: urlData.publicUrl,
      filename: file.name,
    }, { status: 201 })
  } catch (error) {
    console.error('이미지 업로드 오류:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// DELETE /api/upload - 이미지 삭제 (인증 필요)
export async function DELETE(request: NextRequest) {
  const auth = await isAuthenticated()
  if (!auth) return unauthorizedResponse()

  try {
    const { url } = await request.json()
    if (!url) {
      return Response.json({ error: 'URL이 없습니다.' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createServerSupabaseClient() as any

    // URL에서 파일 경로 추출
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${BUCKET_NAME}/`)
    if (pathParts.length < 2) {
      return Response.json({ error: '유효하지 않은 이미지 URL입니다.' }, { status: 400 })
    }
    const filePath = pathParts[1]

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      return Response.json({ error: '이미지 삭제에 실패했습니다.' }, { status: 500 })
    }

    return Response.json({ message: '이미지가 삭제되었습니다.' })
  } catch (error) {
    console.error('이미지 삭제 오류:', error)
    return Response.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
