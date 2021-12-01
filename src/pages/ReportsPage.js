import React, {Component} from "react";
import Navbar from "../components/Navbar";
import HazardContainer from "../components/HazardContainer";
import Button from 'react-bootstrap/Button';
import ReportModal from '../components/ReportModal';
import axios from "axios";
axios.defaults.baseURL = process.env.APP_URL;

export default class ReportsPage extends Component {
// <<<<<<< Updated upstream
    constructor(props){
      super(props);
      this.state = {
        showModal : false,
      }
    }
    handleModalClose = () => {
        this.setState({showModal: false});
    }

    handleModalOpen = () => {
        this.setState({showModal: true});
      }
//     componentDidMount() {
//         // need to make the initial call to getData() to populate
//         // data right away
//         this.getData();

//         // Now we need to make it run at a specified interval
//         setInterval(this.getData, 5000); // runs every 5 seconds.
//     };

//     getData(){
//       console.log("GETTING REPORT DATA");
//       // do something to fetch data from a remote API.
//       //
//       axios.get(
//         "/api/reports"
//       ).then((response) =>{
//         console.log(response.data);
//         this.state.reports = response.data;
//       }
//       ).catch()
// =======
    // handleClick() {
    //     const body = {creator: "Noah", waypoints: ["500", "234"], description: "a big rat in the road"};
    //     axios
    //     .get("http://localhost:3000/api/routes/")
    //     .then((res) => {
    //         /* eslint-disable no-console */
    //             console.log(res.data);
    //         /* eslint-enable no-console */
    //     })
    //     .catch(err => {
    //       // handle error
    //       // this.errors.push(err.response.data.error);
          
    //       /* eslint-disable no-console */
    //           console.log(err);
    //       /* eslint-enable no-console */
          
    //     });
    // };
    render() {
        return (
            <div className="content-container">
                <Navbar></Navbar>
                {/* {this.state.reports} */}
                <Button style={{right:10, bottom:10, position: "fixed"}} variant="primary" size="lg" onClick={this.handleModalOpen}>
                    Submit a Report
                </Button>
                <ReportModal 
                    show={this.state.showModal} 
                    handleClose={this.handleModalClose}
                />
                <HazardContainer/>
                
            </div>
        )
    }
}
