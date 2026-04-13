import { useFavoriteContext } from 'shared/model/favorite-context'
import { FavoriteCard } from 'features/favorite/ui/favorite-card'
import { SearchLocationDialog } from 'features/search-location/ui/search-location-dialog'
import { Plus, Search, Star, Sun } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader, AppLayoutMain } from 'shared/ui/app-layout'
import { MAX_FAVORITE_LIMIT } from 'entities/favorite/config/favorite'

// favorite 페이지는 모바일에서만 사용하는 페이지입니다.
export function FavoritePage() {
  const navigate = useNavigate()
  const favoriteStore = useFavoriteContext()
  const favoriteList = favoriteStore.getAll()

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
        <AppLayoutMain className="flex flex-col items-center">
          <section className="flex w-full items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-end gap-2">
              <span className="font-body-large text-neutral-primary font-bold">즐겨찾기</span>
              <span className="font-body-small text-neutral-tertiary">
                {favoriteList.length} / {MAX_FAVORITE_LIMIT}
              </span>
            </div>

            <Link
              to="/add-favorite"
              className="bg-brand-primary font-body flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-white"
            >
              <Plus className="h-4 w-4" />
              추가
            </Link>
          </section>

          <section className="grid h-[calc(100vh-7.5rem)] w-full auto-rows-min grid-cols-1 items-start gap-2 bg-gray-100 px-4 pt-5 pb-22 min-[23.75rem]:grid-cols-2">
            {favoriteList.map(favorite => (
              <FavoriteCard key={favorite.id} {...favorite} />
            ))}
          </section>
        </AppLayoutMain>
      </AppLayoutContent>

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
    </AppLayout>
  )
}
