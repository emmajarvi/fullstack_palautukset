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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      < Header kurssi = {course}/>
      < Content osat = {[part1, part2, part3]} tehtavat = {[exercises1, exercises2, exercises3]} /> 
      < Total lkm = {exercises1+ exercises2 +exercises3} />
    </div>
  )
}

export default App