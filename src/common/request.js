/**
 * Created by yidi.zhao on 2018/6/11.
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

    let queryTemp = {};
    queryTemp.b = query;
    queryTemp.c = {};
    return fetchData(queryTemp);
}
export function delAttention (query) {
    query.t = qrts.CANCELFAVOR;

    let queryTemp = {};
    queryTemp.b = query;
    queryTemp.c = {};
    return fetchData(queryTemp);
}

export function addAttention (query) {
    query.t = qrts.ADDFAVOR;

    let queryTemp = {};
    queryTemp.b = query;
    queryTemp.c = {};
    return fetchData(queryTemp);
}

function fetchData(data) {
    return reqwest({
        url: '/interface/api/dynamic'
        , method: 'post'
        , type: 'json'
        , contentType: 'application/json'
        , data: JSON.stringify(data)
    })
}
