import { Sun } from 'lucide-react'
import { differenceInDays, getNowDate, parseYYYYMMDDHHMM } from 'shared/lib/time'

interface HourlyForecastItemProps {
  fcstDate: string
  fcstTime: string
  temperature: number
  weatherStatus: string
}

export function HourlyForecastItem({ fcstDate, fcstTime, temperature }: HourlyForecastItemProps) {
  const nowDateObj = getNowDate()

  const fcstDateObj = parseYYYYMMDDHHMM(`${fcstDate}${fcstTime}`)

  const isSameTime =
    nowDateObj.getFullYear() === fcstDateObj.getFullYear() &&
    nowDateObj.getMonth() === fcstDateObj.getMonth() &&
    nowDateObj.getDate() === fcstDateObj.getDate() &&
    nowDateObj.getHours() === fcstDateObj.getHours()

  const diffDays = differenceInDays(fcstDateObj, nowDateObj)
  const DIFF_DAY_TEXT = {
    1: '내일',
    2: '모레',
    3: '글피',
    4: '그글피',
  }

  const diffDaysLabel = DIFF_DAY_TEXT[diffDays as 1 | 2 | 3 | 4]

  return (
    <li
      className={`${isSameTime ? 'bg-brand-primary text-white' : 'text-neutral-secondary bg-white'} flex min-w-fit flex-col items-center gap-1.5 rounded-[.75rem] px-3.5 py-3`}
    >
      {isSameTime ? (
        <div className="font-caption p-0.5 font-semibold">지금</div>
      ) : (
        <div
          className={`font-caption flex items-center justify-center p-0.5 ${fcstDateObj.getHours() === 0 ? 'border-brand-primary w-full rounded-lg border' : ''}`}
        >
          {fcstDateObj.getHours() === 0 ? diffDaysLabel : `${fcstDateObj.getHours()}시`}
        </div>
      )}

      {/* todo: 날씨 상태 처리 */}
      <Sun className="h-8 w-8" />

      <span className="font-caption font-semibold">{temperature}°C</span>
    </li>
  )
}
