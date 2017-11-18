import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {fullWhite} from 'material-ui/styles/colors';
import Navbar from "./Navbar";
import * as API from '../api/API';
import HomePageSearchTabs from "./HomePageSearchTabs";
import BillingMain from "./BillingMain";
import MyAccountHome from "./MyAccountHome";
import HomePageTabs from "./HomePageTabs";
import Admin from "./Admin";
import Hotels from "./Hotels";
import Flights from "./Flights";
import UserProfile from "./UserProfile";
import Cars from "./Cars";
import '../App.css';
const fontSize = {
    fontSize: 45,
    color:fullWhite,
    fontWeight:30
};
class NewerHomePage extends Component {
    state = {
        carListings:[]
    };

    handleCars=(cardata) =>{
        this.setState({
            carListings:cardata
        });
        console.log(this.state.carListings);
        this.props.history.push("/Cars");
    };

    render() {
        return (
            <div className="container-fluid" >
                <Route exact path="/" render={() => (
                    <div className='LandingPage-background' >
                        <div className="row col-md-12 justify-content-center" >
                            <div className="col-md-2 justify-content-start pt-5" >
                                <img src="/images/kayaklogo.png" />
                            </div>
                            <div className="col-md-8 justify-content-start pt-5" >
                                <HomePageTabs/>
                            </div>
                            <div className="col-md-2 justify-content-start pt-5" >
                                <MyAccountHome />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="row col-md-12 justify-content-center" >
                            <h1 style={fontSize}>Search hundreds of travel sites at once</h1>
                        </div><br/>
                        <div className="row justify-content-center">
                            <div className="col-md-11 justify-content-center">
                                <HomePageSearchTabs handleCars={this.handleCars} />
                            </div>
                        </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                )}/>
                <Route exact path="/admin" render={() => (
                    <Admin/>
                )}/>
                <Route exact path="/Hotels" render={() => (
                    <Hotels/>
                )}/>
                <Route exact path="/Flights" render={() => (
                    <Flights/>
                )}/>
                <Route exact path="/Cars" render={() => (
                    <Cars carList={this.state.carListings}/>
                )}/>
                <Route exact path="/billing" render={() => (
                    <BillingMain/>
                )}/>
                <Route exact path="/UserProfile" render={() => (
                    <UserProfile/>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);