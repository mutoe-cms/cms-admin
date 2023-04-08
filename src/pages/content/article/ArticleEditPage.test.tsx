import React from 'react'
import { useParams } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import { Mock } from 'vitest'
import { tagFixture } from 'src/fixtures'
import { service } from 'src/services'
import { ArticleEntity } from 'src/services/api'
import ArticleEditPage from './ArticleEditPage'

vi.mock('src/contexts/toast/toast.context', () => () => ({ success: vi.fn(), error: vi.fn() }))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: vi.fn(),
}))

describe('# ArticleEditPage', () => {
  const mockUseParams = useParams as Mock
  const mockUpdateRequest = vi.spyOn(service.article, 'updateArticle')
  const mockRetrieveArticle = vi.spyOn(service.article, 'retrieveArticle')
  const mockRetrieveTags = vi.spyOn(service.tag, 'retrieveTags')
  const mockRetrieveCategories = vi.spyOn(service.category, 'retrieveRootCategories')

  beforeEach(async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    mockUpdateRequest.mockResolvedValue({ status: 200, data: { id: 1 } } as any)
    mockRetrieveArticle.mockResolvedValue({ status: 200, data: { id: 1, title: 'Title', content: '<p>content</p>', tags: [tagFixture.entity] } as ArticleEntity } as AxiosResponse)
    mockRetrieveTags.mockResolvedValue({ status: 200, data: { items: [], meta: {} } } as AxiosResponse)
    mockRetrieveCategories.mockResolvedValue({ status: 200, data: [] } as AxiosResponse)

    render(<ArticleEditPage />)

    await waitFor(() => expect(mockRetrieveArticle).toHaveBeenCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Edit Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockUpdateRequest).toHaveBeenCalledWith(1, { title: 'article title', tags: ['semantic-ui'], content: '<p>content</p>', categoryId: Number.NaN }))
  })
})
