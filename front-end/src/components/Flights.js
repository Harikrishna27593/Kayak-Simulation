import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import FlightSearchNavBar from "./FlightSearchNavBar";
import FlightOptions from "./FlightOptions";
import FlightCard from "./FlightCard";

class Flight extends Component {

    render() {
        return (
          <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
            <div className="row">
              <FlightSearchNavBar/>
            </div>
            <div className="d-flex p-2">
              <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/flight-map.png"/></div>
                  <div className="pt-2 pr-2"><FlightOptions/></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><FlightCard flightList={this.props.flightList}/></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/flight-extra.png"/></div>
                  <div className="pt-2 pr-2"><img src="/images/flight-extra1.png"/></div>
                  <div className="pt-2 pr-2"><img src="/images/flight-extra2.png"/></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(Flight);
