// shared/hooks/useCurrentLocation.ts
import { useEffect, useState } from 'react'
import { convertToGrid } from './convert-to-grid'

interface LatLng {
  lat: number
  lng: number
}

interface Location extends LatLng {
  nx: number
  ny: number
}

export function useCurrentLocation(): { location: Location | null; error: string | null; loading: boolean } {
  const [latLng, setLatLng] = useState<LatLng | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation을 지원하지 않는 브라우저입니다.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLatLng({ lat: latitude, lng: longitude })
        setLoading(false)
      },
      err => {
        setError(err.message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    )
  }, [])

  const location = latLng ? { ...latLng, nx: convertToGrid(latLng).nx, ny: convertToGrid(latLng).ny } : null

  return { location, error, loading }
}
