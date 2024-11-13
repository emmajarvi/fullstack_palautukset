const Course = ( {course} ) => {

    const Header = ({name}) => {
      return (
        <div>
          <h1> {name} </h1>
        </div>
      )
    }

    const Content = ( {kurssi} ) => {

      console.log(kurssi)

      const Part = (props) => {
      
        return ( 
          <div>
            <p> {props.osannimi} {props.tehtavia} </p>
          </div>
        )
      }

      return (
        <div>
              {kurssi.map(osa => 
                <Part key = {osa.id} osannimi = {osa.name} tehtavia ={osa.exercises} />
              )}
        </div>
      )
    }

      const Total = ( {kurssi} ) => {

        const tehtavat = kurssi.map(osa => osa.exercises)

        const summaaTehtavat = tehtavat.reduce((joSummatut, nytLisattava) => joSummatut + nytLisattava)

        return (
          <div>
            <b> Total of {summaaTehtavat} exercises </b>
          </div>
        )
      }

  return (
    <div>
      <Header name = {course.name} />
      <Content kurssi = {course.parts} />
      <Total kurssi = {course.parts} />
    </div>
    
  )
}



const App = () => {

  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'Fullwares',
          exercises: 7,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
       {courses.map(course => 
                 <Course key = {course.id} course={course} />
              )}
    </div>
  )
}

export default App
