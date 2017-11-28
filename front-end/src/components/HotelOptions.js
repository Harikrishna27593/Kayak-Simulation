import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fullWhite} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
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
class HotelOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      checked: false,
      firstSlider: 0,
      star1:false,
      star2:false,
      star3:false,
      star4:false,
      star5:false,
    };
  }
  handleFirstSlider = (event, value) => {
  this.setState({firstSlider: value});
  console.log(this.state.firstSlider);
};
  updateCheck() {this.setState((oldState) => {return {checked: !oldState.checked,};});}
  handleChangeTab = (value) => {this.setState({value: value,});};
  updateStar1() {this.setState((oldState) => {return {star1: !oldState.star1,};});}
  updateStar2() {this.setState((oldState) => {return {star1: !oldState.star1,star2: !oldState.star2,};});}
  updateStar3() {this.setState((oldState) => {return {star1: !oldState.star1,star2: !oldState.star2,star3: !oldState.star3,};});}
  updateStar4() {this.setState((oldState) => {return {star1: !oldState.star1,star2: !oldState.star2,star3: !oldState.star3,star4: !oldState.star4,};});}
  updateStar5() {this.setState((oldState) => {return {star1: !oldState.star1,star2: !oldState.star2,star3: !oldState.star3,star4: !oldState.star4,star5: !oldState.star5,};});}

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
                    <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Stars</h3><hr/>
                    <div className="form-inline">
                      <Checkbox className="pl-2"
                        checked={this.state.star1}
                        label="Upto 1 Star"
                        checkedIcon={<Star/>}
                        uncheckedIcon={<StarBorder/>}
                        onCheck={this.updateStar1.bind(this)} />
                        {console.log("Star1: "+this.state.star1)}
                      <Checkbox className="pl-2"
                        checked={this.state.star2}
                        label="Upto 2 Stars"
                        checkedIcon={<Star/>}
                        uncheckedIcon={<StarBorder/>}
                        onCheck={this.updateStar2.bind(this)} />
                        {console.log("Star2: "+this.state.star2)}
                      <Checkbox className="pl-2"
                        checked={this.state.star3}
                        label="Upto 3 Stars"
                        checkedIcon={<Star/>}
                        uncheckedIcon={<StarBorder/>}
                        onCheck={this.updateStar3.bind(this)} />
                        {console.log("Star3: "+this.state.star3)}
                      <Checkbox className="pl-2"
                        checked={this.state.star4}
                        label="Upto 4 Stars"
                        checkedIcon={<Star/>}
                        uncheckedIcon={<StarBorder/>}
                        onCheck={this.updateStar4.bind(this)} />
                        {console.log("Star4: "+this.state.star4)}
                      <Checkbox className="pl-2"
                        checked={this.state.star5}
                        label="Upto 5 Stars"
                        checkedIcon={<Star/>}
                        uncheckedIcon={<StarBorder/>}
                        onCheck={this.updateStar5.bind(this)} />
                        {console.log("Star5: "+this.state.star5)}
                      </div>
                      <h3 style={styles.headline} className='Text-bold ml-2 pl-2'>Price</h3><hr/>
                      <div className="ml-2">${this.state.firstSlider}
                        <Slider min={0}  max={1000} step={1}
                        className="mr-2 ml-2 pb-5"
                        value={this.state.firstSlider}
                        onChange={this.handleFirstSlider} />
                      </div>
                    </div>

                  </Tab>
                  <Tab label={<span style={color} className='Text-bold'>More</span>}
                  value="b" >
                    <div style={{backgroundColor: fullWhite}}>
                    <h3 style={styles.headline} className='Text-bold ml-2'>Freebies</h3><hr/>
                      <Checkbox className="ml-2" className='Text-bold'
                        label="Free Breakfast"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                      />
                      <Checkbox className="ml-2" className='Text-bold'
                        label="Free Parking"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                      />

                    </div>
                  </Tab>
              </Tabs>
            </MuiThemeProvider>
          </div>
        );
    }
}

export default HotelOptions;
