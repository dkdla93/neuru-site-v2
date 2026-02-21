'use client';

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

/**
 * Supabase 브라우저 클라이언트로 로그인 상태 확인
 * 세션이 있으면 관리자로 간주
 */
export function useAdmin(): { isAdmin: boolean; loading: boolean } {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
      setLoading(false);
    });

    // 세션 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, loading };
}
