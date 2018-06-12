/**
 * Created by yidi.zhao on 2018/5/10.
 * 网络请求，页面请求，首屏请求，提前发出,减少loading时间
 */
import reqwest from 'reqwest';
import { parseData } from '../dataModule/dataModule';

const param = getQueryParam();
param.t = 'f_flightstatus_list';
const dataTemp = {
    b: param,
    c: {}
};
reqwest({
    url: '/interface/api/dynamic',
    method: 'post',
    type: 'json',
    contentType: 'application/json',
    data: JSON.stringify(dataTemp)
}).then((data)=>{
    // 为了保证数据的统一性，在receive的时候先清洗数据
    let dataTemp = {};
    dataTemp.config = parseData(data, param);
    dataTemp.module = 'home';
    window.receive && window.receive(dataTemp);
});


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