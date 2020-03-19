const express = require('express');
const app = express();

const persons = [
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



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`)
})