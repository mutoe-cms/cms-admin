import { act, renderHook } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { noop } from 'lodash'
import { service } from 'src/services'
import { ArticleEntity } from 'src/services/api'
import { useRetrieveDetail } from 'src/services/hooks/useRetrieveDetail'

describe('# useRetrieveDetail', () => {
  const mockRetrieveArticle = vi.spyOn(service.article, 'retrieveArticle')

  beforeEach(() => {
    mockRetrieveArticle.mockResolvedValue({ status: 200, data: { id: 1 } as ArticleEntity } as AxiosResponse)
  })

  it('should call api when hook loaded', async () => {
    const { result } = renderHook(() => useRetrieveDetail(service.article.retrieveArticle, 1))
    expect(result.current.loading).toEqual(true)

    await act(noop)
    expect(mockRetrieveArticle).toHaveBeenCalledWith(1)
    expect(result.current.detail).toEqual({ id: 1 })
    expect(result.current.loading).toEqual(false)
  })
})
