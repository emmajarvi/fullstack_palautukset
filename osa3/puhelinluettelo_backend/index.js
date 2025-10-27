require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('body', req  => {
    return JSON.stringify(req.body)
})

var logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.static('dist'))
app.use(express.json())
app.use(logger)

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo</h1>')
})
  
app.get('/api/persons', (request, response) => {

    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name & !body.number) {
        return response.status(400).json({ 
          error: 'name and number missing' 
        })
    }

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
      })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
      console.log(error.response.data)
    })
    
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  
  Person.findById(request.params.id)
  .then(person => {
    if (!person) {
      return response.status(404).end()
    }

    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
  })
  .catch((error) => next(error))
})

app.get('/info', (request, response) => {

  Person.find({}).then( persons => {
    const maara = persons.length
    const pvm = new Date()

    response.send(
       `Phonebook has info for ${maara} people <br><br> 
       ${pvm}`
    )
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name == 'NotFound') {
    return response.status(404).send({ error: 'unknown endpoint' })
  }

  next(error)
}

app.use(errorHandler)
