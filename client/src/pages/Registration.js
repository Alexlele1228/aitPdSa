import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import "../Login.css"
import GoogleLogin from '../components/GoogleLogin';
import { Form, Button,Row,Col, Container } from 'react-bootstrap';
export default function Registration() {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;


  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    // // <div className="App">
    //   {/*<div className="registration">
    //     <h1>Registration</h1>
    //     <label>Username</label>
    //     <input
    //       type="text"
    //       onChange={(e) => {
    //         setUsernameReg(e.target.value);
    //       }}
    //     />
    //     <label>Password</label>
    //     <input
    //       type="text"
    //       onChange={(e) => {
    //         setPasswordReg(e.target.value);
    //       }}
    //     />
    //     <button onClick={register}> Register </button>
    //     </div>*/}
    <Container>
    <div class=" h-100 d-flex justify-content-center align-items-center">
    <div>

    <Form >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
          setUsername(e.target.value);
        }} />
        <Form.Text className="text-muted" >
          For admin user login only.
    </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={login}>
        Submit
  </Button>
    </Form>
    </div></div>
    </Container>
  //     {/* <div className="login">
  //       <h1>Welcome to PD Record System</h1>
  //       <input
  //         type="text"
  //         placeholder="Username..."
  //         onChange={(e) => {
  //           setUsername(e.target.value);
  //         }}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password..."
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //       />
        
  //       <button onClick={login}> Login </button>
  //     </div>
  //      */}

  // {/* </div> */ }
 );
}
