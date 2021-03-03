import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { AppKey, appMenus } from 'src/appMenu'
import useAuthorizationContext from 'src/contexts/authorization.context'
import { routeMap } from 'src/routeConfig'
import Notification from './Notification'

const AppHeader: React.FC = () => {
  const { profile, unmountAuthorization } = useAuthorizationContext()

  const { app } = useParams<{ app: AppKey }>()
  const appMenu = appMenus.find(it => it.key === app)
  const [activeItem, setActiveItem] = useState(appMenu?.key)

  const history = useHistory()
  const onLogout = () => {
    unmountAuthorization()
    history.push('/login')
  }

  const userTrigger = <span className='userTrigger' role='button'>
    <Icon name='user' /> {profile?.username}
  </span>

  const onNavigate = (appKey: AppKey) => {
    setActiveItem(appKey)
    history.push(routeMap.app(appKey))
  }

  return <Menu pointing secondary className='AppHeader'>
    <Menu.Menu postion='left' className='menuLogo'>
      <Menu.Item>
        <Link className='logoLink' to='dashboard'>Mutoe CMS</Link>
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu as='nav'>
      {appMenus.map(item =>
        <Menu.Item
          className='menuItem'
          data-testid={item.key}
          key={item.key}
          name={item.appName}
          active={activeItem === item.key}
          onClick={() => onNavigate(item.key)}
        >
          <Icon name={item.icon} size='large' className='itemIcon' />
          <span>{item.appName}</span>
        </Menu.Item>)}
    </Menu.Menu>

    <Menu.Menu position='right'>
      <Menu.Item className='menuItem' name='notification'>
        <Notification icon='bell outline' numOfNew={3} />
      </Menu.Item>

      <Menu.Item className='menuItem' name='setting'>
        <Dropdown trigger={userTrigger} pointing='top right'>
          <Dropdown.Menu className='menuDropdown'>
            <Dropdown.Header icon='address card' content='Admin' />
            <Dropdown.Divider />
            <Dropdown.Item as='a' data-testid='logout' onClick={onLogout}>
              <Icon name='sign-out' className='right floated' />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
}

export default AppHeader
