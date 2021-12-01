import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './SignIn.css';
import axios, {AxiosResponse, AxiosError} from "axios";

function SignIn(props) {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  function validateForm() {
    return Username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(
        "/api/users/authenticate",
        {
          "username" : Username,
          "password" : password
        }
    ).then((response) => {
      setUser(response.data);
      console.log(response.data);
      localStorage.setItem('globobikes_username', response.data["user_name"]);
      localStorage.setItem('globobikes_id', response.data["_id"]);
    }).catch((reason) => {
      console.log(reason.response.status);
      //handle error some how : error message?
    });

  }
  if (props.signedIn){
    return <div></div>;
  }
  return (
    <div className="SignIn">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default SignIn;
