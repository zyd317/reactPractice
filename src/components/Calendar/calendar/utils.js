/**
 * Created by yidi.zhao on 2018/4/23.
 */
const localTimeCache = new Date().getTime();
/**
 * 当前时间（server）
 */
export function todayServer() {
    // 当然服务端时间一定要有，才进行计算，否则直接返回
    if (window.__start_time) {
        let serverTime = window.__start_time;
        let localTime = new Date().getTime();
        // 每次的时间进来取减去第一次进来的时间，加上服务器的时间。
        return new Date(localTime - localTimeCache + serverTime);
    }

    return new Date();
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
