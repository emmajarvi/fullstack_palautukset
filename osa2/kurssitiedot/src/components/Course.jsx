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
export default Course