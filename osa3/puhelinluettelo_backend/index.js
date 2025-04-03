require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

let persons = [
    {
        id: "1",
        name: "Ada Lovelace",
        number: "00-123-31432"
    },

    {
        id: "2",
        name: "Bilbo Reppuli",
        number: "23-142-186-4235"
    },

    {
        id: "3",
        name: "Chappell Roan",
        number: "12-435-231341"
    },

    {
        id: "4",
        name: "Emma",
        number: "050 123 2122"
    }
]

morgan.token('body', req  => {
    return JSON.stringify(req.body)
})

  
var logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.use(express.json())
app.use(logger)
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo</h1>')
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

app.get('/api/notes/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    const names = persons.map(n => n.name)

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

    if (names.includes(body.name)){
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
    }
  
    const person = new Person({
        name: body.name,
        number: body.number,
      })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    
})



app.get('/info', (request, response) => {

    const maara = persons.length

    const pvm = new Date()

    response.send(
       `Phonebook has info for ${maara} people <br><br> 
       ${pvm}`
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})