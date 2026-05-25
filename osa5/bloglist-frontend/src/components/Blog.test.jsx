import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

test('renders title', () => {
  const blog = {
    title: 'A test blog for testing',
    author: 'example example',
    url: 'example.com',
    likes: 0,
    user: { id: '123', username: 'testuser' }
  }

  render(<Blog blog={blog} setBlogs={() => {}} setMessage={() => {}} user={null} />)

  const element = screen.getByText('A test blog for testing')

  //screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the show more info button renders rest of the blog information',
  async () => {
    const blog = {
      title: 'A test blog for testing',
      author: 'example example',
      url: 'example.com',
      likes: 0,
      user: { id: '123', username: 'testuser' }
    }

    const { container } = render(<Blog blog={blog} setBlogs={() => {}} setMessage={() => {}} user={null} />)

    const user = userEvent.setup()
    const button = screen.getByText('näytä tiedot')
    await user.click(button)

    expect(container).toHaveTextContent('example.com')
    expect(container).toHaveTextContent('example example')
    expect(container).toHaveTextContent('tykkäyksiä: 0')

  }
)

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    id: '1',
    title: 'A test blog for testing',
    author: 'example example',
    url: 'example.com',
    likes: 0,
    user: { id: '123', username: 'testuser' }
  }

  blogService.update.mockResolvedValue({ ...blog, likes: 1 })

  render(<Blog blog={blog} setBlogs={() => {}} setMessage={() => {}} user={null} />)

  const user = userEvent.setup()
  const showButton = screen.getByText('näytä tiedot')
  await user.click(showButton)

  const likeButton = screen.getByText('tykkää')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.update).toHaveBeenCalledTimes(2)
})