import React from 'react'
import { render } from '@testing-library/react'
import ListWrapper from './ListWrapper'

describe('# ListWrapper', () => {
  it('should render correctly', () => {
    const { container } = render(<ListWrapper />)

    expect(container).toBeInTheDocument()
  })
})
