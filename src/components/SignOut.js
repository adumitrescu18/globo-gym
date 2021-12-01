import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './SignOut.css';
import axios, {AxiosResponse, AxiosError} from "axios";

function SignOut(props) {

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  function validateForm() {
    return Username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    // props.signUserOut();
  }

  if (true){
    return (
      <div className="SignOut">
        <Form onSubmit={handleSubmit}>
          <Button block size="lg" type="submit">
            Sign Out
          </Button>
        </Form>
      </div>
    );

  }
  return <div></div>;


}

export default SignOut;
