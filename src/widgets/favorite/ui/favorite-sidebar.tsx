import { MAX_FAVORITE_LIMIT } from 'entities/favorite/config/favorite'
import { useFavoriteContext } from 'shared/model/favorite-context'
import { FavoriteCard } from 'features/favorite/ui/favorite-card'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppLayoutSidebar } from 'shared/ui/app-layout'
import { Button } from 'shared/ui/button'

export default function FavoriteSidebar() {
  const navigate = useNavigate()
  const favoriteStore = useFavoriteContext()

  const favoriteList = favoriteStore.getAll()

  const goToAddFavorite = () => {
    if (favoriteList.length >= MAX_FAVORITE_LIMIT) {
      alert(`최대 ${MAX_FAVORITE_LIMIT}개까지만 즐겨찾기를 추가할 수 있습니다.`)
      return
    }

    navigate('/add-favorite')
  }

  return (
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
  )
}
