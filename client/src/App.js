import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Banner from 'react-js-banner';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav, Carousel,Button } from 'react-bootstrap';
import Registration from "./pages/Registration";
import GoogleLogin from './components/GoogleLogin';

function App() {

  return (
    <Router>
    <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">
    <img
        src={require('./images/ait.png')}
      
        height="50"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>

      <Button variant="outline-primary">Admin Login</Button>

  </Navbar>
  <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://static.bandicam.com/img/mainbanner_02.jpg"
      alt="First slide"
    />
    
    <Carousel.Caption>
      
      <h2>Welcome to PD Record System</h2>
      <p>For AIT Academic Staff PD Activities Recording</p>
      <GoogleLogin/>
    </Carousel.Caption>
  </Carousel.Item>
  </Carousel>
  <Switch>

  <Route path="/home" exact render={(props) => <Home />} />
  <Route path="/login" exact render={(props) => <Registration />} />
    </Switch>

  </Router>
    // <Router>
    //   <Route path="/home" exact render={(props) => <Home />} />
    //   <Route path="/login" exact render={(props) => <Main />} />
    // </Router>
  );
}

export default App;
