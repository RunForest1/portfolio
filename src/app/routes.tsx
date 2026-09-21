import { createBrowserRouter } from 'react-router'
import Home from '@/pages/Home'
import ProjectPage from '@/pages/ProjectPage'
import NotFound from '@/pages/NotFound'
import Layout from './Layout'

// import.meta.env.BASE_URL зеркалит `base` из vite.config.ts ('/portfolio/' на
// GitHub Pages, '/' локально) — react-router ждёт basename без слэша в конце.
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '')

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'work/:slug', element: <ProjectPage /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: routerBasename },
)
