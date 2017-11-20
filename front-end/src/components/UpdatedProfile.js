import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
class UpdatedProfile extends Component {
  constructor(props) {
  super(props);
  this.state = {
    profileResults :
    {'firstname':'John','lastname':'Smith','phoneNumber':'77492989725',
    'streetAddress':'678, Marina Drive','city':'San Jose','zipcode':'776689','email':'user1@g.com'},
  };
  }
    render() {
        return (
          <div className="container-fluid">
          <div className="col-lg-3 justify-content-start ml-5 mt-4 ">
            <div className="justify-content-start Text-big Text-bold"><h4>Profile Details: </h4>
            </div> <hr/>
            <form>
              <div className="form-group">
                Username : {this.state.profileResults.email}
              </div>
              <div className="form-group">
                First Name : {this.state.profileResults.firstname}
              </div>
              <div className="form-group">
                Last Name : {this.state.profileResults.lastname}
              </div>
              <div className="form-group">
                Phone Number : {this.state.profileResults.phoneNumber}
              </div>
              <div className="form-group">
                Street Address : {this.state.profileResults.streetAddress}
              </div>
              <div className="form-group">
                City : {this.state.profileResults.city}
              </div>
              <div className="form-group">
                Zipcode : {this.state.profileResults.zipcode}
              </div>
              <div className="form-group">
              <RaisedButton
                backgroundColor={'#FF690F'}
                label={<span style={{color:'#FFFFFF'}} >Update Details</span>}
                onClick={this.updateDetails}
                />
              </div>
            </form>
          </div>
          </div>
        );
    }
}

export default UpdatedProfile;
