import React, { useEffect, useState } from "react";
import { getForecastFiveDays, getWeather } from "../../services/api";
import { FormControl, Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./details.css";
import TableComponent from "../../components/table/table";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Details = () => {
  //const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [spinner, setSpinner] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [error, setError] = useState();

  let location = useLocation();
  const city = location.search?.split("=")[1];

  function apiForecast() {
    getForecastFiveDays(city).then((res) => {
      setSpinner(false);
      console.log("rezultat forecast", res.cod);
      if (res.cod) {
        setForecast([
          ...res.list.map((k, index) => {
            return {
              data: k.dt_txt.substr(0, 16),
              description: k.weather[0].description,
              image: `http://openweathermap.org/img/wn/${k.weather[0].icon}@2x.png`,
              temp: `${k.main.temp} °C`,
              pressure: `${k.main.pressure} hPa`,
              humidity: `${k.main.humidity} %`,
              temp_min: `${k.main.temp_min} °C`,
              temp_max: `${k.main.temp_max} °C`,
              visibility: `${k.visibility / 1000} km`,
              speed_wind: `${k.wind.speed} km/h`,
            };
          }),
        ]);
      } else {
        console.log("rezultat forecast", res.message);
        setError(res.message);
      }
    });
  }

  useEffect(() => {
    setSpinner(true);
    setError(null);
    getWeather(city).then((res) => {
      if (res.cod === 200) setWeather(res);
      else setError(res.message);
      apiForecast();
    });
  }, [startSearch]);

  useEffect(() => {
    document.addEventListener("keypress", handleEnterKey);
  });

  function handleEnterKey(key) {
    console.log(key);
    if (key.key === "Enter" && (city !== "" || city !== undefined)) {
      setStartSearch(!startSearch);
      setWeather(null);
      setForecast(null);
    }
  }

  //   function handleInputOnChange(e) {
  //     const city = e.target.value;
  //     console.log(e.target.value);
  //     setCity(city);
  //   }
  function handleClickSearch(e) {
    e.preventDefault();
    // getWeather(city).then((res) => {
    //   console.log("rezultat weather", res.cod);
    //   if (res.cod === 200) setWeather(res);
    //   else {
    //     console.log("rezultat weather", res.message);
    //   }
    //   apiForecast();
    // });
    setStartSearch(!startSearch);
    setForecast(null);
  }

  function buildTableHeaderData() {
    return Object.keys(forecast[0]).filter((k) => k !== "id");
  }
  console.log("weather", weather);
  console.log("forecast", forecast);

  return (
    <div className="home_stile">
      <div>
        <div className="details-header">
    
          <Link to="/" className="home-link"><FontAwesomeIcon  icon={faHome} size={"2x"} color="#55ff00" />
             Home
          </Link>
          <h5 className="d-flex justify-content-center" style={{ textTransform: 'uppercase' }}> {city}   5-day forecast </h5>
        </div>
        {forecast && !spinner && (
          <TableComponent
            headerData={buildTableHeaderData()}
            tableData={forecast}
          />
        )}
      </div>
      {!spinner && error && <h5 className="spinner_center">{error}</h5>}
      {spinner && (
        <Spinner
          animation="border"
          variant="primary"
          className="spinner_center"
        />
      )}
    </div>
  );
};

export default Details;
