const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('conection')
    })
    .catch(err => {
        console.log('error conection', err.message)
    })

const personShema = new mongoose.Schema({
    name: String,
    number: String,
})

personShema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personShema);