const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testiblogi',
    author: 'Testi Testinen',
    url: 'Esi.merkki.com',
    likes: 2,
  },
  {
    title: 'Testiblogi no.2',
    author: 'Esi Merkkinen',
    url: 'testi.com',
    likes: 4,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'nobody' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => {
    const blogJson = blog.toJSON()
    if (blogJson.user) {
      blogJson.user = blogJson.user.toString()
    }
    return blogJson
  })
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}