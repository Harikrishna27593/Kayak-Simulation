import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
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
const color ={color:'#3C7EE2',};
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
class FlightOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      checked: false,
      priceSlider: 0,
    };
  }
  handlepriceSlider = (event, value) => {
  this.setState({priceSlider: value});
};
priceFilterSearch = () => {
this.props.filterOption(this.state.priceSlider);
};
handleChangeTab = (value) => {this.setState({value: value,});};
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
                        <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Price</h3>
                        <hr/>
                        <div className="ml-2">${this.state.priceSlider}
                          <button className="btn ml-5 btn-link btn-primary" onClick={this.priceFilterSearch}>GO</button>
                        </div>

                          <Slider min={0}  max={3000} step={1}
                            className="mr-2 ml-2 pb-5"
                            value={this.state.priceSlider}
                            onChange={this.handlepriceSlider} />

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

export default FlightOptions;
