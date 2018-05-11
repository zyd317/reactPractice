/**
 * 日历选择组件
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/index';
import Month from './month';
import { todayServer } from './utils';
import './index.scss';
export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            selectGoDay: '',
            useHeader: true,
            startDay: '',
            endDay: '',
            title: '日历',
            selectMode: 'go'
        };
        this.renderContent = this.renderContent.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.init = this.init.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }

    /**
     * 渲染日历的头部和星期
     * @return {XML}
     */
    render() {
        let { isShow, useHeader, title } = this.state;
        //header的属性
        let {
            leftIconClass = '',
            leftBtnTxt = '',
            leftBtnClick = ()=>{
                history.back();
            },
            rightIconClass = '',
            extClass = ''
        } = this.props;
        let headerConfig = {
            title: title,
            leftIconClass: leftIconClass,
            leftBtnTxt: leftBtnTxt,
            leftBtnClick: leftBtnClick,
            rightIconClass: rightIconClass,
            rightBtnTxt: '',
            rightBtnClick: '',
            extClass: extClass
        };
        return (
            <div className={'calendar-page ' + (isShow ? '' : 'calendar-hide')}>
                <div className={'m-calendar ' + (useHeader ? '' : 'm-noHeader-calendar ') + 'm-noSelectBar-calendar'}>
                    {useHeader && <Header {...headerConfig}/>}
                    <div className="calendar-bar">
                        <ul className="calendar-date-bar">
                            <li className="dates-item">日</li>
                            <li className="dates-item">一</li>
                            <li className="dates-item">二</li>
                            <li className="dates-item">三</li>
                            <li className="dates-item">四</li>
                            <li className="dates-item">五</li>
                            <li className="dates-item">六</li>
                        </ul>
                    </div>
                    {this.renderContent()}
                </div>
            </div>

        );
    }

    /**
     * 渲染每个月份每一天
     * @returns {XML}
     */
    renderContent(){
        let { startDay, endDay, isShow, selectGoDate = '', priceList = {}, priceLoaded } = this.state;

        let startDate = this.parseDate(startDay);
        let endDate = this.parseDate(endDay, 'isEndDay');

        let sYear = startDate.getFullYear();
        let sMonth = startDate.getMonth() + 1;
        let eYear = endDate.getFullYear();
        let eMonth = endDate.getMonth() + 1;
        let tYear = sYear;
        let tMonth = sMonth;
        let countDays = 0;
        let monthContent = [];
        while(tYear < eYear || tMonth <= eMonth) {
            if(tMonth > 12) {
                tMonth = 1;
                tYear++;
            }
            let daysOfMonth = this.getMaxDateNumber(tYear, tMonth);
            let monthProps = {
                year: tYear,
                month: tMonth,
                selectGoDate: selectGoDate,
                startDate: startDate,
                maxDate: endDate,
                isShow: isShow,
                priceList: priceList,
                priceLoaded: priceLoaded
            };
            countDays += daysOfMonth;
            monthContent.push(
                <Month {...monthProps} key={tYear + '-' + tMonth}/>
            );
            tMonth++;
        }
        return (
            <div onClick={this.selectDay} className="scrollHeight" ref='scroller'>
                <div className="calendar-content" id="calendar-content">
                    {monthContent}
                </div>
            </div>
        );
    };

    /**
     * 点击选中日期
     * @param e
     */
    selectDay(e){
        let self = this;
        let {selectGoDate = '', selectMode} = self.state;
        let targetDom = ReactDOM.findDOMNode(e.target);
        let dayDom = self.getDayDom(targetDom);
        if(dayDom) {
            //selectDateStr格式：2017/1/1
            let selectDateStr = dayDom.getAttribute('data-date');
            let selectDate = new Date(selectDateStr);
            if(!selectGoDate || (selectGoDate && (selectGoDate > selectDate) || selectMode === 'go')) {
                self.setState({
                    selectGoDate: selectDate,
                    selectMode: selectMode
                }, function () {
                    self.onSelect(selectDateStr);
                });
            } else {
                self.onSelect(selectDateStr);
            }
        }
    };

    /**
     * 如果有传日期，将日期统一转化成YYYY-MM-DD
     * 没有传日期默认当前时间到一年后的时间
     * @param day
     * @param isEndDay 是否是范围的最后一天
     */
    parseDate(day, isEndDay){
        let today = todayServer(); // 服务器端的今天
        if(day && typeof day === 'string') {
            day = new Date(day.replace(/-/g, "/"));
        } else {
            let year = isEndDay ? (today.getFullYear() + 1) : (today.getFullYear());
            day = new Date(year + '/' + (today.getMonth() + 1) + '/' + today.getDate());
        }
        return day;
    };

    open(config){
        let self = this;
        config && self.init(config);
        self.setState({
            isShow: true
        }, function() {
            //跳转到用户上次选中日期
            let {selectGoDate = ''} = self.state;
            if(selectGoDate) {
                let selectMonthId = selectGoDate.getFullYear() + '-'  + (selectGoDate.getMonth() + 1);
                let content = document.querySelector('#month-' + selectMonthId);
                let contactContainer = document.querySelector('.calendar-content');
                let calendarBar = document.querySelector('.calendar-bar');
                let scrollerLength ;
                if (content && contactContainer) {
                    //针对于不同的浏览器，offsetParent的值不同。
                    //在大多数浏览器里，他是相对于该组件的最近的有定位的父级组件canlender-page
                    //在少数浏览器里，他是相对于该组件最近的父级scroller，所以我们分开进行操作
                    if (content.offsetParent.className === 'scroller') {
                        scrollerLength = 67;//67为scroller到canlender-page的距离
                    } else {
                        scrollerLength = 0;
                    }
                    this.refs.scroller.scrollTop = scrollerLength + content.offsetTop - calendarBar.clientHeight - 43;
                }
            }
        });
    };

    close(){
        this.setState({
            isShow: false
        });
    };

    init(config){
        let self = this;
        let { selectGoDay, startDay, endDay, onSelect } = config || {};
        let selectGoDate = '';
        if(selectGoDay) {
            if(typeof selectGoDay === 'string') {
                selectGoDate = new Date(selectGoDay.replace(/-/g, "/"));
            }
            else {
                selectGoDate = selectGoDay;
            }
        }
        self.setState({
            selectGoDate: selectGoDate,
            startDay: startDay,
            endDay: endDay,
            onSelect: onSelect,
            title: '日历',
            selectMode: 'go'
        });
    };

    /**
     * 完成回调
     */
    onSelect(date){
        history.back();
        let {onSelect} = this.state;
        //因为保存的参数不同，所以不需要回调
        onSelect(date.replace(/\//g, "-"));
    };


    getMaxDateNumber(year, month) {
        let datesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        datesArray[1] += (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 1 : 0;
        return datesArray[month - 1];
    }

    //获取到日期的dom
    getDayDom(targetDom) {
        if(targetDom.getAttribute('data-type') === 'day') {
            return targetDom;
        }
        else if(targetDom.parentNode.getAttribute('data-type') === 'day') {
            return targetDom.parentNode;
        }
        else {
            return null;
        }
    }
}