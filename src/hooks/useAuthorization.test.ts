import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { MemoryRouter } from 'react-router-dom'
import useAuthorization from 'src/hooks/useAuthorization'
import { service } from 'src/services'
import StorageUtil from 'src/utils/storage.util'

jest.mock('src/services')

describe('# Authorization Context', () => {
  const mockSetSecurityData = service.setSecurityData as jest.Mock
  const mockRetrieveProfile = service.user.profile as jest.Mock

  it('should got auth with null when init state', async () => {
    const { result } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })

    expect(result.current.profile).toBeNull()
  })

  it('should jump to login page when token not exist', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue(null)

    renderHook(() => useAuthorization(), { wrapper: MemoryRouter })

    await waitFor(() => expect(mockSetSecurityData).toBeCalledWith(null))
  })

  it('should retrieve userProfile API when load context', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ status: 200, data: { username: 'foo' } })

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    await waitForNextUpdate()

    expect(result.current.profile).toEqual({ username: 'foo' })
  })

  it('should redirect to login page when token is invalid', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockRejectedValue({ response: { status: 401 } })

    const { waitForNextUpdate } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    await waitForNextUpdate()

    await waitFor(() => expect(mockSetSecurityData).toBeCalledWith(null))
  })

  it('should return correct loading state when retrieve API', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()
    expect(result.current.loading).toBeFalsy()
  })

  it('should set localstorage when call mount authorization', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.mountAuthorization({ id: 1, token: 'token' } as any)
    })

    expect(mockSetSecurityData).toBeCalledWith('token')
  })

  it('should remove localStorage when call unmount authorization', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.unmountAuthorization()
    })

    expect(mockSetSecurityData).toBeCalledWith(null)
  })
})
