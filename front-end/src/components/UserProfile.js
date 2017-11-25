import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import BillingNavBar from "./BillingNavBar";
import UpdatedProfile from "./UpdatedProfile";
import BlankProfile from "./BlankProfile";
import PastBookings from "./PastBookings";
import FutureBookings from "./FutureBookings";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Alert from 'material-ui/svg-icons/alert/warning';
import {red100,red500,deepOrange500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isUpdated : true,
          open: false,
      };
    }
    handleOpen = () => {this.setState({open: true});};
    handleClose = () => {this.setState({open: false});};
    handleDelete = () => {
        this.setState({open: false});
        //API call to delete session and user record
        this.props.history.push("/");
    };
    render() {
        const actions = [
            <FlatButton
                label="YES"
                onClick={this.handleDelete}
            />,
            <FlatButton
                label="NO"
                onClick={this.handleClose}
            />,
        ];
        return (
            <div className="container-fluid">
              <div className="row">
                <BillingNavBar/>
              </div>
                <div className="row justify-content-end pt-2">
                    <FlatButton
                        hoverColor={red100}
                        labelPosition="before"
                        label={<span style={{color:red500}}>Delete My Account</span>}
                        primary={true}
                        onClick={this.handleOpen}
                    />
                </div>
              <div className="row">
                <div className="col-lg-4 pt-3 justify-content-start">
                {
                  this.state.isUpdated
                  ?<UpdatedProfile/>
                  :<BlankProfile/>
                }
                </div>
                <div className="col-lg-4 pt-3 justify-content-start">
                  <PastBookings/>
                </div>
                <div className="col-lg-4 pt-3 justify-content-start">
                  <FutureBookings/>
                </div>
              </div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {<Alert color={red500} className="mr-3 mt-4 ml-2"/>}
                    Are you sure you want to delete your Account?
                </Dialog>
            </div>
        );
    }
}

export default withRouter(UserProfile);
