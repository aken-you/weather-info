import { useState, useEffect } from 'react'

/**
 * 미디어 쿼리 만족 여부를 반환하는 커스텀 훅
 *
 * @param query 미디어 쿼리 문자열 (예: '(max-width: 600px)')
 * @returns 미디어 쿼리 만족 여부
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // 미디어 쿼리 조건이 변경될 때 실행
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches) // 쿼리가 일치하면 true, 일치하지 않으면 false
    }

    const result = matchMedia(query)

    setMatches(matchMedia(query).matches) // 초기 상태 설정
    result.addEventListener('change', handleChange)

    return () => result.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
