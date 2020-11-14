import { act, renderHook } from '@testing-library/react-hooks'
import { isFormError, useSubmit } from 'src/services/hooks'
import { PontCore } from 'src/services/pontCore'

describe('# isFormError', () => {
  it('should return true when error has data message and status code is 422', () => {
    const error = {
      response: {
        status: 422,
        data: {
          username: ['isInvalid'],
        },
      },
    }

    expect(isFormError(error)).toBeTruthy()
  })

  it('should return false when error is not have status code with 422', () => {
    const error = {
      response: {
        status: 400,
        data: {},
      },
    }

    expect(isFormError(error)).toBeFalsy()
  })
})

describe('# useSubmit', () => {
  const setError = jest.fn()
  const formRef = { current: { setError } }

  afterEach(jest.clearAllMocks)

  it('should call axios request when call onSubmit method', async () => {
    jest.spyOn(PontCore, 'fetch').mockResolvedValue({})
    const { result } = renderHook(() => useSubmit(formRef, 'POST', '/path', { foo: 'bar' }))

    await act(async () => {
      await result.current.onSubmit({ bar: 'baz' })
    })

    expect(PontCore.fetch).toBeCalledWith({
      method: 'POST',
      url: '/path?foo=bar',
      data: {
        bar: 'baz',
      },
    })
  })

  it('should set form error when API throw 422 error', async () => {
    jest.spyOn(PontCore, 'fetch').mockRejectedValue({
      response: {
        status: 422,
        data: {
          username: ['isNotExist'],
        },
      },
    })
    const { result, waitForNextUpdate } = renderHook(() => useSubmit(formRef, 'POST', '/path', { foo: 'bar' }))

    try {
      await act(async () => {
        await result.current.onSubmit({})
      })
    } catch (e) {
      // FIXME: no-conditional-expect
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toEqual({
        response: {
          status: 422,
          data: { username: ['isNotExist'] },
        },
      })
    }

    expect(setError).toBeCalledWith('username', 'username is not exist')
  })
})
