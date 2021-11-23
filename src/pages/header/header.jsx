import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
      <Navbar.Brand className="d-flex">
        <img
          alt=""
          src="/logo_white_cropped.png"
          height="30"
          className="d-inline-block align-top mr-3"
        />
      </Navbar.Brand>
      <a href="https://openweathermap.org/api" className="header-small-info">
        Build with OpenWeather API
      </a>
      
    </Navbar>
    
  );
};

export default Header;
