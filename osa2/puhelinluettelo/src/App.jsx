import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


// Henkilön lisäämiseen tarvittavien elementtien renderöiminen
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

// Filtteröintiin tarvittavien elementtien renderöinti
const Filtterointi = (props) => {
  return(
    <input value={props.etsittava}
           onChange={props.handleEtsinta}/>
  )
}

// Kaikkien henkilöiden renderöimisen
const NimiLista = ({naytettavat, poistaminen}) => {

  console.log(naytettavat)
  console.log(naytettavat.map(person => person.id))

  return (
    <ul>
      {naytettavat.map(person => 
        <Person key = {person.id} name={person.name} number={person.number}  poistaminen = {() => poistaminen(person.id, person.name)}
        />
      )} 
    </ul>
  )
}


// Yhden henkilön tietojen sekä poistonapin renderöiminen
const Person = (props) => {
  return (
    <div>
      <p> {props.name} {props.number}</p> <button onClick={props.poistaminen}>delete</button>
    </div>
  )
}

const App = () => {

  var etsitaanko = false

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [etsitty, setEtsitty] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  //console.log("hakuehto=", etsitty)

  if (etsitty != '') etsitaanko = true
  if (etsitty == '') etsitaanko = false

  //console.log(etsitaanko)
 
  const personsToShow = etsitaanko
  ? persons.filter(person => person.name.toLowerCase().includes(etsitty.toLowerCase()) === true)
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
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

    console.log({persons})
    console.log({names})
  }

  const deletePerson = (id, nimi) => {

    console.log()
    window.confirm(`Delete ${nimi} ?`)
    personService
      .deleting(id)
      .then(console.log(`minä poistin henkilön jonka id on ${id}`))
      .catch(error => {
        alert(
          `the person '${nimi}' was already deleted from server`
        )
      })

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

          <Filtterointi etsittava = {etsitty} handleEtsinta = {handleEtsiminen}/>

        </div>

      <h2>Add person</h2>

      <PersonForm uusiNimi = {newName} uusiNumero ={newNumber} handleNimi = {handleNameChange}
                      handleNumero = {handleNumberChange} lisaaHenkilo = {addPerson}/>

      <h2>Numbers</h2>
      
      <NimiLista naytettavat ={personsToShow} poistaminen={deletePerson}/>

    </div>
  )

}

export default App