import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        <>
          <h2>Login</h2>
          <LoginForm
            setUsername={setUsername} 
            setPassword={setPassword}
            setErrorMessage={setErrorMessage}
            setMessage={setMessage}
            setUser={setUser}
            username={username}
            password={password}
          />
        </>
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
          {blogs.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
            />
          )}
          <h2>Lisää uusi blogi</h2>
          <BlogForm
              setErrorMessage={setErrorMessage}
              setMessage={setMessage}
              setBlogs={setBlogs}
          />
        </div>
      )}
    </div>
  )
}

export default App