/* eslint-disable @typescript-eslint/no-explicit-any */

import { Axios, AxiosRequestConfig } from 'axios'
import { afterEach, expect, vi } from 'vitest'
import * as matchers from 'vitest-dom/matchers'

import 'vitest-dom/extend-expect'

expect.extend(matchers)

vi.mock('axios', async () => {
  const actual = await vi.importActual<typeof Axios>('axios')
  return {
    ...actual,
    create: () => ({
      defaults: {},
      request: vi.fn().mockImplementation(({ method, url }: AxiosRequestConfig) => {
        throw new Error(`You should mock the request '${method} ${url}'`)
      }),
    }),
  }
})

document.createRange = (): Range => ({
  setStart: vi.fn(),
  setEnd: vi.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
}) as any

afterEach(() => {
  vi.clearAllMocks()
})
