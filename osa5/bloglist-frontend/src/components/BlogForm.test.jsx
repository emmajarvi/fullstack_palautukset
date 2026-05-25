import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const setBlogs = vi.fn()
  const setMessage = vi.fn()
  const setErrorMessage = vi.fn()
  const blogFormRef = { current: { toggleVisibility: vi.fn() } }

  blogService.create.mockResolvedValue({
    title: 'Testing blog',
    author: 'Test Author',
    url: 'http://test.com'
  })

  render(<BlogForm
    setBlogs={setBlogs}
    setMessage={setMessage}
    setErrorMessage={setErrorMessage}
    blogFormRef={blogFormRef}
  />)

  const titleInput = screen.getByLabelText('otsikko')
  const authorInput = screen.getByLabelText('tekijä')
  const urlInput = screen.getByLabelText('url')
  const sendButton = screen.getByText('lisää blogi')

  await user.type(titleInput, 'Testing blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://test.com')
  await user.click(sendButton)

  expect(blogService.create).toHaveBeenCalledTimes(1)
  expect(blogService.create).toHaveBeenCalledWith({
    title: 'Testing blog',
    author: 'Test Author',
    url: 'http://test.com'
  })
})