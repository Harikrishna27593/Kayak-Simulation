import React, {Component} from 'react';
import BillingNavBar from "./BillingNavBar";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
  customWidth: {
    width: 120,
  },
};
const yearItems = [];
for (let i = 2017; i < 2037; i++ ) {
  yearItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}
const MonthItems = [];
for (let i = 1; i < 13; i++ ) {
  MonthItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}
class BillingMain extends Component {
  constructor(props) {
      super(props);
      this.state = {
        monthValue: 1,
        YearValue:2017,
        firstname:'',
        lastname:'',
        phoneNumber:'',
        email:'',
        streetAddress:'',
        city:'',
        cardNumber:'',
        cvv:'',
      };
    }
    submitPayment = () => {
      console.log("payment Details: "+this.state);
  };
    handleChangeMonth = (event, index, monthValue) => this.setState({monthValue});
    handleChangeYear = (event, index, YearValue) => this.setState({YearValue});
    render() {
        return (
            <div className="container-fluid">
            <div className="row">
              <BillingNavBar/>
            </div>
              <div className="row p-4">
              </div>
              <div className="row">
                <div className="col-lg-3 justify-content-start ml-5">
                  <div className="justify-content-start Text-big Text-bold"><h5>Billing Details</h5>
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
                      <input type="email" className="form-control" placeholder="Email"
                      onChange={(event) => {this.setState({email: event.target.value});}}/>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Street Address"
                      onChange={(event) => {this.setState({streetAddress: event.target.value});}}/>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="City"
                      onChange={(event) => {this.setState({city: event.target.value});}}/>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label pl-1">
                        <input type="checkbox" className="form-check-input pr-1 pl-1"/>
                        This order is tax exempt
                      </label>
                    </div>
                  </form>
                </div>
                <div className="col-lg-3 justify-content-start ml-5">
                  <div className="justify-content-start Text-big Text-bold"><h5>Payment Method</h5>
                  </div> <hr/>
                  <form>
                    <div className="form-group">
                      <img src='/images/payment.png'/>
                    </div>
                    <div className="form-group">
                      <input type="number" className="form-control" placeholder="Debit/Credit Card Number"
                      onChange={(event) => {this.setState({cardNumber: event.target.value});}}/>
                    </div>
                    <div className="form-group">
                      <input type="number" className="form-control" placeholder="Security Code"
                      onChange={(event) => {this.setState({cvv: event.target.value});}}/>
                    </div>
                    <div className="form-group ">
                    <DropDownMenu value={this.state.monthValue} maxHeight={300} style={styles.customWidth} onChange={this.handleChangeMonth}>
                      {MonthItems}
                    </DropDownMenu>
                    <DropDownMenu maxHeight={300} value={this.state.YearValue} onChange={this.handleChangeYear}>
                        {yearItems}
                    </DropDownMenu>
                    </div>
                    <div className="form-group">
                    <RaisedButton
                      label="Make Payment"
                      backgroundColor={'#FF690F'}
                      label={<span style={{color:'#FFFFFF'}} >Make Payment</span>}
                      onClick={this.submitPayment}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-lg-3 justify-content-start ml-5 mr-5">
                  <div className="justify-content-start Text-big Text-bold"><h5>Purchase Summary</h5>
                  </div>
                  <hr/>
                </div>
              </div><hr/>
            </div>
        );
    }
}

export default BillingMain;
