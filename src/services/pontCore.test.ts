import { PontCore } from 'src/services/pontCore'
import axios from 'src/utils/axios'
import StorageUtil from 'src/utils/storage.util'

describe('# fetch', () => {
  it('should set authorization header when call fetch given localStorage has token', async () => {
    jest.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    jest.spyOn(axios, 'request').mockResolvedValue({})

    await PontCore.fetch({})

    expect(axios.request).toBeCalledWith({
      headers: { Authorization: 'Bearer token' },
    })
  })
})

describe('# injectPathVariables', () => {
  const { warn } = console

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete console.warn
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.warn = warn
  })

  it('should inject provided path variables', () => {
    const templateUrl = '/api/v1/content/{pageId}/{cat}'

    const url = PontCore.injectPathVariables(templateUrl, {
      pageId: 'verifyDocuments',
      cat: 'feedback',
    })

    expect(url).toEqual('/api/v1/content/verifyDocuments/feedback')
  })

  it('should return original url if no variables provided', () => {
    const templateUrl = '/api/v1/{answer}'

    const url = PontCore.injectPathVariables(templateUrl)

    expect(url).toEqual('/api/v1/{answer}')
    expect(console.warn).toBeCalled()
  })

  it('should receive query parameters', () => {
    const templateUrl = '/api/v1/{answer}'

    const url = PontCore.injectPathVariables(templateUrl, {
      answer: 'foo',
      pageNumber: 1,
      pageSize: 25,
      status: ['bar', 'baz'],
      users: [1, 2],
      other: [],
    })

    expect(url).toEqual('/api/v1/foo?pageNumber=1&pageSize=25&status=bar,baz&users=1,2')
  })
})
