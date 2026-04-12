import { http } from 'shared/api/http'
import type { CurrentWeatherResponse } from './types'
import { formatYYYYMMDD, getNowDate } from 'shared/lib/time'

/**
 * 초단기실황 API의 base_date, base_time 계산
 * - 매시간 정시 발표 (10분 후부터 제공)
 * - 현재 시각 분 < 10분: 이전 시간의 정시 데이터 사용
 * - 현재 시각 분 >= 10분: 현재 시간의 정시 데이터 사용
 */
export function getCurrentWeatherBaseTime() {
  const nowDateObj = getNowDate()

  // 10분 이전: 이전 시간의 정시 데이터 사용
  const currentMinute = nowDateObj.getMinutes()

  const baseDateObj = new Date(nowDateObj)

  if (currentMinute < 10) {
    baseDateObj.setHours(nowDateObj.getHours() - 1)
  }

  return {
    baseDate: formatYYYYMMDD(baseDateObj),
    baseTime: `${baseDateObj.getHours().toString().padStart(2, '0')}00`, // 정시로 고정
  }
}

/**
 * 초단기실황 조회
 * - 현재 기온, 습도, 강수량, 하늘상태, 강수형태 등
 *
 * @param nx 격자 X 좌표
 * @param ny 격자 Y 좌표
 */
export function getCurrentWeather({ nx, ny }: { nx: number; ny: number }) {
  const baseUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
  const { baseDate, baseTime } = getCurrentWeatherBaseTime()

  const params = new URLSearchParams({
    serviceKey: import.meta.env.VITE_KMA_API_KEY,
    numOfRows: '10',
    pageNo: '1',
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx: nx.toString(),
    ny: ny.toString(),
  })

  return http.get<CurrentWeatherResponse>(`${baseUrl}?${params}`)
}
