import { Search } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import koreaDistrictsData from '../../../../korea-districts.json'
import { filterAddressList } from '../lib/address'
import { LocationList } from './location-list'
import { useListFocus } from 'shared/lib/use-list-focus'
import { useNavigate } from 'react-router-dom'

export function SearchLocationTriggerButton() {
  const [keyword, setKeyword] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const addresses = koreaDistrictsData.koreaDistricts.map(address => address.replaceAll('-', ' '))

  const filteredAddressList = filterAddressList(addresses, keyword)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (open) {
      setKeyword('')
    }
  }

  const navigate = useNavigate()

  const handleSelectAddress = (address: string) => {
    navigate(`/${address}`)
    setIsOpen(false)
    setKeyword('')
  }

  const { focusedIndex, listRef, focusUp, focusDown } = useListFocus({
    items: filteredAddressList,
    resetFocusTrigger: keyword,
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="desktop:w-fit text-muted-foreground font-body-small flex h-11 w-full cursor-pointer items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1">
          <Search className="h-4 w-4" />
          시·군·구·동 날씨 검색
        </button>
      </DialogTrigger>
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

        <LocationList
          ref={listRef}
          keyword={keyword}
          list={filteredAddressList}
          focusedIndex={focusedIndex}
          onSelect={handleSelectAddress}
        />
      </DialogContent>
    </Dialog>
  )
}
