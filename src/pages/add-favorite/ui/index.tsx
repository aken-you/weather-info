import { Search, Star, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavoriteContext } from 'shared/model/favorite-context'
import { MAX_FAVORITE_LIMIT } from 'entities/favorite/config/favorite'
import { useDeviceType } from 'shared/lib/use-device-type'
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader, AppLayoutMain } from 'shared/ui/app-layout'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { SearchLocationDialog } from 'features/search-location/ui/search-location-dialog'
import FavoriteSidebar from 'widgets/favorite/ui/favorite-sidebar'
import { useLastActiveTab } from 'shared/lib/use-last-active-tab'

export function AddFavoritePage() {
  const navigate = useNavigate()
  const deviceType = useDeviceType()
  const favoriteStore = useFavoriteContext()

  const activeTab = useLastActiveTab()

  const [alias, setAlias] = useState<string>('')
  const [selectedAddress, setSelectedAddress] = useState<string>('')

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

  return (
    <AppLayout>
      <AppLayoutHeader className="desktop:justify-end">
        <SearchLocationDialog
          trigger={
            <button className="desktop:w-fit text-muted-foreground font-body-small flex h-11 w-full cursor-pointer items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1">
              <Search className="h-4 w-4" />
              시·군·구·동 날씨 검색
            </button>
          }
          onSelect={address => navigate(`/${address}`)}
        />
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

              <SearchLocationDialog
                trigger={
                  <button className="text-muted-foreground font-body-small flex h-10 w-full cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-left">
                    {selectedAddress ? (
                      <span className="text-neutral-primary">{selectedAddress}</span>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        시·군·구·동 검색
                      </>
                    )}
                  </button>
                }
                onSelect={setSelectedAddress}
              />
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
            <Link
              to="/"
              className={`${activeTab === 'weather' ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`}
            >
              <Sun className="h-4.5 w-4.5" />
              날씨
            </Link>
            <Link
              to="/favorite"
              className={`${activeTab === 'favorite' ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`}
            >
              <Star className="h-4.5 w-4.5" />
              즐겨찾기
            </Link>
          </nav>
        </AppLayoutFooter>
      )}
    </AppLayout>
  )
}
