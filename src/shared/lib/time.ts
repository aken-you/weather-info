/**
 * 현재 한국시간 기준 Date 객체를 반환하는 함수
 */
export function getNowDate() {
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000

  // KST = UTC + 9시간
  const KST_OFFSET = 9 * 60 * 60 * 1000

  return new Date(utc + KST_OFFSET)
}

/**
 * yyyymmddhhmm 형식 문자열을 Date 객체로 변환
 *
 * @param yyyymmddhhmm "202604121530" (2026년 4월 12일 15시 30분)
 * @returns Date 객체 (한국 시간 기준)
 */
export function parseYYYYMMDDHHMM(yyyymmddhhmm: string): Date {
  const year = Number(yyyymmddhhmm.slice(0, 4))
  const month = Number(yyyymmddhhmm.slice(4, 6)) - 1
  const day = Number(yyyymmddhhmm.slice(6, 8))
  const hour = Number(yyyymmddhhmm.slice(8, 10))
  const minute = Number(yyyymmddhhmm.slice(10, 12))

  return new Date(year, month, day, hour, minute)
}

/**
 * 날짜 차이 계산
 */
export function differenceInDays(dateA: Date, dateB: Date) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24

  const d1 = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate())
  const d2 = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate())

  const diff = d1.getTime() - d2.getTime()

  return Math.round(diff / MS_PER_DAY)
}

/**
 * 날짜를 YYYYMMDD 형식으로 변환
 */
export function formatYYYYMMDD(date: Date, separator: string = ''): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const yyyymmdd = `${year}${separator}${month}${separator}${day}`

  return yyyymmdd
}

/**
 * 시간을 HHmm 형식으로 변환
 */
export function formatHHMM(date: Date, separator: string = ''): string {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')

  return `${hh}${separator}${mm}`
}
