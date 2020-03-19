const express = require('express');
const app = express();
const morgan = require('morgan');

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
    res.json(persons)
})

app.get('/info', (req, res) => {
    const str = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>`

    res.send(str)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(p => p.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)

    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 5000) + 1

app.post('/api/persons', (req, res) => {
    const body = req.body
    const findName = persons.find(p => p.name === body.name)
    console.log('findName', findName)
    console.log('body.name', body.name)
    console.log('body.number', body.number)
    if(!body.name || !body.number || findName){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`)
})