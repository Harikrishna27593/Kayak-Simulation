import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {deepOrange500,deepOrange300,fullWhite} from 'material-ui/styles/colors';
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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../api/API';
import '../App.css';

const styles = {
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
    },
    display: 'inline-block',
};

const muiTheme = getMuiTheme({
    flatButton: {
        primaryTextColor: deepOrange500,
    },
    datePicker: {
        selectColor: deepOrange500,
        headerColor: deepOrange500,
    },

});

const color ={
    color:deepOrange500,
};

const button ={
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
    },
    display: 'inline-block',
    backgroundColor:deepOrange500,
    lineHeight: '65px',
    lineWidth: '20px',
};

const tabBackground ={
    backgroundColor:fullWhite,
    color:fullWhite,
};


class HomePageSearchTabs extends Component {

    static propTypes = {
    };

    state = {

    };
    constructor(props) {
        super(props);
        this.state = {
            hotelPlace:'',
            hotelsDateFrom: null,
            hotelsDateTo: null,
            hotelsRooms:1,
            carPickupPlace:null,
            flightNumberOfAdults: 1,
            flightsDateFrom:null,
            flightsDateTo:null,
            carsDatePickUp:null,
            carsDateDropOff:null,
            carsTimePickUp:null,
            carsTimeDropOff:null,
            flightsFrom:null,
            flightsTo:null,
            carListings:[],
            hotelListings:[],
            flightListings:[],

        };
    }

    CarSearch=(event)=>{
        var res = {
            place: this.state.carPickupPlace,
            pickupdate: this.state.carsDatePickUp,
            dropoffdate: this.state.carsDateDropOff
        };

        API.carAvailabilityCheck(res)
            .then((status) => {
                if (status === 204) {
                    API.carDetails(this.state.carPickupPlace,this.state.carsDatePickUp,this.state.carsDateDropOff)
                        .then((data) => {
                            this.setState({
                                carListings: data
                            });
                            this.props.handleCars(this.state.carListings);
                            console.log(this.state.carListings)
                        });
                }
            });

    };

    FlightSearch=(event)=>{

        var res = {
            placefrom: this.state.flightsFrom,
            placeto: this.state.flightsTo,
            departdate: this.state.flightsDateFrom,
            arrivaldate: this.state.flightsDateTo
        };
        API.FlightAvailabilityCheck(res)
            .then((status) => {
                if (status ==204) {
                    alert("FLIGHT");
                    API.flightDetails(this.state.flightsFrom,this.state.flightsTo,this.state.flightsDateFrom,this.state.flightsDateTo)
                        .then((data) => {
                            this.setState({
                                flightListings: data
                            });
                            console.log(this.state.flightListings)
                        });
                }
            });

    };


    hotelSearch=(event)=>{
        var details={
            hotelPlace:this.state.hotelPlace,
            hotelsDateTo:this.state.hotelsDateTo,
            hotelsDateFrom:this.state.hotelsDateFrom,
            hotelsRooms:this.state.hotelsRooms
        };
        API.hotelDetails(details)
            .then((status) => {

                if(status===201)
                {
                    alert("Hotels are available");
                    API.getHotelDetails(this.state.hotelPlace,this.state.hotelsDateTo,this.state.hotelsDateFrom,this.state.hotelsRooms).
                    then((data)=>{
                        alert("inside Get");
                        this.setState({
                            hotelListings: data
                        });
                    })
                }
                else if(status===401) {
                    alert("No hotels available");
                    // API.getUserDetails().
                    // then((data)=>{
                    //     alert("Users Data");
                    //     // alert(data);
                    //     console.log(data);
                    // });
//            var hotel={
//     hotelId:121234,
//     Name:"BHAVAN GAURAV",
//     Address:"SJSU",
//     City:"san jose",
//     State:"CA",
//     Rooms:{
//         singleRoomPrice:456,
//         doubleRoomPrice:684,
//         suitRoomPrice:789
//     },
//     Ratings:5,
//     Reviews:"Very good place to stay",
//     Availability:"Yes",
//     hotelsDateFrom:"2018-04-20",
//     hotelsDateTo:"2018-06-25"
//            };
// API.addHotelListing(hotel).
// then((status1) =>{
//     if(status1===201)
//     alert("Succesfully Added to the hotel");
//
// })


                }
            });
    };
    handleChangeTab = (value) => {
        this.setState({ value: value,});
    };
    handleChangeHotelsDateFrom = (event, date) => {
        this.setState({hotelsDateFrom: date});
    };

    handleChangeHotelsDateTo = (event, date) => {
        this.setState({hotelsDateTo: date});
    };
    handleChangeHotelRooms = (event, index, hotelsRooms) => {
        this.setState({hotelsRooms});
    };
    handleChangeFlightsDateFrom = (event, date) => {
        this.setState({flightsDateFrom: date});
    };
    handleChangeFlightsDateTo = (event, date) => {
        this.setState({flightsDateTo: date,});
    };

    handleChangeFlightsFrom = (event, value) => {
        this.setState({flightsFrom: value});
    };
    handleChangeFlightsTo = (event, value) => {
        this.setState({flightsTo: value});
    };
    handleChangeFlightNumberOfAdults = (event, index, flightNumberOfAdults) => {
        this.setState({flightNumberOfAdults});
    };
    handleChangeCarsDatePickUp = (event, date) => {
        this.setState({carsDatePickUp: date,});
    };
    handleChangeCarsDateDropOff = (event, value) => {
        this.setState({carsDateDropOff: value,
        });
    };
    handleChangecarsTimePickUp = (event, date) => {
        this.setState({carsTimePickUp: date});
    };
    handleChangecarsTimeDropOff = (event, date) => {
        this.setState({carsTimePickUp: date});
    };

    componentWillMount(){
        // API.getUserDetails().
        // then((data)=>{
        //     alert("Users Data");
        //    // alert(data);
        //     console.log(data);
        // })
    }

    render() {
        return (
            <div className="container-fluid">
                <Tabs
                    inkBarStyle={{backgroundColor:deepOrange500}}
                    tabItemContainerStyle={tabBackground}
                    value={this.state.value}
                    onChange={this.handleChangeTab}>
                    <Tab
                        label={<span style={color}>HOTELS</span>}
                        icon={<Hotel color={deepOrange500}/>} value="Hotels">
                        <div style={{backgroundColor: '#E4E5EA'}}>

                         <span className="mr-4 ml-5 mt-5 mb-5">
                            <TextField hintText="Where" style={styles} underlineShow={false} className="Text-Area"
                                       value={this.state.hotelPlace}
                                       onChange={(event) => {
                                           this.setState({
                                               hotelPlace: event.target.value
                                           });
                                       }}/>
                                        </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                              <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Check-in"
                                        value={this.state.hotelsDateFrom}
                                        onChange={this.handleChangeHotelsDateFrom}
                                        className="Text-Area"
                                        underlineShow={false}
                            />
                             </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                              <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Check-out"
                                        value={this.state.hotelsDateTo}
                                        onChange={this.handleChangeHotelsDateTo}
                                        className="Text-Area"
                                        underlineShow={false}
                            />
                          </span>
                            </MuiThemeProvider>
                            {/* <DropDownMenu value={this.state.hotelsRooms} onChange={this.handleChangeHotelRooms}>
                              <MenuItem value={1} label="1 Room" primaryText="1" />
                              <MenuItem value={2} label="2 Rooms" primaryText="2" />
                              <MenuItem value={3} label="3 Rooms" primaryText="3" />
                              <MenuItem value={4} label="4 Rooms" primaryText="4" />
                              <MenuItem value={5} label="5 Rooms" primaryText="5" />
                              <MenuItem value={6} label="6 Rooms" primaryText="6" />
                              <MenuItem value={7} label="7 Rooms" primaryText="7" />
                              <MenuItem value={8} label="8 Rooms" primaryText="8" />
                            </DropDownMenu>*/}
                            <span className="mr-4 mt-5 mb-5">
                              <RaisedButton
                                  backgroundColor={deepOrange500}
                                  color={fullWhite}
                                  style = {{height: '100px'}}
                                  icon={<Arrow color={fullWhite}/>}
                                  style={button}
                                  onClick={this.HotelSearch}/>
                            </span>
                        </div>
                    </Tab>
                    <Tab
                        label={<span style={color}>FLIGHTS</span>}
                        icon={<ActionFlightTakeoff color={deepOrange500} />} value="Flights">
                        <div style={{backgroundColor: '#E4E5EA'}}>
                          <span className="mr-4 ml-5 mt-5 mb-5">
                            <TextField hintText="From Where?" style={styles}
                                       underlineShow={false}
                                       value={this.state.flightsFrom}
                                       onChange={this.handleChangeFlightsFrom}
                                       className="Text-Area"/>
                          </span>
                            <span className="mr-4 ml-5 mt-5 mb-5">
                          <TextField hintText="To Where?" style={styles}
                                     underlineShow={false}
                                     value={this.state.flightsTo}
                                     onChange={this.handleChangeFlightsTo}
                                     className="Text-Area"/>
                          </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                            <span className="mr-4 mt-5 mb-5">
                              <DatePicker style={styles}
                                          hintText="Depart"
                                          value={this.state.flightsDateFrom}
                                          onChange={this.handleChangeFlightsDateFrom}
                                          className="Text-Area"
                                          underlineShow={false}/>
                            </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Return"
                                        value={this.state.flightsDateTo}
                                        onChange={this.handleChangeFlightsDateTo}
                                        className="Text-Area"
                                        underlineShow={false}/>
                            </span>
                            </MuiThemeProvider>
                            {/*<DropDownMenu value={this.state.flightNumberOfAdults} onChange={this.handleChangeFlightNumberOfAdults}>
                            <MenuItem value={1} label="1 Adult" primaryText="1" />
                            <MenuItem value={2} label="2 Adults" primaryText="2" />
                            <MenuItem value={3} label="3 Adults" primaryText="3" />
                            <MenuItem value={4} label="4 Adults" primaryText="4" />
                            <MenuItem value={5} label="5 Adults" primaryText="5" />
                            <MenuItem value={6} label="6 Adults" primaryText="6" />
                            <MenuItem value={7} label="7 Adults" primaryText="7" />
                            <MenuItem value={8} label="8 Adults" primaryText="8" />
                          </DropDownMenu>*/}
                            <span className="mr-4 mt-5 mb-5">
                            <RaisedButton className="m-2"
                                          backgroundColor={deepOrange500}
                                          color={fullWhite}
                                          style = {{height: '100px'}}
                                          icon={<Arrow color={fullWhite} />}
                                          style={button}
                                          onClick={this.FlightSearch}
                            />
                          </span>
                        </div>
                    </Tab>
                    <Tab label="CARS" value="Cars"
                         label={<span style={color}>CARS</span>}
                         icon={<Car color={deepOrange500} />} >
                        <div style={{backgroundColor: '#E4E5EA'}}>
                        <span className="mr-4 ml-5 mt-5 mb-5">
                          <TextField hintText="Where" style={styles}
                                     underlineShow={false}
                                     className="Text-Area"
                                     value={this.state.carPickupPlace}
                                     onChange={(event) => {
                                         this.setState({
                                             carPickupPlace: event.target.value
                                         });
                                     }}/>
                        </span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        hintText="Pick-up on"
                                        underlineShow={false}
                                        className="Text-Area"
                                        value={this.state.carsDatePickUp}
                                        onChange={this.handleChangeCarsDatePickUp}/>
                          </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 mt-5 mb-5">
                            <DatePicker style={styles}
                                        underlineShow={false}
                                        hintText="drop-off on"
                                        value={this.state.carsDateDropOff}
                                        onChange={this.handleChangeCarsDateDropOff}
                                        className="Text-Area"/>
                          </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 mt-5 mb-5">
                            <TimePicker style={styles}
                                        format="ampm"
                                        underlineShow={false}
                                        hintText="Pick-up at"
                                        value={this.state.carsTimePickUp}
                                        onChange={this.handleChangecarsTimePickUp}
                                        className="Text-Area"/>
                          </span>
                            </MuiThemeProvider>
                            <MuiThemeProvider muiTheme={muiTheme}>
                          <span className="mr-4 mt-5 mb-5">
                            <TimePicker
                                format="ampm"
                                underlineShow={false}
                                hintText="drop-off at"
                                value={this.state.carsTimeDropOff}
                                onChange={this.handleChangecarsTimeDropOff}
                                className="Text-Area"/>
                          </span>
                            </MuiThemeProvider>
                            <span className="mr-4 mt-5 mb-5">
                          <RaisedButton
                              backgroundColor={deepOrange500}
                              color={fullWhite}
                              style = {{height: '100px'}}
                              icon={<Arrow color={fullWhite}/>}
                              style={button}
                              onClick={this.CarSearch}
                          />
                        </span>
                        </div>
                        {console.log("Cars - Date pick -up: "+this.state.carsDatePickUp)}
                        {console.log("Cars - Date drop-off: "+this.state.carsDateDropOff)}
                        {console.log("Cars - Time pick-up: "+this.state.carsTimePickUp)}
                        {console.log("Cars - Time drop-off: "+this.state.carsTimeDropOff)}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default HomePageSearchTabs;