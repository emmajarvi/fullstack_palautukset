const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return(String(id))
}


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
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})