import { getLastDepthAddress } from '../lib/address'

interface LocationListProps {
  list: string[]
  focusedIndex: number
  ref?: React.Ref<HTMLUListElement>
  onSelect: (address: string) => void
}

export function LocationList({ list, focusedIndex, ref, onSelect }: LocationListProps) {
  if (list.length === 0) {
    return (
      <div className="text-muted-foreground font-body-small py-4 text-center">
        해당 장소의 정보가 제공되지 않습니다.
      </div>
    )
  }

  return (
    <ul ref={ref} className="max-h-96 overflow-y-auto">
      {list.map((address, index) => {
        const lastDepth = getLastDepthAddress(address)
        const isFocused = index === focusedIndex

        return (
          <li
            key={address}
            onClick={() => onSelect(address)}
            className={`flex cursor-pointer items-end gap-1 rounded-md px-4 py-3 transition-colors ${
              isFocused ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="font-body-small text-neutral-primary">{lastDepth}</div>
            <div className="text-neutral-tertiary font-caption">{address}</div>
          </li>
        )
      })}
    </ul>
  )
}
