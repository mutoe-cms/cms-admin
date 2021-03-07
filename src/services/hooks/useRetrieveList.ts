import { AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { PaginationMeta, RequestParams } from 'src/services/api'

interface PaginationRo<T> {
  items: T[]
  meta: PaginationMeta
}

export interface PaginationDto {
  page: number
  limit: number
}

type RetrieveListRequest<Query extends PaginationDto = PaginationDto, Entity = unknown> = (query?: Query, params?: RequestParams) => Promise<AxiosResponse<PaginationRo<Entity>>>

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
      const { meta, items } = (await request(query, params)).data
      setItems(items)
      setPageMeta(meta)
    } catch (e) {
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
