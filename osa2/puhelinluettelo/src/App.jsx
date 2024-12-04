import { useState } from 'react'

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0404440404'
    }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {

    event.preventDefault()

    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)

    if (newName == "") return
    if (newNumber == "") return

    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    if (numbers.includes(newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

    console.log({persons})
    console.log({names})
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>

        <div>
          <div>name: 
          <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>

        </div> number: 
          <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      
      <ul>
        {persons.map(person => 
          <Person key={person.name} name={person.name} number={person.number}/>
        )}
      </ul>

    </div>
  )

}

export default App