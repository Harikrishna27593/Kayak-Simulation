import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
class BlankProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
        firstname:'',
        lastname:'',
        phoneNumber:'',
        streetAddress:'',
        city:'',
        zipcode:'',
      };
    }
    submitDetails = () => {
      console.log("Profile Details: " + this.state);
  };
    render() {
        return (
            <div className="container-fluid">
            <div className="col-lg-3 justify-content-start ml-5 mt-4 ">
              <div className="justify-content-start Text-big Text-bold"><h4>Please Fill your Details: </h4>
              </div> <hr/>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="First Name"
                  onChange={(event) => {this.setState({firstname: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Last Name"
                  onChange={(event) => {this.setState({lastname: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Phone Number"
                  onChange={(event) => {this.setState({phoneNumber: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Street Address"
                  onChange={(event) => {this.setState({streetAddress: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="City"
                  onChange={(event) => {this.setState({city: event.target.value});}}/>
                </div>
                <div className="form-group">
                  <input type="number" className="form-control" placeholder="Zipcode"
                  onChange={(event) => {this.setState({zipcode: event.target.value});}}/>
                </div>
                <div className="form-group">
                <RaisedButton
                  label="Make Payment"
                  backgroundColor={'#FF690F'}
                  label={<span style={{color:'#FFFFFF'}} >Update Details</span>}
                  onClick={this.submitDetails}
                  />
                </div>
              </form>
            </div>
            </div>
        );
    }
}

export default BlankProfile;
