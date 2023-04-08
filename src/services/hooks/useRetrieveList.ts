import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { PaginationMeta, RequestParams } from 'src/services/api'

export interface PaginationRo<T> {
  items: T[]
  meta: PaginationMeta
}

export interface PaginationDto {
  page: number
  limit: number
}

type RetrieveListRequest<Query extends PaginationDto = PaginationDto, Entity = unknown> = (query?: Query, params?: RequestParams) => Promise<AxiosResponse<PaginationRo<Entity>>>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useRetrieveList<Query extends PaginationDto = PaginationDto, Entity = unknown> (request: RetrieveListRequest<Query, Entity>) {
  const [items, setItems] = useState<Entity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [pageMeta, setPageMeta] = useState<PaginationMeta>({
    total: 0,
    limit: 10,
    totalPages: 0,
    currentPage: 1,
  })

  const retrieveList = useCallback(async (query?: Query, params?: RequestParams): Promise<void> => {
    try {
      setLoading(true)
      const response = await request(query, params)
      const { meta, items } = response.data
      setItems(items)
      setPageMeta(meta)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [request])

  useEffect(() => {
    void retrieveList()
  }, [retrieveList])

  return {
    pageMeta,
    items,
    error,
    loading,
    retrieveList,
  }
}
