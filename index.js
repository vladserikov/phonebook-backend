require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Alberto Moreno",
        "number": "22123-12321",
        "id": 5
    },
    {
        "name": "Victor Gugo",
        "number": "332-1232424",
        "id": 6
    },
    {
        "name": "Alex Will",
        "number": "0-221-2311123",
        "id": 7
    }
]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()))
    })
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(allPerson => {
            const str = `<p>Phonebook has info for ${allPerson.length} people</p>
                <p>${new Date().toString()}</p>`

            res.send(str)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON())
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
})

const generateId = () => Math.floor(Math.random() * 5000) + 1

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(person => {
        res.json(person.toJSON())
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findOneAndUpdate(req.params.id, person, {new: true})
        .then(updatePerson => {
            res.json(updatePerson.toJSON())
        })
        .catch(err => next(err))
})

const errorHandler = (error, reqest, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'mal formatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`)
})