import React from 'react';
import { Navbar ,FormControl,Button,Form} from 'react-bootstrap';
import './header.css';

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
          <Form inline>
          <FormControl type="text" placeholder="Search"/>
          <Button variant="outline-success" className="ml-2">Search</Button>
        </Form>
        </Navbar.Brand>
        <a href="https://openweathermap.org/api" className="header-small-info">Build with OpenWeather API</a>
      </Navbar>
      
    )
}

export default Header;