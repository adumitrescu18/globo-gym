import React, {Component} from "react";
import MapContainer from "../components/MapContainer";
import Addressbar from "../components/Addressbar";

export default class RoutePage extends Component {

    render() {
        
        return (
            <div
            className="content-container">
                {/* <Addressbar /> */}
                <MapContainer />
            </div>
        )
    }
}