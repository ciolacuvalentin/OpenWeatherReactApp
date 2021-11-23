import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./pages/header/header";
import Home from "./pages/home/home";
import Details from "./pages/details/details";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details">
            <Details />
          </Route>
        </Switch>
      </Router>
      <Header />
    </div>
    // <div className="App">
    //   <Header/>
    //   <Home/>
    //   <Header/>
    // </div >
  );
}

export default App;
