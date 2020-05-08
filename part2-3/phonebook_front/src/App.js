import React, { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from"./services/Persons"
import './App.css'
import Notification from "./components/Notification";

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName ] = useState('new Name')
    const [newNumber, setNewNumber] = useState('new Number')
    const [newFilter, setNewFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage,setErrorMessage] = useState(null)



    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const id = () => persons.find(p => p.name === newName).id

        persons.filter(person => person.name===newName).length === 0 ?
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(
                        `Added '${returnedPerson.name}'`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                }).catch(error => {
                    console.log(error.response.data.error)
                    setErrorMessage(
                        error.response.data.error
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                setPersons(persons)
                setNewName('')
                setNewNumber('')
                    })
                :
            window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)?
                personService
                    .update(id(),personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id() ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setSuccessMessage(
                            `Updated '${returnedPerson.name}'`
                        )
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    }).catch(error => {
                    setErrorMessage(
                        error.response.data.error
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id()))
                    setNewName('')
                    setNewNumber('')
                    }):console.log("")
    }

    const removePerson = (person) => {
        const remainingPersons = persons.filter(p => p !== person)
        const message = `Delete ${person.name}?`
        if (window.confirm(message))
            personService.remove(person.id)
                .then(()=>{
                    setPersons(remainingPersons)
                    setSuccessMessage(
                        `Deleted '${person.name}'`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(
                        `Information of '${person.name}' has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p !== person))
                })

    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
      <div>
        <h2>Phonebook</h2>
          <Notification message={successMessage} className='success' />
          <Notification message={errorMessage} className='error'/>
          <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
          <h2>add a new</h2>
        <PersonForm addPerson={addPerson}
              newName={newName}
              newNumber={newNumber}
              handleNameChange={handleNameChange}
              handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
          <Persons persons={persons} newFilter={newFilter} removePerson={removePerson}/>
      </div>
  )

}

export default App
