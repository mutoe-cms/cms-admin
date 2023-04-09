import React from 'react'
import { render } from '@testing-library/react'
import ListWrapper from './ListWrapper'

describe('# ListWrapper', () => {
  describe('when limit change', () => {
    it.todo('should call retrieve method')
  })

  describe('when page change', () => {
    it.todo('should call retrieve method')
  })

  describe('when loading', () => {
    it('should render placeholder', () => {
      const { getByTestId } = render(<ListWrapper loading />)

      expect(getByTestId('placeholder')).toBeInTheDocument()
    })
  })

  describe('when error', () => {
    it('should display error information and retry button', () => {
      const { getByText, getByRole } = render(<ListWrapper error />)

      expect(getByText(/Something went wrong/)).toBeInTheDocument()
      expect(getByRole('button', { name: 'Retry' })).toBeInTheDocument()
    })

    it.todo('should call retrieve method again when click retry')
  })
})
