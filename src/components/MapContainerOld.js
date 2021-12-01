import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper, StandaloneSearchBox } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
     coords : [ {
          name: "Noah",
          title: "Noah!",
          lat: 42.356276,
          lng: -71.096876,
          id: 1,
        },
        {
            name: "Andrei",
            title: "Andrei",
            lat: 42.348310,
            lng: -71.081311,
            id: 3,
        },
      ],
      waypoints : [],
    };
  }
onMapReady = (mapProps, map) => {
  
    const directionsService = new this.props.google.maps.DirectionsService();
    const directionsDisplay = new this.props.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    let startOfRoute = { lat:this.state.coords[0].lat, lng:this.state.coords[0].lng };
    let endOfRoute = {
      lat: this.state.coords[this.state.coords.length - 1].lat,
      lng: this.state.coords[this.state.coords.length - 1].lng,
    };

    let request = {
      origin: startOfRoute,
      waypoints: this.state.waypoints,
      destination: endOfRoute,
      travelMode: "BICYCLING",
    };

    // directionsService.route(request, function (result, status) {
    //   if (status == "OK") {
    //     directionsDisplay.setDirections(result);
    //   }
    // });

    
    let startContainer = document.getElementById("start-of-route-container");
    let start = document.getElementById("start-of-route");
    let endContainer = document.getElementById("end-of-route-container");
    let end = document.getElementById("end-of-route");
    // map.controls[this.props.google.maps.ControlPosition.TOP_LEFT].push(startContainer);
    // map.controls[this.props.google.maps.ControlPosition.TOP_RIGHT].push(endContainer);
    let autocompleteStart = new this.props.google.maps.places.Autocomplete(start);
    let autocompleteEnd = new this.props.google.maps.places.Autocomplete(end);
    // autocompleteStart.bindTo("bounds", map);
    // autocompleteEnd.bindTo("bounds", map);
    autocompleteStart.setFields(["address_components", "geometry", "icon", "name"]);
    autocompleteEnd.setFields(["address_components", "geometry", "icon", "name"]);

    //listener for the places input
    autocompleteStart.addListener("place_changed", () => {
      let place = autocompleteStart.getPlace();
      if (!place.geometry) {
        window.alert("No Address Available For: '" + place.name + "'");
        return;
      }
     this.state.coords[0] = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      
      request = {
        origin:this.state.coords[0],
        waypoints: this.state.waypoints,
        destination:this.state.coords[1],
        travelMode: "BICYCLING",
      };
      const tempwaypoints = [this.state.coords[0], this.state.coords[1]];
      const serverParams = {
        "creator" : "Andrei",
        "waypoints" : tempwaypoints,
        "description" : "daily walk"

      }
      console.log(this.state.waypoints)
      const serverRequest = {
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(serverParams)

      }
      //creating new directions request
      if (this.state.coords[0] !== null &&this.state.coords[1] !== null) {
          directionsService.route(request, function (result, status) {
              if (status == "OK") {
                  directionsDisplay.setDirections(result);
              }
          });
          let response;
          fetch("/api/routes", serverRequest)
            .then(response => response = response.json())
            .then(data => console.log(data));
      };
    });

    autocompleteEnd.addListener("place_changed", () => {
      let place = autocompleteEnd.getPladsce();
      if (!place.geometry) {
        window.alert("No Address Available For: '" + place.name + "'");
        return;
      }
     this.state.coords[1] = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      
      request = {
        origin:this.state.coords[0],
        waypoints: this.state.waypoints,
        destination:this.state.coords[1],
        travelMode: "BICYCLING",
      };
      const tempWaypoints = [this.state.coords[0], this.state.coords[1]];
      const serverParams = {
        "creator" : "Andrei",
        "waypoints" : tempWaypoints,
        "description" : "daily walk"
      }
      const serverRequest = {
        method : "POST",
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(serverParams)

      }
      //creating new directions request
      if (this.state.coords[0] !== null &&this.state.coords[1] !== null) {
          directionsService.route(request, function (result, status) {
              if (status == "OK") {
                  directionsDisplay.setDirections(result);
              }
          });
          fetch("/api/routes", serverRequest)
            .then(response => response.json())
            .then(data => console.log("andrei", data))
      }
    });
  };
  
  
    render() {
  
      return (
        <div>
          <form className="nav-bar-address" id="start-of-route-container">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ height: "50px"}}>From</button>
              <input class="form-control mr-sm-2" id="start-of-route" type="search" placeholder="Address" aria-label="Search" style={{height: "50px", width: "500px"}}></input>
            </form>
            <form className="nav-bar-address" id="end-of-route-container">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ height: "50px"}}>To</button>
              <input class="form-control mr-sm-2" id="end-of-route" type="search" placeholder="Address" aria-label="Search" style={{height: "50px", width: "500px"}}></input>
          </form>

          <Map
            className="map"
            initialCenter={{ lat: 42.353276, lng: -71.092876 }}
            google={this.props.google}
            onReady={this.onMapReady}
            style={{width: "85%", height: "100%", position: "fixed"}}
            containerStyle={{position: "fixed", width: "100%", height:"100%", marginTop:"0vh"}}
            zoom={15.1}
            options={{
                mapTypeControl: false,
                fullscreenControl: false
            }}
          >
          </Map>
        </div>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAVWVu8_U0FfwgBiHVN3q-G5uCQNBAj7Y'
})(MapContainer);