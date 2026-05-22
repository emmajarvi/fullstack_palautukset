import Togglable from "./Toggalble"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p style={{ fontWeight: 'bold' }}>{blog.title}</p>
      <Togglable buttonLabel='näytä tiedot'>
        <div>
          {blog.url} 
          <br/>
          tykkäyksiä: {blog.likes} {' '}
          <button>tykkää</button>
          <br/>
          {blog.author}
        </div>
        <br/>
      </Togglable>
    </div>
  )
}

export default Blog