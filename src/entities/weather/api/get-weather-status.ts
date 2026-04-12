/**
 * 날씨 상태 타입
 */
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

/**
 * PTY (강수형태) 코드를 날씨 상태로 변환
 * 0=없음, 1=비, 2=비/눈, 3=눈, 4=소나기, 5=빗방울, 6=빗방울눈날림, 7=눈날림
 */
function getPrecipitationType(ptyCode: string): WeatherStatus | null {
  const code = Number(ptyCode)

  switch (code) {
    case 0:
      return null // 강수 없음
    case 1:
      return 'RAINY' // 비
    case 2:
      return 'RAIN_SNOW' // 비/눈
    case 3:
      return 'SNOWY' // 눈
    case 4:
      return 'SHOWER' // 소나기
    case 5:
      return 'RAIN_DROP' // 빗방울
    case 6:
      return 'RAIN_SNOW_DROP' // 빗방울눈날림
    case 7:
      return 'SNOW_DROP' // 눈날림
    default:
      return null
  }
}

/**
 * SKY (하늘상태) 코드를 날씨 상태로 변환
 * 1=맑음, 3=구름많음, 4=흐림
 */
function getSkyCondition(skyCode: string): WeatherStatus {
  const code = Number(skyCode)

  switch (code) {
    case 1:
      return 'SUNNY' // 맑음
    case 3:
      return 'PARTLY_CLOUDY' // 구름많음
    case 4:
      return 'CLOUDY' // 흐림
    default:
      return 'SUNNY'
  }
}

/**
 * PTY와 SKY 값으로 날씨 상태 결정
 * - PTY가 0이 아니면 강수 상태 반환
 * - PTY가 0이면 SKY 상태 반환
 */
export function getWeatherStatus({ pty, sky }: { pty: string; sky: string }): WeatherStatus {
  const precipitationType = getPrecipitationType(pty)

  if (precipitationType) {
    return precipitationType
  }

  return getSkyCondition(sky)
}
