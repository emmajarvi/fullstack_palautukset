import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import './index.css'
import Togglable from './components/Toggalble'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>Blogilista</h1>
      <ErrorNotification message={errorMessage} />
      <Notification message={message}/>
      {!user && (
        <Togglable buttonLabel='kirjaudu sisään'>
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            setErrorMessage={setErrorMessage}
            setMessage={setMessage}
            setUser={setUser}
            username={username}
            password={password}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>Kirjautunut käyttäjä: {user.name}</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
          }}>
            kirjaudu ulos
          </button>
          <h2>Blogit</h2>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                setMessage={setMessage}
                user={user}
              />
            )
          }
          <Togglable buttonLabel='lisää uusi blogi' ref={blogFormRef}>
            <BlogForm
              setErrorMessage={setErrorMessage}
              setMessage={setMessage}
              setBlogs={setBlogs}
              blogFormRef={blogFormRef}
            />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App