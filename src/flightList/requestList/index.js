/**
 * Created by yidi.zhao on 2018/5/10.
 * 网络请求
 */
import 'whatwg-fetch'
const param = getQueryParam();
function getListData() {
    let query = {};
    // 从搜索进来的，或者是刷新页面，修改链接进来的时候，需要使用链接里面的参数进行请求
    param.t = 'f_flightstatus_list';
    query.b = param;
    return fetchData(query);
}
window.receive = getListData();

function fetchData(data) {
    return fetch('/interface/api/dynamic', {
        url: 'https://m.flight.qunar.com/hy/dynamic/api',
        method: 'POST',
        body: (data)
    })
}


function getQueryParam(){
    let matches = decodeURIComponent(decodeURIComponent(location.search)).match(/([^\?\=\&]+\=[^\&]+)/g);
    if(matches){
        const querys = {};
        matches.forEach(function (tmp) {
            let kv = tmp.split('=');
            kv[1] && kv[1] !== 'undefined' && kv[1] !== 'null' && (querys[kv[0]] = kv[1]);
        });
        return querys;
    }
}