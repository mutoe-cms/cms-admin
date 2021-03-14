import { tail } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { ModuleMenu } from 'src/appMenu'
import { routeMap, routePath } from 'src/routeConfig'

interface AppSidebarProps {
  moduleMenus: ModuleMenu[]
}

const AppSidebar: React.FC<AppSidebarProps> = ({ moduleMenus }) => {
  const paramMatcher = pathToRegexp(routePath.moduleMatcher)
  const location = useLocation()
  const [appKey, moduleKey] = tail(paramMatcher.exec(location.pathname)) || ['', '']

  const history = useHistory()
  const onNavigate = (moduleKey: string) => {
    history.push(routeMap.module(appKey, moduleKey))
  }

  return <aside className='AppSidebar'>
    {moduleMenus.map(moduleMenu => {
      return <Menu key={moduleMenu.moduleName} vertical pointing as='nav' className='Menu'>
        <Menu.Item header>{moduleMenu.moduleName}</Menu.Item>
        {moduleMenu.items.map(item => {
          return <Menu.Item
            key={item.key}
            data-testid={item.key}
            name={item.name}
            icon={item.icon}
            active={moduleKey === item.key}
            onClick={() => onNavigate(item.key)}
          />
        })}
      </Menu>
    })}
  </aside>
}

export default AppSidebar
