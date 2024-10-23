import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (propgood, propneutral, propbad) => {

  var all = propgood + propneutral + propbad
  var average = (propgood * 1 + propneutral * 0 + propbad * (-1))/all
  var positive = propgood/all

  return (
    <div>
      <p> Good {propgood} </p>
      <p> Neutral {propneutral}</p>
      <p> Bad {propbad} </p>
      <p> All {all} </p>
      <p> Average {average} </p>
      <p> Positive {positive} </p>
    </div>
  )
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)


  return (
    <div>

      <h1>give feedback</h1>
      < Button 
        handleClick={increaseGoodByOne}
        text="good"
      />

      < Button 
        handleClick={increaseNeutralByOne}
        text="neutral"
      />

      < Button 
        handleClick={increaseBadByOne}
        text="bad"
      />

      <h1>statistics</h1>
 
      {Statistics(good, neutral, bad)}

    </div>
  )
}

export default App
