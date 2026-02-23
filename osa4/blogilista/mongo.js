const Blog = require('./models/blog.js')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.e7osvqp.mongodb.net/testBlogApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const testBlog = new Blog({
  title: 'Testiblogi no. 2',
  author: 'Testi Testinen',
  url: 'Esi.merkki.com',
  likes: 2,
})

testBlog.save().then((result) => {
   console.log('test blog saved!')
   mongoose.connection.close()
})

/*
Blog.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
  */