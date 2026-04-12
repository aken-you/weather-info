import { http } from 'shared/api/http'
import type { ShortForecastResponse } from './types'
import { formatYYYYMMDD, getNowDate } from 'shared/lib/time'

/**
 * 시각보다 이전인 가장 최근 단기예보 발표 시각 (ex: 현재 16:20 → 1400 선택, 현재 03:10 → 0200 선택)
 * - 단기예보 발표 시각: 02, 05, 08, 11, 14, 17, 20, 23시
 * - 단기예보 데이터 제공 시간: 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10 (발표 시각 10분 후부터 제공)
 */
function getLatestShortForecastBaseTime(date: Date) {
  const hour = date.getHours()
  const minute = date.getMinutes()

  // 단기예보 발표 시각 리스트
  const baseTimeList = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300']

  let latestTime = baseTimeList[0]

  for (let i = 0; i < baseTimeList.length; i++) {
    const baseHour = parseInt(baseTimeList[i].slice(0, 2), 10)

    // 단기 예보 발표 데이터 제공 시간: 발표 시각 10분 후 (ex: 02:00 발표 → 02:10부터 데이터 제공)
    if (hour > baseHour || (hour === baseHour && minute >= 10)) {
      latestTime = baseTimeList[i]
    }
  }

  return latestTime
}

/**
 * 단기예보 API의 baseDate, baseTime 계산
 * - 02, 05, 08, 11, 14, 17, 20, 23시 발표 (발표시각 10분 후부터 제공)
 */
function getShortForecastBaseTime() {
  const nowDateObj = getNowDate()

  const hour = nowDateObj.getHours()
  const minute = nowDateObj.getMinutes()

  // 가장 최근 발표 시각
  let latestBaseTime = getLatestShortForecastBaseTime(nowDateObj)

  const baseDateObj = new Date(nowDateObj)

  // 00:00 ~ 02:10 사이인 경우: 전날 23시 데이터 사용
  if (hour < 2 || (hour === 2 && minute < 10)) {
    baseDateObj.setDate(baseDateObj.getDate() - 1)
    latestBaseTime = '2300'
  }

  return {
    baseDate: formatYYYYMMDD(baseDateObj),
    baseTime: latestBaseTime,
  }
}

/**
 * 단기예보 조회
 * - 당일 최저/최고 기온
 * - 3일간 1시간 단위 기온, 하늘상태, 강수형태 등
 *
 * @param nx 격자 X 좌표
 * @param ny 격자 Y 좌표
 */
export function getShortForecast({ nx, ny }: { nx: number; ny: number }) {
  const baseUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'
  const { baseDate, baseTime } = getShortForecastBaseTime()

  const params = new URLSearchParams({
    serviceKey: import.meta.env.VITE_KMA_API_KEY,
    numOfRows: '1000',
    pageNo: '1',
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx: nx.toString(),
    ny: ny.toString(),
  })

  return http.get<ShortForecastResponse>(`${baseUrl}?${params}`)
}
