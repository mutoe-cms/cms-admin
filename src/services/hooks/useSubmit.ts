import { AxiosError, AxiosResponse } from 'axios'
import { useRef, useState } from 'react'
import { FormRef } from 'src/components/form/FormRenderer'
import { RequestParams } from 'src/services/api'
import { fieldErrorDecorator, focusErrorField, FormExceptionKey } from 'src/utils/form.util'

export type FormErrorResponse = Record<string, FormExceptionKey[]>

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
export function useSubmit<Req = unknown, Res = unknown> (request: SubmitRequest<Req, Res> | SubmitRequestWithId<Req, Res>) {
  const formRef: FormRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)

  const submitRequest = async (...args: unknown[]): Promise<Res> => {
    try {
      setSubmitting(true)
      return (await (request as any)(...args)).data
    } catch (e) {
      if (formRef.current && isFormError(e)) {
        Object.entries(e.response?.data ?? {})
          .forEach(([field, message]) => formRef.current?.setError(field, fieldErrorDecorator(field, message)))
        focusErrorField()
      } else {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      throw e
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
