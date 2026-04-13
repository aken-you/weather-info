import { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import { filterAddressList } from '../lib/address'
import { LocationList } from './location-list'
import { useListFocus } from 'shared/lib/use-list-focus'
import { koreaAddressList } from '../model/korea-district-list'
import { useDebounce } from 'shared/lib/use-debounce'

interface SearchLocationDialogProps {
  trigger: ReactNode
  onSelect: (address: string) => void
}

export function SearchLocationDialog({ trigger, onSelect }: SearchLocationDialogProps) {
  const [keyword, setKeyword] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const debouncedKeyword = useDebounce(keyword, 500)
  const filteredAddressList = filterAddressList(koreaAddressList, debouncedKeyword)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (open) {
      setKeyword('')
    }
  }

  const handleSelectAddress = (address: string) => {
    onSelect(address)
    setIsOpen(false)
    setKeyword('')
  }

  const { focusedIndex, listRef, focusUp, focusDown } = useListFocus({
    items: filteredAddressList,
    resetFocusTrigger: debouncedKeyword,
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <Input
          placeholder="시·군·구·동 날씨 검색"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              focusDown()
              return
            }

            if (e.key === 'ArrowUp') {
              focusUp()
              return
            }

            if (e.key === 'Enter') {
              const focusedAddress = filteredAddressList[focusedIndex]
              handleSelectAddress(focusedAddress)
            }
          }}
          autoFocus
        />

        {keyword.length === 0 ? (
          <div className="text-muted-foreground font-body-small py-4 text-center">장소를 입력해주세요.</div>
        ) : (
          <LocationList
            ref={listRef}
            list={filteredAddressList}
            focusedIndex={focusedIndex}
            onSelect={handleSelectAddress}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
