import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { MemoryRouter } from 'react-router-dom'
import useAuthorization from 'src/hooks/useAuthorization'
import { API } from 'src/services'
import StorageUtil from 'src/utils/storage.util'

describe('# Authorization Context', () => {
  const mockRequest = jest.spyOn(API.user.profile, 'request')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(StorageUtil.prototype, 'set')
    jest.spyOn(StorageUtil.prototype, 'remove')
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
  })

  it('should got auth with null when init state', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue(null)
    const { result } = renderHook(() => useAuthorization())

    expect(result.current.profile).toBeNull()
  })

  it('should retrieve userProfile API when load context given a localStorage token', async () => {
    mockRequest.mockResolvedValue({ username: 'foo' } as any)

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    expect(result.current.profile).toEqual({ username: 'foo' })
  })

  it('should redirect to login page when token is invalid', async () => {
    mockRequest.mockRejectedValue({})

    act(() => {
      renderHook(() => useAuthorization(), { wrapper: MemoryRouter })
    })

    await waitFor(() => expect(StorageUtil.prototype.remove).toBeCalled())
  })

  it('should return correct loading state when retrieve API', async () => {
    mockRequest.mockResolvedValue({ username: 'foo' } as any)

    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()
    expect(result.current.loading).toBeFalsy()
  })

  it('should set localstorage when call mount authorization', async () => {
    mockRequest.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.mountAuthorization({ id: 1, token: 'token' } as any)
    })

    expect(StorageUtil.prototype.set).toBeCalledWith('token')
  })

  it('should remove localStorage when call unmount authorization', async () => {
    mockRequest.mockResolvedValue({ username: 'foo' } as any)
    const { result, waitForNextUpdate } = renderHook(() => useAuthorization())
    await waitForNextUpdate()

    act(() => {
      result.current.unmountAuthorization()
    })

    expect(StorageUtil.prototype.remove).toBeCalled()
  })
})
