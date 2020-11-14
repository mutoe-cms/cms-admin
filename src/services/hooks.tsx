/* istanbul ignore file */

import { AxiosError, AxiosRequestConfig, Method } from 'axios'
import React, { useState, useEffect } from 'react'
import { FormRef } from 'src/components/FormRenderer'
import { fieldErrorDecorator, focusErrorField, FormExceptionKey } from 'src/utils/form.util'
import { PontCore } from './pontCore'

interface PaginationRo<T> {
  items: T[]
  meta: defs.PaginationMeta
}

export interface PaginationDto {
  page: number
  limit: number
}

export function useRetrieveList<Entity = any, Params = never> (
  path: string,
  axiosOption: AxiosRequestConfig = {},
) {
  const method = axiosOption?.method || 'GET'
  const [items, setItems] = useState<Entity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [pageMeta, setPageMeta] = useState<defs.PaginationMeta>({
    total: 0,
    limit: 10,
    totalPages: 0,
    currentPage: 1,
  })

  const retrieveList = async (params: Params = {} as any) => {
    try {
      setLoading(true)
      const { meta, items } = await PontCore.fetch<PaginationRo<Entity>>({
        url: PontCore.injectPathVariables(path, params),
        method,
      })
      setItems(items)
      setPageMeta(meta)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    retrieveList()
  }, [])

  return {
    pageMeta,
    items,
    error,
    loading,
    retrieveList,
  }
}

export type FormErrorResponse = Record<string, FormExceptionKey[]>

export function isFormError (error: any): error is AxiosError<FormErrorResponse> {
  return error.response?.status === 422 && error.response.data
}

export function useSubmit<Req = any, Res = any> (formRef: FormRef, method: Method, path: string, params?: any) {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: Req) => {
    const axiosOption: AxiosRequestConfig = { url: PontCore.injectPathVariables(path, params), method, data }
    try {
      setSubmitting(true)
      return await PontCore.fetch<Res>(axiosOption)
    } catch (e) {
      if (formRef && isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, fieldErrorDecorator(field, message)))
        focusErrorField()
      }
      throw e
    } finally {
      setSubmitting(false)
    }
  }

  return {
    submitting,
    onSubmit,
  }
}

