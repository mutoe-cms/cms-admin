import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { tagFixture } from 'src/fixtures'
import { service } from 'src/services'
import { ArticleEntity } from 'src/services/api'
import ArticleEditPage from './ArticleEditPage'

jest.mock('src/contexts/toast/toast.context', () => () => ({ success: jest.fn(), error: jest.fn() }))

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}))

describe('# ArticleEditPage', () => {
  const mockUseParams = useParams as jest.Mock
  const mockUpdateRequest = jest.spyOn(service.article, 'updateArticle')
  const mockRetrieveTags = jest.spyOn(service.tag, 'retrieveTags')
  const mockRetrieveArticle = jest.spyOn(service.article, 'retrieveArticle')

  beforeEach(async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    mockRetrieveTags.mockResolvedValue({ status: 200, data: { items: [], meta: {} } } as AxiosResponse)
    mockUpdateRequest.mockResolvedValue({ status: 200, data: { id: 1 } } as any)
    mockRetrieveArticle.mockResolvedValue({ status: 200, data: { id: 1, title: 'Title', content: '<p>content</p>', tags: [tagFixture.entity] } as ArticleEntity } as AxiosResponse)

    render(<ArticleEditPage />)
    await waitFor(() => expect(mockRetrieveArticle).toBeCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Edit Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toBeCalledWith(-1)
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockUpdateRequest).toBeCalledWith(1, { title: 'article title', tags: ['semantic-ui'], content: '<p>content</p>' }))
  })
})
