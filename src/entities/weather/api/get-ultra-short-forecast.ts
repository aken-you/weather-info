import { http } from 'shared/api/http'
import type { UltraShortForecastResponse } from './types'
import { formatYYYYMMDD, getNowDate } from 'shared/lib/time'
// import { formatKoreaTime } from 'shared/lib/time'

/**
 * 초단기예보 API의 baseDate, baseTime 계산
 * - 매시간 30분 발표 (45분 후부터 제공)
 * - 현재 시각이 45분 이전이면 이전 시간의 30분 데이터 사용
 * - 45분 이후면 현재 시간의 30분 데이터 사용
 */
export function getUltraShortForecastBaseTime() {
  // 현재 한국 시간 정보 획득
  const nowDateObj = getNowDate()
  const minute = nowDateObj.getMinutes()

  const baseDateObj = new Date(nowDateObj)

  // 45분 이전이면 이전 시간의 30분, 이후면 현재 시간의 30분
  if (minute < 45) {
    baseDateObj.setHours(baseDateObj.getHours() - 1)
  }

  return {
    baseDate: formatYYYYMMDD(baseDateObj),
    baseTime: baseDateObj.getHours().toString().padStart(2, '0') + '30', // 30분으로
  }
}

/**
 * 초단기예보 조회
 * - 향후 6시간의 기온, 하늘상태, 강수형태 등
 *
 * @param nx 격자 X 좌표
 * @param ny 격자 Y 좌표
 */
export function getUltraShortForecast({ nx, ny }: { nx: number; ny: number }) {
  const baseUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
  const { baseDate, baseTime } = getUltraShortForecastBaseTime()

  const params = new URLSearchParams({
    serviceKey: import.meta.env.VITE_KMA_API_KEY,
    numOfRows: '60',
    pageNo: '1',
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx: nx.toString(),
    ny: ny.toString(),
  })

  return http.get<UltraShortForecastResponse>(`${baseUrl}?${params}`)
}
