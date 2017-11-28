import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import HotelSearchNavBar from "./HotelSearchNavBar";
import HotelOptions from "./HotelOptions";
import HotelCardM from "./HotelCardM";

class Hotel extends Component {

    render() {
        return (
          <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
            <div className="row">
              <HotelSearchNavBar/>
            </div>
            <div className="d-flex p-2">
              <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/car-map.png"/></div>
                  <div className="pt-2 pr-2"><HotelOptions/></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/hotel-extra1.png"/></div>
                  <div className="pt-2 pr-2"><HotelCardM/></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><img src="/images/flight-extra1.png"/></div>
                  <div className="pt-3 pr-2"><img src="/images/hotel-extra.png"/></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(Hotel);
