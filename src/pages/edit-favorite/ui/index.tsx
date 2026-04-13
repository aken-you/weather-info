import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Plus, Star, Sun } from 'lucide-react'
import { useFavoriteContext } from 'shared/model/favorite-context'
import { MAX_FAVORITE_LIMIT } from 'entities/favorite/config/favorite'
import { useDeviceType } from 'shared/lib/use-device-type'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutFooter,
  AppLayoutHeader,
  AppLayoutMain,
  AppLayoutSidebar,
} from 'shared/ui/app-layout'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { SearchLocationTriggerButton } from 'features/search-location/ui/search-location-trigger-button'
import { FavoriteCard } from 'features/favorite/ui/favorite-card'

export function EditFavoritePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const favoriteStore = useFavoriteContext()
  const [alias, setAlias] = useState<string>('')

  const favoriteList = favoriteStore.getAll()
  const favorite = id ? favoriteStore.getById(id) : null

  const goToAddFavorite = () => {
    if (favoriteList.length >= MAX_FAVORITE_LIMIT) {
      alert(`최대 ${MAX_FAVORITE_LIMIT}개까지만 즐겨찾기를 추가할 수 있습니다.`)
      return
    }

    navigate('/add-favorite')
  }

  // id가 없거나, favoriteStore에 저장되어있지 않은 경우 -> 메인페이지로 이동
  useEffect(() => {
    if (!id || !favoriteStore.getById(id)) {
      navigate(-1)
      return
    }
  }, [id, favoriteStore, navigate])

  const handleSubmit = () => {
    if (!id) {
      return
    }

    favoriteStore.update(id, alias || null)
  }

  return (
    <AppLayout>
      <AppLayoutHeader className="desktop:justify-end">
        <SearchLocationTriggerButton />
      </AppLayoutHeader>

      <AppLayoutContent>
        {deviceType === 'desktop' && (
          <AppLayoutSidebar className="flex flex-col gap-3">
            <h4 className="font-caption text-neutral-tertiary">즐겨찾기</h4>

            <nav className="flex flex-col gap-3">
              {favoriteList.map(favorite => (
                <FavoriteCard key={favorite.id} {...favorite} />
              ))}

              <Button variant="outline" onClick={goToAddFavorite}>
                <Plus className="h-4 w-4" />
                즐겨찾기 추가 · {favoriteList.length} / {MAX_FAVORITE_LIMIT}
              </Button>
            </nav>
          </AppLayoutSidebar>
        )}

        <AppLayoutMain className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-primary font-h3"> 즐겨찾기 수정</h3>

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
              <label htmlFor="address" className="font-body-small text-neutral-primary font-semibold">
                장소
              </label>
              <Input id="address" type="text" value={favorite?.address ?? ''} disabled />
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button size="lg" className="flex-1" onClick={handleSubmit}>
              수정
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
