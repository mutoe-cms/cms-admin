import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization/authorization.context'
import { routeMap } from 'src/route'
import { useSubmit } from 'src/services'
import { ProfileRo } from 'src/services/api'
import LoginPage from './LoginPage'

jest.mock('src/contexts/authorization/authorization.context')
jest.mock('src/services')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('# Login page', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as jest.MockedFunction<typeof useAuthorizationContext>
  const mockMountAuthorization = jest.fn()
  const submitRequest = jest.fn()
  const mockUseSubmit = useSubmit as jest.MockedFunction<typeof useSubmit>

  const loginFormFixture = {
    username: 'admin',
    password: '123456',
  }

  beforeEach(() => {
    mockUseAuthorizationContext.mockReturnValue({
      profile: null,
      loading: false,
      mountAuthorization: mockMountAuthorization,
      unmountAuthorization: jest.fn(),
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
      unmountAuthorization: jest.fn(),
    })

    render(<LoginPage />)

    expect(mockNavigate).toBeCalledWith(routeMap.home, { replace: true })
  })

  it('should jump to home page when submit a valid form', async () => {
    submitRequest.mockResolvedValue({ username: 'invalid', token: 'token' })
    const { getByRole, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByRole('textbox', { name: 'Username' }), { target: { value: loginFormFixture.username } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: loginFormFixture.password } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => expect(submitRequest).toBeCalledWith(loginFormFixture))
    expect(mockMountAuthorization).toBeCalledWith({ username: 'invalid', token: 'token' })
    expect(mockNavigate).toBeCalledWith(routeMap.home, { replace: true })
  })

  it('should display server validation error message when submit exist username form', async () => {
    const { error } = console
    // eslint-disable-next-line no-console
    console.error = jest.fn()

    submitRequest.mockRejectedValue({})
    const { getByRole, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByRole('textbox', { name: 'Username' }), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => expect(submitRequest).toBeCalledTimes(1))
    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledTimes(1)

    // eslint-disable-next-line no-console
    console.error = error
  })
})
