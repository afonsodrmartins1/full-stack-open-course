import CountryInfo from "./CountryInfo";

const CountryResults = ({countries, filter, showHandler, countryToShow})=>{
  if(countryToShow)
    return(<CountryInfo country={countryToShow}/>);

    const countriesFiltered = countries.filter(country=> 
      country.name.common.toLowerCase().includes(filter.toLowerCase()));
    if(countriesFiltered.length > 10)
      return (<p>Too many matches, specify another filter</p>);
    return countriesFiltered.length === 1? (<CountryInfo country={countriesFiltered[0]}/>):
    (<>{countriesFiltered
      .map((country,index)=> 
        <div key={index}>
      <span >{country.name.common}</span>
      <button onClick={()=>{
        showHandler(country.name.common);
      }}>Show </button>
      <br/>
      </div>

    )}</>)
        



  }

  export default CountryResults;