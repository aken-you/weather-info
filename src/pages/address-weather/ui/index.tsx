import { useDeviceType } from 'shared/lib/use-device-type'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutFooter,
  AppLayoutHeader,
  AppLayoutMain,
  AppLayoutSidebar,
} from 'shared/ui/app-layout'
import { Plus, Star, Sun } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useCurrentLocation } from 'shared/lib/use-current-location'
import { Suspense } from 'react'
import { SearchLocationTriggerButton } from 'features/search-location/ui/search-location-trigger-button'
import { useQuery } from '@tanstack/react-query'
import { locationQueryKey } from 'entities/location/api/query-key'
import { WeatherSection } from 'widgets/weather/ui/weather-section'

export function AddressWeatherPage() {
  const deviceType = useDeviceType()
  const { location: currentLocation } = useCurrentLocation()
  const { address: addressParams } = useParams()

  const { data: addressParamsLocation } = useQuery(locationQueryKey.nxNyByAddress(addressParams ?? null))
  const { data: currentAddressObj } = useQuery(locationQueryKey.address(currentLocation))

  const address = addressParams
  const location = addressParamsLocation

  return (
    <AppLayout>
      <AppLayoutHeader className="desktop:justify-end">
        <SearchLocationTriggerButton />
      </AppLayoutHeader>

      <AppLayoutContent>
        {deviceType === 'desktop' && (
          <AppLayoutSidebar className="flex flex-col gap-3">
            <h4 className="font-caption text-neutral-tertiary">즐겨찾기</h4>

            <nav className="flex flex-col gap-3">
              {/* todo 즐겨찾기 카드 구현 */}
              {/* <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard /> */}

              {/* todo 경로 지정하기 */}
              <Link
                to=""
                className="text-neutral-secondary font-body-small hover:bg-muted flex w-full items-center justify-center gap-0.5 rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                즐겨찾기 추가 · 3 / 6
              </Link>
            </nav>
          </AppLayoutSidebar>
        )}

        <AppLayoutMain className="flex flex-col items-center gap-5">
          {location && currentAddressObj && address && (
            <Suspense fallback={<WeatherSection.Loading />}>
              <WeatherSection currentAddress={currentAddressObj.addressName} address={address} location={location} />
            </Suspense>
          )}
        </AppLayoutMain>
      </AppLayoutContent>

      {deviceType === 'mobile' && (
        <AppLayoutFooter>
          <nav className="flex h-15.5 items-center rounded-[2.25rem] border border-gray-200 p-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`
              }
            >
              <Sun className="h-4.5 w-4.5" />
              날씨
            </NavLink>
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                `${isActive ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`
              }
            >
              <Star className="h-4.5 w-4.5" />
              즐겨찾기
            </NavLink>
          </nav>
        </AppLayoutFooter>
      )}
    </AppLayout>
  )
}
