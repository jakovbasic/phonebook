const express = require('express')
const app = express()

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
    res.send(info(persons.length))
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})