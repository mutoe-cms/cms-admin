import React from 'react'
import { Route, Switch } from 'react-router'
import { useHistory, useParams } from 'react-router-dom'
import { Loader, Segment } from 'semantic-ui-react'
import { AppKey, appMenus } from 'src/appMenu'
import AppHeader from 'src/components/AppHeader'
import AppSidebar from 'src/components/AppSidebar'
import useAuthorizationContext from 'src/contexts/authorization.context'
import ContentPage from 'src/pages/content/ContentPage'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import { routePath } from 'src/routeConfig'

const PortalPage: React.FC = () => {
  const { loading, profile } = useAuthorizationContext()

  const history = useHistory()
  const { app } = useParams<{ app: AppKey }>()

  if (loading) {
    return <Loader role='progressbar' aria-busy />
  }

  if (!profile) {
    history.push('/login')
    return null
  }

  const appMenu = appMenus.find(it => it.key === app)
  if (!appMenu) {
    history.push('/404')
    return null
  }

  return <div className='App'>
    <AppHeader />
    <div className='moduleContainer'>
      {appMenu.modules?.length && <AppSidebar moduleMenus={appMenu.modules} />}
      <main className='moduleMain'>
        <Switch>
          <Route path={routePath.dashboard} component={DashboardPage} />
          <Route exact path={routePath.content.matcher} component={ContentPage} />
          <Route path={routePath.notFound} />
        </Switch>
      </main>
    </div>
  </div>
}

export default PortalPage
