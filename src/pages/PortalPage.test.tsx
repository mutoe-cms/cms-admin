import { render } from '@testing-library/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import useAuthorizationContext from 'src/contexts/authorization.context'
import PortalPage from 'src/pages/PortalPage'
import { routeMap } from 'src/route'

jest.mock('src/contexts/authorization.context')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(),
  Link: () => null,
  Outlet: () => null,
}))

describe('# PortalPage', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as jest.Mock
  const mockUseLocation = useLocation as jest.Mock

  it('should jump to dashboard page when path is root', () => {
    mockUseLocation.mockReturnValue({ pathname: routeMap.root })
    mockUseAuthorizationContext.mockReturnValue({ loading: true })
    render(<PortalPage />)

    expect(mockNavigate).toBeCalledWith(routeMap.home, { replace: true })
  })

  it('should render loading given authorization is loading', () => {
    mockUseLocation.mockReturnValue({ pathname: routeMap.dashboard })
    mockUseAuthorizationContext.mockReturnValue({ loading: true })
    const { getByRole } = render(<PortalPage />)

    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('should redirect to 404 page when url is invalid', () => {
    mockUseLocation.mockReturnValue({ pathname: '/invalid' })
    mockUseAuthorizationContext.mockReturnValue({
      loading: false,
      profile: { username: 'mutoe' },
    })
    const { container } = render(<PortalPage />)

    expect(container).toHaveTextContent('Not found')
  })

  it('should render correct page given url is valid and logged', () => {
    mockUseLocation.mockReturnValue({ pathname: routeMap.dashboard })
    mockUseAuthorizationContext.mockReturnValue({
      loading: false,
      profile: { username: 'mutoe' },
    })
    const { container } = render(<PortalPage />)

    expect(container).toBeInTheDocument()
  })
})
