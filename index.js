require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
  ]

  const info = (n) => {
    const date = new Date()
    console.log(date)
    return(
        `<div>
          <div>Phonebook has info for ${n} people</div>
          <div>${date.getUTCDate()}.${date.getUTCMonth()+1}.${date.getUTCFullYear()}
              ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}</div>
        </div>`
    )
  }

  app.get('/info', (req, res) => {
    Person.find({}).then(persons => res.send(info(persons.length)))
  })

  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })

  app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
      if(person) {
        res.json(person)
      }
      else {
        res.status(404).end()
      }
    })
  })

  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
      .then(res.status(204).end())
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.name || !body.number) {
      return res.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    if (persons.map(p => p.name).includes(body.name)) {
      return res.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })