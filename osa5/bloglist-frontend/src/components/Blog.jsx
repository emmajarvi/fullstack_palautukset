import Togglable from "./Toggalble"
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs(prevBlogs =>
      prevBlogs.map(b => {
        if (b.id === blog.id) {
          return returnedBlog
        }
        return b
      })
    )
  }

  return (
    <div style={blogStyle}>
      <p style={{ fontWeight: 'bold' }}>{blog.title}</p>
      <Togglable buttonLabel='näytä tiedot'>
        <div>
          {blog.url} 
          <br/>
          tykkäyksiä: {blog.likes} {' '}
          <button onClick={handleLike}>tykkää</button>
          <br/>
          {blog.author}
        </div>
        <br/>
      </Togglable>
    </div>
  )
}

export default Blog