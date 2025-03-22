const express = require('express')
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)