import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {!user && (
        <>
          <h2>Login</h2>
          <LoginForm 
            handleLogin={handleLogin} 
            setUsername={setUsername} 
            setPassword={setPassword}
            username={username}
            password={password}
          />
        </>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
        />
      )}
    </div>
  )
}

export default App