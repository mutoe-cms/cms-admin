import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { authorizationTokenStorage } from 'src/hooks/useAuthorization'
import axios from 'src/utils/axios'

class PontCoreManager {
  static singleInstance = null as unknown as PontCoreManager
  axios: AxiosInstance = null as unknown as AxiosInstance

  constructor () {
    this.axios = axios
  }

  static getSingleInstance (): PontCoreManager {
    if (!PontCoreManager.singleInstance) {
      PontCoreManager.singleInstance = new PontCoreManager()
    }
    return PontCoreManager.singleInstance
  }

  /**
   * axios 请求
   */
  async fetch<T = any> (options: AxiosRequestConfig = {}): Promise<T> {
    const token = authorizationTokenStorage.get()
    if (token) {
      (options.headers ?? (options.headers = {})).Authorization = `Bearer ${token}`
    }

    return await this.axios.request<T, T>(options)
  }

  injectPathVariables (path: string, paramVariables: any = {}) {
    const params = { ...paramVariables }

    const url = path.replace(/{([^\\}]*(?:\\.[^\\}]*)*)}/gm, (match, key: string) => {
      key = key.trim()

      if (params[key] !== undefined) {
        const value = params[key]
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete params[key]
        return value
      }
      console.warn('Please set value for template key: ', key)
      return `{${key}}`
    })

    const paramStr = Object.keys(params)
      .map(key => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return params[key] === undefined || params[key]?.length <= 0 ? '' : `${key}=${params[key]}`
      })
      .filter(id => id)
      .join('&')

    if (paramStr) {
      return `${url}?${paramStr}`
    }

    return url
  }
}

export const PontCore = PontCoreManager.getSingleInstance()
