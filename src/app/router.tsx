import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from 'pages/home/ui'
import { AddressWeatherPage } from 'pages/address-weather/ui'

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
