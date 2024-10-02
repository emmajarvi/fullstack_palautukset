const Header = (props) => {
  return (
    <div>
       <h1>{props.kurssi}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part kurssi = {props.osat[0]} tehtavia = {props.tehtavat[0]}/>
      <Part kurssi = {props.osat[1]} tehtavia = {props.tehtavat[1]}/>
      <Part kurssi = {props.osat[2]} tehtavia = {props.tehtavat[2]}/>
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
  return (
    <div>
      <p> Number of exercises {props.lkm}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
       < Header kurssi = {course} />
       < Content osat = {[part1.name, part2.name, part3.name]} tehtavat = {[part1.exercises, part2.exercises, part3.exercises]} />
       < Total lkm = {part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App