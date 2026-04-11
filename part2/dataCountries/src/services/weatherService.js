import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY



const getWeatherCity = (latitude, longitude)=> {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
  .then(res=>{
    console.log(res.data);

    return res.data;
  })
  .catch(err=>console.log(err));
}

export default {getWeatherCity};
