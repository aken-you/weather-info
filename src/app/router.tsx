import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../page/home/ui'
import { AddressWeatherPage } from '../page/address-weather/ui'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:address',
    element: <AddressWeatherPage />,
  },
])
