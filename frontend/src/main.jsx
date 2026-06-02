import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import "./layouts/HeaderLayout/toastStyles.css"
import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./pages/Login/index.jsx"
import HeaderLayout from "./layouts/HeaderLayout/index.jsx"
import Dashboard from "./pages/Dashboard/index.jsx"
import LandingPage from "./pages/LandingPage/index.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import PrivateRoute from "./components/PrivateRoute/index.jsx"
import { ToastContainer } from "react-toastify"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      element: (
        <HeaderLayout/>
      ),
      children: [
        {path: "/login", element: <Login/>},
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
