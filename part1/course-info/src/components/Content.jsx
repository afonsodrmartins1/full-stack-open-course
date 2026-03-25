import Part from "./Part.jsx"

const Content = (props)=>{
  const arr = props.content;
  return (
    <>
    {arr.map(part=> <Part key={part.id} name={part.name} number={part.exercises}/>)}
     
    </>
   
    
  )
}

export default Content;