
import React, { useState, Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import CreateUser from "../components/CreateUser";
import axios from 'axios';

export default class SignInPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        signedIn : false
      };
    }

    signUserOut(){
      this.signedIn = false;
      console.log("HERE");
    }

    signUserIn(){
      this.signedIn = true;
      console.log("HERE");
    }

    render() {
      return (
        <div className="content-container">
          <SignIn signedIn={this.state.signedIn} signUserIn={this.signUserIn}/>
          <SignOut signedIn={this.state.signedIn} signUserOut={this.signUserOut}/>
          <CreateUser signedIn={this.state.signedIn} signUserIn={this.signUserIn}/>
        </div>

      );
    }
}
