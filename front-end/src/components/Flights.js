import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import FlightSearchNavBar from "./FlightSearchNavBar";
import FlightOptions from "./FlightOptions";
import FlightCard from "./FlightCard";

class Flight extends Component {
  constructor(props) {
  super(props);
  this.state = {
    filterPrice:'',
     flightResults :[],
      totalFlightsResults:[]
  //   {'flightPrice':'455','from':'SFO','to':'DAL','Departure':'4:00 pm','Arrival':'2:00 am','img':'/images/united-flight.png','totalTime':'3h 20m','type':'nonstop','Airline':'United','flightID':'SEO456'},
  //   {'flightPrice':'676','from':'MAA','to':'GHT','Departure':'4:33 pm','Arrival':'2:06 am','img':'/images/india-flight.png','totalTime':'16h 20m','type':'1 stop','Airline':'Air India','flightID':'FTU677'},
  //   {'flightPrice':'777','from':'HTU','to':'JUK','Departure':'9:00 pm','Arrival':'7:00 am','img':'/images/hawaii-flight.png','totalTime':'7h 7m','type':'2 stops','Airline':'Hawaiian','flightID':'FGT654'},
  // ],
}};
  filterOption = (filterPrice) => {
    console.log("filterPrice in Flights: "+filterPrice);
    this.setState({filterPrice: filterPrice});
      var priceFilterArray = this.state.totalFlightsResults.filter(val => {return val.flightPrice < filterPrice;});
    console.log("After Filter: "+priceFilterArray);
    this.setState({flightResults: priceFilterArray});
  };
    componentWillMount()
    {
        this.setState({
            flightResults:this.props.flightList,
            totalFlightsResults:this.props.flightList
        });
        console.log(this.state.FlightResults);

    }
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
                  <div className="pt-2 pr-2"><FlightOptions filterOption={this.filterOption}/></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="pt-2 pr-2"><FlightCard flightResults={this.state.flightResults} filterPrice={this.state.filterPrice}/></div>
                </div>
                <div className="d-flex flex-column justify-content-end">
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
