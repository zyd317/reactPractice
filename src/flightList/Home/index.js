/**
 * Created by yidi.zhao on 2018/4/24.
 */
import React, {Component} from "react";

import FlightList from '../FlightList/index.js';
import Header from '../Header/index.js';
import Filter from '../FilterBar/index.js';
import ChangeDate from '../ChangeDate/index.js';

import { getQueryParam, format } from '../../common/utils';
import { getListData } from '../../common/request';
import { parseFlight } from '../dataModule/dataModule';

import './index.scss';
let queryParam = getQueryParam();
const Today = new Date();
const ThreeDay = 259200000; // 三天的毫秒数

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            error: false,
            isAirCode: queryParam.airCode,
            goDate: queryParam.goDate,
            allFilters: '',
            filterClick: false,
            isShowFilter: !queryParam.airCode
        };

        this.queryData = queryParam; // 查询参数，初始为导航栏参数
    }

    render(){
        let {
            isAirCode,
            flightList,
            loading,
            error,
            isShowFilter,
            goDate,
            filterClick
        } = this.state;
        return (
            <div className="m-home">
                <Header
                    startCity={queryParam.depCity}
                    endCity={queryParam.arrCity}
                    isAirCode={isAirCode}
                    airCode={queryParam.airCode}
                />
                <ChangeDate
                    goDate={goDate}
                    openSelectData={this.openSelectData}
                    updateFlightList={this.updateFlightList}
                />
                <FlightList
                    loading={loading}
                    error={error}
                    flightList={flightList}
                    updateFlightList={this.updateFlightList}
                />
                <Filter
                    updateFlightList={this.updateFlightList}
                    showFilter={this.showFilter}
                    isShowFilter={isShowFilter}
                    filterClick={filterClick}
                />
            </div>
        );
    }

    /**
     * 请求航班列表数据
     */
    componentDidMount(){
        // 不支持node直接请求，没有uid,pid。请求成功之后执行数据渲染
        window.receive.then((data)=>{
            let param = this.parseData(data, queryParam);
            this.setState(param);
        }).catch(()=>{
            this.setState({
                loading: false,
                error: true
            });
        });
    }

    updateFlightList = (query) => {
        query && Object.assign(this.queryData, query);
        // 加载中, 先设置日期变化和"排序"
        this.setState(Object.assign({
            loading: true
        }, query));
        getListData(this.queryData).then((data)=>{
            let param = this.parseData(data, this.queryData);
            this.setState(param);
        }).catch(()=>{
            this.setState({
                loading: false,
                error: true
            });
        });
    };

    /**
     * 显示过滤选项
     * 过滤条件确认之后重新请求渲染航班列表
     */
    showFilter = () => {
        console.log("no filter")
    };

    /**
     * 点击切换日期，打开日期选择组件，并且重新请求数据
     */
    openSelectData = () => {
        // 调用日历打开方法
        window.COMPONENT.open('calendar', {
            startDay: format(new Date(Today.getTime() - ThreeDay)), //开始日期  string or Date Objective    不传默认今天
            endDay: '', //结束日期  string or Date Objective 不传默认一年后
            selectGoDay: this.state.goDate, //上次选中的出发日期 string or Date Objective
            useHeader: true, //是否用header 默认true
            onSelect: (data) => {
                //完成回调, 关闭日历，并且修改样式, 修改前后一天
                if (data) {
                    this.updateFlightList({
                        goDate: data
                    });
                }
            }
        });
    };

    /**
     * 清洗数据
     */
    parseData(data){
        if(data && data.bstatus && data.bstatus.code === 0 && data.data){
            let {flights, allFilters, goDate} = data.data;
            flights = parseFlight(flights, goDate);
            return {
                loading: false,
                error: false,
                flightList: flights,
                goDate: goDate,
                allFilters: allFilters, // 过滤条件使用接口
                isShowFilter: !queryParam.airCode // 无航班列表不展示过滤
            }
        } else if(data && data.bstatus && data.bstatus.code === 1){
            return {
                loading: false,
                error: false,
                flightList: "" // 将航班列表置空，没有航班
            }
        } else {
            return {
                loading: false,
                error: true
            }
        }
    }
}