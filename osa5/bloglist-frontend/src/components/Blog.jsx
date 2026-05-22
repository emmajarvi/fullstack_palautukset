import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setMessage, user }) => {
  const [visible, setVisible] = useState(false)

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

  const handleRemove = () => {
    
    if (window.confirm(`Poista ${blog.title} ?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setMessage(
            `${blog.title} poistettu`)
            
          setTimeout(() => {
          setMessage(null)}, 5000)

          setBlogs(prevBlogs => prevBlogs.filter(n => n.id !== blog.id))
        })
        .catch(() => {
          alert(
            `${blog.title} poistaminen ei onnistunut`
          )
        })

    } else return;
  }

  return (
    <div style={blogStyle}>
      <p style={{ fontWeight: 'bold', color: 'coral'}}>
        {blog.title} {' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'piilota' : 'näytä tiedot'}
        </button>
      </p>
      {visible && (
        <div>
          {blog.url}
          <br/>
          tykkäyksiä: {blog.likes} {' '}
          <button onClick={handleLike}>tykkää</button>
          <br/>
          {blog.author}
          <br/>
          {user && blog.user && user.username === (blog.user.username || blog.user) && (
            <button onClick={handleRemove}>poista</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
