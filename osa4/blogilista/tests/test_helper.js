const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}