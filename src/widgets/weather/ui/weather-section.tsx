import { useSuspenseQueries } from '@tanstack/react-query'
import { weatherQueryKey } from 'entities/weather/api/query-key'
import { HourlyForecastItem } from 'entities/weather/ui/hourly-forecast-item'
import { Sun } from 'lucide-react'
import { formatYYYYMMDD, getNowDate } from 'shared/lib/time'
import { getHourlyForecastList } from '../lib/hourly-forecast'
import { getLastDepthAddress } from 'features/search-location/lib/address'

interface WeatherSectionProps {
  currentAddress: string // 현재 사용자 위치의 주소
  address: string
  location: {
    nx: number
    ny: number
    lat: number
    lng: number
  }
}

export function WeatherSection({ currentAddress, address, location }: WeatherSectionProps) {
  const [{ data: currentWeather }, { data: ultraShortForecast }, { data: shortForecast }] = useSuspenseQueries({
    queries: [
      weatherQueryKey.currentWeather(location),
      weatherQueryKey.ultraShortForecast(location),
      weatherQueryKey.shortForecast(location),
    ],
  })

  const dateObj = getNowDate()
  const yyyymmdd = formatYYYYMMDD(dateObj)
  const yyyy = yyyymmdd.slice(0, 4)
  const mm = yyyymmdd.slice(4, 6)
  const dd = yyyymmdd.slice(6, 8)

  const hourlyForecastList = getHourlyForecastList({
    ultraShortForecast,
    shortForecast: shortForecast.hourlyForecast,
  })

  return (
    <>
      <section className="desktop:pt-0 flex flex-col items-center pt-7">
        <div className="flex items-center gap-2">
          <h1 className="text-neutral-primary font-h1">{getLastDepthAddress(address)}</h1>

          {currentAddress === address && (
            <div className="bg-brand-primary font-body-small rounded-md px-2 py-1 text-white">현재 위치</div>
          )}
        </div>

        <span className="font-body-small text-neutral-tertiary">
          {address} · {yyyy}년 {mm}월 {dd}일
        </span>
      </section>

      <section className="flex flex-col items-center gap-2 py-3">
        <div className="text-neutral-primary flex items-center gap-1">
          <Sun className="h-22.5 w-22.5" />
          <span className="font-display">{currentWeather.temperature}°C</span>
        </div>

        <span className="font-h3 text-neutral-secondary">맑음</span>

        <span className="font-body text-neutral-tertiary">
          최저 {shortForecast.minTemp}°C · 최고 {shortForecast.maxTemp}°C
        </span>
      </section>

      <section className="desktop:rounded-lg desktop:border desktop:border-gray-300 desktop:max-w-125 flex w-full flex-col gap-2 border-t border-b border-t-gray-300 border-b-gray-300 bg-gray-50 px-4 py-3">
        <h4 className="font-body-small desktop:text-neutral-primary text-neutral-tertiary">시간대별 예보</h4>

        <ol className="flex w-full gap-2 overflow-x-auto">
          {hourlyForecastList.map(forecast => (
            <HourlyForecastItem key={`${forecast.fcstDate}${forecast.fcstTime}`} {...forecast} />
          ))}
        </ol>
      </section>
    </>
  )
}

WeatherSection.Loading = () => <div>loading...</div>
