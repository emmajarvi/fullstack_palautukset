import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

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
const NimiLista = ({naytettavat, poistaminen, paivittaminen}) => {

  console.log(naytettavat)
  //console.log(naytettavat.map(person => person.id))

  return (
    <ul>
      {naytettavat.map(person => 
        <Person key = {person.id} name={person.name} number={person.number}  
                poistaminen = {() => poistaminen(person.id, person.name)}
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
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  if (etsitty != '') etsitaanko = true
  if (etsitty == '') etsitaanko = false

  const personsToShow = etsitaanko
  ? persons.filter(person => person.name.toLowerCase().includes(etsitty.toLowerCase()) === true)
  : persons

  const addPerson = (event) => {

    event.preventDefault()

    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)

    if (newName == "") return
    if (newNumber == "") return

    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Tarkistetaan onko saman niminen jo puhelinluettelossa
    // Jos on, kysytään päivitetäänkö numero
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        updateNumber(person.id)
        setNewName('') 
        setNewNumber('')
        return
      } else {
        setNewName('') 
        setNewNumber('')
        return
      }
    }

    if (numbers.includes(newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
      return
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      setMessage(
        `Added ${newPerson.name}`)
        
      setTimeout(() => {
      setMessage(null)}, 5000)

        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const errorMsg = error.response?.data?.error || error.response?.data || 'Unknown error'
        setErrorMessage(errorMsg)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const deletePerson = (id, nimi) => {

    if (window.confirm(`Delete ${nimi} ?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(`minä poistin henkilön jonka id on ${id}`)
          setMessage(
            `Deleted ${nimi}`)
            
          setTimeout(() => {
          setMessage(null)}, 5000)

          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${nimi}' was already deleted from the server`
          )
        })

    } else return;

  }

  const updateNumber = (id) => {

    console.log(`vaihdan henkilön ${id} numeron`)  

    const person = persons.find(n => n.id === id)
        const changedPerson = { ...person, number: newNumber }
    
        personService
          .update(id, changedPerson)
            .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              
            // ilmoitus onnistuneesta muokkauksesta
            setMessage(
              `Number for ${person.name} was changed`)

            setTimeout(() => {
              setMessage(null)
            }, 5000) })

            // ilmoitus tilanteessa, jossa henkilö on poistettu serveriltä toisella selaimella
            .catch(error => {
            setErrorMessage(
              `The person ${person.name} has already been removed from the server`) 
            setTimeout(() => {
            setErrorMessage(null)}, 5000)

            setPersons(persons.filter(n => n.id !== id))
            })
            
          //selainilmoitus jos muokkaaminen ei muusta syystä onnistu
          .catch(error => {
            alert(
              `couldn't update the number for '${person.name}'`
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

      <h1>Phonebook</h1>

      <Notification message={message}/>
      <ErrorNotification message={errorMessage}/>

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