/**
 * Created by yidi.zhao on 2018/6/11.
 */
const WeekDays = ['日','一','二','三','四','五','六'];
const _storage = window.localStorage;

export function getQueryParam(...args){
    let matches = decodeURIComponent(decodeURIComponent(location.search)).match(/([^\?\=\&]+\=[^\&]+)/g);
    if(matches){
        const querys = {};
        matches.forEach(function (tmp) {
            let kv = tmp.split('=');
            kv[1] && kv[1] !== 'undefined' && kv[1] !== 'null' && (querys[kv[0]] = kv[1]);
        });
        return args.length ?
            args.length === 1 ? querys[args[0]] : pick(querys, args)
            : querys;
    }
}

const host ='//s.qunarzz.com/flight_dynamic/dynamic/';
export function getIconUrl(type,status) {
    let postfix = '';
    if(status === 2){
        postfix = '_none';
    }
    return host+type+postfix+'@2x.png';
}
//函数防抖，输入一个方法，返回防抖后的方法,最后一个参数用于是否立即执行
export function debounce(method, context, delay, immediate) {
    let timer,calling,callingTimer;
    return (a) =>{
        if(immediate) {
            if(calling) {
                clearTimeout(callingTimer);
                callingTimer = setTimeout(()=>{
                    calling = false;
                },delay);
            } else {
                method.call(context,a);
                calling = true;
                callingTimer = setTimeout(()=>{
                    calling = false;
                },delay);
            }
        } else {
            clearTimeout(timer);
            timer = setTimeout(() =>{
                method.call(context,a);
            }, delay);
        }
    }
}

export function getLocalStorage(key) {
    return hasLocalStorage ? _storage.getItem(key) : 0;
}

export function setLocalStorage(key,val) {
    if(hasLocalStorage){
        _storage.setItem(key,val);
        return 1;
    }
    return 0;
}

export const hasLocalStorage = (function () {
    try{
        _storage.setItem("isOk","ok");
        _storage.getItem("isOk");
        _storage.removeItem("isOk");
        return true;
    }catch(e){
        return false;
    }
})();

export function deleteLocalStorage(key) {
    if(hasLocalStorage){
        _storage.removeItem(key);
    }else{
        return 0;
    }
}

export function pick(obj, keys) {
    const returnObj = Object.create(null);
    if (typeof keys === 'string') {
        if (obj[keys]) {
            returnObj[keys] = obj[keys];
        }
    } else if (Object.prototype.toString.call(keys) === '[object Array]') {
        for (let key of keys) {
            if (obj[key]) {
                returnObj[key] = obj[key];
            }
        }
    }
    return returnObj;
}

/**
 * 时间格式转化
 * @param date Date对象
 * @return {string} yyyy-mm-dd 格式
 */
export function format(date){
    return date.getFullYear() + '-' + formatTwoNumber(+date.getMonth()+1) + '-' + formatTwoNumber(date.getDate());
}

/**
 * 转化成两位数
 * @param num
 * @return {*}
 */
function formatTwoNumber(num){
    if(num > 9){
        return num;
    } else {
        return '0'+num;
    }
}

/**
 * 获取周几
 */
export function getDay(date) {
    date = new Date(date);
    return WeekDays[date.getDay()];
}


export function deepClone(data){
    return data && JSON.parse(JSON.stringify(data));
}

export function throttle(func,wait,options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) {
        options = {};
    }
    var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };
    return function(index,type,event) {
        var now = Date.now();
        if (!previous && options.leading === false){
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

export function queryToString(query) {
    let result = "?";
    for(let key in query){
        result += key+"="+encodeURIComponent(query[key])+"&"
    }
    return result.substr(0,result.length-1);
}

export function isIphoneX() {
    var ua, model;

    model = /(m\/10\.6)|(m\/10\.3)/i;
    ua = navigator.userAgent.toLocaleLowerCase();

    return ua.search(model) > -1 ? true : false;
}


/**
 * 跳转到航班详情页面
 */
export function getDetailHref(item, from){
    let {depCity, arrCity, airCode, name} = item;
    let goDate = item.date;
    let flightDetailParams = {depCity, arrCity, goDate:goDate, airCode, name, hybridid: 'f_flight_dynamic_hy'};
    flightDetailParams.from =  from || 'list';//页面来源
    //列表页只有一条数据，则直接跳转详情页
    let href = '//m.flight.qunar.com/hy/dynamic/page/flightDetail' + queryToString(flightDetailParams);
    return href;
}
export function dateFormat(date, pattern, lang) {

    if(!date){
        return ''
    }
    if(typeof date === 'string'){
        date = new Date(date.replace(/-/g, '/'));
    }
    var year = date.getFullYear(),
        month = date.getMonth(),
        d = date.getDate(),
        day = date.getDay(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    var mapping = {
        'cn': {
            tt: '周日 周一 周二 周三 周四 周五 周六',
            ttt: '星期日 星期一 星期二 星期三 星期四 星期五 星期六',
            MM: '01 02 03 04 05 06 07 08 09 10 11 12',
            M: '1 2 3 4 5 6 7 8 9 10 11 12'
        },
        'en': {
            tt: 'Sun Mon Tue Wed Thu Fri Sat',
            ttt: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday',
            MM: 'January February March April May June July August September October November December',
            M: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'
        }
    }[lang || 'cn'];

    return (pattern || 'yyyy-MM-dd')
        .replace(/\byyyy\b/g,year)
        .replace(/\bMM\b/g, mapping.MM.split(' ')[month])
        .replace(/\bM\b/g, mapping.M.split(' ')[month])
        .replace(/\bdd\b/g, (d + 100 + '').substring(1))
        .replace(/\bd\b/g, d)
        .replace(/\btt\b/g, mapping.tt.split(' ')[day])
        .replace(/\bttt\b/g, mapping.ttt.split(' ')[day])
        .replace(/\bhh\b/g, (hours + 100 + '').substring(1))
        .replace(/\bh\b/g, hours)
        .replace(/\bmm\b/g, (minutes + 100 + '').substring(1))
        .replace(/\bh\b/g, minutes)
        .replace(/\bss\b/g, (seconds + 100 + '').substring(1))
        .replace(/\bs\b/g, seconds)
}

/**
 * 将时间戳转换成HH-MM-SS形式
 * @param stamp1, stamp2...
 * @return 单个输入时返回一个时间字符串，多个输入时返回一个数组
 */
export function timeStampToTime(...stamps) {
    //单个输入和多个输入两种情况
    if (isValidArray(stamps)) {
        if(stamps.length === 1) {
            return transfer(stamps[0]);
        } else {
            return stamps.map((item) => {
                return transfer(item);
            })
        }
    } else {
        return '未输入数据';
    }

    //单个时间戳转换
    function transfer(stamp) {
        stamp = +stamp;
        if(!stamp || isNaN(stamp)) {return '-- : --';}
        const timeObj = new Date(stamp);
        const hour = timeObj.getHours();
        const minute = timeObj.getMinutes();

        let hourStr,
            minuteStr;

        //一位加0
        hourStr = hour > 9 ? hour : `0${hour}`;
        minuteStr = minute > 9 ? minute : `0${minute}`;

        return `${hourStr}:${minuteStr}`;
    }
}

export function addGoDate(d,num) {
    let date = new Date(d);
    date.setDate(date.getDate()+num);
    let year = date.getFullYear(),
        month = date.getMonth()+1,
        dates = date.getDate();
    return year+"-"+(month>=10?month:'0'+month)+"-"+(dates>=10 ? dates:'0'+dates);
}