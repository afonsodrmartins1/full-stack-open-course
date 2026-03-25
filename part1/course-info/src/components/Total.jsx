const Total = (props)=>{
  return (
    <>
    <p>Number of exercises {props.total.reduce((acc,part)=>{
        return acc + part.exercises;
      },0)}</p>
    </>
  )
  
}

export default Total;