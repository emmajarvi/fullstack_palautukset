 import loginService from '../services/login'
 import blogService from '../services/blogs'
 import '../index.css'

 const LoginForm = (props) => {
    
    const {setUsername, setPassword, username, password, setUser, setErrorMessage} = props
    
    const handleLogin = async event => {
      event.preventDefault()
      console.log('logging in with', username, password)
      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
  
        console.log(user)
      } catch {
        setErrorMessage('väärä käyttäjänimi tai salasana')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username {' '}
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password {' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
    )
  }

  export default LoginForm