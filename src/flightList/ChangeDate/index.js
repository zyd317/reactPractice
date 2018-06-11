import React, {Component} from 'react';
import { format } from '../../common/utils';
import { isOutBeforeRange, isOutAfterRange, parseWeek } from '../dataModule/dataModule';
import './index.scss';
const OneDay = 86400000; // 一天的毫秒数

export default class ChangeDate extends Component{
    constructor(props){
        super(props);
    }

    /**
     * loading不更新组件
     * @param nextProps
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps){
        return nextProps.goDate !== this.props.goDate;
    }

    render(){
        let { goDate } = this.props;
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

        let date = this.props.goDate;
        let newDate = format(new Date(new Date(date.replace(/-/g, '/')).getTime()-OneDay));
        // 航班列表需要重新渲染
        this.props.updateFlightList({
            goDate: newDate
        });
    };

    /**
     * 后一天
     */
    getAfterDay = (outAfterRange) => {
        if(outAfterRange){
            return ;
        }
        let date = this.props.goDate;
        let newDate = format(new Date(new Date(date.replace(/-/g, '/')).getTime()+OneDay));
        // 航班列表需要重新渲染
        this.props.updateFlightList({
            goDate: newDate
        });
    }
}