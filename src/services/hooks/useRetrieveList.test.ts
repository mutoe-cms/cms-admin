import { act, renderHook } from '@testing-library/react-hooks'
import { PaginationRo, useRetrieveList } from './useRetrieveList'

describe('# useRetrieveList', () => {
  it('should call request when call retrieveList method', async () => {
    const items = [1, 2, 3]
    const request = jest.fn().mockResolvedValue({
      status: 200,
      data: {
        items,
        meta: { currentPage: 1, limit: 15, total: 10, totalPages: 1 },
      } as PaginationRo<number>,
    })
    const { result } = renderHook(() => useRetrieveList(request))

    expect(result.current.loading).toBe(true)

    await act(async () => {
      await result.current.retrieveList({ bar: 'baz' })
    })

    expect(result.current.loading).toBe(false)
    expect(request).toBeCalledWith({ bar: 'baz' }, undefined)
    expect(result.current.items).toEqual(items)
  })

  it('should display error when request failed', async () => {
    const request = jest.fn().mockRejectedValue({
      response: { status: 500 },
    })

    const { result, waitForNextUpdate } = renderHook(() => useRetrieveList(request))
    await waitForNextUpdate()

    expect(result.current.error).toBe(true)
  })
})
