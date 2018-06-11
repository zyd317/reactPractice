/**
 * Created by yidi.zhao on 2018/6/11.
 */
let utils = require('./utils');
import 'whatwg-fetch'
let qrts = {
    LIST: 'f_flightstatus_list',
    CANCELFAVOR: 'f_flightstatus_deleteAttention',
    ADDFAVOR: 'f_flightstatus_addAttention'
};
const param = utils.getQueryParam();
export function getListData(query) {
    query = Object.assign(param, query);
    query.t = qrts.LIST;
    query.b = query;
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
    return fetch('https://m.flight.qunar.com/hy/dynamic/api', {
        method: 'POST',
        body: (data)
    })
}
