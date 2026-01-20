import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage, GalleryPage, TeamPage, ErrorPage } from './pages/index.js'
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import AuthCallback from './components/Auth/AuthCallback.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='' element={<HomePage />} />
            <Route path='team' element={<TeamPage />} />
            <Route path='gallery' element={<GalleryPage />} />
            {/* <Route path='contact' element={<ContactPage />} /> */}
            <Route path='auth/callback' element={<AuthCallback />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<ErrorPage />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)