import React, { Component } from "react";


export class HazardContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        creator : 'CREATOR',
        location_1 : 'LOCATION 1',
        location_2 : 'LOCATION 2',
        type : 'TYPE',
        description : 'DESCRIPTION'
      };
    };

    render() {
      return (
      <div>
        <h1>{this.state.creator}</h1>
        <h1>{this.state.location_1}</h1>
        <h1>{this.state.location_2}</h1>
        <h1>{this.state.type}</h1>
        <h1>{this.state.description}</h1>
      </div>
    )
  };
}

export default HazardContainer;
