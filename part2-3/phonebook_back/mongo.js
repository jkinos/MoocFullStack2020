const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://mongo:${password}@cluster0-hslzi.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(() => {
        console.log(`added ${person.name} to phonebook`)
        mongoose.connection.close()
    })
}