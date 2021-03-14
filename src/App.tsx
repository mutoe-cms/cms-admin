import React from 'react'
import { useRoutes } from 'react-router-dom'
import NotFound from 'src/components/NotFound'
import LoginPage from 'src/pages/auth/LoginPage/LoginPage'
import ContentPage from 'src/pages/content/ContentPage'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import PortalPage from 'src/pages/PortalPage'

const ArticleListPage = React.lazy(async () => await import('src/pages/content/article/ArticleListPage'))
const ArticleEditPage = React.lazy(async () => await import('src/pages/content/article/ArticleEditPage'))

const App: React.FC = () => {
  const routes = useRoutes([
    { path: '/login', element: <LoginPage /> },
    {
      path: '/',
      element: <PortalPage />,
      children: [
        { path: 'dashboard', element: <DashboardPage /> },
        {
          path: 'content',
          element: <ContentPage />,
          children: [
            {
              path: 'article',
              children: [
                { path: '/', element: <ArticleListPage /> },
                { path: ':id', element: <ArticleEditPage /> },
              ],
            },
            { path: '*', element: <NotFound /> },
          ],
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ])

  return routes
}

export default App
