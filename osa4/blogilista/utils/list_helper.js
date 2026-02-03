const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 
  ? 0 
  : blogs.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) => {
  const reducer = (prevItem, newItem) => {
    if (prevItem.likes > newItem.likes) return prevItem
    else return newItem
  }

  return blogs.length === 0 
  ? null
  : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  const blogCounts = {}
  let maxAuthor = ''
  let maxBlogs = 0

  blogs.forEach(blog => {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
  })

  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      maxBlogs = blogCounts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}