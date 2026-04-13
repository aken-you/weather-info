import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FavoriteContextProvider } from 'shared/model/favorite-context'

interface ProvidersProps {
  queryClient: QueryClient
  router: ReturnType<typeof createBrowserRouter>
}

export function Providers({ queryClient, router }: ProvidersProps) {
  return (
    <FavoriteContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </FavoriteContextProvider>
  )
}
