import React, {Component} from 'react';
import HomePageSearchTabs from "./HomePageSearchTabs";
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {Table,TableBody,TableFooter,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import Toggle from 'material-ui/Toggle';
const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },

};

class AdminListings extends Component {

  constructor(props) {
      super(props);

      this.state = {
        username:'',
        firstname:'',
        lastname:'',
          users: [{
          username: 'user1@g.com',password: 'user1'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
          {username: 'user2@g.com',password: 'user2'},
        ],
      };
  }
  handleChange = (event) => {
    this.setState({height: event.target.value});
  };
  EditUser = (userToEdit) => {
    console.log("Edit: "+userToEdit);
  };
  deleteUser = (userToDel) => {
    console.log("Del: "+userToDel);
  };
  componentDidMount(){document.title = `Admin - users`;}
  addUsername = (event) => {this.setState({username: event.target.value});};
  addFirstname = (event) => {this.setState({firstname: event.target.value});};
  addLastname = (event) => {this.setState({lastname: event.target.value});};
  componentWillMount(){
    this.setState({
    users: this.state.users || [],
    });
  }
    render() {
        return (
            <div className="container-fluid">
              <h4 className="row justify-content-start pt-3">Search Using any of the following options:</h4>
              <div className="row" style={{backgroundColor:'#E9ECEF'}}>
                <TextField className="Admin-userSearch" underlineShow={false}
                    floatingLabelText="Username"
                    onChange={this.addUsername}/>
                <TextField className="Admin-userSearch" underlineShow={false}
                    floatingLabelText="First name"
                    onChange={this.addFirstname}/>
                <TextField className="Admin-userSearch" underlineShow={false}
                    floatingLabelText="Last name"
                    onChange={this.addLastname}/>
              </div>
              <RaisedButton className="mt-4 ml-4"
                  label = "Search"
                  labelColor ={fullWhite}
                  backgroundColor={cyan500}
                  onClick={this.handleOpen}
              />
              <div className="row">
                <Table height='500px'>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn tooltip="Number Of Users">Index</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Username of the Customer">Username</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Password Of the Customer">Password</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Manage customers">Options</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover={true}>
                      {this.state.users.map( (user, index) => (
                      <TableRow key={index} >
                        <TableRowColumn>{index+1}</TableRowColumn>
                        <TableRowColumn>{user.username}</TableRowColumn>
                        <TableRowColumn>{user.password}</TableRowColumn>
                        <TableRowColumn>
                          <Edit color={cyan500} viewBox="0 0 30 30" className="mr-2" onClick={() => this.EditUser(user.username)}/>
                          <Delete color={cyan500} viewBox="0 0 30 30" onClick={() => this.deleteUser(user.username)}/>
                        </TableRowColumn>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

      {console.log(this.state.selected)}

            {/*<table className="table">
            {this.state.users.map(user => (
              <tbody key={user.username}>
                <tr key={user.username}>
                  <td key={user.username} cols={user.cols || 1}>{user.username}</td>
                  <td key={user.password} cols={user.cols || 1}>{user.password}</td>
                  <td></td>
                </tr>
              </tbody>
            ))}
           </table>*/}
            </div>
        );
    }
}

export default AdminListings;
