import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AdminUsers from "./AdminUsers";
import AdminStats from "./AdminStats";
import AdminBills from "./AdminBills";
import AdminHome from "./AdminHome";
import AdminListingsMain from "./AdminListingsMain";
import BarChartData from "./BarChartData";
import Menu from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
class Admin extends Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        isStatsPage:false,
        isListingPage:false,
        isUsersPage:false,
        isBillsPage:false,
        isHomePage:true,
      };
    }
handleToggle = () => this.setState({open: !this.state.open});
 handleStatsPage = () => this.setState({
   open: false,
   isStatsPage:true,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:false,
 });
 handleListings = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:true,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:false,
 });
 handleUsers = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:true,
   isBillsPage:false,
   isHomePage:false,
 });
 handleBills = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:true,
   isHomePage:false,
 });
 handleHome = () => this.setState({
   open: false,
   isStatsPage:false,
   isListingPage:false,
   isUsersPage:false,
   isBillsPage:false,
   isHomePage:true,
 });

 addAdmin = (AdminToAdd) => {
   this.props.addAdmin(AdminToAdd);
 }


    render() {
        return (
          <div>
          <div className="row mr-5 col-md-10 justify-content-md-start">
          <Menu
            onClick={this.handleToggle}
            viewBox="0 0 20 20"
          />
          <Drawer
            docked={true}
            zDepth={4}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onClick={this.handleStatsPage}>Stats Page</MenuItem>
            <MenuItem onClick={this.handleListings}>Manage Listings</MenuItem>
            <MenuItem onClick={this.handleUsers}>Manage Users</MenuItem>
            <MenuItem onClick={this.handleBills}>Search Payment info</MenuItem>
            <MenuItem onClick={this.handleHome}>Home</MenuItem>
          </Drawer>
          </div>
          <div className="row ml-5 mt-5 col-md-10 justify-content-md-center">
          {
            this.state.isStatsPage
            ?<AdminStats />
            :null
          }
          {
            this.state.isListingPage
            ?<AdminListingsMain />
            :null
          }
          {
            this.state.isHomePage
            ?<AdminHome addAdmin={this.addAdmin}/>
            :null
          }
          {
            this.state.isBillsPage
            ?<AdminBills />
            :null
          }
          {
            this.state.isUsersPage
            ?<AdminUsers />
            :null
          }
          </div>
      </div>
        );
    }
}

export default withRouter(Admin);
