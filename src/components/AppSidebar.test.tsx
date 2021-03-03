import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { appMenus } from 'src/appMenu'
import AppSidebar from 'src/components/AppSidebar'

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/content/category' }),
  useHistory: () => ({ push: mockPush }),
}))

describe('# AppHeader', () => {
  const contentModuleMenus = appMenus.find(it => it.key === 'content')?.modules ?? []

  it('should render correctly', () => {
    const { container } = render(<AppSidebar moduleMenus={contentModuleMenus} />)

    expect(container).toBeInTheDocument()
  })

  it('should highlight correct item when page loaded given the url param', () => {
    const { getByTestId } = render(<AppSidebar moduleMenus={contentModuleMenus} />)

    expect(getByTestId('category')).toHaveClass('active')
  })

  it('should navigate to correct location when click item', () => {
    const { getByTestId } = render(<AppSidebar moduleMenus={contentModuleMenus} />)

    fireEvent.click(getByTestId('article'))

    expect(mockPush).toBeCalledWith('/content/article')
  })
})
