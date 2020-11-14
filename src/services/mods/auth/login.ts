/**
 * @desc login
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore } from 'src/services'

export const method: Method = 'POST'
export const path = '/api/auth/login'

export function useSubmit (formRef: FormRef = null) {
  return Hooks.useSubmit<defs.LoginDto, defs.AuthRo>(formRef, method, path)
}

export function request (
  data: defs.LoginDto,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.AuthRo> {
  return PontCore.fetch({
    url: PontCore.injectPathVariables(path),
    method,
    data,
    ...axiosOption,
  })
}
