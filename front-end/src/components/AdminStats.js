import React, {Component} from 'react';

import BarChartData from "./BarChartData";
class AdminStats extends Component {
  componentDidMount(){
      document.title = `Admin - Stats`;
  }
    render() {
        return (
            <div className="row justify-content-md-center">
              <div className=" row col-md-2 justify-content-md-center">

              </div>
              <div className=" row col-md-2 justify-content-md-center">
              <BarChartData />
              </div>
            </div>
        );
    }
}

export default AdminStats;
