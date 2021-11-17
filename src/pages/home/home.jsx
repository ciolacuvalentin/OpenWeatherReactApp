import React, { useEffect, useState } from "react";
import { getForecastFiveDays, getWeather } from "../../services/api";
import { FormControl, Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./home.css";

// getForecastFiveDays().then(res => (console.log("Forecast",res)))
// getWeather().then(res => (console.log("weather",res)))

const Home = () => {
  // const [search, setSearch] = useState(true);
  const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  useEffect(() => {
    getWeather(city).then((res) => setWeather(res));
    getForecastFiveDays(city).then((res) => setForecast(res));
  }, []);

  function handleInputOnChange(e) {
    const city = e.target.value;
    setCity(city);
  }
  function handleClickSearch() {
    getWeather(city).then((res) => {
      console.log("rezultat weather", res.cod);
      if (res.cod === 200) setWeather(res);
      else {
        console.log(res.message);
        console.log("rezultat weather", res.message);
      }
    });
    getForecastFiveDays(city).then((res) => {
      console.log("rezultat forecast", res.cod);
      if (res.cod === 200) setForecast(res);
      else {
        console.log(res.message);
        console.log("rezultat forecast", res.message);
      }
    });
    setWeather(null);
    setForecast(undefined);
    setCity("");
  }

  console.log("weather", weather);
  console.log("forecast", forecast);
  return (
    <div className="home_stile">
      <Form
        inline
        bg="dark"
        variant="dark"
        className="d-flex justify-content-center"
      >
        <FormControl type="text" onChange={handleInputOnChange} value={city} />
        <Button
          variant="outline-success btn-dark"
          className="ml-2"
          onClick={handleClickSearch}
        >
          Search
        </Button>
      </Form>
      {/* { if (weather === null) <div> nu exista orasul </div> 
elseif (weather === undefined) <Spinner animation="border" variant="primary" className="spinner_center" />
else ( <div className="d-flex justify-content-center">
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

)} */}

      {weather ? (
        <div className="d-flex justify-content-center">
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              height="200"
            />
            <div>Name : {weather.name}</div>
            <div>Description : {weather.weather[0].description}</div>
            <div>Temperature : {weather.main.temp} °C</div>
            <div>Humidity : {weather.main.humidity} %</div>
            <div>Pressure : {weather.main.pressure} hPa</div>
            <div>Visibility : {weather.visibility / 1000} km</div>
            <div>Speed wind: {weather.wind.speed} km/h</div>
          </div>
          <div></div>
        </div>
      ) : (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner_center"
        />
      )}
    </div>
  );
};

export default Home;
