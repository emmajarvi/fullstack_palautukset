import { useState } from "react"
import blogService from '../services/blogs'

  const BlogForm = (props) => {

    const {setErrorMessage, setBlogs} = props
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async event => {
      event.preventDefault()
      console.log('creating blog')

      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      try {
        const createdBlog = await blogService.create(newBlog)
        setBlogs(prev => prev.concat(createdBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch {
        setErrorMessage('virhe blogin luomisessa')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>
          otsikko {' '}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          tekijä {' '}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url {' '}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">lisää blogi</button>
    </form>
    )
  }

  export default BlogForm