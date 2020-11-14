/**
 * @desc Create article
 */

import { AxiosRequestConfig, Method } from 'axios'
import { FormRef } from 'src/components/FormRenderer'
import { defs, Hooks, PontCore } from 'src/services'

export const method: Method = 'POST'
export const path = '/api/article'

export function useSubmit (formRef: FormRef = null) {
  return Hooks.useSubmit<defs.CreateArticleDto, defs.ArticleEntity>(
    formRef,
    method,
    path,
  )
}

export function request (
  data: defs.CreateArticleDto,
  axiosOption: AxiosRequestConfig = {},
): Promise<defs.ArticleEntity> {
  return PontCore.fetch({
    url: PontCore.injectPathVariables(path),
    method,
    data,
    ...axiosOption,
  })
}
