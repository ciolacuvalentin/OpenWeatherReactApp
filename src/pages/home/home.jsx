import React, { useEffect, useState } from "react";
import { getForecastFiveDays, getWeather } from "../../services/api";
import { FormControl, Button, Form } from "react-bootstrap";
import "./home.css"

// getForecastFiveDays().then(res => (console.log("Forecast",res)))
// getWeather().then(res => (console.log("weather",res)))

const Home = () => {
  // const [search, setSearch] = useState(true);
  const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  useEffect(() => {
    getWeather(city).then((res) => {
        console.log(res)
        if(res.cod == 200 ) setWeather(res)
        else console.log(res.message)
    });
    getForecastFiveDays(city).then((res) => setForecast(res));
  }, []);

  function handleInputOnChange(e) {
    const city = e.target.value;
    setCity(city);
  }
  function handleClickSearch() {
    setWeather(undefined)
    getWeather(city).then((res) => setWeather(res));
    getForecastFiveDays(city).then((res) => setForecast(res));
    setCity("")
  }

  console.log("weather",weather);
  console.log("forecast",forecast);
  return (
    <div className="home_stile">
      <Form inline  bg="dark" variant="dark" className="d-flex justify-content-center">
        <FormControl
          type="text"
          onChange={handleInputOnChange}
          value={city}
        //   placeholder={city}
        />
        <Button
          variant="outline-success btn-dark"
          className="ml-2"
          onClick={handleClickSearch}
        >
          Search
        </Button>
      </Form>
      {weather ? (
        <div className="d-flex justify-content-center">
            <div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} height="200"/>
           <div>Name : {weather.name}</div> 
          <div>Description : {weather.weather[0].description}</div>
          <div>Temperature : {weather.main.temp} °C</div>
          <div>Humidity : {weather.main.humidity} %</div>
          <div>Pressure : {weather.main.pressure} hPa</div>
          <div>Visibility : {weather.visibility/1000} km</div>
          <div>Speed wind: {weather.wind.speed} km/h</div>
          </div>
          <div>
         
          </div>
        </div>
        
      ) : (
        "...loading weather"
      )}
    </div>
  );
};

export default Home;
