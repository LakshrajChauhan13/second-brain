import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    },
  },
})

const router = createRouter({routeTree})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
