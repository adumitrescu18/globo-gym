import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Autocomplete from "../components/Autocomplete";
import RouteModal from "../components/RouteModal";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


export class ReportMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      startCoordinates: {},
      endCoordinates: {},
      center: { lat: 42.353276, lng: -71.092876 },
      markers: [],
      hazardId: 0,
      directionsService: '',
      directionsDisplay: '',
    };
  }

  onMapReady = (mapProps, map) => {
    this.setState({directionsService: new this.props.google.maps.DirectionsService()});
    this.setState({directionsDisplay: new this.props.google.maps.DirectionsRenderer()});
    this.state.directionsDisplay.setMap(map);
  }

  onMapClick = (t, map, coord) => {

    if (Object.keys(this.state.markers).length % 2 === 0) {

      this.state.markers.forEach((marker) => {marker.setMap = null; marker.visible = false;});
      this.state.directionsDisplay.set('directions', null);

      this.setState({endCoordiantes: {} });

      const lat1 = coord.latLng.lat();
      const lng1 = coord.latLng.lng();

      var myLatlng = new this.props.google.maps.LatLng(lat1,lng1);
      this.setState({startCoordiantes: myLatlng});

      var marker = new this.props.google.maps.Marker({
          position: myLatlng,
          title: "Start",
          map: map,
          id: this.state.hazardId,
      });
      this.state.hazardId += 1;
      this.setState({markers: [marker] });

      map.panTo(myLatlng);

      }
      else if (Object.keys(this.state.markers).length == 1) {
        const lat1 = coord.latLng.lat();
        const lng1 = coord.latLng.lng();

        var myLatlng = new this.props.google.maps.LatLng(lat1,lng1);
        var marker = new this.props.google.maps.Marker({
            position: myLatlng,
            title: "End",
            map: map,
            id: this.state.hazardId,
        });
        this.state.hazardId += 1;
      
        this.state.markers.push(marker);

        const coordsStart = {
          lat: this.state.markers[0].getPosition().lat(),
          lng: this.state.markers[0].getPosition().lng(),
        };

        const coordsEnd = {
          lat: this.state.markers[1].getPosition().lat(),
          lng: this.state.markers[1].getPosition().lng(),
        };


        const request = {
          origin: coordsStart,
          waypoints: [],
          destination: coordsEnd,
          travelMode: "WALKING",
        };
        const tempLocation = {"start" : coordsStart, "end": coordsEnd};
        const serverParams = {
          "creator" : "Andrei",
          "location" : tempLocation,
          "type" : "construction",
          "description" : "there is a lot of construction causing a back up"
        }
        const serverRequest = {
          method : "POST",
          headers: { 'Content-Type': 'application/json' },
          body : JSON.stringify(serverParams)
        }
        const display = this.state.directionsDisplay;
        this.state.directionsService.route(request, function (result, status) {
            if (status == "OK") {
                display.setDirections(result);
            }
        });
      }
    
    console.log(Object.keys(this.state.markers).length);
};

  
 
  render() {
    return (
      <div>
        <Map
            className="map"
            id="map" 
            google={this.props.google}
            onClick={this.props.onMapClick}
            onReady={this.props.onMapReady}
            style={{width: "100%", height: "100%"}}
            containerStyle={{width: "97%", height:"40vh", marginTop:"0vh"}}
            initialCenter={this.state.center}
            zoom={15.1}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControl={false}
        >
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAVWVu8_U0FfwgBiHVN3q-G5uCQNBAj7Y'
})(ReportMap);