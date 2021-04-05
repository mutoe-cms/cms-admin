import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { isFormError, useSubmit } from './useSubmit'

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
  jest.spyOn(React, 'useRef').mockReturnValue({ current: { setError } })

  it('should call request when call onSubmit method', async () => {
    const request = jest.fn().mockResolvedValue({ status: 200, data: {} })
    const { result } = renderHook(() => useSubmit(request))

    await act(async () => {
      await result.current.submitRequest({ bar: 'baz' })
    })

    expect(request).toBeCalledWith({ bar: 'baz' })
  })

  it('should set form error when API throw 422 error', async () => {
    const request = jest.fn().mockRejectedValue({
      response: {
        status: 422,
        data: {
          username: ['isNotExist'],
        },
      },
    })
    const { result } = renderHook(() => useSubmit(request))

    try {
      await act(async () => {
        await result.current.submitRequest({})
      })
      fail('should throw error here')
    } catch (e) {
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
