import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
const cardStyle = {
        display: 'block',
        width: '54vw',
        height: '11vw',
    };
class FlightCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
  flightID:'',
  temp:[{ArrivalDate:"2018-01-21",
      ArrivalTime:"3:08 PM",
      DepartureDate:"2018-01-21",
      DepartureTime:"2:17 AM",
      JourneyTime:"12:51",
      destination:"Kansas",
      flightPrice:"457",
      id:"FIH748",
      operator:"Emirates",
      origin:"Newjersy",
      type:"Nonstop",
  }]
  };
  }

  componentWillMount(){
    console.log(this.props.flightResults);
  };

  selectFlight = (ID) => {
    this.setState({flightID: ID});
    console.log("flightID here: "+this.state.flightID);
  };
//this.props.flightResults
    render() {
        return (
         <div className="container-fluid">
         {this.props.flightResults.map( (flight, index) => (
            <Card style={cardStyle} className="row mb-2">
              <div className="row justify-content-start">
                  <div className="col-md-9">
                    <div className="row mt-3 ml-3 justify-content-start">
                          <div className="col-md-2 justify-content-start mt-3">
                              <img src={flight.img}/><br/>
                              <p className="pr-2 Text-bold">{flight.operator}</p>
                          </div>
                          <div className="col-md-10  justify-content-start mt-3">
                            <div className="form-inline">
                              <p className="pr-2 pl-2 Text-bold">{flight.DepartureTime}</p>
                              <img className="pr-4 pl-5" src="/images/line.png"/>
                                <p className="pr-2 pl-3 Text-bold">{flight.ArrivalTime}</p>
                                <p className="pr-2 pl-4 Text-bold">{flight.JourneyTime}</p>
                            </div>
                            <div className="form-inline">
                              <p className="pr-5 Text-bold">{flight.origin}</p>
                              <p className="pr-5 pl-2 Text-bold text-muted">{flight.type}</p>
                              <p className="pr-2 Text-bold">{flight.destination}</p>
                            </div>
                          </div>

                    </div>
                  </div>
              <div className="col-md-3 border-left justify-content-end">
                <h3 style={{color:'#20BF7C'}} className="mt-3">${flight.flightPrice}</h3>
                <h5>KAYAK</h5><br/>
                <RaisedButton
                  label="Book Deal"
                  backgroundColor={'#F52E05'}
                  label={<span style={{color:'#FFFFFF'}} className='Text-bold'>Book Deal</span>}
                  onClick={() =>this.selectFlight(flight.flightID)}/>
                  {console.log("flightID here: "+this.state.flightID)}
                <br/><br/><br/>
              </div>
            </div>
            </Card>
          ))}
        </div>
        );
    }
}
export default FlightCard;
