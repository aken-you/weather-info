import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from 'app/providers'
import { router } from 'app/router'
import { queryClient } from 'shared/api/query-client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers router={router} queryClient={queryClient} />
  </StrictMode>
)
