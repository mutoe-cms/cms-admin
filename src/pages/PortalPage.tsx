import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { appMenus } from 'src/appMenu'
import AppHeader from 'src/components/AppHeader'
import AppSidebar from 'src/components/AppSidebar'
import useAuthorizationContext from 'src/contexts/authorization.context'
import useModuleName from 'src/hooks/useModuleName'

const PortalPage: React.FC = () => {
  const { loading, profile } = useAuthorizationContext()
  const navigate = useNavigate()
  const { appKey } = useModuleName()

  if (!appKey) {
    navigate('/dashboard')
    return null
  }

  if (loading) {
    return <Loader aria-busy role='progressbar' />
  }

  if (!profile) {
    navigate('/login')
    return null
  }

  const appMenu = appMenus.find(menu => menu.key === appKey)

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
