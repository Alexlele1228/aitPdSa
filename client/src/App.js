import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Carousel, Button, Alert } from 'react-bootstrap';
import Registration from "./pages/Registration";
import GoogleLogin from './components/GoogleLogin';
import Manage from './pages/Manage';
import Blank from './pages/Blank';
import Individual from './pages/Individual';
import Setting from './pages/Setting';


Axios.defaults.withCredentials = true;




class App extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      user_id: -1,
      isAdmin: null
    }
  }



  componentDidMount() {

    Axios.get("http://localhost:3001/getStaffID").then((response) => {
      if (response.data.loggedIn) {
        this.setState({ username: response.data.user.username, user_id: response.data.user.id });
        Axios.get("http://localhost:3001/checkIfAdmin").then((response) => {
          if (response.data.length > 0) {
            this.setState({ isAdmin: true });
          } else {
            this.setState({ isAdmin: false });

          }
        });

      }
    });
  }

  logout() {
    Axios.post("http://localhost:3001/logout").then((response) => {
      console.log("logout succesful=" + response)
    });
    window.location.replace('/')
  }

  render() {
    return (

      <Router>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="/">
            <img
              src={require('./images/ait.png')}
              alt="logo"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Submmit Record</Nav.Link>
            <Nav.Link href="/login">Admin Login</Nav.Link>

            {
              this.state.isAdmin &&
              <Nav.Link href="/manage">Manage</Nav.Link>}


            {
              this.state.isAdmin &&
              <Nav.Link href="/setting">Setting</Nav.Link>}

          </Nav>
       
          {
            this.state.username &&
            (this.state.isAdmin?
            <Alert key={1} variant='primary'>
              {this.state.username + " (Admin) "}
            </Alert>
            :
            <Alert key={1} variant='dark'>
              {this.state.username + " (Staff) "}
            </Alert>
            )
          }
       
          {
            this.state.username &&
            <Button variant="danger" onClick={this.logout}>Log out</Button>
          }


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
              {!this.state.username && <GoogleLogin />}
              {this.state.username && <h4>Hello {this.state.username}</h4>}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>



        <Switch>
          <Route exact path="/home">{this.state.username ? <Home /> : <Blank />}</Route>
          <Route exact path="/login"><Registration /></Route>
          <Route exact path="/manage">{this.state.username ? (this.state.isAdmin && <Manage />) : <Blank />}</Route>
          <Route exact path="/individual">{this.state.username ? (this.state.isAdmin && <Individual />) : <Blank />}</Route>
          <Route exact path="/setting">{this.state.username ? (this.state.isAdmin && <Setting />) : <Blank />}</Route>

        </Switch>
      </Router>
    )
  }
}

export default App;
