// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import 'src/services'

document.createRange = (): any => ({
  setStart: jest.fn(),
  setEnd: jest.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem')
  jest.spyOn(Storage.prototype, 'getItem')
  jest.spyOn(Storage.prototype, 'removeItem')
})
