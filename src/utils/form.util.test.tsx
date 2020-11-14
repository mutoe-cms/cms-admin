import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { focusErrorField, sentence } from 'src/utils/form.util'

describe('# focus error field util', () => {
  const Wrapper: React.FC = () => (<div className='error field'>
    <input type='text' data-testid='input' />
  </div>)

  it('should focus on first error field input', () => {
    const { getByTestId } = render(<Wrapper />)
    focusErrorField()

    return waitFor(() => expect(document.activeElement).toEqual(getByTestId('input')))
  })
})

describe('# sentence', () => {
  it('should convert camelCase text to sentence', () => {
    const text = 'userName is Invalid'
    expect(sentence(text)).toBe('User name is invalid')
  })

  it('should keep special chars exist', () => {
    const text = 'userName is invalid (max value is 5)'
    expect(sentence(text)).toBe('User name is invalid (max value is 5)')
  })
})
