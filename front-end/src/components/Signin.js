import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {deepOrange500,grey800,fullWhite} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../cssfiles/social-buttons.css';
const muiTheme = getMuiTheme({
    palette: {
      textColor: '#558FE6',
      primary1Color: '#558FE6',
  }
});
const style = {
  marginTop: 5,

  checkbox: {
   marginBottom: 16,

 },
};
class Signin extends Component {
  state = {
    userdata: {
            username: '',
            password: ''
        },
  }
  handleSignInSubmit = () => {
    //API here
    console.log(this.state.userdata);
  };
  handleSignupOpen = () => {
    this.props.handleSignupOpen();
  };
    render() {
        return (
          <div className="container-fluid">
          <div className="row justify-content-md-center responsive">
          <a className="btn btn-block btn-social btn-lg btn-facebook text-white mb-2">
              <span className="fa fa-facebook text-white" ></span> Continue with Facebook
            </a>
          </div>
          <div className="row justify-content-md-center responsive">
          <a className="btn btn-block btn-social btn-lg btn-google text-white mb-2">
              <span className="fa fa-google text-white" ></span> Continue with Google
            </a>
          </div>
            <div className="row justify-content-md-center responsive">
              <h3> or Sign in with KAYAK account</h3>
            </div><Divider/><br/>
            <div className="row justify-content-md-center responsive">
                  <form>
                  <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    value={this.state.userdata.username}
                      onChange={(event) => {
                          this.setState({
                              userdata: {
                                  ...this.state.userdata,
                                  username: event.target.value
                              }
                          });
                      }}></input>
                    <small id="emailHelp" className="form-text text-muted"></small>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    value={this.state.userdata.password}
                      onChange={(event) => {
                          this.setState({
                              userdata: {
                                  ...this.state.userdata,
                                  password: event.target.value
                              }
                          });
                      }}></input>
                  </div>
                  <div className="form-check">
                  <MuiThemeProvider muiTheme={muiTheme}>
                    <Checkbox
                      label="Remember me"
                      style={style.checkbox}
                      checked={true}
                    />
                  </MuiThemeProvider>
                  </div>
                  <div className="row justify-content-md-center responsive">
                      <RaisedButton label="Sign in" type="submit" fullWidth={true}
                      onClick={() => this.handleSignInSubmit()} style={style}
                     backgroundColor={grey800} labelColor={fullWhite}/>
                  </div><hr/><br/>
                  <div className="row justify-content-md-center">
                    <label>Dont have an account?<RaisedButton className="ml-1" label="Sign up" style={style} onClick={this.handleSignupOpen}/></label>
                  </div>
                </form>
            </div>
        </div>
        );
    }
}

export default Signin;
