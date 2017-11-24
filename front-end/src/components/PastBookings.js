import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500} from 'material-ui/styles/colors';
class PastBookings extends Component {
  constructor(props) {
  super(props);
  this.state = {
    pastBookings : [
    {'PaymentID':'23556','BookingType':'Flight','BookingDate':'DAL'},
  ],
  }};
    render() {
        return (
            <div className="container-fluid p-3" style={{backgroundColor:'#E9ECEF',height: '100vh'}}>
              <div className="justify-content-start Text-big Text-bold">
                <h4>Past Bookings: </h4>
              </div> <hr/>
                <div className="card text-left">
                  <div className="card-body">
                    <h4 className="card-title">Flight</h4>
                    <h6 className="card-subtitle mb-2 text-muted">564992F</h6>
                    <p className="card-text">Booking Details</p>
                    <FlatButton label="View Details" labelColor={deepOrange500} className="card-link"/>
                  </div>
                </div>
            </div>
        );
    }
}

export default PastBookings;
