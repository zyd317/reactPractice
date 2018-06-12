import React, {Component} from 'react';
import {connect} from 'react-redux';
import { updateFlightList } from '../reducer/Home/action';
import { updateQuery } from '../reducer/QueryParam/action';
import { format } from '../../common/utils';
import { isOutBeforeRange, isOutAfterRange, parseWeek } from '../dataModule/dataModule';
import './index.scss';
const OneDay = 86400000; // 一天的毫秒数
const Today = new Date();
const ThreeDay = 259200000; // 三天的毫秒数

class ChangeDate extends Component{
    constructor(props){
        super(props);
    }

    /**
     * loading不更新组件
     * @param nextProps
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps){
        return nextProps.queryParam.goDate !== this.props.queryParam.goDate;
    }

    render(){
        let { goDate } = this.props.queryParam;
        if(!goDate){
            return null;
        }
        let outBeforeRange = isOutBeforeRange(goDate);
        let outAfterRange = isOutAfterRange(goDate);
        let week = parseWeek(goDate);
        return (
            <section className="m-change-date">
                <div className={'before-day' + (outBeforeRange ? ' no-use' : '')} onClick={this.getBeforeDay.bind(this, outBeforeRange)}>
                    <i className="iconfont">&#xf3cd;</i>
                    前一天
                </div>
                <div className="data-pick" onClick={this.props.openSelectData}>
                    <span>{week}</span>
                    <i className="iconfont">&#xf3ff;</i>
                </div>
                <div className={'next-day' + (outAfterRange ? ' no-use' : '')} onClick={this.getAfterDay.bind(this, outAfterRange)}>
                    后一天
                    <i className="iconfont">&#xe145;</i>
                </div>
            </section>
        )
    }

    /**
     * 前一天
     */
    getBeforeDay = (outBeforeRange) => {
        if(outBeforeRange){
            return ;
        }

        let date = this.props.queryParam.goDate;
        // 航班列表需要重新渲染
        this.props.dispatch(updateFlightList({
            goDate: format(new Date(new Date(date.replace(/-/g, '/')).getTime()-OneDay))
        }));
    };

    /**
     * 后一天
     */
    getAfterDay = (outAfterRange) => {
        if(outAfterRange){
            return ;
        }
        let date = this.props.queryParam.goDate;
        // 航班列表需要重新渲染
        this.props.dispatch(updateQuery({
            goDate: format(new Date(new Date(date.replace(/-/g, '/')).getTime()+OneDay))
        }));
        this.props.dispatch(updateFlightList({
            goDate: format(new Date(new Date(date.replace(/-/g, '/')).getTime()+OneDay))
        }));
    };

    /**
     * 点击切换日期，打开日期选择组件，并且重新请求数据
     */
    openSelectData = () => {
        // 调用日历打开方法
        window.COMPONENT.open('calendar', {
            startDay: format(new Date(Today.getTime() - ThreeDay)), //开始日期  string or Date Objective    不传默认今天
            endDay: '', //结束日期  string or Date Objective 不传默认一年后
            selectGoDay: this.props.queryParam.goDate, //上次选中的出发日期 string or Date Objective
            useHeader: true, //是否用header 默认true
            onSelect: (data) => {
                //完成回调, 关闭日历，并且修改样式, 修改前后一天
                if (data) {
                    this.props.dispatch(updateFlightList({
                        goDate: data
                    }));
                }
            }
        });
    };
}

function mapStateToProps(state) {
    return  {
        home: state.home,
        queryParam: state.queryParam
    };
}
export default connect(mapStateToProps)(ChangeDate);