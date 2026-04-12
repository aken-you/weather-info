interface HourlyForecast {
  fcstDate: string
  fcstTime: string
  temperature: number
  weatherStatus: string
}

export function getHourlyForecastList({
  ultraShortForecast,
  shortForecast,
}: {
  ultraShortForecast: HourlyForecast[]
  shortForecast: HourlyForecast[]
}) {
  // 초단기예보의 시간대를 Set으로 저장 (빠른 조회를 위해)
  const ultraShortTimeSet = new Set(ultraShortForecast.map(item => `${item.fcstDate}_${item.fcstTime}`))

  // 단기예보에서 초단기예보 시간대를 제외한 데이터만 필터링
  const remainingShortForecast = shortForecast.filter(item => {
    const timeKey = `${item.fcstDate}_${item.fcstTime}`
    return !ultraShortTimeSet.has(timeKey)
  })

  // 남은 단기예보 순서로 결합
  return [...ultraShortForecast, ...remainingShortForecast]
}
