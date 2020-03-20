const mongoose = require('mongoose');

if(process.argv.length < 3){
  console.dir('enter you data');
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook-pkaqd.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personShema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personShema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook');
    result.forEach(p => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
}

if(process.argv.length === 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
