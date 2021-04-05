import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { service } from 'src/services'
import ArticleEditPage from './ArticleEditPage'

const mockToast = jest.fn()
jest.mock('src/contexts/toast/toast.context', () => () => mockToast)

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}))

describe('# ArticleEditPage', () => {
  const mockUseParams = useParams as jest.Mock
  const mockCreateRequest = jest.spyOn(service.article, 'createArticle')
  const mockRetrieveTags = jest.spyOn(service.tag, 'retrieveTags')

  beforeEach(async () => {
    mockUseParams.mockReturnValue({ id: '1' })
    mockRetrieveTags.mockResolvedValue({ status: 200, data: { items: [], meta: {} } } as AxiosResponse)
    mockCreateRequest.mockResolvedValue({ status: 201, data: { id: 1 } } as any)

    render(<ArticleEditPage />)
    await waitFor(() => expect(mockRetrieveTags).toBeCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Edit Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toBeCalledWith(-1)
  })

  it('should not trigger onSubmit when submit a empty form', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(mockCreateRequest).not.toBeCalled()
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockCreateRequest).toBeCalledWith({ title: 'article title', tags: [], content: '' }, undefined))
  })
})
