import { createBrowserRouter, redirect } from 'react-router-dom'
import { HomePage } from 'pages/home/ui'
import { AddressWeatherPage } from 'pages/address-weather/ui'
import { FavoritePage } from 'pages/favorite/ui'
import { AddFavoritePage } from 'pages/add-favorite/ui'
import { EditFavoritePage } from 'pages/edit-favorite/ui'
import { BREAK_POINT } from 'shared/config/break-point'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add-favorite',
    element: <AddFavoritePage />,
  },
  {
    path: '/edit-favorite/:id',
    element: <EditFavoritePage />,
  },
  {
    path: '/favorite',
    element: <FavoritePage />,
    loader: () => {
      const isDesktop = window.matchMedia(`(min-width: ${BREAK_POINT.desktop})`).matches

      // /favorite 경로는 모바일에서만 사용
      if (isDesktop) {
        return redirect('/')
      }
    },
  },
  {
    path: '/:address',
    element: <AddressWeatherPage />,
  },
])
