import React, { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormRef } from 'src/components/form/FormRenderer'
import { RequestParams } from 'src/services/api'
import { FormExceptionKey, fieldErrorDecorator, focusErrorField } from 'src/utils/form.util'

export type FormErrorResponse = Record<string, FormExceptionKey[]>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isFormError (error: any): error is AxiosError<FormErrorResponse> {
  return error.response?.status === 422 && error.response.data
}

type SubmitRequest<Req = unknown, Res = unknown> = (body: Req, params?: RequestParams) => Promise<AxiosResponse<Res>>
type SubmitRequestWithId<Req = unknown, Res = unknown> = (id: number, body: Req, params?: RequestParams) => Promise<AxiosResponse<Res>>

interface UseSubmitReturnType<ReqArgs extends unknown[], Res> {
  formRef: FormRef
  submitting: boolean
  submitRequest: (...args: ReqArgs) => Promise<Res>
}

export function useSubmit<Req = unknown, Res = unknown> (request: SubmitRequest<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequest<Req>>, Res>
export function useSubmit<Req = unknown, Res = unknown> (request: SubmitRequestWithId<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequestWithId<Req>>, Res>
export function useSubmit<Req = unknown, Res = unknown> (request: SubmitRequest<Req, Res> | SubmitRequestWithId<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequestWithId | SubmitRequest>, Res> {
  const formRef: FormRef = React.useRef(null)
  const [submitting, setSubmitting] = useState(false)

  const submitRequest = async (...args: unknown[]): Promise<Res> => {
    try {
      setSubmitting(true)
      const response = await (request as any)(...args)
      return response.data
    } catch (error) {
      if (formRef.current && isFormError(error)) {
        for (const [field, message] of Object.entries(error.response?.data ?? {})) formRef.current?.setError(field, fieldErrorDecorator(field, message))
        focusErrorField()
      } else {
        // eslint-disable-next-line no-console
        console.error(error)
      }
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  return {
    formRef,
    submitting,
    submitRequest,
  }
}
