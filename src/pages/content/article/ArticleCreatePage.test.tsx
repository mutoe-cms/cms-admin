import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { service } from 'src/services'
import ArticleCreatePage from './ArticleCreatePage'

const mockToast = jest.fn()
jest.mock('src/contexts/toast/toast.context', () => () => mockToast)

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}))

describe('# ArticleCreatePage', () => {
  const mockUseParams = useParams as jest.Mock
  const mockCreateRequest = jest.spyOn(service.article, 'createArticle')

  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: 'create' })
  })

  it('should render correctly', () => {
    const { getByText } = render(<ArticleCreatePage />)

    expect(getByText('Create Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    const { getByRole } = render(<ArticleCreatePage />)

    fireEvent.click(getByRole('link', { name: 'Back' }))

    await waitFor(() => expect(mockNavigate).toBeCalledWith(-1))
  })

  it('should not trigger onSubmit when submit a empty form', () => {
    const { getByRole } = render(<ArticleCreatePage />)

    fireEvent.click(getByRole('button', { name: 'Submit' }))

    expect(getByRole('alert')).toBeInTheDocument()
    expect(mockCreateRequest).not.toBeCalled()
  })

  it('should call API when submit a valid form', async () => {
    const { getByRole } = render(<ArticleCreatePage />)

    fireEvent.change(getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockCreateRequest).toBeCalledWith({ title: 'article title', tags: [], content: '' }, undefined))
  })
})
