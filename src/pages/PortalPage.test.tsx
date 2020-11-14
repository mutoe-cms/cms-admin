import { render } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization.context'
import PortalPage from 'src/pages/PortalPage'
import { routePath } from 'src/routeConfig'
import ReactRouterDom from 'react-router-dom'

const mockPush = jest.fn()
jest.mock('src/contexts/authorization.context')
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
  useLocation: () => ({}),
  useParams: jest.fn(),
  Link: () => null,
}))
jest.mock('react-router', () => ({
  Switch: () => null,
  Route: () => null,
}))

describe('# PortalPage', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as jest.Mock
  const mockUseParams = jest.spyOn(ReactRouterDom, 'useParams').mockReturnValue({})

  it('should render loading given authorization is loading', () => {
    mockUseAuthorizationContext.mockReturnValue({
      loading: true,
    })
    const { getByRole } = render(<PortalPage />)

    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('should redirect to login page when not logged', () => {
    mockUseAuthorizationContext.mockReturnValue({
      loading: false,
      profile: null,
    })
    render(<PortalPage />)

    expect(mockPush).toBeCalledWith(routePath.login)
  })

  it('should redirect to 404 page when url is invalid', () => {
    mockUseParams.mockReturnValue({ app: 'invalid' })
    mockUseAuthorizationContext.mockReturnValue({
      loading: false,
      profile: { username: 'mutoe' },
    })
    render(<PortalPage />)

    expect(mockPush).toBeCalledWith(routePath.notFound)
  })

  it('should render correct page given url is valid and logged', () => {
    mockUseParams.mockReturnValue({ app: 'content' })
    mockUseAuthorizationContext.mockReturnValue({
      loading: false,
      profile: { username: 'mutoe' },
    })
    const { container } = render(<PortalPage />)

    expect(container).toBeInTheDocument()
  })
})
