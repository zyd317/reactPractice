/**
 * Created by yidi.zhao on 2018/6/11.
 *
 * 页面所有的请求
 */
let utils = require('./utils');
import reqwest from 'reqwest';
let qrts = {
    LIST: 'f_flightstatus_list',
    CANCELFAVOR: 'f_flightstatus_deleteAttention',
    ADDFAVOR: 'f_flightstatus_addAttention'
};
const param = utils.getQueryParam();
export function getListData(query) {
    query = Object.assign(param, query);
    query.t = qrts.LIST;
    return fetchData(query);
}
export function delAttention (query) {
    query.t = qrts.CANCELFAVOR;
    return fetchData(query);
}

export function addAttention (query) {
    query.t = qrts.ADDFAVOR;
    return fetchData(query);
}

function fetchData(data) {
    let dataTemp = {
        b: data,
        c: {}
    };
    return reqwest({
        url: '/interface/api/dynamic'
        , method: 'post'
        , type: 'json'
        , contentType: 'application/json'
        , data: JSON.stringify(dataTemp)
    })
}
