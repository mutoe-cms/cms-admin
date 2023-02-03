import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization/authorization.context'
import { routeMap } from 'src/route'
import { Mock } from 'vitest'
import AppHeader from './AppHeader'

const mockNavigate = vi.fn()
const mockUnmountAuthorization = vi.fn()

vi.mock('src/contexts/authorization/authorization.context')
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/dashboard' }),
  useNavigate: () => mockNavigate,
  Link: () => null,
}))

describe('# AppHeader', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as Mock

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuthorizationContext.mockReturnValue({
      profile: { username: 'mutoe' },
      unmountAuthorization: mockUnmountAuthorization,
    })
  })

  it('should render username correctly', () => {
    const { getByText } = render(<AppHeader />)

    expect(getByText('mutoe')).toBeInTheDocument()
  })

  it('should highlight correct item when load page given a url param', () => {
    const { getByTestId } = render(<AppHeader />)

    expect(getByTestId('dashboard')).toHaveClass('active')
  })

  it('should navigate to correct location when click item', () => {
    const { getByTestId } = render(<AppHeader />)

    fireEvent.click(getByTestId('dashboard'))

    expect(mockNavigate).toHaveBeenCalledWith('dashboard')
  })

  it('should call unmountAuthorization when click logout', () => {
    const { getByTestId } = render(<AppHeader />)

    fireEvent.click(getByTestId('logout'))

    expect(mockNavigate).toHaveBeenCalledWith(routeMap.login)
    expect(mockUnmountAuthorization).toHaveBeenCalled()
  })
})
