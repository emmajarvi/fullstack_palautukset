import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {

  const { setErrorMessage, setMessage, setBlogs, blogFormRef } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async event => {
    blogFormRef.current.toggleVisibility()
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

      setMessage(`Uusi blogi ${title} tekijältä ${author} luotu`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setErrorMessage('Virhe blogin luomisessa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Lisää uusi blogi</h2>
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
    </div>
  )
}

export default BlogForm