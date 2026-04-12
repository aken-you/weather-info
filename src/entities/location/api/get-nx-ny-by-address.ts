import { http } from 'shared/api/http'
import { GeocodingResponse } from './types'

export function getNxNyByAddress(address: string) {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`

  return http.get<GeocodingResponse>(url, {
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    },
  })
}
