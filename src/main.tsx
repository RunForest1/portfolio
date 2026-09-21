import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import '@fontsource-variable/archivo'
import '@fontsource-variable/ibm-plex-sans'
import '@fontsource/ibm-plex-mono/400.css'
import './app/styles/global.css'
import { router } from './app/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
