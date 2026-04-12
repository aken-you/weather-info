import { queryOptions } from '@tanstack/react-query'
import { getAddress } from './get-address'

export const locationQueryKey = {
  all: () => ['location'] as const,

  address: (location: { lat: number; lng: number }) =>
    queryOptions({
      queryKey: [...locationQueryKey.all(), 'address', location.lat, location.lng],
      queryFn: async () => getAddress(location),
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
}
