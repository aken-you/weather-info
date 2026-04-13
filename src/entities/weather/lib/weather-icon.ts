import { WeatherStatus } from '../model/weather-status'

/**
 * 날씨 상태와 시간에 따라 적절한 아이콘 경로를 반환합니다.
 * @param weatherStatus - 날씨 상태
 * @param hour - 현재 시간 (0-23)
 * @returns 날씨 아이콘 이미지 경로
 */
export function getWeatherIconPath(weatherStatus: WeatherStatus, hour: number): string {
  const isDaytime = hour >= 6 && hour < 19

  const iconMap: Record<WeatherStatus, string> = {
    SUNNY: isDaytime ? '/images/weather/clear-day.png' : '/images/weather/clear-night.png',
    PARTLY_CLOUDY: isDaytime ? '/images/weather/cloudy-partly-day.png' : '/images/weather/cloudy-partly-night.png',
    CLOUDY: '/images/weather/cloudy.png',
    RAINY: '/images/weather/rainy.png',
    SNOWY: '/images/weather/snowy.png',
    RAIN_SNOW: '/images/weather/rain-snow.png',
    SHOWER: '/images/weather/shower.png',
    RAIN_DROP: '/images/weather/rain-drop.png',
    RAIN_SNOW_DROP: '/images/weather/rain-snow-drop.png',
    SNOW_DROP: '/images/weather/snowy.png', // fallback to snowy.png
  }

  return iconMap[weatherStatus]
}

/**
 * 날씨 상태를 한글 텍스트로 변환합니다.
 * @param weatherStatus - 날씨 상태
 * @returns 날씨 상태의 한글 표현
 */
export function getWeatherStatusText(weatherStatus: WeatherStatus): string {
  const textMap: Record<WeatherStatus, string> = {
    SUNNY: '맑음',
    PARTLY_CLOUDY: '구름많음',
    CLOUDY: '흐림',
    RAINY: '비',
    SNOWY: '눈',
    RAIN_SNOW: '비/눈',
    SHOWER: '소나기',
    RAIN_DROP: '빗방울',
    RAIN_SNOW_DROP: '빗방울눈날림',
    SNOW_DROP: '눈날림',
  }

  return textMap[weatherStatus]
}
