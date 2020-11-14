/**
 * @desc Health check
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore } from 'src/services'

export const method: Method = 'GET'
export const path = '/api/hello'

interface Params {
  /** name */
  name?: any
}

export function useRetrieveList<T = any> (axiosOption: AxiosRequestConfig = {}) {
  return Hooks.useRetrieveList<T, Params>(path, axiosOption)
}

export function request (
  params: Params,
  axiosOption: AxiosRequestConfig = {},
): Promise<any> {
  return PontCore.fetch({
    url: PontCore.injectPathVariables(path, params),
    method,

    ...axiosOption,
  })
}
