import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper, StandaloneSearchBox } from "google-maps-react";

export class HazardsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
     coords : [],
      waypoints : [],
      markers: {},
      hazardId: 0,
    };
  }

    onMapClick = (t, map, coord) => {

        if (Object.keys(this.state.markers).length %2 == 0) {
          const lat1 = coord.latLng.lat();
          const lng1 = coord.latLng.lng();
  
          var myLatlng = new this.props.google.maps.LatLng(lat1,lng1);
          var marker = new this.props.google.maps.Marker({
              position: myLatlng,
              title: this.state.markers.hasOwnProperty(0) ? "End" : "Start",
              map: map,
              id: this.state.hazardId,
          });
          this.state.hazardId += 1;
          
          
          this.state.markers[marker.id] = marker;

          }
          else if (Object.keys(this.state.markers).length %2 == 1) {
            const lat1 = coord.latLng.lat();
            const lng1 = coord.latLng.lng();
    
            var myLatlng = new this.props.google.maps.LatLng(lat1,lng1);
            var marker = new this.props.google.maps.Marker({
                position: myLatlng,
                title: this.state.markers.hasOwnProperty(0) ? "End" : "Start",
                map: map,
                id: this.state.hazardId,
            });
            this.state.hazardId += 1;
          
          
            this.state.markers[marker.id] = marker;
            console.log(this.state)
            const coordsStart = {
              lat: this.state.markers[this.state.hazardId-2].getPosition().lat(),
              lng: this.state.markers[this.state.hazardId-2].getPosition().lng(),
            };

            const coordsEnd = {
              lat: this.state.markers[this.state.hazardId-1].getPosition().lat(),
              lng: this.state.markers[this.state.hazardId-1].getPosition().lng(),
            };


            const directionsService = new this.props.google.maps.DirectionsService();
            const directionsDisplay = new this.props.google.maps.DirectionsRenderer();
            //put directions renderer to render in the map
            directionsDisplay.setMap(map);

        //     //changing  request
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
            // //creating new directions request
            if (this.state.coords[0] !== null &&this.state.coords[1] !== null) {
                directionsService.route(request, function (result, status) {
                    if (status == "OK") {
                        directionsDisplay.setDirections(result);
                    }
                });
            }
          }
        
        console.log(Object.keys(this.state.markers).length);
    };
  
  
    render() {
  
      return (
        <div>
          <Map
            className="map"
            initialCenter={{ lat: 42.354310, lng: -71.091311 }}
            google={this.props.google}
            onClick={this.onMapClick}
            onReady={this.onMapReady}
            style={{width: "85%", height: "100%", position: "fixed"}}
            containerStyle={{position: "fixed", width: "100%", height:"90%", marginTop:"0vh"}}
            zoom={15}
          >
          </Map>
          <div style={{ width: 500, height: 500 }} id={this.props.id} />
          <div id="infowindow-content">
            <img src="" width="16" height="16" id="place-icon" />
            <span id="place-name" className="title"></span>
            <br />
            <span id="place-address"></span>
            <br />
            <span id="place-coord"></span>
          </div>
        </div>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAVWVu8_U0FfwgBiHVN3q-G5uCQNBAj7Y'
})(HazardsMap);