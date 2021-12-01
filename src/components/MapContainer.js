import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import Autocomplete from "../components/Autocomplete";
import RouteModal from "../components/RouteModal";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      startAddress: '',
      endAddress: '',
      startCoordinates: {},
      endCoordinates: {},
      showModal: false,
      endpoints: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
 
  // onMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });
 
  // onMapClicked = (props) => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     })
  //   }
  // };

  onMapReady = (mapProps, map) => {
    const directionsService = new this.props.google.maps.DirectionsService();
    const directionsDisplay = new this.props.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    let routeButton = document.getElementById("route-button");
    routeButton.addEventListener("click", () => {
      geocodeByAddress(this.state.startAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({startCoordinates: latLng});
        geocodeByAddress(this.state.endAddress)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          this.setState({endCoordinates: latLng});
          let request = {
            origin: this.state.startCoordinates,
            waypoints: this.state.waypoints,
            destination: this.state.endCoordinates,
            travelMode: "BICYCLING",
          };
          console.log(this.state.startCoordinates);
          console.log(this.state.endCoordinates);
          
          directionsService.route(request, function (result, status) {
            if (status == "OK") {
              directionsDisplay.setDirections(result);
            }
          });
        })
        .catch(error => console.error('Error', error));
      })
      .catch(error => console.error('Error', error));
    })
  }

  handleStartChange = address => {
    this.setState({ startAddress: address });
  };
 
  handleStartSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({ startAddress: address }, () => {console.log(this.state.startAddress)});
      })
      .catch(error => console.error('Error', error));
  };

  handleEndChange = address => {
    this.setState({ endAddress: address });
  };
 
  handleEndSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        this.setState({ endAddress: address }, () => {console.log(this.state.endAddress)});
      })
      .catch(error => console.error('Error', error));
  };

  handleModalClose = () => {
    this.setState({showModal: false});
  }

  handleModalOpen = () => {
    geocodeByAddress(this.state.startAddress)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      this.setState({startCoordinates: latLng});
      geocodeByAddress(this.state.endAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({endCoordinates: latLng});
        this.setState({showModal: true});
      })
      .catch(error => console.error('Error', error));
    })
    .catch(error => console.error('Error', error));
  }
 
  render() {
    return (
      <div>
        <div style={{display: "flex"}}>
          <div style={{width: "80%", height: "20vh"}}>
            <div style={{
              zIndex: 50, 
              position: "absolute", 
              width: "68%", 
              height: "5vh", 
              alignItems: "top",
              display: "flex",
              marginTop:"5vh"
            }}>
                <div style={{marginLeft:"15%"}}>Start:</div>
                <Autocomplete
                  address={this.state.startAddress}
                  handleChange={this.handleStartChange}
                  handleSelect={this.handleStartSelect}
                />
            </div>
            <div style={{zIndex: 49, 
              position: "absolute", 
              width: "68%", 
              height: "5vh", 
              display: "flex",
              marginTop: "12vh"
            }}>
              <div style={{marginLeft:"15%"}}>End:</div>
              <Autocomplete
                address={this.state.endAddress}
                handleChange={this.handleEndChange}
                handleSelect={this.handleEndSelect}
              />
            </div>
        </div>
          <div style={{width:"20%", height: "20vh"}}>
              <button id="route-button" style={{marginTop: "8vh", marginLeft: "0vw"}}>View Route</button>
              <button id="finalize-button" onClick={this.handleModalOpen}>Finalize Route</button>
          </div>
        </div>
        <Map
            id="map" 
            google={this.props.google}
            onClick={this.onMapClicked}
            onReady={this.onMapReady}
            style={{width: "85%", height: "80%", position: "fixed"}}
            containerStyle={{position: "fixed", width: "100%", height:"100%", marginTop:"0vh"}}
            initialCenter={{ lat: 42.353276, lng: -71.092876 }}
            zoom={15.1}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControl={false}
        >
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow> */}
        </Map>
        <RouteModal 
          show={this.state.showModal} 
          handleClose={this.handleModalClose}
          startAddress={this.state.startAddress}
          endAddress={this.state.endAddress}
          startCoords={this.state.startCoordinates}
          endCoords={this.state.endCoordinates}
        />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBAVWVu8_U0FfwgBiHVN3q-G5uCQNBAj7Y'
})(MapContainer);