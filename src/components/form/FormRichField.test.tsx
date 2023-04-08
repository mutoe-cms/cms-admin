import React from 'react'
import { render } from '@testing-library/react'
import FormRichField from 'src/components/form/FormRichField'

describe('# FormRichField', () => {
  const onChange = vi.fn()

  it('should render correctly', () => {
    const { container } = render(<FormRichField value='' onChange={onChange} />)

    expect(container).toBeInTheDocument()
  })
})
