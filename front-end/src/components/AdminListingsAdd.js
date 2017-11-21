import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {deepOrange500,fullWhite,blue300,cyan500} from 'material-ui/styles/colors';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Hotel from 'material-ui/svg-icons/maps/hotel';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../api/API';


const styles = {
  marginLeft: 20,
  headline: {
  fontSize: 24,
  paddingTop: 16,
  marginBottom: 12,
  fontWeight: 5000,
  },
};
const color ={
  color:deepOrange500,
};

class HomePageSearchTabs extends Component {

    static propTypes = {

    };
    componentDidMount(){
        document.title = `Admin - Listings`;
    }
    state = {

    };
    constructor(props) {
    super(props);
    this.state = {
      value: 'Hotels',
      HotelId:0,
      HotelName:'',
      HotelAddress:'',
      HotelCity:'',
      HotelState:'',
      HotelPrice:0,
      FlightId:0,
      FilghtOperator :'',
        FilghtDepDate:null,
        FilghtArrDate:null,
      FilghtDepTime :null,
      FilghtArrTime :null,
      FLightOrigin :'',
      FLightDest:'',
      FlightPrice:0,

    };
  }
  handleChangeTab = (value) => {this.setState({ value: value,});
  };
  AddHotelId = (event) => {this.setState({HotelId: event.target.value});};
  AddHotelName = (event) => {this.setState({HotelName: event.target.value});};
  AddHotelAddress = (event) => {this.setState({HotelAddress: event.target.value});};
  AddHotelCity = (event) => {this.setState({HotelCity: event.target.value});};
  AddHotelState = (event) => {this.setState({HotelState: event.target.value});};
  AddHotelPrice = (event) => {this.setState({HotelPrice: event.target.value});};
  addHotelListing = () => {
    var hotelDetails={
      HotelId:this.state.HotelId,
      HotelName:this.state.HotelName,
      HotelAddress:this.state.HotelAddress,
      HotelCity:this.state.HotelCity,
      HotelState:this.state.HotelState,
      HotelPrice:this.state.HotelPrice,
    };
    console.log(hotelDetails);
  };

  AddFlightId = (event) => {this.setState({FlightId: event.target.value});};
  AddFilghtOperator = (event) => {this.setState({FilghtOperator : event.target.value});};
  AddFilghtDepTime = (event, date) => {this.setState({FilghtDepTime: date});};
  AddFilghtArrTime = (event, date) => {this.setState({FilghtArrTime: date});};
  AddFLightOrigin = (event) => {this.setState({FLightOrigin: event.target.value});};
  AddFLightDest = (event) => {this.setState({FLightDest: event.target.value});};
  AddFlightPrice = (event) => {this.setState({FlightPrice: event.target.value});};
  addFlightListing = () => {
    var FlightDetails={
      FlightId:this.state.FlightId,
      FilghtOperator:this.state.FilghtOperator,
        FilghtDepDate:this.state.FilghtDepDate,
        FilghtArrDate:this.state.FilghtArrDate,
      FilghtDepTime:this.state.FilghtDepTime,
      FilghtArrTime:this.state.FilghtArrTime,
      FLightOrigin:this.state.FLightOrigin,
      FLightDest:this.state.FLightDest,
      FlightPrice:this.state.FlightPrice,
    }
    console.log(FlightDetails);

      API.AddFlightListing(FlightDetails)
          .then((status) => {
              if (status ==204) {
                  alert("FLIGHT");
              }
          });


  };
  componentWillMount(){
    this.setState({
      HotelPrice: this.state.HotelPrice,
    });
    }

    render() {
        return (
            <div className="container-fluid">
            <Tabs
            styles={color}
              value={this.state.value}
              onChange={this.handleChangeTab}>
                    <Tab label="HOTELS" backgroundColor={deepOrange500} icon={<Hotel />} value="Hotels">
                      <div>
                        <Paper zDepth={1}>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="ID"
                            onChange={this.AddHotelId}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="Name"
                            onChange={this.AddHotelName}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="Address"
                            onChange={this.AddHotelAddress}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="City"
                            onChange={this.AddHotelCity}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="State"
                            onChange={this.AddHotelState}/>
                        <TextField className="mr-4 m1-4"
                            floatingLabelText="Price in $"
                            type="number"
                            onChange={this.AddHotelPrice}/>
                        <Divider/>
                        <RaisedButton className="m-4"
                        label = "Add Listing"
                        labelColor ={fullWhite}
                        backgroundColor={cyan500}
                        onClick={this.addHotelListing}
                        />
                          </Paper>
                      </div>
                    </Tab>
                    <Tab label="FLIGHTS" icon={<ActionFlightTakeoff />} value="Flights">
                      <div>
                      <Paper zDepth={1}>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="ID"
                          onChange={this.AddFlightId}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Operator"
                          onChange={this.AddFilghtOperator}/>
                      <TimePicker
                        format="ampm"
                        hintText="Departure Time"
                        value={this.state.FilghtDepTime}
                        onChange={this.AddFilghtDepTime}
                      />
                      <TimePicker
                        format="ampm"
                        hintText="Arrival Time"
                        value={this.state.FilghtArrTime}
                        onChange={this.AddFilghtArrTime}
                      />
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Origin"
                          onChange={this.AddFLightOrigin}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Destination"
                          onChange={this.AddFLightDest}/>
                      <TextField className="mr-4 m1-4"
                          floatingLabelText="Price in $"
                          type="number"
                          onChange={this.AddFlightPrice}/>
                      <Divider/>
                      <RaisedButton className="m-4"
                      label = "Add Listing"
                      labelColor ={fullWhite}
                      backgroundColor={cyan500}
                      onClick={this.addFlightListing}
                      />
                        </Paper>
                      </div>
                    </Tab>
                    <Tab label="CARS" value="Cars" icon={<Car />} >
                      <div>
                      <Paper zDepth={1}>
                        </Paper>
                      </div>
                    </Tab>
              </Tabs>
            </div>
        );
    }
}

export default HomePageSearchTabs;
