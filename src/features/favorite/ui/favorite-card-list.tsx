import { Favorite } from 'shared/model/favorite-context'
import { FavoriteCard } from './favorite-card'
import { useSuspenseQueries } from '@tanstack/react-query'
import { locationQueryKey } from 'entities/location/api/query-key'
import { weatherQueryKey } from 'entities/weather/api/query-key'
import { getCurrentHourWeather } from 'widgets/weather/lib/hourly-forecast'
import { getNowDate } from 'shared/lib/time'
import { CurrentWeather, HourlyForecast, ShortForecast } from 'entities/weather/model/query-select-types'

interface FavoriteCardListProps {
  list: Favorite[]
}

export function FavoriteCardList({ list }: FavoriteCardListProps) {
  // 1. 모든 위치 정보 조회 (병렬)
  const locationListResult = useSuspenseQueries({
    queries: list.map(favorite => locationQueryKey.nxNyByAddress(favorite.address)),
  })

  const locationList = locationListResult.map(result => result.data)

  // 2. 모든 날씨 데이터 조회 (병렬)
  const weatherQueries = useSuspenseQueries({
    queries: locationList.flatMap(location => [
      weatherQueryKey.currentWeather(location),
      weatherQueryKey.ultraShortForecast(location),
      weatherQueryKey.shortForecast(location),
    ]),
  })

  // 3. 현재 시간 정보 계산 (한 번만)
  const nowDateObj = getNowDate()
  const currentHour = nowDateObj.getHours()

  // 4. 각 카드별 데이터 그룹화 및 현재 시간대 날씨 계산
  const cardsData = locationList.map((location, index) => {
    const startIdx = index * 3
    const currentWeather = weatherQueries[startIdx].data as CurrentWeather
    const ultraShortForecast = weatherQueries[startIdx + 1].data as HourlyForecast[]
    const shortForecast = weatherQueries[startIdx + 2].data as ShortForecast

    const 현재_시간대_날씨 = getCurrentHourWeather({
      currentWeather,
      ultraShortForecast,
      nowDateObj,
    })

    return {
      location,
      shortForecast,
      currentHourWeather: 현재_시간대_날씨,
    }
  })

  // 5. 계산된 데이터를 각 카드에 전달
  return list.map((favorite, index) => (
    <FavoriteCard key={favorite.id} {...favorite} data={cardsData[index]} currentHour={currentHour} />
  ))
}

FavoriteCardList.Loading = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex h-fit flex-col gap-2 rounded-[.75rem] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
        >
          <div className="flex justify-between gap-1">
            <div className="flex flex-col gap-0.5">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </>
  )
}
