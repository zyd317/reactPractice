/**
 * Created by yidi.zhao on 2018/4/24.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';

import FlightListCom from '../FlightList/index.js';
import Header from '../Header/index.js';
import Filter from '../FilterBar/index.js';
import ChangeDate from '../ChangeDate/index.js';

import './index.scss';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let { airCode, depCity, arrCity, isAirCode } = this.props.queryParam;
        return (
            <div className="m-home">
                <Header
                    startCity={depCity}
                    endCity={arrCity}
                    isAirCode={isAirCode}
                    airCode={airCode}
                />
                <ChangeDate />
                <FlightListCom />
                <Filter />
            </div>
        );
    }

    /**
     * 显示过滤选项
     * 过滤条件确认之后重新请求渲染航班列表
     */
    showFilter = () => {
        console.log("no filter")
    };
}

function mapStateToProps(state) {
    return  {
        queryParam: state.queryParam
    };
}
export default connect(mapStateToProps)(Home);