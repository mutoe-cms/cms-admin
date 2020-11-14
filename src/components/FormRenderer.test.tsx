import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import FormRenderer, { FieldConfig } from 'src/components/FormRenderer'
import { ERROR_MESSAGE } from 'src/constants/message'

describe('# Form Renderer Component', () => {
  let fields: Array<FieldConfig<string>>
  let container: HTMLElement
  let username: HTMLInputElement
  let password: HTMLInputElement
  let form: HTMLFormElement

  const onSubmit = jest.fn()
  const submitText = 'SubmitText'

  beforeEach(() => {
    fields = [
      {
        type: 'input',
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        required: true,
      }, {
        type: 'password',
        name: 'password',
        label: 'Username',
        placeholder: 'Password',
      },
    ]
    container = render(<FormRenderer fields={fields} onSubmit={onSubmit} submitText={submitText} />).container
    username = screen.getByPlaceholderText('Username') as HTMLInputElement
    password = screen.getByPlaceholderText('Password') as HTMLInputElement
    form = screen.getByTestId('form') as HTMLFormElement
  })

  describe('common feature', () => {
    it('should display required error when submit an empty form given a required field', () => {
      fireEvent.submit(form)

      waitFor(() => expect(screen.getAllByText(ERROR_MESSAGE.REQUIRED('Username'))).toHaveLength(1))
    })

    it('should display required error when blur given a required field', () => {
      fireEvent.blur(username)

      waitFor(() => expect(container).toHaveTextContent(ERROR_MESSAGE.REQUIRED('Username')))
    })

    it('should clear error message when change field', async () => {
      fireEvent.blur(username)
      await waitFor(() => expect(container).toHaveTextContent(ERROR_MESSAGE.REQUIRED('Username')))

      fireEvent.change(username, { target: { value: 'foo' } })

      return waitFor(() => expect(screen.queryAllByText(ERROR_MESSAGE.REQUIRED('Username'))).toHaveLength(0))
    })

    it('should call props.onSubmit when submit a valid form', () => {
      fireEvent.change(username, { target: { value: 'foo' } })
      fireEvent.change(password, { target: { value: 'bar' } })

      fireEvent.submit(form)

      expect(onSubmit).toBeCalledWith({ username: 'foo', password: 'bar' })
    })

    it('should render submit text passed in correctly', () => {
      expect(screen.queryByText(submitText)).toBeTruthy()
    })

    it('should render nothing when passed in invalid field type', () => {
      const invalidFields = [{ type: 'foo', name: 'foo' }] as unknown as Array<FieldConfig<'foo'>>

      const { container } = render(<FormRenderer fields={invalidFields} />)

      expect(container.querySelectorAll('.field')).toHaveLength(1)
    })
  })

  describe('input field', () => {
    it('should render text or password field correctly', () => {
      expect(username.tagName).toBe('INPUT')
      expect(username.type).toBe('text')
      expect(password.type).toBe('password')
    })
  })
})
