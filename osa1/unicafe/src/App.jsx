import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Counter = (props) => {

  return (
    <div>
      <p> {props.text} {props.grade}</p>
    </div>
  )
}

const Average = (props) => {

  return (
    <div>
      <p> average {(props.amounts[0]*1 + props.amounts[1]*0 + props.amounts[2]*(-1))/props.amounts[3]} </p>
      <p> positive {props.amounts[0]/props.amounts[3]}</p>
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

      <Counter text = {"good"} grade = {good} />
      <Counter text = {"neutral"} grade = {neutral} />
      <Counter text = {"bad"} grade = {bad} />
      <Counter text = {"total"} grade = {good + neutral + bad} />
      <Average amounts = {[good, neutral, bad, good + neutral + bad]} />
    </div>
  )
}

export default App
