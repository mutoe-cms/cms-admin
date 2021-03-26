import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization.context'
import AppHeader from './AppHeader'

const mockNavigate = jest.fn()
const mockUnmountAuthorization = jest.fn()

jest.mock('src/contexts/authorization.context')
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/dashboard' }),
  useNavigate: () => mockNavigate,
  Link: () => null,
}))

describe('# AppHeader', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
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

    expect(mockNavigate).toBeCalledWith('dashboard')
  })

  it('should call unmountAuthorization when click logout', () => {
    const { getByTestId } = render(<AppHeader />)

    fireEvent.click(getByTestId('logout'))

    expect(mockNavigate).toBeCalledWith('/login')
    expect(mockUnmountAuthorization).toBeCalled()
  })
})
