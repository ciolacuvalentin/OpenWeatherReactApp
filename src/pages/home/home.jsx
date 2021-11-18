import React, { useEffect, useState } from "react";
import { getForecastFiveDays, getWeather } from "../../services/api";
import { FormControl, Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./home.css";
import TableComponent from "../../components/table/table";

const Home = () => {
  const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  useEffect(() => {
    getWeather(city).then((res) => setWeather(res));
    getForecastFiveDays(city).then((res) => {
      console.log("rezultat forecast", res.cod);
      if (res.cod)
        setForecast(
          res.list.map((k) => {
            return {
                data: k.dt_txt,
                description: k.weather[0].description,
                image: `http://openweathermap.org/img/wn/${k.weather[0].icon}@2x.png`,
                temp: `${k.main.temp} °C`,
                pressure: `${k.main.pressure} hPa`,
                humidity: `${k.main.humidity} %`,
                temp_min: `${k.main.temp_min} °C`,
                temp_max: `${k.main.temp_max} °C`,
                visibility: `${k.visibility/1000} km/h`,
                speed_wind: `${k.wind.speed} km/h`,
            };
          })
        );
      else {
        console.log("rezultat forecast", res.message);
      }
    });
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
        console.log("rezultat weather", res.message);
      }
    });
    getForecastFiveDays(city).then((res) => {
      console.log("rezultat forecast", res.cod);
      if (res.cod)
        setForecast(
          res.list.map((k, index) => {
            return {
            image: `http://openweathermap.org/img/wn/${k.weather[0].icon}@2x.png`,
              data: k.dt_txt,
              description: k.weather[0].description,
              temp: `${k.main.temp} °C`,
              pressure: `${k.main.pressure} hPa`,
              humidity: `${k.main.humidity} %`,
              temp_min: `${k.main.temp_min} °C`,
              temp_max: `${k.main.temp_max} °C`,
              visibility: `${k.visibility/1000} km/h`,
              speed_wind: `${k.wind.speed} km/h`,
            };
          })
        );
      else {
        console.log("rezultat forecast", res.message);
      }
    });
    setWeather(null);
    setForecast(null);
    setCity("");
  }
  function buildTableHeaderData() {
    return Object.keys(forecast[0]).filter((k) => k !== "id");
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
      {/* {weather === null ? (<div> nu exista orasul </div>) :
 ( weather === undefined ? (<div className="d-flex justify-content-center">
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
        </div>) :<Spinner animation="border" variant="primary" className="spinner_center" />)} */}

      {weather || forecast ? (
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
          <div>
            <h5 className="d-flex justify-content-center">5-day forecast</h5>
            {forecast ? (
              <TableComponent
                headerData={buildTableHeaderData()}
                tableData={forecast}
              />
            ) : (
              <div className="spinner-center">erroare</div>
            )}
          </div>
        </div>
      ) : (
        <h5 className="spinner_center">City not found </h5>
      )}
    </div>
  );
};

export default Home;
