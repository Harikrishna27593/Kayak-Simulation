import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import BillingNavBar from "./BillingNavBar";
import UpdatedProfile from "./UpdatedProfile";
import BlankProfile from "./BlankProfile";

class UserProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isUpdated : true,
      };
    }
    render() {
        return (
            <div className="container-fluid">
              <div className="row">
                <BillingNavBar/>
              </div>
              {
                this.state.isUpdated
                ?<UpdatedProfile/>
                :<BlankProfile/>
              }

            </div>
        );
    }
}

export default withRouter(UserProfile);
