const Header = (props) => {
  return (
    <div>
       <h1>{props.kurssi}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)

  return (
    <div>
      <Part kurssi = {props.parts[0].name} tehtavia = {props.parts[0].exercises} />
      <Part kurssi = {props.parts[1].name} tehtavia = {props.parts[1].exercises}/>
      <Part kurssi = {props.parts[2].name} tehtavia = {props.parts[2].exercises}/>
    </div>

  )
}

const Part = (props) => {
  return ( 
    <div>
      <p> {props.kurssi} {props.tehtavia}</p>
    </div>
  )
}


const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
       < Header kurssi = {course} />
       < Content parts = {parts} />
       < Total parts = {parts} />
    </div>
  )
}

export default App