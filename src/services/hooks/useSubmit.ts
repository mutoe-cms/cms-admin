import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import { FormRef } from 'src/components/FormRenderer'
import { RequestParams } from 'src/services/api'
import { fieldErrorDecorator, focusErrorField, FormExceptionKey } from 'src/utils/form.util'

export type FormErrorResponse = Record<string, FormExceptionKey[]>

export function isFormError (error: any): error is AxiosError<FormErrorResponse> {
  return error.response?.status === 422 && error.response.data
}

type SubmitRequest<Req = unknown, Res = unknown> = (body: Req, params?: RequestParams) => Promise<AxiosResponse<Res>>

export function useSubmit<Req = unknown, Res = unknown> (formRef: FormRef, request: SubmitRequest<Req, Res>) {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (data: Req, params?: RequestParams): Promise<Res> => {
    try {
      setSubmitting(true)
      return (await request(data, params)).data
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
