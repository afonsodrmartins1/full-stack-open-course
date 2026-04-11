import axios from "axios";

const baseUrl ="https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = ()=>{
  console.log("fetching all countries...");
  
  return axios.get(`${baseUrl}/all`)
  .then(res=>res.data)
  .catch(err=>console.log(err))
}

const getCountry = (name) =>{
  return axios.get(`${baseUrl}/name/${name}`)
  .then(res=>res.data)
  .catch(err=>console.log(err))

}

export default {getAllCountries, getCountry}