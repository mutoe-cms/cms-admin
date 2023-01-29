/* eslint-disable @typescript-eslint/no-explicit-any */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { AxiosRequestConfig } from 'axios'

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  create: () => ({
    defaults: {},
    request: jest.fn().mockImplementation(({ method, url }: AxiosRequestConfig) => {
      throw new Error(`You should mock the request '${method} ${url}'`)
    }),
  }),
}))

document.createRange = (): Range => ({
  setStart: jest.fn(),
  setEnd: jest.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
}) as any

afterEach(() => {
  jest.clearAllMocks()
})
