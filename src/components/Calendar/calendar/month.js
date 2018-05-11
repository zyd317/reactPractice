/**
 * 渲染月份
 */
import React, {Component} from 'react';
import holidays from './holidayData';
import { todayServer ,dateFormat} from './utils';
export default class Month extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        let self = this;
        let {props} = self;
        if(self.diffProps(props, nextProps)) {
            return true;
        }
        return (self.shouldUpdate(props) || self.shouldUpdate(nextProps));
    }
    diffProps = (props, nextProps) => {
        return (props.isShow !== nextProps.isShow || nextProps.priceLoaded !== props.priceLoaded);
    };
    shouldUpdate = (props) => {
        let self = this;
        let {year, month, selectGoDate, selectBackDate} = props;
        let maxDateNumber = self.getMaxDateNumber(year, month);
        let maxDate = new Date(year + '/' + month + '/' + maxDateNumber);
        let startDate = new Date(year + '/' + month + '/1');
        if(selectGoDate) {
            if((selectGoDate >= startDate && selectGoDate <= maxDate) || (selectBackDate && !(selectGoDate > maxDate || selectBackDate < startDate))) {
                return true;
            }
        }
        return false;
    };
    //渲染月份
    render() {
        let self = this;
        let toDayStr = dateFormat(todayServer(), 'yyyy/MM/dd');
        let {
            selectBackDate = '',
            selectGoDate = '',
            startDate = '',
            maxDate = '',
            year,
            month,
            isRoundWay,
            priceList,
            priceLoaded} = self.props;
        let firstDay = new Date(year + '/' + month + '/1').getDay();
        let monthMaxDateNumber = self.getMaxDateNumber(year, month);
        let day = - firstDay;
        let row = Math.ceil((firstDay + monthMaxDateNumber) / 7);
        let weekContent = [];
        weekContent.push(
            <div className="calendar-month-title" key={year + '-' + month + '-title'} id={'month-'+ year + '-' + month}>
                {year + '年' + month + '月'}
            </div>
        );
        let isShowPrice = priceLoaded && priceList && !isRoundWay;
        //列循环
        for(let i = 0; i < row; i++) {
            let dayContent = [];
            for(let j = 0; j < 7; j++) {
                day++;
                let thisDayStr = year + '/' + (month >= 10 ? month : ('0' + month)) + '/' + (day >= 10 ? day : ('0' + day));
                let thisDayStrOld = year + '-' + (month >= 10 ? month : ('0' + month)) + '-' + (day >= 10 ? day : ('0' + day));
                let thisDay = new Date(thisDayStr);
                let extClass = ' ';
                let dataType = 'day';
                let topString = '';
                if(thisDay.getDay() === 0 || thisDay.getDay() === 6) {
                    extClass += 'weekend-day ';
                }
                //选中状态
                if(selectGoDate) {
                    if(selectGoDate.getTime() === thisDay.getTime()) {
                        if(selectBackDate && selectBackDate.getTime() == thisDay.getTime()) {
                            extClass += 'select-go-back-day ';
                        }
                        else {
                            if(isRoundWay) {
                                extClass += 'select-go-day ';
                            }
                            else {
                                extClass += 'select-single-day ';
                            }
                        }
                    }
                    else {
                        if(selectBackDate) {
                            if(selectBackDate.getTime() === thisDay.getTime()) {
                                extClass += 'select-back-day ';
                            }
                            else if(selectBackDate.getTime() > thisDay.getTime() && selectGoDate.getTime() < thisDay.getTime()) {
                                extClass += 'during-day ';
                            }
                        }
                    }
                }
                //调休日 :(
                if(holidays.work[thisDayStr]) {
                    extClass += 'workday ';
                    topString = '上班';
                }
                //假日
                if(holidays.vacation[thisDayStr]) {
                    extClass += 'holiday ';
                    topString = '放假';
                }
                //假日当天
                if(holidays.holiday[thisDayStr]) {
                    topString = holidays.holiday[thisDayStr];
                    extClass += 'holiday ';
                }
                //不可用日期
                if(thisDay > maxDate || thisDay < startDate) {
                    extClass = ' disable-day ';
                    dataType = 'disableDay';
                }
                //真正的日期
                if(day > 0 && day <= monthMaxDateNumber) {
                    let dayString = day;
                    extClass += 'trust-day';
                    if(toDayStr === thisDayStr) {
                        dayString = '今天';
                    }
                    dayContent.push(
                        <div className={"calendar-day" + extClass} key={thisDayStr} data-date={thisDayStr} data-type={dataType}>
                            {topString && <span className="top-string">{topString}</span>}
                            <span className="day">{dayString}</span>
                            {isShowPrice && priceList[thisDayStrOld] && <span className={'price-string ' + (priceList[thisDayStrOld].isMonthMin?'low-price-string':'')}>{'¥' + priceList[thisDayStrOld].price}</span>}
                        </div>
                    )
                }
                //补空位
                else {
                    dayContent.push(
                        <div className="calendar-day" key={year + '-' + month + '-' + day} data-date="">
                        </div>
                    )
                }
            }
            weekContent.push(
                <div className="calendar-week" key={year + '-' + month + '-week' + i}>
                    {dayContent}
                </div>
            )
        }
        return (
            <div className="calender-month" key={year + '-' + month}>
                {weekContent}
            </div>
        );
    }

    //获取每月的最大日期
    getMaxDateNumber = (year, month) => {
        let datesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let isLeap = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 1 : 0;
        datesArray[1] += isLeap;
        return datesArray[month - 1];
    }
}