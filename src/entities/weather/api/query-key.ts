import { queryOptions } from '@tanstack/react-query'
import { getCurrentWeather } from './get-current-weather'
import { getShortForecast } from './get-short-forecast'
import { getUltraShortForecast } from './get-ultra-short-forecast'
import { getWeatherStatus } from './get-weather-status'

export const weatherQueryKey = {
  all: () => ['weather'] as const,

  currentWeather: (gridCoords: { nx: number; ny: number }) =>
    queryOptions({
      queryKey: [...weatherQueryKey.all(), 'current', gridCoords?.nx, gridCoords?.ny] as const,
      queryFn: async () => getCurrentWeather(gridCoords),
      select: data => {
        const items = data.response.body.items.item

        const getValue = (category: string) => items.find(item => item.category === category)?.obsrValue || '0'

        const temperature = getValue('T1H') // 현재 기온
        const sky = getValue('SKY') // 하늘 상태 (1: 맑음, 2: 구름 조금, 3: 구름 많음, 4: 흐림)
        const pty = getValue('PTY') // 강수 형태 (0: 없음, 1: 비, 2: 비/눈, 3: 눈, 4: 소나기)
        const humidity = getValue('REH') // 습도
        const precipitation = getValue('RN1') // 1시간 강수량

        return {
          temperature: Number(temperature),
          humidity: Number(humidity),
          precipitation: Number(precipitation),
          weatherStatus: getWeatherStatus({ pty, sky }),
        }
      },
    }),

  ultraShortForecast: (gridCoords: { nx: number; ny: number }) =>
    queryOptions({
      queryKey: [...weatherQueryKey.all(), 'ultra-short-forecast', gridCoords?.nx, gridCoords?.ny] as const,
      queryFn: async () => getUltraShortForecast(gridCoords),
      select: data => {
        const items = data.response.body.items.item

        // 시간대별로 그룹핑
        const grouped = items.reduce(
          (acc, item) => {
            const key = `${item.fcstDate}_${item.fcstTime}`
            if (!acc[key]) {
              acc[key] = {
                fcstDate: item.fcstDate,
                fcstTime: item.fcstTime,
                fcstValues: {},
              }
            }
            acc[key].fcstValues[item.category] = item.fcstValue
            return acc
          },
          {} as Record<string, { fcstDate: string; fcstTime: string; fcstValues: Record<string, string> }>
        )

        return Object.values(grouped).map(group => ({
          fcstDate: group.fcstDate,
          fcstTime: group.fcstTime,
          temperature: Number(group.fcstValues.T1H || 0),
          weatherStatus: getWeatherStatus({
            pty: group.fcstValues.PTY || '0',
            sky: group.fcstValues.SKY || '1',
          }),
        }))
      },
    }),

  shortForecast: (gridCoords: { nx: number; ny: number }) =>
    queryOptions({
      queryKey: [...weatherQueryKey.all(), 'short-forecast', gridCoords?.nx, gridCoords?.ny] as const,
      queryFn: async () => getShortForecast(gridCoords),
      select: data => {
        const items = data.response.body.items.item

        // 최저/최고 기온 추출
        const minTemp = items.find(item => item.category === 'TMN')?.fcstValue
        const maxTemp = items.find(item => item.category === 'TMX')?.fcstValue

        // 시간대별로 그룹핑
        const grouped = items.reduce(
          (acc, item) => {
            const key = `${item.fcstDate}_${item.fcstTime}`
            if (!acc[key]) {
              acc[key] = {
                fcstDate: item.fcstDate,
                fcstTime: item.fcstTime,
                fcstValues: {},
              }
            }
            acc[key].fcstValues[item.category] = item.fcstValue
            return acc
          },
          {} as Record<string, { fcstDate: string; fcstTime: string; fcstValues: Record<string, string> }>
        )

        const hourlyForecast = Object.values(grouped)
          .filter(group => group.fcstValues.TMP) // 기온 데이터가 있는 항목만
          .map(group => ({
            fcstDate: group.fcstDate,
            fcstTime: group.fcstTime,
            temperature: Number(group.fcstValues.TMP || 0),
            weatherStatus: getWeatherStatus({
              pty: group.fcstValues.PTY || '0',
              sky: group.fcstValues.SKY || '1',
            }),
          }))

        return {
          minTemp: minTemp ? Number(minTemp) : null,
          maxTemp: maxTemp ? Number(maxTemp) : null,
          hourlyForecast,
        }
      },
    }),
}
