import { createBrowserRouter } from 'react-router'
import Home from '@/pages/Home'
import ProjectPage from '@/pages/ProjectPage'
import NotFound from '@/pages/NotFound'
import Layout from './Layout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
