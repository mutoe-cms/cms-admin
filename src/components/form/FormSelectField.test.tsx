import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import FormSelectField from 'src/components/form/FormSelectField'

describe('# FormSelectField', () => {
  const onChange = jest.fn()

  describe('single select', () => {
    it('should render correctly', () => {
      const { getByRole } = render(<FormSelectField value="" onChange={onChange} />)
      expect(getByRole('combobox')).toBeInTheDocument()
    })

    it('should add options when input a new item', () => {
      const { getByRole } = render(<FormSelectField creatable value="" onChange={onChange} />)
      const inputElement = getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'foo' } })
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

      expect(onChange).toBeCalledWith('foo')
    })
  })

  describe('multiple select', () => {
    it('should render correctly', () => {
      const { getByRole } = render(<FormSelectField multiple value={[]} onChange={onChange} />)
      expect(getByRole('combobox')).toBeInTheDocument()
    })

    it('should add options when input a new item', () => {
      const { getByRole } = render(<FormSelectField creatable multiple value={[]} onChange={onChange} />)
      const inputElement = getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'foo' } })
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

      expect(onChange).toBeCalledWith(['foo'])
    })
  })
})
