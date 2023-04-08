import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { RequestParams } from 'src/services/api'

type RetrieveDetailRequest<Entity = unknown> = (id: number, params?: RequestParams) => Promise<AxiosResponse<Entity>>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useRetrieveDetail <Entity = unknown> (request: RetrieveDetailRequest<Entity>, id: number) {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<Entity>()

  const retrieveDetail = useCallback(async (...retrieveArgs: [RequestParams?]) => {
    try {
      setLoading(true)
      const { data } = await request(id, ...retrieveArgs)
      setDetail(data)
    } catch {
      // TODO: error handling
    } finally {
      setLoading(false)
    }
  }, [id, request])

  useEffect(() => {
    void retrieveDetail()
  }, [retrieveDetail])

  return {
    loading,
    detail,
  }
}
