import { useState } from 'react'


const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const PersonForm = (props) => {

  return(
    <form onSubmit={props.lisaaHenkilo}>

        <div> name: 
          <input value={props.uusiNimi}
          onChange={props.handleNimi}/>
        </div>

        <div> number: 
          <input value={props.uusiNumero}
          onChange={props.handleNumero}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>

    </form>
  )
}

const NimiLista = (props) => {

  console.log(props.naytettavat)
  return (
    <ul>
      {props.naytettavat.map(person => 
        <Person key={person.name} name={person.name} number={person.number}/>
      )}
    </ul>
  )
}

const App = () => {

  var etsitaanko = false

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Mary Poppenrieck', number: '34-23-6423123' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [etsitty, setEtsitty] = useState('')

  //console.log("hakuehto=", etsitty)

  if (etsitty != '') etsitaanko = true
  if (etsitty == '') etsitaanko = false

  //console.log(etsitaanko)
 
  const personsToShow = etsitaanko
  ? persons.filter(person => person.name.includes(etsitty) === true)
  : persons



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
    setEtsitty('')
    setNewName('')
    setNewNumber('')

    console.log({persons})
    console.log({names})
  }

  const handleEtsiminen = (event) => {
    console.log(event.target.value)
    setEtsitty(event.target.value)
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

      <div>filter shown with  

          <input value={etsitty}
          onChange={handleEtsiminen}/>

      </div>

      <h2>Add person</h2>

      <PersonForm uusiNimi = {newName} uusiNumero ={newNumber} handleNimi = {handleNameChange}
                      handleNumero = {handleNumberChange} lisaaHenkilo = {addPerson}/>

      <h2>Numbers</h2>
      
      <NimiLista naytettavat ={personsToShow}/>

    </div>
  )

}

export default App