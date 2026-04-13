import { Search, Star, Sun } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFavoriteContext } from 'shared/model/favorite-context'
import { MAX_FAVORITE_LIMIT } from 'entities/favorite/config/favorite'
import { filterAddressList } from 'features/search-location/lib/address'
import { useListFocus } from 'shared/lib/use-list-focus'
import { useDeviceType } from 'shared/lib/use-device-type'
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader, AppLayoutMain } from 'shared/ui/app-layout'
import { Button } from 'shared/ui/button'
import { Dialog, DialogContent, DialogTrigger } from 'shared/ui/dialog'
import { Input } from 'shared/ui/input'
import koreaDistrictsData from '../../../../korea-districts.json'
import { LocationList } from 'features/search-location/ui/location-list'
import { SearchLocationTriggerButton } from 'features/search-location/ui/search-location-trigger-button'
import FavoriteSidebar from 'widgets/favorite/ui/favorite-sidebar'

export function AddFavoritePage() {
  const navigate = useNavigate()
  const deviceType = useDeviceType()
  const favoriteStore = useFavoriteContext()
  const [alias, setAlias] = useState<string>('')
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const addresses = koreaDistrictsData.koreaDistricts.map(address => address.replaceAll('-', ' '))
  const filteredAddressList = filterAddressList(addresses, keyword)

  const { focusedIndex, listRef, focusUp, focusDown } = useListFocus({
    items: filteredAddressList,
    resetFocusTrigger: keyword,
  })

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address)
    setIsDialogOpen(false)
    setKeyword('')
  }

  const handleSubmit = () => {
    if (!selectedAddress) {
      alert('장소를 선택해주세요.')
      return
    }

    const favoriteList = favoriteStore.getAll()
    if (favoriteList.length >= MAX_FAVORITE_LIMIT) {
      alert(`최대 ${MAX_FAVORITE_LIMIT}개까지만 즐겨찾기를 추가할 수 있습니다.`)
      return
    }

    favoriteStore.add(selectedAddress, alias || null)
    navigate(-1)
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (open) {
      setKeyword('')
    }
  }

  return (
    <AppLayout>
      <AppLayoutHeader className="desktop:justify-end">
        <SearchLocationTriggerButton />
      </AppLayoutHeader>

      <AppLayoutContent>
        {deviceType === 'desktop' && <FavoriteSidebar />}

        <AppLayoutMain className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-primary font-h3"> 즐겨찾기 추가</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="alias" className="font-body-small text-neutral-primary font-semibold">
                별칭 (선택)
              </label>
              <Input
                id="alias"
                type="text"
                placeholder="예: 우리집, 회사"
                value={alias}
                onChange={e => setAlias(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-body-small text-neutral-primary font-semibold">
                장소 <span className="text-red-500">*</span>
              </label>

              <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                  <button className="text-muted-foreground font-body-small flex h-11 w-full cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-left">
                    {selectedAddress ? (
                      <span className="text-neutral-primary">{selectedAddress}</span>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        시·군·구·동 검색
                      </>
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm" showCloseButton={false}>
                  <Input
                    placeholder="시·군·구·동 검색"
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
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button size="lg" className="flex-1" onClick={handleSubmit}>
              추가
            </Button>
          </div>
        </AppLayoutMain>
      </AppLayoutContent>

      {deviceType === 'mobile' && (
        <AppLayoutFooter>
          <nav className="flex h-15.5 items-center rounded-[2.25rem] border border-gray-200 p-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`
              }
            >
              <Sun className="h-4.5 w-4.5" />
              날씨
            </NavLink>
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                `${isActive ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`
              }
            >
              <Star className="h-4.5 w-4.5" />
              즐겨찾기
            </NavLink>
          </nav>
        </AppLayoutFooter>
      )}
    </AppLayout>
  )
}
