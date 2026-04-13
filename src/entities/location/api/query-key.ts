import { queryOptions } from '@tanstack/react-query'
import { getAddress } from './get-address'
import { getNxNyByAddress } from './get-nx-ny-by-address'
import { convertToGrid } from 'shared/lib/convert-to-grid'

export const locationQueryKey = {
  all: () => ['location'] as const,

  address: (location: { lat: number; lng: number } | null) =>
    queryOptions({
      queryKey: [...locationQueryKey.all(), 'address', location],
      queryFn: async () => getAddress(location!),
      enabled: !!location,
      select: data => {
        const address = data.documents.find(doc => doc.region_type === 'H')!

        const addressName = address.address_name
        const region1Depth = address.region_1depth_name
        const region2Depth = address.region_2depth_name
        const region3Depth = address.region_3depth_name
        const region4Depth = address.region_4depth_name

        const lastRegionDepth = region4Depth || region3Depth || region2Depth || region1Depth

        return {
          addressName,
          region1Depth,
          region2Depth,
          region3Depth,
          region4Depth,
          lastRegionDepth,
        }
      },
    }),

  nxNyByAddress: (address: string | null) =>
    queryOptions({
      queryKey: [...locationQueryKey.all(), 'nx-ny', address],
      queryFn: async () => getNxNyByAddress(address!),
      enabled: !!address,
      select: data => {
        const { x: lng, y: lat } = data.documents[0]
        const latNum = parseFloat(lat)
        const lngNum = parseFloat(lng)

        const { nx, ny } = convertToGrid({ lat: latNum, lng: lngNum })

        return {
          lat: latNum,
          lng: lngNum,
          nx,
          ny,
        }
      },
    }),
}
