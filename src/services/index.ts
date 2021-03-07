import { Api } from './api'

export * from './hooks/useSubmit'
export * from './hooks/useRetrieveList'

export const service = new Api<string>({
  securityWorker: token => token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {},
})
