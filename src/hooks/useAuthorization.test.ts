import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { MemoryRouter } from 'react-router-dom'
import useAuthorization from 'src/hooks/useAuthorization'
import { service } from 'src/services'

jest.mock('src/services')

describe('# Authorization Context', () => {
  const mockSetSecurityData = service.setSecurityData as jest.Mock
  const mockRetrieveProfile = service.user.profile as jest.Mock

  it('should got auth with null when init state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    await waitForNextUpdate()

    expect(result.current.profile).toBeNull()
  })

  it('should retrieve userProfile API when load context', async () => {
    mockRetrieveProfile.mockResolvedValue({ status: 200, data: { username: 'foo' } })

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    await waitForNextUpdate()

    expect(result.current.profile).toEqual({ username: 'foo' })
  })

  it('should redirect to login page when token is invalid', async () => {
    mockRetrieveProfile.mockRejectedValue({ response: { status: 401 } })

    const { waitForNextUpdate } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    await waitForNextUpdate()

    await waitFor(() => expect(mockSetSecurityData).toBeCalledWith(null))
  })

  it('should return correct loading state when retrieve API', async () => {
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()
    expect(result.current.loading).toBeFalsy()
  })

  it('should set localstorage when call mount authorization', async () => {
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.mountAuthorization({ id: 1, token: 'token' } as any)
    })

    expect(mockSetSecurityData).toBeCalledWith('token')
  })

  it('should remove localStorage when call unmount authorization', async () => {
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.unmountAuthorization()
    })

    expect(mockSetSecurityData).toBeCalledWith(null)
  })
})
