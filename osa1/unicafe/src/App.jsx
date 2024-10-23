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


  if (propgood == 0 && propneutral == 0 && propbad == 0) {

    return (
      <div>
        <p> No feedback given </p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text = {"Good"} value = {propgood} />
      <StatisticLine text = {"Neutral"} value = {propneutral} />
      <StatisticLine text = {"Bad"} value = {propbad} />
      <StatisticLine text = {"All"} value = {all} />
      <StatisticLine text = {"Average"} value = {average} />
      <StatisticLine text = {"Positive"} value = {positive} percent = "%"/> 
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <p> {props.text} {props.value} {props.percent}</p>
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
