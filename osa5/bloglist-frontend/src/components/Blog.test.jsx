import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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