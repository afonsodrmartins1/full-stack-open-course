const PersonForm = ({submitHandler,nameHandler, numberHandler})=>{
  return (
    
  <form onSubmit={submitHandler}>
        <div>
          name: <input onChange={nameHandler}/>
          
        </div>
        <div>number: <input onChange={numberHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm;