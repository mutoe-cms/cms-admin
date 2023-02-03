import { fireEvent, render, waitFor } from '@testing-library/react'
import { noop } from 'lodash'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization/authorization.context'
import { routeMap } from 'src/route'
import { useSubmit } from 'src/services'
import { ProfileRo } from 'src/services/api'
import { MockedFunction } from 'vitest'
import LoginPage from './LoginPage'

vi.mock('src/contexts/authorization/authorization.context')
vi.mock('src/services')

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('# Login page', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as MockedFunction<typeof useAuthorizationContext>
  const mockMountAuthorization = vi.fn()
  const submitRequest = vi.fn()
  const mockUseSubmit = useSubmit as MockedFunction<typeof useSubmit>

  const loginFormFixture = {
    username: 'admin',
    password: '123456',
  }

  beforeEach(() => {
    mockUseAuthorizationContext.mockReturnValue({
      profile: null,
      loading: false,
      mountAuthorization: mockMountAuthorization,
      unmountAuthorization: vi.fn(),
    })
    mockUseSubmit.mockReturnValue({
      formRef: { current: null },
      submitting: false,
      submitRequest,
    })
  })

  it('should render correctly', () => {
    const { container } = render(<LoginPage />)

    expect(container).toBeInTheDocument()
  })

  it('should redirect to home page when user is already logged in', () => {
    mockUseAuthorizationContext.mockReturnValue({
      profile: { username: 'admin' } as ProfileRo,
      loading: false,
      mountAuthorization: mockMountAuthorization,
      unmountAuthorization: vi.fn(),
    })

    render(<LoginPage />)

    expect(mockNavigate).toHaveBeenCalledWith(routeMap.home, { replace: true })
  })

  it('should jump to home page when submit a valid form', async () => {
    submitRequest.mockResolvedValue({ username: 'invalid', token: 'token' })
    const { getByRole, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByRole('textbox', { name: 'Username' }), { target: { value: loginFormFixture.username } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: loginFormFixture.password } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => expect(submitRequest).toHaveBeenCalledWith(loginFormFixture))
    expect(mockMountAuthorization).toHaveBeenCalledWith({ username: 'invalid', token: 'token' })
    expect(mockNavigate).toHaveBeenCalledWith(routeMap.home, { replace: true })
  })

  it('should display server validation error message when submit exist username form', async () => {
    const { error } = console
    vi.spyOn(console, 'error').mockImplementation(noop)

    submitRequest.mockRejectedValue({})
    const { getByRole, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByRole('textbox', { name: 'Username' }), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => expect(submitRequest).toHaveBeenCalledTimes(1))
    expect(console.error).toHaveBeenCalledTimes(1)

    console.error = error
  })
})
