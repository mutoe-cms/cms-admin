import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import FormRenderer, { FieldConfig } from 'src/components/form/FormRenderer'
import { ERROR_MESSAGE } from 'src/constants/message'

describe('# Form Renderer Component', () => {
  let fields: FieldConfig<string>[]
  let container: HTMLElement
  let username: HTMLInputElement
  let password: HTMLInputElement
  let select: HTMLDivElement
  let richEditor: HTMLTextAreaElement
  let form: HTMLFormElement

  const onSubmit = vi.fn()
  const submitText = 'SubmitText'

  beforeEach(() => {
    fields = [
      {
        type: 'text',
        name: 'username',
        label: 'Username',
        placeholder: 'Username',
        required: true,
      }, {
        type: 'password',
        name: 'password',
        label: 'Username',
        placeholder: 'Password',
      }, {
        type: 'select',
        name: 'select',
        label: 'Select',
        options: [{ text: 'Foo', value: 'foo' }],
      }, {
        type: 'rich',
        name: 'rich',
        label: 'Rich text editor',
        placeholder: 'rich',
      },
    ]

    act(() => {
      ({ container } = render(<FormRenderer fields={fields} submitText={submitText} onSubmit={onSubmit} />))
      username = screen.getByRole('textbox', { name: 'Username' }) as HTMLInputElement
      password = screen.getByPlaceholderText('Password') as HTMLInputElement
      select = screen.getByRole('combobox', { name: 'Select' }) as HTMLDivElement
      richEditor = container.querySelector('.ql-editor') as HTMLTextAreaElement
      form = screen.getByTestId('form') as HTMLFormElement
    })
  })

  describe.skip('common feature', () => {
    it('should display required error when submit an empty form given a required field', async () => {
      act(() => {
        fireEvent.submit(form)
      })

      await waitFor(() => expect(screen.getAllByText(ERROR_MESSAGE.REQUIRED('Username'))).toHaveLength(1))
    })

    it('should display required error when blur given a required field', async () => {
      fireEvent.blur(username)

      await waitFor(() => expect(container).toHaveTextContent(ERROR_MESSAGE.REQUIRED('Username')))
    })

    it('should clear error message when change field', async () => {
      fireEvent.blur(username)
      await waitFor(() => expect(container).toHaveTextContent(ERROR_MESSAGE.REQUIRED('Username')))

      fireEvent.change(username, { target: { value: 'foo' } })

      await waitFor(() => expect(screen.queryAllByText(ERROR_MESSAGE.REQUIRED('Username'))).toHaveLength(0))
    })

    it('should call props.onSubmit when submit a valid form', async () => {
      fireEvent.change(username, { target: { value: 'foo' } })
      fireEvent.change(password, { target: { value: 'bar' } })

      fireEvent.submit(form)

      await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ username: 'foo', password: 'bar' }))
    })

    it('should render submit text passed in correctly', () => {
      expect(screen.queryByText(submitText)).toBeTruthy()
    })

    it('should render nothing when passed in invalid field type', () => {
      const invalidFields = [{ type: 'foo', name: 'foo' }] as unknown as FieldConfig<'foo'>[]

      act(() => {
        ({ container } = render(<FormRenderer fields={invalidFields} />))
      })

      expect(container.querySelectorAll('.field')).toHaveLength(1)
    })
  })

  describe('input field', () => {
    it.skip('should render text or password field correctly', () => {
      expect(username.tagName).toBe('INPUT')
      expect(username.type).toBe('text')
      expect(password.type).toBe('password')
    })
  })

  describe.skip('single select field', () => {
    it('should render field correctly', () => {
      expect(select).toBeInTheDocument()
    })
  })

  describe.skip('rich field', () => {
    it('should render field correctly', () => {
      expect(richEditor).toBeInTheDocument()
    })
  })
})
