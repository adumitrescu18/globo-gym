import React, {Component} from "react";
import Navbar from "../components/Navbar";
import HazardsMap from "../components/HazardsMap";

export default class HazardsPage extends Component {
    render() {
        return (
            <div className="content-container">
                <Navbar></Navbar>
                <HazardsMap />
            </div>
        )
    }
}