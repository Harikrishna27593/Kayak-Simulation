import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
const cardStyle = {
        display: 'block',
        width: '54vw',
        height: '11vw',
    }
class FlightCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
    flightResults : [
   // {'flightPrice':'455','from':'SFO','to':'DAL','Departure':'4:00 pm','Arrival':'2:00 am','img':'/images/united-flight.png','totalTime':'3h 20m','type':'nonstop','Airline':'United','flightID':'SEO456'},
    //{'flightPrice':'676','from':'MAA','to':'GHT','Departure':'4:33 pm','Arrival':'2:06 am','img':'/images/india-flight.png','totalTime':'16h 20m','type':'1 stop','Airline':'Air India','flightID':'FTU677'},
    //{'flightPrice':'777','from':'HTU','to':'JUK','Departure':'9:00 pm','Arrival':'7:00 am','img':'/images/hawaii-flight.png','totalTime':'7h 7m','type':'2 stops','Airline':'Hawaiian','flightID':'FGT654'},
  ],
  flightID:'',
  };
  }

    componentWillMount()
    {
        console.log(this.props.flightList);
        console.log(this.state.flightResults);
        this.setState({
            flightResults:this.props.flightList
        });
        console.log(this.state.flightResults);

    }


  selectFlight = (ID) => {
    this.setState({flightID: ID});
    console.log("flightID here: "+this.state.flightID);

  };
    render() {
        return (
         <div className="container-fluid">
         {this.state.flightResults.map( (flight, index) => (
            <Card style={cardStyle} className="row mb-2">
              <div className="row justify-content-start">
                  <div className="col-md-9">
                    <div className="row mt-3 ml-3 justify-content-start">
                          <div className="col-md-4 justify-content-start mt-3">
                              <img src={flight.img}/><br/>
                              <p className="pr-2 Text-bold">{flight.operator}</p>
                          </div>
                          <div className="col-md-8 justify-content-start mt-3">
                            <div className="form-inline">
                              <p className="pr-2 Text-bold">{flight.Departure}</p>
                              <img className="pr-2 pl-2" src="/images/line.png"/>
                              <p className="pr-2 Text-bold">{flight.Arrival}</p>
                              <p className="pr-2 pl-2 Text-bold">{flight.totalTime}</p>
                            </div>
                            <div className="form-inline">
                              <p className="pr-5 Text-bold">{flight.from}</p>
                              <p className="pr-5 pl-2 Text-bold text-muted">{flight.type}</p>
                              <p className="pr-2 Text-bold">{flight.to}</p>
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
