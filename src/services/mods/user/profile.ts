/**
 * @desc
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore } from 'src/services'

export const method: Method = 'GET'
export const path = '/api/user'

export function useRetrieveList<T = any> (axiosOption: AxiosRequestConfig = {}) {
  return Hooks.useRetrieveList<T>(path, axiosOption)
}

export function request (
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.ProfileRo> {
  return PontCore.fetch({
    url: PontCore.injectPathVariables(path),
    method,

    ...axiosOption,
  })
}
