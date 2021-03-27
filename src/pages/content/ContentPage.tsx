import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import './ContentPage.scss'

const ContentPage: React.FC = () => {
  return <div className='ContentPage'>
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </div>
}

export default ContentPage
