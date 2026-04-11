const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))


app.get('/api/persons', (response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request,response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request,response) => {
  Person.find({}).then(persons =>
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`))

})

app.delete('/api/persons/:id', (request,response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request,response, next) => {
  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({
      error:'name or number missing'
    })
  }
  /* if(persons.find(person=> person.name === body.name)){
    return response.status(400).json({
      error:"name must be unique"
    })
  } */
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })
  newPerson.save().then(person => {
    response.json(person)

  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {  number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.number = number

      //Person.findByIdAndUpdate(request.params.id, person, { new: true }, opts)
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }   else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})