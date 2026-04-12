/**
 * 기상청 API 공통 응답 구조
 */

interface KMAResponse<T> {
  response: {
    header: {
      resultCode: string
      resultMsg: string
    }
    body: {
      dataType: string
      items: {
        item: T[]
      }
      pageNo: number
      numOfRows: number
      totalCount: number
    }
  }
}

/**
 * 초단기실황 응답 항목
 */
type CurrentWeatherCategory =
  | 'T1H' // 기온 (℃)
  | 'RN1' // 1시간 강수량 (mm)
  | 'UUU' // 동서바람성분 (m/s)
  | 'VVV' // 남북바람성분 (m/s)
  | 'REH' // 습도 (%)
  | 'PTY' // 강수형태 (코드값)
  | 'VEC' // 풍향 (deg)
  | 'WSD' // 풍속 (m/s)

interface CurrentWeatherItem {
  baseDate: string
  baseTime: string
  category: CurrentWeatherCategory
  nx: number
  ny: number
  obsrValue: string
}

/**
 * 초단기예보 응답 항목
 */
type UltraShortForecastCategory =
  | 'T1H' // 기온 (℃)
  | 'RN1' // 1시간 강수량 (범주 1mm)
  | 'SKY' // 하늘상태 (코드값)
  | 'UUU' // 동서바람성분 (m/s)
  | 'VVV' // 남북바람성분 (m/s)
  | 'REH' // 습도 (%)
  | 'PTY' // 강수형태 (코드값)
  | 'LGT' // 낙뢰 (kA)
  | 'VEC' // 풍향 (deg)
  | 'WSD' // 풍속 (m/s)

interface UltraShortForecastItem {
  baseDate: string
  baseTime: string
  category: UltraShortForecastCategory
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

/**
 * 단기예보 응답 항목
 */
type ShortForecastCategory =
  | 'POP' // 강수확률 (%)
  | 'PTY' // 강수형태 (코드값)
  | 'PCP' // 1시간 강수량 (범주 1mm)
  | 'REH' // 습도 (%)
  | 'SNO' // 1시간 신적설 (범주 1cm)
  | 'SKY' // 하늘상태 (코드값)
  | 'TMP' // 1시간 기온 (℃)
  | 'TMN' // 일 최저기온 (℃)
  | 'TMX' // 일 최고기온 (℃)
  | 'UUU' // 풍속(동서성분) (m/s)
  | 'VVV' // 풍속(남북성분) (m/s)
  | 'WAV' // 파고 (M)
  | 'VEC' // 풍향 (deg)
  | 'WSD' // 풍속 (m/s)

interface ShortForecastItem {
  baseDate: string
  baseTime: string
  category: ShortForecastCategory
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

export type CurrentWeatherResponse = KMAResponse<CurrentWeatherItem>
export type UltraShortForecastResponse = KMAResponse<UltraShortForecastItem>
export type ShortForecastResponse = KMAResponse<ShortForecastItem>
