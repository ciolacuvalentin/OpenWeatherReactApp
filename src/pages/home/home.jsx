import React, { useEffect, useState } from "react";
import { getForecastFiveDays, getWeather } from "../../services/api";
import { FormControl, Button, Form, Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import "./home.css";
import TableComponent from "../../components/table/table";
import { useHistory } from "react-router-dom";
import Cardforecast from "../../components/card/cardforecast";

const Home = () => {
  const [city, setCity] = useState("Bucharest");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [spinner, setSpinner] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  function filterForecastData(list) {
    const filterArr = [];
    let date = null;
    list.forEach((k, index) => {
      if (index === 0) date = k.dt_txt.substr(0, 10);
      if (k.dt_txt.substr(0, 10) !== date) {
        date = k.dt_txt.substr(0, 10);
        filterArr.push({
          data: k.dt_txt.substr(0, 10),
          description: k.weather[0].description,
          image: `http://openweathermap.org/img/wn/${k.weather[0].icon}@2x.png`,
          temp: `${k.main.temp} °C`,
          pressure: `${k.main.pressure} hPa`,
          humidity: `${k.main.humidity} %`,
          temp_min: `${k.main.temp_min} °C`,
          temp_max: `${k.main.temp_max} °C`,
          visibility: `${k.visibility / 1000} km`,
          wind_speed: `${k.wind.speed} km/h`,
        });
      }
    });
    return filterArr;
  }

  function apiForecast() {
    getForecastFiveDays(city).then((res) => {
      console.log("rezultat forecast", res);

      if (res.cod === "200" && weather) {
        const filterRes = filterForecastData(res.list);
        const newWeatherObj = {
          data: new Date().toLocaleString(),
          image: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          description: weather?.weather[0].description,
          temp: `${weather?.main.temp} °C`,
          temp_min: `${weather?.main.temp_min} °C`,
          temp_max: `${weather?.main.temp_max} °C`,
          humidity: `${weather?.main.humidity} %`,
          pressure: `${weather?.main.pressure} hPa`,
          visibility: `${weather?.visibility / 1000} km`,
          wind_speed: `${weather?.wind.speed} km/h`,
        };
        setForecast([newWeatherObj, ...filterRes]);
      } else {
        console.log("rezultat forecast", res.message);
        setError(res.message);
      }
      setSpinner(false);
    });
  }

  useEffect(() => {
    setSpinner(true);
    setError(null);
    getWeather(city).then((res) => {
      if (res.cod === 200) {
        console.log("weather", res);
        setWeather({ ...res });
      } else setError(res.message);

      //setCity("");
    });
  }, [startSearch]);

  useEffect(() => {
    apiForecast();
  }, [weather]);

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

  function handleInputOnChange(e) {
    const city = e.target.value;
    console.log(e.target.value);
    setCity(city);
  }
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
    setWeather(null);
    setForecast(null);
  }
  function handleClickDetailis() {
    history.push({
      pathname: "details",
      search: `?city=${city}`,
      state: {
        update: true,
      },
    });
  }

  function buildTableHeaderData() {
    return Object.keys(forecast[0]).filter((k) => k !== "id");
  }

  console.log("weather", weather);
  console.log("forecast", forecast);

  return (
    <div className="home_stile_home">
      <Form
        inline
        bg="dark"
        variant="dark"
        className="d-flex justify-content-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormControl type="text" onChange={handleInputOnChange} value={city} />
        <Button
          variant="outline-success btn-dark"
          className="ml-2"
          onClick={handleClickSearch}
        >
          Search
        </Button>
        <Button
          variant="outline-success btn-dark"
          className="ml-2"
          onClick={handleClickDetailis}
        >
          Details
        </Button>
      </Form>
      <div className="d-flex justify-content-center">
        {weather?.cod === 200 && !spinner && (
          <div>
            {/* <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              height="180"
            />
            <div>
              Name : {weather.sys.country} {weather.name}
            </div>
            <div>Description : {weather.weather[0].description}</div>
            <div>Temperature : {weather.main.temp} °C</div>
            <div>Humidity : {weather.main.humidity} %</div>
            <div>Pressure : {weather.main.pressure} hPa</div>
            <div>Visibility : {weather.visibility / 1000} km</div>
            <div>Speed wind: {weather.wind.speed} km/h</div> */}
          </div>
        )}
      </div>
      <div>
        {forecast && weather && !spinner && (
          <Cardforecast
            headerData={buildTableHeaderData()}
            tableData={forecast}
          />
        )}
        {/* <Cardforecast weather={weather}/> */}
        {/* {forecast && !spinner && (
            <TableComponent
              headerData={buildTableHeaderData()}
              tableData={forecast}
            />
          )} */}
      </div>
      {/* </div> */}
      {/* {(!spinner && error) && <h5 className="spinner_center_home">{error}</h5>} */}
      {spinner && <Spinner
          animation="border"
          variant="primary"
          className="spinner_center"
        />
      }
    </div>
  );
};

export default Home;
