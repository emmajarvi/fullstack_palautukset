const assert = require('node:assert')
const { test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert(titles.includes('Testiblogi'))
})

after(async () => {
  await mongoose.connection.close()
})