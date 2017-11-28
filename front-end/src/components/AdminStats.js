import React, {Component} from 'react';
import * as API from '../api/API';
import BarChartData from "./BarChartData";
import LineChartData from "./LineChartData";
import PageCountGraph from "./PageCountGraph";
import PieChartData from "./PieChartData";
import '../cssfiles/AdminStats.css';
class AdminStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PageStats: []
        }
    }


  componentDidMount(){
      document.title = `Admin - Stats`;

  }

    componentWillMount() {

    }




    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12 barchart'>
                        <BarChartData />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-8 linechart'>
                        <LineChartData />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 piechart'>
                        <PieChartData />
                    </div>
                </div>
                <div className='row'>
                <div className=" row col-md-4 justify-content-md-center">
                    <PageCountGraph /*pagestats={this.state.PageStats}*/ />,
                </div>
                </div>
            </div>


        );
    }
}

export default AdminStats;
