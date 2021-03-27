import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { service } from 'src/services'
import ArticleEditPage from './ArticleEditPage'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}))

describe('# ArticleEditPage', () => {
  const mockUseParams = useParams as jest.Mock
  const mockRequest = jest.spyOn(service.article, 'createArticle')

  describe('create', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: 'create' })
    })

    it('should render correctly', () => {
      const { getByText } = render(<ArticleEditPage />)

      expect(getByText('Create Article')).toBeInTheDocument()
    })

    it('should navigate to previous page when click back button', () => {
      const { getByRole } = render(<ArticleEditPage />)

      fireEvent.click(getByRole('link', { name: 'Back' }))

      expect(mockNavigate).toBeCalledWith(-1)
    })

    it('should not trigger onSubmit when submit a empty form', () => {
      const { getByRole } = render(<ArticleEditPage />)

      fireEvent.click(getByRole('button', { name: 'Submit' }))

      expect(getByRole('alert')).toBeInTheDocument()
      expect(mockRequest).not.toBeCalled()
    })
  })

  describe('edit', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({ id: '1' })
    })

    it('should render correctly', () => {
      const { getByText } = render(<ArticleEditPage />)

      expect(getByText('Edit Article')).toBeInTheDocument()
    })

    it.todo('should prefill data when page loaded')

    it.todo('should toast success when submit a valid form')

    it.todo('should toast error when submit a invalid form')
  })
})
