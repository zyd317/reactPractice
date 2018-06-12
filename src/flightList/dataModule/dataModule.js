/**
 * Created by yidi.zhao on 2018/5/9.
 * dataModule
 */
import { getDay } from '../../common/utils';

const ThreeDay = 259200000; // 三天的毫秒数
const OneDay = 86400000; // 一天的毫秒数
const today = new Date(); // 现在的时间点


/**
 * 清洗数据
 */
export function parseData(data, queryData){
    if(data && data.bstatus && data.bstatus.code === 0 && data.data){
        let {flights, allFilters, goDate} = data.data;
        flights = parseFlight(flights, goDate);
        return {
            loading: false,
            error: false,
            flightList: flights,
            allFilters: allFilters // 过滤条件使用接口
        }
    } else if(data && data.bstatus && data.bstatus.code === 1){
        return{
            loading: false,
            error: false,
            flightList: '',
        }
    } else {
        return {
            loading: false,
            error: true
        }
    }
}

/**
 * 清洗航班列表数据
 * 清洗跨天数据
 * 清洗delay状态数据
 * @param flights Array 航班列表信息数组
 * @param goDate String 搜索时间
 */
export function parseFlight(flights, goDate){
    let lastCut = '',
        cutTime = '';
    return flights.map((item, index)=>{
        if(!item){
            return ;
        }

        parseCrossDay(item);

        lastCut = lastCut || '';
        cutTime = getCutTime(item.date, item.depTime);
        item = parseFlightItem(item, lastCut, cutTime, index, goDate);
        lastCut = cutTime;
        return item;
    });
}
/**
 * 获取当日航班最近出发的一个航班
 * 获取今日航班的标记,计算item的key {ref: 'lastCut', key: item.airCode+item.depTimeStamp+index, flightValue: item}
 * @param item
 * @param lastCut
 * @param cutTime
 * @param index
 * @param goDate
 * @return {*} item
 */
function parseFlightItem(item, lastCut, cutTime, index, goDate) {
    if(isToday(goDate) && lastCut && lastCut * cutTime <= 0){
        item = {
            ref: 'lastCut',
            key: item.airCode+item.depTimeStamp+index,
            flightValue: item,
            itemRef: {
                ref: 'scrollItem'
            }
        };
    } else {
        item = {
            key: item.airCode+item.depTimeStamp+index,
            flightValue: item
        };
    }
    return item;
}

function parseCrossDay(item) {
    if(item.crossDay){
        item.crossDay = item.crossDay + '天';
    }
    if(item.pageStatus){
        item.pageStatus = item.pageStatus === 'delay' ? 'delay-status m-flight-status' : 'm-flight-status';
    }
}

/**
 * 判断是否超过当前选择日期的前三天
 * @param selectDate 当前选择的日期
 */
export function isOutBeforeRange(selectDate){
    if(!selectDate){
        return false;
    }
    let beforeTreeDay = new Date(today.getTime()-ThreeDay).getTime(); // 三天前日期
    selectDate = new Date(selectDate.replace(/-/g, '/')).getTime(); // 选中时间
    return (selectDate < beforeTreeDay);
}
/**
 * 判断是否超过一年后日期范围，当前选择日期的前三天-当前日期的一年
 * @param selectDate 当前选择的日期
 */
export function isOutAfterRange(selectDate){
    if(!selectDate){
        return true;
    }
    let oneYearDay = new Date((+today.getFullYear()+1) + '/' + (+today.getMonth()+1) + '/' + today.getDate()).getTime();
    selectDate = new Date(selectDate.replace(/-/g, '/')).getTime(); // 选中时间
    return (selectDate >= oneYearDay);
}

/**
 * 返回mm-dd 周几
 */
export function parseWeek(date) {
    return date.slice(5)+' 周'+getDay(date);
}

const SortTips = {
    0: '时间从早到晚',
    1: '时间从晚到早'
};
export function getSortTip(sort) {
    return SortTips[sort];
}

export function isToday(goDate){
    return new Date(goDate.replace(/-/g, '/'))-today.getTime() <= OneDay
}

/**
 * ios - => /
 * @param date date+depTime=出发时间
 * @param depTime
 * @return {number}
 */
export function getCutTime(date, depTime) {
    return new Date(date.replace(/-/g, "/") + " " + depTime).getTime()-today.getTime();
}