'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = createBrowserSupabaseClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
        return
      }

      // 로그인 성공 - 관리자 페이지 또는 메인으로 이동
      router.push('/')
      router.refresh()
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f4ee',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        {/* 로고 영역 */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#3d7a50',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            마을서재 느루
          </p>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
          }}>
            관리자 로그인
          </h1>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@neuru.kr"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e8e2d8',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#1a1a1a',
                backgroundColor: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #e8e2d8',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#1a1a1a',
                backgroundColor: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: loading ? '#a0a0a0' : '#3d7a50',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 안내 문구 */}
        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.8125rem',
          color: '#a0a0a0',
        }}>
          관리자 계정으로만 로그인 가능합니다.
        </p>
      </div>
    </div>
  )
}
