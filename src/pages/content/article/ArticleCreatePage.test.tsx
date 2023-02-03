import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { service } from 'src/services'
import { Mock } from 'vitest'
import ArticleCreatePage from './ArticleCreatePage'

const mockToast = vi.fn()
vi.mock('src/contexts/toast/toast.context', () => ({
  default: () => mockToast,
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: vi.fn(),
}))

describe('# ArticleCreatePage', () => {
  const mockUseParams = useParams as Mock
  const mockCreateRequest = vi.spyOn(service.article, 'createArticle')
  const mockRetrieveTags = vi.spyOn(service.tag, 'retrieveTags')
  const mockRetrieveCategories = vi.spyOn(service.category, 'retrieveRootCategories')

  beforeEach(async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    mockCreateRequest.mockResolvedValue({ status: 201, data: { id: 1 } } as any)
    mockRetrieveTags.mockResolvedValue({ status: 200, data: { items: [], meta: {} } } as AxiosResponse)
    mockRetrieveCategories.mockResolvedValue({ status: 200, data: [] } as AxiosResponse)

    render(<ArticleCreatePage />)
    await waitFor(() => expect(mockRetrieveTags).toHaveBeenCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Create Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should not trigger onSubmit when submit a empty form', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockCreateRequest).toHaveBeenCalledWith({ title: 'article title', tags: [], content: '', categoryId: 1 }))
  })
})
