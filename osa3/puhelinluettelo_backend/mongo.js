const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster1.fqyg2qr.mongodb.net/?retryWrites=true&w=majority&appName=cluster1`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length  == 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}


if (process.argv.length  < 5) {
    Person.find({ }).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}
