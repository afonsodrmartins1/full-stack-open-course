import { useState, useEffect } from 'react'
import axios from "axios";

import './App.css'
import CountryResults from './components/CountryResults';
import countryService from './services/countryService';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentCountry,setCurrentCountry] = useState(null);

  

  

  const handleSearchChange = (e)=>{
    console.log(e.target.value)
    setFilter(e.target.value);
    setCurrentCountry(null);

  }

  const handleShow = (countryToShow)=>{
    console.log("fetching...")
    countryService
    .getCountry(countryToShow)
    .then(country=>setCurrentCountry(country));
  }

  useEffect(()=>{
    countryService.getAllCountries()
    .then(res => setCountries(res))
   
  },[])

  return (
    <>
      <div>
        find countries<input onChange={handleSearchChange}/>
      </div>
      <div>
        <CountryResults countries={countries} 
        filter={filter} 
        countryToShow={currentCountry}
        showHandler={handleShow}/>
      </div>
    </>
  )
}

export default App
