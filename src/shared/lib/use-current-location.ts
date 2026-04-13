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

export function useCurrentLocation(): { location: Location | null; error: boolean; loading: boolean } {
  const [latLng, setLatLng] = useState<LatLng | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(true)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLatLng({ lat: latitude, lng: longitude })
        setLoading(false)
      },
      _err => {
        setError(true)
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
