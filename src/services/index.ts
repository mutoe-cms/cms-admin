import CONFIG from 'src/config'
import { Api } from './api'

export * from './hooks/useSubmit'
export * from './hooks/useRetrieveList'

export const service = new Api<string>({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  securityWorker: token => token
    ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    : {},
})
