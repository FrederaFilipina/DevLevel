import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login/index.jsx'
import HeaderLayout from './layouts/HeaderLayout/index.jsx'
import Dashboard from './pages/Dashboard/index.jsx'

export const router = createBrowserRouter([
    {
      element: (
        <HeaderLayout/>
      ),
      children: [
        {path: "/", element: <Login/>},
        {path: "/dashboard", element: <Dashboard/>}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

