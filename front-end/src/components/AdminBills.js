import React, {Component} from 'react';
import HomePageSearchTabs from "./HomePageSearchTabs";
import {fullWhite,cyan500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {Table,TableBody,TableFooter,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({
  palette: {
         accent1Color: cyan500,
         selectedTextColor: cyan500,
         canvasColor: fullWhite
     }
});
const DayItems = [];
for (let i = 1; i < 32; i++ ) {
  DayItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}
class AdminBills extends Component {

  constructor(props) {
      super(props);

      this.state = {
        month:null,
        day:null,
        date:null,
        payment: [{
          PaymentID: '6786455',PaymentDate: '01-07-15',username: 'user2@g.com',Amount: '776'},
          {PaymentID: '347373F',PaymentDate: '11-07-16',username: 'user7@g.com',Amount: '55'},
          {PaymentID: '2351621',PaymentDate: '05-04-17',username: 'user67@g.com',Amount: '6788'},
          {PaymentID: '4582883',PaymentDate: '12-12-14',username: 'user12@g.com',Amount: '222'},
          {PaymentID: '1632463',PaymentDate: '01-01-15',username: 'user89@g.com',Amount: '458'},
        ],
      };
  }

  componentDidMount(){document.title = `Admin - Bills`;}
  handleSearch = () => {
    var billToSearch ={
      month:this.state.month,
      day:this.state.day,
      date:this.state.date,
    }
    console.log(billToSearch);
  };
  handleChangeMonth = (event, index, month) => this.setState({month, date: null,});
  handleChangeDay = (event, index, day) => this.setState({day,date: null,});
  handleChangeDate = (event, date) => {this.setState({
    date: date,
    month:null,
    day:null,
  });};
  componentWillMount(){
    this.setState({
    payment: this.state.payment || [],
    });
  }
    render() {
        return (
            <div className="container-fluid">
              <h4 className="row justify-content-start pt-3">Search Using any of the following options:</h4>
              <div className="row">
              <MuiThemeProvider muiTheme={muiTheme}>
              <DropDownMenu value={this.state.month} maxHeight={300} onChange={this.handleChangeMonth}>
                <MenuItem value={1} label="January" primaryText="January" />
                <MenuItem value={2} label="February" primaryText="February" />
                <MenuItem value={3} label="March" primaryText="March" />
                <MenuItem value={4} label="April" primaryText="April" />
                <MenuItem value={5} label="May" primaryText="May" />
                <MenuItem value={6} label="June" primaryText="June" />
                <MenuItem value={7} label="July" primaryText="July" />
                <MenuItem value={8} label="August" primaryText="August" />
                <MenuItem value={9} label="September" primaryText="September" />
                <MenuItem value={10} label="October" primaryText="October" />
                <MenuItem value={11} label="November" primaryText="November" />
                <MenuItem value={12} label="December" primaryText="December" />
              </DropDownMenu>
              </MuiThemeProvider>
              <MuiThemeProvider muiTheme={muiTheme}>
              <DropDownMenu maxHeight={300} value={this.state.day} onChange={this.handleChangeDay}>
                  {DayItems}
              </DropDownMenu>
              </MuiThemeProvider>
              <DatePicker
                hintText="Date"
                value={this.state.date}
                onChange={this.handleChangeDate}/>
              </div>
              <RaisedButton className="mt-4 ml-4"
                  label = "Search"
                  labelColor ={fullWhite}
                  backgroundColor={cyan500}
                  onClick={this.handleSearch}
              />
              <div className="row">
                <Table height='500px'>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                      <TableHeaderColumn tooltip="Payment ID">ID</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Date of Transaction">Date</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
                      <TableHeaderColumn tooltip="Total Amount">Amount</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} showRowHover={true}>
                      {this.state.payment.map( (payment, index) => (
                      <TableRow key={index} >
                        <TableRowColumn>{index+1}</TableRowColumn>
                        <TableRowColumn>{payment.PaymentID}</TableRowColumn>
                        <TableRowColumn>{payment.PaymentDate}</TableRowColumn>
                        <TableRowColumn>{payment.username}</TableRowColumn>
                        <TableRowColumn>{payment.Amount}</TableRowColumn>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

      {console.log(this.state.selected)}
            </div>
        );
    }
}

export default AdminBills;
