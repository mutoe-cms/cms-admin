import React from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { appMenus } from 'src/appMenu'
import AppHeader from 'src/components/AppHeader'
import AppSidebar from 'src/components/AppSidebar'
import NotFound from 'src/components/NotFound'
import useAuthorizationContext from 'src/contexts/authorization.context'
import useModuleName from 'src/hooks/useModuleName'

import './PortalPage.scss'

const PortalPage: React.FC = () => {
  const { loading } = useAuthorizationContext()
  const { appKey } = useModuleName()

  if (loading) return <Loader aria-busy role='progressbar' />

  const appMenu = appMenus.find(menu => menu.key === appKey)

  if (!appMenu) return <NotFound />

  return <div className='App'>
    <AppHeader />

    <div className='moduleContainer'>
      <AppSidebar moduleMenus={appMenu?.modules ?? []} />

      <main className='moduleMain'>
        <Outlet />
      </main>
    </div>
  </div>
}

export default PortalPage
