import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import CarSearchNavBar from "./CarSearchNavBar";
import CarOptions from "./CarOptions";
import CarCard from "./CarCard";
class Cars extends Component {

    render() {
        return (
            <div className="container-fluid " style={{backgroundColor: '#E4E5EA'}}>
                <div className="row">
                    <CarSearchNavBar/>
                </div>
                <div className="d-flex p-2">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/car-map.png"/></div>
                            <div className="pt-2 pr-2"><CarOptions/></div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><CarCard  carList={this.props.carList}  /></div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="pt-2 pr-2"><img src="/images/compare.png"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Cars);