import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic'

import './Notification.scss'

interface NotificationProps {
  icon: SemanticICONS
  numOfNew: number
}

const Notification: React.FC<NotificationProps> = ({ icon, numOfNew }) => {
  const newNotification = (
    <div className='newNotification' role='button'>
      <span>{numOfNew}</span>
    </div>
  )
  const trigger = (
    <Icon.Group>
      <Icon name={icon} size='large' className='iconStyle' />
      {numOfNew > 0 && newNotification}
    </Icon.Group>
  )

  return (
    <Dropdown trigger={trigger} icon={false} pointing='top right'>
      <Dropdown.Menu className='menuDropdown'>
        <Dropdown.Header icon='tags' content='Filter by tag' />
        <Dropdown.Divider />
        <Dropdown.Item as='a'>
          <Icon name='attention' className='right floated' />
          Important
        </Dropdown.Item>
        <Dropdown.Item as='a'>
          <Icon name='comment' className='right floated' />
          Announcement
        </Dropdown.Item>
        <Dropdown.Item as='a'>
          <Icon name='conversation' className='right floated' />
          Discussion
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Notification
