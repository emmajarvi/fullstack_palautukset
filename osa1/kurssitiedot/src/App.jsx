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
      <Part kurssi = {props.osat[0].name} tehtavia = {props.osat[0].exercises} />
      <Part kurssi = {props.osat[1].name} tehtavia = {props.osat[1].exercises}/>
      <Part kurssi = {props.osat[2].name} tehtavia = {props.osat[2].exercises}/>
    </div>

  )
}


const Part = (props) => {

  console.log(props)

  return ( 

    <div>
      <p> {props.kurssi} {props.tehtavia}</p>
    </div>
  )
}


const Total = (props) => {

  return (
    <div>
      <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
       < Header kurssi = {course.name} />
       < Content osat = {course.parts} />
       < Total parts = {course.parts} />
    </div>
  )
}

export default App