import axios from "axios"
const baseUrl ='/api/persons';
const createPerson = newPerson =>{
  return axios.post(baseUrl, newPerson).then(response=>response.data);
}

const getAllPersons = ()=>{
   return axios.get(baseUrl).then(res=>res.data)
    
}

const deletePerson = (id)=>{
  return axios.delete(`${baseUrl}/${id}`).then(res=>res.data);
}

const updatePersonNumber = (id, newPerson)=>{
  return axios.put(`${baseUrl}/${id}`, newPerson).then(res=>res.data);

}

export default {createPerson, getAllPersons,deletePerson, updatePersonNumber};