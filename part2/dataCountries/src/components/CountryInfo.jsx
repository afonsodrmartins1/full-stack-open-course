import weatherService from "../services/weatherService";
import { useState, useEffect } from "react";

const CountryInfo = ({country})=>{
  const [weather, setWeather] = useState(null);

  const [latitude,longitude] = country.capitalInfo.latlng

  
  useEffect(()=>{
    weatherService.getWeatherCity(latitude,longitude).then(res=>{
    setWeather(res);
  })
  },[])
  
    return(
      <>
      <h1>{country.name.common}</h1>

      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area }</p>

      <h2>Languages</h2>
      {Object.keys(country.languages).map((key) => <p key={key}>{country.languages[key]}</p>)}


      <img src={country.flags.png} />



      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather?.main?.temp} Celsius</p>
      <img src={ weather?`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`:null }/>
      <p>Wind {weather?.wind?.speed} m/s</p>



      </>
    )

  }

  export default CountryInfo;