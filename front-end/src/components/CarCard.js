import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import BillingMain from "./BillingMain";
const cardStyle = {
    display: 'block',
    width: '60vw',
    height: '16vw',
};
class AdminListings extends Component {
    constructor(props) {
        super(props);
        this.state = {

            carResults : []
            // {'carPrice':'455','CarType':'Economy','doors':'4','people':'4','bags':'2','Img':'/images/car.png','carPlace':'OAK'},
            // {'carPrice':'333','CarType':'SUV','doors':'6','people':'8','bags':'2','Img':'/images/suv.png','carPlace':'SFO'},
            // {'carPrice':'678','CarType':'SUV','doors':'4','people':'8','bags':'4','Img':'/images/suv.png','carPlace':'SFO'},
            // {'carPrice':'455','CarType':'compact','doors':'2','people':'2','bags':'2','Img':'/images/car1.png','carPlace':'MAA'}],
            //
        };
    }

    CarPayment=(id,price)=> {
      alert(id);
     // this.props.history.push(<BillingMain/>);
        var carDetails={};
        carDetails.id=id;
        carDetails.price=price;
        this.props.carPayment(carDetails);
    };


    componentWillMount()
    {
        console.log(this.props.carList);
        console.log(this.state.carResults);
        this.setState({
            carResults:this.props.carList
        });
        console.log(this.state.carResults);

    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.carResults.map( (car, index) => (
                    <Card key={index} style={cardStyle} className="row mb-2">
                        <div className="row justify-content-start">
                            <div className="col-md-9">
                                <div className="row mt-3 ml-3 justify-content-start">
                                    <div className="col-md-4 justify-content-start">
                                        <img src={car.Img}/>
                                    </div>
                                    <div className="col-md-4 justify-content-start">
                                        <h3 className="justify-content-start">{car.carType}</h3>
                                        <div className="form-inline">
                                            <p className="pr-2">{car.peopleCount}  </p>
                                            <p className="pr-2">{car.bagCount}  </p>
                                            <p className="pr-2">{car.doorCount}  </p>
                                        </div>
                                        <div className="pr-2 form-inline">
                                           <img className="responsive" src='/images/car-place.png'/>
                                            <p className="text-muted mt-3">{car.carPlace}</p>
                                            <p className="pl-2 mt-3">Shuttle </p>
                                        </div>
                                        <div className="col-md-2 justify-content-start">
                                            <img src='/images/great-deal.png'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 border-left justify-content-end">
                                <h3 style={{color:'#20BF7C'}} className="mt-3">${car.carPrice}</h3>
                                <h5>Total</h5><br/>
                                <RaisedButton
                                    label="View Deal"
                                    backgroundColor={'#F52E05'}
                                    label={<span style={{color:'#FFFFFF'}} className='Text-bold'>View Deal</span>}
                                    onClick={() => this.CarPayment(car.id,car.carPrice)}
                                />
                                <br/><br/><br/>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    }
}
export default AdminListings;
{/*}<Card style={cardStyle}>
    <div className="d-flex flex-row justify-content-between">
      <div className="d-flex flex-column bg-info">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column bg-info">
            <h3>car</h3>
          </div>
          <div className="d-flex align-items-end flex-column bg-info">
            <div className="pt-2 pr-2">
              <img src="/images/car.png"/>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-end flex-column bg-primary border-left">
        <vr/>
        <div className="pt-2 pr-2 ">
            <RaisedButton label="View Deal" className="ml-5"/>
        </div>
      </div>
    </div>
</Card>*/}