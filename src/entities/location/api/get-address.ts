import { http } from 'shared/api/http'
import { AddressResponse } from './types'

export function getAddress({ lat, lng }: { lat: number; lng: number }) {
  return http.get<AddressResponse>(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`, {
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    },
  })
}
