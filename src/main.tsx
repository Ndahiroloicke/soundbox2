import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Landing from './pages/landing.tsx'
import Login from './pages/login.tsx'
import Dashboard from './pages/dashboard.tsx'

const routes = createBrowserRouter([
  {
    path:'/',
    element:<Landing/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
