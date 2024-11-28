import { useState } from 'react'

const Person = (props) => {
  return (
    <p>{props.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')


  const addName = (event) => {

    event.preventDefault()

    const names = persons.map(person => person.name)
    
    console.log(typeof(newName))

    if (newName == "") return

    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      id: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')

    console.log({persons})
    console.log({names})
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>

        <div>
          name: 
          <input value={newName}
          onChange={handleNameChange}/>

        </div>
        
        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>
      
      <ul>
        {persons.map(person => 
          <Person key={person.name} name={person.name}/>
        )}
      </ul>

    </div>
  )

}

export default App