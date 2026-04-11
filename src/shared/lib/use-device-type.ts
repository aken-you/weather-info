import { BREAK_POINT } from 'shared/config/break-point'
import { useMediaQuery } from './use-media-query'

type DeviceType = 'mobile' | 'desktop'

export function useDeviceType(): DeviceType {
  const isDesktop = useMediaQuery(`(min-width: ${BREAK_POINT.desktop})`)

  return isDesktop ? 'desktop' : 'mobile'
}
