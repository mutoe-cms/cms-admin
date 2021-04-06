import { render } from '@testing-library/react'
import React from 'react'
import FormRichField from 'src/components/form/FormRichField'

describe('# FormRichField', () => {
  const onChange = jest.fn()

  it('should render correctly', () => {
    const { container } = render(<FormRichField value="" onChange={onChange} />)

    expect(container).toBeInTheDocument()
  })
})
