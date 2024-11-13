const Course = ( {course} ) => {

    const Header = ({name}) => {
      return (
        <div>
          <h1>{name}</h1>
        </div>
      )
    }

    const Content = ( {kurssi} ) => {

      console.log(kurssi)

      const Part = (props) => {
      
        return ( 
          <div>
            <p> {props.osannimi} {props.tehtavia}</p>
          </div>
        )
      }

      return (
        <div>
          <ul>
              {kurssi.map(osa => 
                <Part key = {osa.id} osannimi = {osa.name} tehtavia ={osa.exercises} />
              )}
          </ul>
        </div>
      )
    }

  return (
    <div>
      <Header name = {course.name} />
      <Content kurssi = {course.parts}/>
    </div>
    
  )
}

/*
const Total = (props) => {

  return (
    <div>
      <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}
*/

const App = () => {

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },      
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
