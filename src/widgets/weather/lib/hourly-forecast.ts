import { CurrentWeather, HourlyForecast } from 'entities/weather/model/weather-status'
import { formatHHMM, formatYYYYMMDD, getNowDate, isAfter, parseYYYYMMDDHHMM } from 'shared/lib/time'

/**
 * 현재 시간대의 날씨 데이터를 반환하는 함수
 *
 * @param currentWeather 현재 시간대의 실제 관측 데이터
 * @param ultraShortForecast 초단기예보 데이터
 * @param nowDateObj 현재 날짜/시간 객체
 * @returns 현재 시간대의 날씨 데이터
 */
export function getCurrentHourWeather({
  currentWeather,
  ultraShortForecast,
  nowDateObj,
}: {
  currentWeather: CurrentWeather
  ultraShortForecast: HourlyForecast[]
  nowDateObj: Date
}): HourlyForecast {
  const nowMinute = nowDateObj.getMinutes()
  const nowHourTime = formatHHMM(nowDateObj).slice(0, 2) + '00' // 정각으로 변환 (예: "1450" -> "1400")

  // currentWeather 데이터
  // - 현재 시각의 분 < 10: 이전 시간대 데이터 제공
  // - 현재 시각의 분 >= 10: 현재 시간대 데이터 제공

  // 따라서, 현재 시각의 분 < 10: ultraShortForecast 사용
  if (nowMinute < 10) {
    const currentHourForecast = ultraShortForecast.find(
      item => item.fcstDate === formatYYYYMMDD(nowDateObj) && item.fcstTime === nowHourTime
    )

    if (currentHourForecast) {
      // ultraShortForecast의 현재 시간대 데이터 사용
      return currentHourForecast
    }
  }

  // 현재 시각의 분 >= 10: currentWeather 사용
  return {
    fcstDate: formatYYYYMMDD(nowDateObj),
    fcstTime: nowHourTime,
    temperature: currentWeather.temperature,
    weatherStatus: currentWeather.weatherStatus,
  }
}

/**
 * 기상청 데이터를 가공하여, 시간대별 예보 데이터를 반환하는 함수
 *
 * @param currentWeather 현재 시간대의 예보 데이터로 활용
 * @param ultraShortForecast (현재 시간대 + 1) ~ (현재 시간대 + 6) 시간대 예보 데이터로 활용
 * @param shortForecast (현재 시간대 + 6) ~ 시간대 예보 데이터로 활용
 * @returns
 */
export function getHourlyForecastList({
  currentWeather,
  ultraShortForecast: usf,
  shortForecast: sf,
}: {
  currentWeather: CurrentWeather
  ultraShortForecast: HourlyForecast[]
  shortForecast: HourlyForecast[]
}) {
  // 현재 시간 정보
  const nowDateObj = getNowDate()

  // 현재 시간대의 날씨 데이터 생성
  const 현재_시간대_날씨 = getCurrentHourWeather({
    currentWeather,
    ultraShortForecast: usf,
    nowDateObj,
  })

  // 단기예보에서 현재 시각 이후만 필터링
  const filteredSf = sf.filter(item => {
    const forecastDateObj = parseYYYYMMDDHHMM(`${item.fcstDate}${item.fcstTime}`)

    return isAfter({
      date: forecastDateObj,
      comparisonDate: nowDateObj,
    })
  })

  // 초단기예보에서 현재 시각 이후만 필터링
  const filteredUSf = usf.filter(item => {
    const forecastDateObj = parseYYYYMMDDHHMM(`${item.fcstDate}${item.fcstTime}`)

    return isAfter({
      date: forecastDateObj,
      comparisonDate: nowDateObj,
    })
  })

  // 중복 제거를 위한 Set (현재 시각 데이터는 이미 추가됨)
  const timeSet = new Set<string>([`${현재_시간대_날씨.fcstDate}_${현재_시간대_날씨.fcstTime}`])

  const combined: HourlyForecast[] = [현재_시간대_날씨]

  // 단기예보 추가
  for (const item of filteredSf) {
    const timeKey = `${item.fcstDate}_${item.fcstTime}`
    if (!timeSet.has(timeKey)) {
      timeSet.add(timeKey)
      combined.push(item)
    }
  }

  // 초단기예보 추가
  for (const item of filteredUSf) {
    const timeKey = `${item.fcstDate}_${item.fcstTime}`
    if (!timeSet.has(timeKey)) {
      timeSet.add(timeKey)
      combined.push(item)
    }
  }

  // 시간 순서로 정렬
  return combined.sort((a, b) => {
    const timeA = parseYYYYMMDDHHMM(`${a.fcstDate}${a.fcstTime}`)
    const timeB = parseYYYYMMDDHHMM(`${b.fcstDate}${b.fcstTime}`)
    return timeA.getTime() - timeB.getTime()
  })
}
