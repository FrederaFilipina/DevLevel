import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login/index.jsx'
import HeaderLayout from './layouts/HeaderLayout/index.jsx'
import Dashboard from './pages/Dashboard/index.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute/index.jsx'

export const router = createBrowserRouter([
    {
      element: (
        <HeaderLayout/>
      ),
      children: [
        {path: "/", element: <Login/>},
      ]
    },
    {
      element: (
        <PrivateRoute>
        <HeaderLayout/>
        </PrivateRoute>
      ),
      children: [
        {path: "/dashboard", element: <Dashboard/>}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
