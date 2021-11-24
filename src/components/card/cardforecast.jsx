import React from "react";
import { Card } from "react-bootstrap";
import "./cardforecast.css";

const Cardforecast = ({ headerData, tableData }) => {
  return (
    <div className="d-flex justify-content-center ">
    <div className="card_forecast_container">
      {tableData.map((weather, index) => (
        <div className="m-2" key={"weather-" + index}>
          <Card
            border="primary"
            style={{ width: "14rem", minHeight: "25rem", maxHeight: "25rem" }}
          >
            <Card.Header>
              <div>{weather.data}</div>
              <div>{index === 0 ? "Current Weather" : "Forecast"}</div>
            </Card.Header>
            <Card.Body>
              {/* <Card.Title>Primary Card Title</Card.Title> */}
              <Card.Text>
                <img src={weather.image} height="80" />
                <div>Description : {weather.description}</div>
                <div>Temperature : {weather.temp}</div>
                <div>Temp_min : {weather.temp_min}</div>
                <div>Temp_max : {weather.temp_max}</div>
                <div>Humidity : {weather.humidity}</div>
                <div>Pressure : {weather.pressure}</div>
                <div>Visibility : {weather.visibility}</div>
                <div>Speed wind: {weather.wind_speed}</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Cardforecast;
