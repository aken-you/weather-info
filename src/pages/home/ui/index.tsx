import { useDeviceType } from 'shared/lib/use-device-type'
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader, AppLayoutMain } from 'shared/ui/app-layout'
import { Search, Star, Sun } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentLocation } from 'shared/lib/use-current-location'
import { Suspense } from 'react'
import { WeatherSection } from 'widgets/weather/ui/weather-section'
import { SearchLocationDialog } from 'features/search-location/ui/search-location-dialog'
import { useQuery } from '@tanstack/react-query'
import { locationQueryKey } from 'entities/location/api/query-key'
import FavoriteSidebar from 'widgets/favorite/ui/favorite-sidebar'
import { useLastActiveTab } from 'shared/lib/use-last-active-tab'

export function HomePage() {
  const deviceType = useDeviceType()
  const navigate = useNavigate()
  const { location: currentLocation, error: isErrorCurrentLocation } = useCurrentLocation()

  const activeTab = useLastActiveTab()

  const { data: currentAddressObj } = useQuery(locationQueryKey.address(currentLocation))

  const address = currentAddressObj?.addressName
  const location = currentLocation

  return (
    <AppLayout>
      <AppLayoutHeader className="desktop:justify-end">
        <SearchLocationDialog
          trigger={
            <button className="desktop:w-fit text-muted-foreground font-body-small flex h-11 w-full cursor-pointer items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1">
              <Search className="h-4 w-4" />
              시·군·구·동 날씨 검색
            </button>
          }
          onSelect={address => navigate(`/${address}`)}
        />
      </AppLayoutHeader>

      <AppLayoutContent>
        {deviceType === 'desktop' && <FavoriteSidebar />}

        <AppLayoutMain className="flex flex-col items-center gap-5">
          {address && location && (
            <Suspense fallback={<WeatherSection.Loading />}>
              <WeatherSection currentAddress={currentAddressObj.addressName} address={address} location={location} />
            </Suspense>
          )}
          {isErrorCurrentLocation && (
            <div className="text-neutral-tertiary font-body flex flex-1 items-center justify-center">
              현재 지역을 못찾았습니다.
            </div>
          )}
        </AppLayoutMain>
      </AppLayoutContent>

      {deviceType === 'mobile' && (
        <AppLayoutFooter>
          <nav className="flex h-15.5 items-center rounded-[2.25rem] border border-gray-200 p-1">
            <Link
              to="/"
              className={`${activeTab === 'weather' ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`}
            >
              <Sun className="h-4.5 w-4.5" />
              날씨
            </Link>
            <Link
              to="/favorite"
              className={`${activeTab === 'favorite' ? 'bg-brand-primary text-white' : 'text-neutral-secondary'} flex h-13.5 flex-1 flex-col items-center justify-center gap-1 rounded-[2.25rem] text-[.75rem]`}
            >
              <Star className="h-4.5 w-4.5" />
              즐겨찾기
            </Link>
          </nav>
        </AppLayoutFooter>
      )}
    </AppLayout>
  )
}
