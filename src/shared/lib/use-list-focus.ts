import { useEffect, useRef, useState } from 'react'

interface UseListFocusProps<T> {
  items: T[]
  resetFocusTrigger?: string
}

export function useListFocus<T>({ items, resetFocusTrigger }: UseListFocusProps<T>) {
  const NOT_FOCUSED_IDX = -1

  // 포커싱된 아이템 index (-1이면 아무것도 선택 안된 상태)
  const [focusedIdx, setFocusedIdx] = useState<number>(NOT_FOCUSED_IDX)

  const listRef = useRef<HTMLUListElement>(null)

  // focus 상태 초기화
  useEffect(() => {
    setFocusedIdx(NOT_FOCUSED_IDX)
  }, [resetFocusTrigger])

  // 포커스된 아이템으로 스크롤 이동
  useEffect(() => {
    if (focusedIdx >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIdx] as HTMLElement
      focusedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [focusedIdx])

  const focusDown = () => setFocusedIdx(prev => Math.min(prev + 1, items.length - 1))
  const focusUp = () => setFocusedIdx(prev => Math.max(prev - 1, -1))

  return {
    focusedIndex: focusedIdx,
    listRef,
    focusUp,
    focusDown,
  }
}
