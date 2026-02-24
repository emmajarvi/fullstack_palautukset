const assert = require('node:assert')
const { test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const api = supertest(app)



const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Lisäys testi blogi',
    author: 'Esi Merkkinen',
    url: 'lisataanblogi.fi',
    likes: 67,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Lisäys testi blogi'))
})

test.only('blog with no title is not added', async () => {
  const newBlog = {
    author: 'Maija Meikäläinen',
    url: 'tataeipitaisilisata.fi',
    likes: 69,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('Testiblogi'))
})

after(async () => {
  await mongoose.connection.close()
})

// npm test -- --test-only
// npm test -- tests/blog_api.test.js
// npm run test -- --test-name-pattern="blogs"