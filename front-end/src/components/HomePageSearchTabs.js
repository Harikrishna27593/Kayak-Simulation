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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as API from '../api/API';
import '../App.css';
const customContentStyle = {
  width: '20%',
  maxWidth: 'none',
};
const styles = {
    marginLeft: 20,
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
    },
    display: 'inline-block',
    customWidth: {
    width: 200,
  },
};

const muiTheme = getMuiTheme({
  flatButton: {
  primaryTextColor: deepOrange500,
  },
  datePicker: {
  selectColor: deepOrange500,
  headerColor: deepOrange500,
  },
  timePicker: {
  selectColor: deepOrange500,
  headerColor: deepOrange500,
  },
  palette: {
         accent1Color: deepOrange500,
         selectedTextColor: fullWhite,
         canvasColor: fullWhite
     }
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
           hotelsRoomType:'Single',
      flightOptions:false,
      flightCabin:'Economy',
      flightAdultsCount:0,
      flightSeniorsCount:0,
      flightChildCount:0,
      fDesc:'Options',
      hotelOptions:false,
      hotelAdultsCount:0,
      hotelRoomsCount:0,
      hotelChildCount:0,
      hDesc:'Options',

        };
    }

    CarSearch=(event)=>{
        var res = {
            place: this.state.carPickupPlace,
            pickupdate: this.state.carsDatePickUp,
            dropoffdate: this.state.carsDateDropOff,

        };

        API.carAvailabilityCheck(res)
            .then((status) => {
                if (status === 204) {
                    API.carDetails(this.state.carPickupPlace,this.state.carsDatePickUp,this.state.carsDateDropOff)
                        .then((data) => {
                            this.setState({
                                carListings: data
                            });
                            var carDetails={};
                            carDetails.carPickupPlace=this.state.carPickupPlace;
                            carDetails.carsDatePickUp=this.state.carsDatePickUp;
                            carDetails.carsDateDropOff=this.state.carsDateDropOff;
                            carDetails.carsTimePickUp=this.state.carsTimePickUp;
                            carDetails.carsTimeDropOff=this.state.carsTimeDropOff;
                            this.props.handleCarDetails(carDetails);
                            this.props.handleCars(this.state.carListings);
                            console.log(this.state.carListings)
                        });
                }
                else {
                    //error message here
                }
            });

    };

    FlightSearch=(event)=>{

        var res = {
            placefrom: this.state.flightsFrom,
            placeto: this.state.flightsTo,
            departdate: this.state.flightsDateFrom
        };
        API.FlightAvailabilityCheck(res)
            .then((status) => {
                if (status ==204) {
                    alert("FLIGHT");
                    API.flightDetails(this.state.flightsFrom,this.state.flightsTo,this.state.flightsDateFrom,this.state.flightsDateTo,this.state.flightAdultsCount,this.state.flightChildCount,this.state.flightSeniorsCount,this.state.flightCabin)
                        .then((data) => {
                            this.setState({
                                flightListings: data
                            });
                            this.props.handleFlights(this.state.flightListings);
                            console.log(this.state.flightListings)
                        });
                }
                else
                    alert("No flight");
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
        this.setState({carsTimeDropOff: date});
    };
flightOptionsOpen = () => {this.setState({flightOptions: true});};
  flightOptionsClose = () => {this.setState({flightOptions: false});};
  handleFlightCabin = (event, index, flightCabin) => this.setState({flightCabin});
minusSeniors = (event) => {
  var mSenior=this.state.flightSeniorsCount-1;
  this.setState({flightSeniorsCount: mSenior});
};
plusSeniors = (event) => {
  var pSenior=this.state.flightSeniorsCount+1;
  this.setState({flightSeniorsCount: pSenior});
};
minusAdults = (event) => {
    var mAdult=0;
    if(this.state.flightAdultsCount>0) {
         mAdult = this.state.flightAdultsCount - 1;
    }
  this.setState({flightAdultsCount: mAdult});
};
plusAdults = (event) => {
  var pAdult=this.state.flightAdultsCount+1;
  this.setState({flightAdultsCount: pAdult});
};
minusChildren = (event) => {
  var mChild=this.state.flightChildCount-1;
  this.setState({flightChildCount: mChild});
};
plusChildren = (event) => {
  var pChild=this.state.flightChildCount+1;
  this.setState({flightChildCount: pChild});
};

HotelOptionsOpen = () => {this.setState({hotelOptions: true});};
hotelOptionsClose = () => {this.setState({hotelOptions: false});};
handleHotelRoomType = (event, index, hotelsRoomType) => this.setState({hotelsRoomType});
minusHotelRooms = (event) => {
  var hotelRoomsCount=this.state.hotelRoomsCount-1;
  this.setState({hotelRoomsCount: hotelRoomsCount});
};
plusHotelRooms = (event) => {
  var hotelRoomsP=this.state.hotelRoomsCount+1;
  this.setState({hotelRoomsCount: hotelRoomsP});
};
minusHotelAdults = (event) => {
  var mhAdult=this.state.hotelAdultsCount-1;
  this.setState({hotelAdultsCount: mhAdult});
};
plusHotelAdults = (event) => {
  var phAdult=this.state.hotelAdultsCount+1;
  this.setState({hotelAdultsCount: phAdult});
};
minusHotelChildren = (event) => {
  var mhotelChildCount=this.state.hotelChildCount-1;
  this.setState({hotelChildCount: mhotelChildCount});
};
plusHotelChildren = (event) => {
  var photelChildCount=this.state.hotelChildCount+1;
  this.setState({hotelChildCount: photelChildCount});
};
 flightOptionsSave = () => {
      let adultCount = this.state.flightAdultsCount,
      flightCabin = this.state.flightCabin;
      this.setState({flightOptions: false,
        fDesc:adultCount + ' ' + 'traveler(s)'+ ', ' + flightCabin,
      });
    };
    hotelOptionsSave = () => {
      let roomCount = this.state.hotelRoomsCount,
      roomType = this.state.hotelsRoomType;
      this.setState({hotelOptions: false,
        hDesc:roomCount + ' ' + 'Room(s)'+ ', ' + roomType,
      });
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
         const actions_Flight = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.flightOptionsClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.flightOptionsSave}
      />,
    ];
    const actions_Hotel = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.hotelOptionsClose}
    />,
    <FlatButton
      label="OK"
      primary={true}
      onClick={this.hotelOptionsSave}
    />,];
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
                            <TextField hintText="Where" style={styles} underlineShow={false} className="Text-Field"
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
                               <RaisedButton label={this.state.hDesc} className="Text-Field" onClick={this.HotelOptionsOpen} />
                            <MuiThemeProvider muiTheme={muiTheme}>
                              <Dialog
                                actions={actions_Hotel}
                                modal={true}
                                contentStyle={customContentStyle}
                                open={this.state.hotelOptions}>
                                  <div><h3>Room Type</h3></div>
                                  <DropDownMenu value={this.state.hotelsRoomType}
                                    onChange={this.handleHotelRoomType}>
                                    <MenuItem value={"Single"} primaryText="Single" />
                                    <MenuItem value={"Double"} primaryText="Double" />
                                    <MenuItem value={"Suite"} primaryText="Suite" />
                                  </DropDownMenu>
                                  <div><h3>Occupancy</h3></div><hr/>
                                  <div>
                                    <label className="mr-2" >Adults
                                        <button onClick={this.minusHotelAdults} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                        {this.state.hotelAdultsCount}
                                        <button onClick={this.plusHotelAdults} className="btn btn-outline-secondary btn-xs ml-2 mr-4">+</button>
                                    </label>
                                    <br/>
                                    <label className="mr-1">Rooms
                                        <button onClick={this.minusHotelRooms} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                        {this.state.hotelRoomsCount}
                                        <button onClick={this.plusHotelRooms} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                    </label>
                                    <br/>
                                    <label className="mr-1">Children
                                        <button onClick={this.minusHotelChildren} className="btn btn-outline-secondary btn-xs ml-3 mr-2">-</button>
                                        {this.state.hotelChildCount}
                                        <button onClick={this.plusHotelChildren} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                    </label>

                              </div>
                              </Dialog>
                              </MuiThemeProvider>
                            <span className="mr-4 mt-5 mb-5">
                              <RaisedButton
                                  backgroundColor={deepOrange500}
                                  color={fullWhite}
                                  style = {{height: '100px'}}
                                  icon={<Arrow color={fullWhite}/>}
                                  style={button}
                                  onClick={this.hotelSearch}/>
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
                                      className="Text-Field"/>
                          </span>
                            <span className="mr-4 mt-5 mb-5">
                          <TextField hintText="To Where?" style={styles}
                                     underlineShow={false}
                                     value={this.state.flightsTo}
                                     onChange={this.handleChangeFlightsTo}
                                     className="Text-Field"/>
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
                        <RaisedButton label={this.state.fDesc} className="Text-Field" onClick={this.flightOptionsOpen} />
                          <MuiThemeProvider muiTheme={muiTheme}>
                          <Dialog
                              actions={actions_Flight}
                              modal={true}
                              contentStyle={customContentStyle}
                              open={this.state.flightOptions}>
                                <div><h3>Cabin Class</h3></div>
                                <DropDownMenu className="mb-3"
                                  value={this.state.flightCabin}
                                  onChange={this.handleFlightCabin}
                                  style={styles.customWidth}
                                  autoWidth={false}>
                                  <MenuItem value={"Economy"} primaryText="Economy" />
                                  <MenuItem value={"Business"} primaryText="Business" />
                                  <MenuItem value={"First"} primaryText="First" />
                                </DropDownMenu>
                                <div><h3>Travelers</h3></div><hr/>
                                <div>
                                  <label className="mr-2" >Adults
                                      <button onClick={this.minusAdults} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                      {this.state.flightAdultsCount}
                                      <button onClick={this.plusAdults} className="btn btn-outline-secondary btn-xs ml-2 mr-4">+</button>
                                  </label>
                                  <br/>
                                  <label className="mr-1">Seniors
                                      <button onClick={this.minusSeniors} className="btn btn-outline-secondary btn-xs ml-4 mr-2">-</button>
                                      {this.state.flightSeniorsCount}
                                      <button onClick={this.plusSeniors} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                  </label>
                                  <br/>
                                  <label className="mr-1">Children
                                      <button onClick={this.minusChildren} className="btn btn-outline-secondary btn-xs ml-3 mr-2">-</button>
                                      {this.state.flightChildCount}
                                      <button onClick={this.plusChildren} className="btn btn-outline-secondary btn-xs ml-2 mr-5">+</button>
                                  </label>
                            </div>
                            </Dialog>
                            </MuiThemeProvider>
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
                                      className="Text-Field"
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
                          <span className="mr-4 ml-5 pl-5">
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
                           <span className="mr-4 ml-5">
 +                            <TimePicker style={styles}
                                format="ampm"
                                underlineShow={false}
                                hintText="drop-off at"
                                value={this.state.carsTimeDropOff}
                                onChange={this.handleChangecarsTimeDropOff}
                                className="Text-Field"/>
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