import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { appMenus } from 'src/appMenu'
import Notification from 'src/components/Notification'
import useAuthorizationContext from 'src/contexts/authorization.context'
import useModuleName from 'src/hooks/useModuleName'

const AppHeader: React.FC = () => {
  const { profile, unmountAuthorization } = useAuthorizationContext()
  const { appKey } = useModuleName()
  const appMenu = appMenus.find(it => it.key === appKey)
  const [activeItem, setActiveItem] = useState(appMenu?.key)
  const navigate = useNavigate()

  useEffect(() => {
    setActiveItem(appKey)
  }, [appKey])

  const onLogout = () => {
    unmountAuthorization()
    navigate('/login')
  }

  const userTrigger = <span className='userTrigger' role='button'>
    <Icon name='user' />
    {' '}
    {profile?.username}
  </span>

  return <Menu pointing secondary className='AppHeader'>
    <Menu.Menu postion='left' className='menuLogo'>
      <Menu.Item>
        <Link className='logoLink' to='dashboard'>Mutoe CMS</Link>
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu as='nav'>
      {appMenus.map(item => <Menu.Item
        key={item.key}
        className='menuItem'
        data-testid={item.key}
        name={item.appName}
        active={activeItem === item.key}
        onClick={() => navigate(item.key)}
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
