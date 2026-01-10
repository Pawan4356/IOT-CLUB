import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, TeamMembers, Gallery, Contact, NotFound } from './components/index.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import AuthCallback from './components/Auth/AuthCallback.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='team' element={<TeamMembers />} />
      <Route path='gallery' element={<Gallery />} />
      {/* <Route path='contact' element={<Contact />} /> */}
      <Route path='auth/callback' element={<AuthCallback />} />
      <Route path='*' element={<NotFound />} />
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
