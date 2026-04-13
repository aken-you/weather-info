// weather queryOptions의 select에서 가공된 데이터 타입들

export type WeatherStatus =
  | 'SUNNY' // 맑음
  | 'PARTLY_CLOUDY' // 구름많음
  | 'CLOUDY' // 흐림
  | 'RAINY' // 비
  | 'SNOWY' // 눈
  | 'RAIN_SNOW' // 비/눈
  | 'SHOWER' // 소나기
  | 'RAIN_DROP' // 빗방울
  | 'RAIN_SNOW_DROP' // 빗방울눈날림
  | 'SNOW_DROP' // 눈날림

// 예보 데이터 타입
export interface HourlyForecast {
  fcstDate: string
  fcstTime: string
  temperature: number
  weatherStatus: WeatherStatus
}

// 초단기실황 데이터 타입 (select으로 가공된 타입)
export interface CurrentWeather {
  temperature: number
  humidity: number
  precipitation: number
  weatherStatus: WeatherStatus
}

// 단기예보 데이터 타입 (select으로 가공된 타입)
export interface ShortForecast {
  minTemp: number | null
  maxTemp: number | null
  hourlyForecast: HourlyForecast[]
}
