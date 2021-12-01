import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Marker, Map, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ReportMap from '../components/ReportMap'
import './ReportModal.css';
import axios from "axios";

export class ReportModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          center: { lat: 42.353276, lng: -71.092876 },
          markers: [],
          hazardId: 0,
          directionsService: '',
          directionsDisplay: '',
          type: '',
          description: ''
        };
      }

    handleSubmit = () => {
        console.log("entering!");
        console.log(this.state.markers);
        if (this.state.markers.length == 2) {
            const coordsStart = {
                lat: this.state.markers[0].getPosition().lat(),
                lng: this.state.markers[0].getPosition().lng(),
              };
      
              const coordsEnd = {
                lat: this.state.markers[1].getPosition().lat(),
                lng: this.state.markers[1].getPosition().lng(),
              };
            const body = {
                creator: localStorage.getItem("globobikes_username"),
                coordinates: [coordsStart, coordsEnd],
                description: this.state.description,
                type: this.state.type,
                // private: this.state.privacy === '1' ? true : false
            }
            console.log("applying!");
            axios
            .post("/api/reports/", body)
            .then((res) => {
                    this.props.handleClose();
                /* eslint-disable no-console */
                    console.log(res.data);
                /* eslint-enable no-console */
            })
            .catch(err => {
            // handle error
            // this.errors.push(err.response.data.error);
            
            /* eslint-disable no-console */
                console.log(err);
            /* eslint-enable no-console */
            });
        }
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
    
          console.log(this.state.markers);
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
                <Modal show={this.props.show} onHide={this.props.handleClose} style={{width: "100vw", margin: 0, maxWidth: "none"}}>
                    <Modal.Header closeButton>
                    <Modal.Title>New Report By @{localStorage.getItem("globobikes_username")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" style={{height: "40vh"}}>
                                <ReportMap onMapClick={this.onMapClick} onMapReady={this.onMapReady}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type of Hazard</Form.Label>
                                <Form.Control type="text" onChange={(val) => this.setState({type: val.target.value})} placeholder="Construction" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={2} onChange={(val) => this.setState({description: val.target.value})} placeholder="no bike paths..."/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBAVWVu8_U0FfwgBiHVN3q-G5uCQNBAj7Y'
  })(ReportModal);