import { MoreVertical } from 'lucide-react'
import { Button } from 'shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu'
import { Favorite, useFavoriteContext } from 'shared/model/favorite-context'
import { getLastDepthAddress } from 'features/location/lib/address'
import { useNavigate } from 'react-router-dom'
import { getWeatherIconPath } from 'entities/weather/lib/weather-icon'
import { HourlyForecast, ShortForecast, WeatherStatus } from 'entities/weather/model/query-select-types'

interface FavoriteCardData {
  location: { nx: number; ny: number; lat: number; lng: number }
  shortForecast: ShortForecast
  currentHourWeather: HourlyForecast
}

export interface FavoriteCardProps extends Favorite {
  data: FavoriteCardData
  currentHour: number
}

export function FavoriteCard({ id, address, alias, data, currentHour }: FavoriteCardProps) {
  const navigate = useNavigate()
  const favoriteStore = useFavoriteContext()

  const goToDetail = () => navigate(`/${address}`)
  const goToEdit = () => {
    navigate(`/edit-favorite/${id}`)
  }

  const deleteFavorite = () => {
    favoriteStore.delete(id)
  }

  const { currentHourWeather: 현재_시간대_날씨, shortForecast } = data

  return (
    <div
      className="flex h-fit cursor-pointer flex-col gap-2 rounded-[.75rem] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
      onClick={goToDetail}
    >
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          {/* 별칭 없으면 마지막 depth 지역 표시 */}
          <span className="font-body-small text-neutral-primary font-semibold">
            {alias ?? getLastDepthAddress(address)}
          </span>
          <span className="text-neutral-tertiary font-caption">{address}</span>
        </div>

        <div
          onClick={e => {
            // dropdown의 이벤트 버블링 막기
            e.stopPropagation()
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="x-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={goToEdit}>수정</DropdownMenuItem>
                <DropdownMenuItem onClick={deleteFavorite}>삭제</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={getWeatherIconPath(현재_시간대_날씨.weatherStatus as WeatherStatus, currentHour)}
          alt="날씨"
          className="h-8 w-8"
        />
        <span className="font-h2 text-neutral-primary">{현재_시간대_날씨.temperature}°C</span>
      </div>

      <span className="text-neutral-tertiary font-caption">
        최저 {shortForecast.minTemp}° / 최고 {shortForecast.maxTemp}°
      </span>
    </div>
  )
}
