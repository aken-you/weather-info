import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../page/home/ui'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
])
