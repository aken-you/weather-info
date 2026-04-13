import { useSuspenseQueries } from '@tanstack/react-query'
import { weatherQueryKey } from 'entities/weather/api/query-key'
import { HourlyForecastItem } from 'entities/weather/ui/hourly-forecast-item'
import { formatYYYYMMDD, getNowDate } from 'shared/lib/time'
import { getCurrentHourWeather, getHourlyForecastList } from '../lib/hourly-forecast'
import { getLastDepthAddress } from 'features/location/lib/address'
import { getWeatherIconPath, getWeatherStatusText } from 'entities/weather/lib/weather-icon'
import { WeatherStatus } from 'entities/weather/model/query-select-types'

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

  const nowDateObj = getNowDate()
  const yyyymmdd = formatYYYYMMDD(nowDateObj)
  const yyyy = yyyymmdd.slice(0, 4)
  const mm = yyyymmdd.slice(4, 6)
  const dd = yyyymmdd.slice(6, 8)
  const currentHour = nowDateObj.getHours()

  // 시간대별 예보의 첫 번째 항목이 현재 시간대 데이터
  const 현재_시간대_날씨 = getCurrentHourWeather({
    currentWeather,
    ultraShortForecast,
    nowDateObj: nowDateObj,
  })

  const hourlyForecastList = getHourlyForecastList({
    currentWeather,
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
        <div className="text-neutral-primary flex items-center gap-3">
          <div className="bg-brand-primary rounded-2xl">
            <img
              src={getWeatherIconPath(현재_시간대_날씨.weatherStatus as WeatherStatus, currentHour)}
              alt={getWeatherStatusText(현재_시간대_날씨.weatherStatus as WeatherStatus)}
              className="h-22.5 w-22.5"
            />
          </div>
          <span className="font-display">{현재_시간대_날씨.temperature}°C</span>
        </div>

        <span className="font-h3 text-neutral-secondary">
          {getWeatherStatusText(현재_시간대_날씨.weatherStatus as WeatherStatus)}
        </span>

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

WeatherSection.Loading = () => {
  return (
    <>
      {/* 주소 및 날짜 섹션 */}
      <section className="desktop:pt-0 flex flex-col items-center gap-2 pt-7">
        <div className="flex items-center gap-2">
          <div className="h-8 w-32 animate-pulse rounded-md bg-gray-300" />
        </div>
        <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200" />
      </section>

      {/* 현재 날씨 섹션 */}
      <section className="flex flex-col items-center gap-2 py-3">
        <div className="flex items-center gap-1">
          <div className="h-22.5 w-22.5 animate-pulse rounded-full bg-gray-300" />
          <div className="h-20 w-32 animate-pulse rounded-md bg-gray-300" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200" />
      </section>

      {/* 시간대별 예보 섹션 */}
      <section className="desktop:rounded-lg desktop:border desktop:border-gray-300 desktop:max-w-125 flex w-full flex-col gap-2 border-t border-b border-t-gray-300 border-b-gray-300 bg-gray-50 px-4 py-3">
        <div className="h-4 w-24 animate-pulse rounded-md bg-gray-300" />
        <div className="flex w-full gap-2 overflow-x-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2 rounded-lg bg-white p-2">
              <div className="h-4 w-12 animate-pulse rounded-md bg-gray-200" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
              <div className="h-5 w-10 animate-pulse rounded-md bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
