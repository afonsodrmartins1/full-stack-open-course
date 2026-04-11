const Persons = ({persons, filter, deleteHandler})=>{
  return (
    <>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => 
    <div key={person.name}>
    <p >{person.name} {person.number}</p>
    <button onClick={()=>deleteHandler(person.name, person.id)}>delete</button>
    </div>
  )}
    </>
  )


}
export default Persons;