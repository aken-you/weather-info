import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type TabKey = 'weather' | 'favorite'

const TAB_PATHS: Record<string, TabKey> = {
  '/': 'weather',
  '/favorite': 'favorite',
}

const STORAGE_KEY = 'last_active_tab'
const DEFAULT_TAB: TabKey = 'weather'

export function useLastActiveTab(): TabKey {
  const { pathname } = useLocation()
  const tabKey = TAB_PATHS[pathname]

  useEffect(() => {
    // 현재 경로가 탭 경로인 경우에만 저장
    if (tabKey) {
      localStorage.setItem(STORAGE_KEY, tabKey)
    }
  }, [tabKey])

  // 탭 경로면 현재 경로 기준, 아니면 저장된 이력 기준
  return tabKey ?? (localStorage.getItem(STORAGE_KEY) as TabKey) ?? DEFAULT_TAB
}
