import React, {Component} from "react";
import axios from 'axios';

export default class HomePage extends Component {


  constructor(props){
    super(props);
    this.state = {
      reports : [],
    }

  }
  componentDidMount() {
      // need to make the initial call to getData() to populate
      // data right away
      this.getData();

      // Now we need to make it run at a specified interval
      setInterval(this.getData, 5000); // runs every 5 seconds.
  };

  getData(){
    async function loadData(){
      console.log("GETTING REPORT DATA");
      // do something to fetch data from a remote API.
      //
      axios.get(
        "/api/reports"
      ).then((response) =>{
        console.log(response.data);
        this.state.reports = response.data;
      }
    ).catch();

    };
    loadData();
    }


    render() {
        return (
            <div className="content-container">
              {this.state.reports}
            </div>
        )
    }
}
