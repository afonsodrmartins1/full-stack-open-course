import { useState, useEffect} from 'react'
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from "./PersonForm.jsx";
import axios from "axios"
import personService from "./services/persons"
import Notification from "./Notification.jsx"

const App = () => {
  const [persons, setPersons] = useState([]);
  
  const [newName, setNewName] = useState('');
  const[newNumber, setNewNumber] = useState("");
  const[filter, setFilter] = useState("");
  const[notification, setNotification] = useState("");
  useEffect(()=>{
    personService.getAllPersons().then(persons=>{
      setPersons(persons);

    })
  },[])

  const addPerson = (e)=>{
    e.preventDefault();
    const person = persons.find(person=>person.name==newName);
    if(person){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const newPerson = {...person,number:newNumber};
        personService.updatePersonNumber(person.id,newPerson).then(newPerson=>{
          setPersons(persons.map(person=> person.name==newPerson.name? newPerson : person))
          setNotification(`${newPerson.name} phone number was updated!`)
          setTimeout(()=>{
            setNotification("");
          },5000);
          
        }).catch(error=> {
          setNotification(error.response.data.error)
          setTimeout(()=>{
            setNotification("");
          },5000);

        })


      }
      return;
    }
    personService.createPerson({name:newName, number:newNumber})
    .then(newPerson=>{
      setPersons(persons.concat([newPerson]))
       setNotification(`${newPerson.name} was added to the list!`)
          setTimeout(()=>{
            setNotification("");
          },5000);
    }).catch(error=> {
          setNotification(error.response.data.error)
          setTimeout(()=>{
            setNotification("");
          },5000);

        })
    
  }
  const handleNameChange = (event)=>{
    setNewName(event.target.value);

  }
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value);

  }

  const handleFiltering = (e)=>{
    setFilter(e.target.value);


  }

  const handleDelete = (name,id)=>{
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      personService.deletePerson(id).then(()=>{
        setPersons(persons.filter(person=> person.name!=name))
      })
    }



  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter onChange={handleFiltering}/>
      <PersonForm submitHandler ={addPerson} 
      nameHandler={handleNameChange}
      numberHandler={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteHandler={handleDelete}/>
      
      <div>debug: {newName} {newNumber} filter:{filter}</div>
    </div>
  )
}

export default App