import { act, fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { SelectOption } from 'src/components/form/FormRenderer'
import FormSelectField from 'src/components/form/FormSelectField'

const options: SelectOption[] = [
  {
    value: 'semantic-ui',
    text: 'Semantic UI',
  },
]

describe.skip('# FormSelectField', () => {
  const onChange = vi.fn()

  describe('single select', () => {
    it('should render correctly', () => {
      const { getByRole } = render(<FormSelectField value='' onChange={onChange} />)
      expect(getByRole('combobox')).toBeInTheDocument()
    })

    it('should select tag when input an exist tag', () => {
      const { getByRole } = render(<FormSelectField value='' options={options} onChange={onChange} />)

      const inputElement = getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'Semantic UI' } })
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

      expect(onChange).toHaveBeenCalledWith('semantic-ui')
    })

    it('should add options when input a new item', async () => {
      const onAddItem = vi.fn().mockResolvedValue(undefined)
      const { getByRole } = render(<FormSelectField creatable value='' onAddItem={onAddItem} onChange={onChange} />)
      const inputElement = getByRole('textbox')

      act(() => {
        fireEvent.change(inputElement, { target: { value: 'foo' } })
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })
      })

      expect(onChange).toBeCalledWith('foo')
    })
  })

  describe('multiple select', () => {
    it('should render correctly', () => {
      const { getByRole } = render(<FormSelectField multiple value={[]} onChange={onChange} />)
      expect(getByRole('combobox')).toBeInTheDocument()
    })

    it('should select tag when input an exist tag', () => {
      const { getByRole } = render(<FormSelectField multiple value={[]} options={options} onChange={onChange} />)

      const inputElement = getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'Semantic UI' } })
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

      expect(onChange).toHaveBeenCalledWith(['semantic-ui'])
    })

    it('should add options when input a new item', async () => {
      const { getByRole } = render(<FormSelectField creatable multiple value={[]} onChange={onChange} />)
      const inputElement = getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'foo' } })
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

      await waitFor(() => expect(onChange).toHaveBeenCalledWith(['foo']))
    })
  })
})
