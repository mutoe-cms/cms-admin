import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { ModuleMenu } from 'src/appMenu'
import useModuleName from 'src/hooks/useModuleName'

import './AppSidebar.scss'

interface AppSidebarProps {
  moduleMenus: ModuleMenu[]
}

const AppSidebar: React.FC<AppSidebarProps> = ({ moduleMenus }) => {
  const { appKey, moduleKey } = useModuleName()
  const navigate = useNavigate()

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
            onClick={() => navigate(`${appKey}/${item.key}`)}
          />
        })}
      </Menu>
    })}
  </aside>
}

export default AppSidebar
