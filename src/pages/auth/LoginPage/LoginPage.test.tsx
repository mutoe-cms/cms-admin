import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import useAuthorizationContext from 'src/contexts/authorization.context'
import { defs } from 'src/services'
import axios from 'src/utils/axios'
import { FormExceptionKey } from 'src/utils/form.util'
import LoginPage from './LoginPage'

const mockReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: mockReplace,
  }),
}))

jest.mock('src/contexts/authorization.context')

describe('# Login page', () => {
  const mockUseAuthorizationContext = useAuthorizationContext as jest.MockedFunction<typeof useAuthorizationContext>
  const mockMountAuthorization = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseAuthorizationContext.mockReturnValue({
      profile: null,
      loading: false,
      mountAuthorization: mockMountAuthorization,
      unmountAuthorization: jest.fn(),
    })
  })

  it('should render correctly', () => {
    const { container } = render(<LoginPage />)

    expect(container).toBeInTheDocument()
  })

  it('should redirect to home page when user is already logged in', () => {
    mockUseAuthorizationContext.mockReturnValue({
      profile: { username: 'admin' } as defs.ProfileRo,
      loading: false,
      mountAuthorization: mockMountAuthorization,
      unmountAuthorization: jest.fn(),
    })

    render(<LoginPage />)

    expect(mockReplace).toBeCalledWith('/')
  })

  it('should jump to home page when submit a valid form', async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({
      username: 'invalid',
      token: 'token',
    })
    const { getByTestId, getByPlaceholderText } = render(<LoginPage />)

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    await waitFor(() => expect(axios.request).toBeCalledWith({
      method: 'POST',
      url: '/api/auth/login',
      data: { username: 'admin', password: '123456' },
    }))
    expect(mockMountAuthorization).toBeCalledWith({ username: 'invalid', token: 'token' })
    expect(mockReplace).toBeCalledWith('/')
  })

  it('should display server validation error message when submit exist username form', async () => {
    jest.spyOn(axios, 'request').mockRejectedValue({
      response: {
        status: 422,
        data: {
          username: ['isInvalid'] as FormExceptionKey[],
        },
      },
    })
    const { getByTestId, getByPlaceholderText, getByText } = render(<LoginPage />)

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'admin' } })
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123456' } })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    await waitFor(() => expect(axios.request).toBeCalledTimes(1))
    await waitFor(() => expect(getByText('Username is invalid')).toBeInTheDocument())
    expect(document.activeElement).toBe(getByPlaceholderText('Username'))
  })
})
