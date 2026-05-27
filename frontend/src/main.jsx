import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login/index.jsx'
import HeaderLayout from './layouts/HeaderLayout/index.jsx'

export const router = createBrowserRouter([
    {
      element: (
        <HeaderLayout/>
      ),
      children: [
        {path: "/", element: <Login/>}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

