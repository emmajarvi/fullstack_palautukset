import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function RandomInt(max) {
  return Math.floor(Math.random() * max)
}

const aanet = Array(8).fill(0)
const kopio = { ...aanet }


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [aani, aanesta] = useState(0)

  const arvoAnekdootti = () => setSelected(RandomInt(8))

  const aanestys = () => {

    kopio[selected] += 1

    aanesta(kopio[selected])

    console.log("nyt äänestetään: ", kopio)

    aanet[selected] = kopio[selected]
  }
  
  console.log("nyt laitettava ääni: ", aani)
  console.log("indeksi: ", selected)
  console.log("äänet: ", aanet)
  

  return (
    <div>

      <p> {anecdotes[selected]} </p>
      <p> has {aanet[selected]} votes </p>
      < Button handleClick = {arvoAnekdootti} text = "next anecdote" />
      < Button handleClick = {aanestys} text = "vote" />

    </div>
  )
}

export default App
