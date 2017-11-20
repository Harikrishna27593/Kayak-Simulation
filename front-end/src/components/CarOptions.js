import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  checkbox: {
    marginBottom: 16,
  },
};
const color ={
  color:'#3C7EE2',
};
const tabBackground ={
  backgroundColor:fullWhite,
  color:fullWhite,
};
const muiTheme = getMuiTheme({
  palette: {
  primary1Color: '#3C7EE2',
  textColor: '#3C7EE2'
},
  });
class CarOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      checked: false,
    };
  }
  updateCheck() {
      this.setState((oldState) => {
        return {
          checked: !oldState.checked,
        };
      });
    }
  handleChangeTab = (value) => {
      this.setState({
        value: value,
      });
    };
    render() {
        return (
            <div className="container-fluid p-2">
            <MuiThemeProvider muiTheme={muiTheme}>
              <Tabs inkBarStyle={{backgroundColor:"#3C7EE2"}}
              tabItemContainerStyle={tabBackground}
                value={this.state.value}
                onChange={this.handleChangeTab}>
                  <Tab  label={<span style={color} className='Text-bold'>TOP FILTERS</span>}
                  value="a" >
                    <div style={{backgroundColor: fullWhite}} >
                    <h3 style={styles.headline} className='Text-bold ml-2'>Car Type</h3><hr/>
                      <Checkbox className="ml-2" className='Text-bold'
                        label="SUV"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                      />
                      <Checkbox className="ml-2" className='Text-bold'
                        label="Large"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                      />
                    </div>
                  </Tab>
                  <Tab label={<span style={color} className='Text-bold'>More</span>}
                  value="b" >
                    <div>

                    </div>
                  </Tab>
              </Tabs>
            </MuiThemeProvider>
          </div>
        );
    }
}

export default CarOptions;
