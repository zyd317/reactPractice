/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { getListData } from '../../../common/request';
export const actions = {
    UPDATE_DATA: 'flightList.updateDate',
    CHANGE_LOADING: 'flightList.changeLoading'
};

export function updateFlightList(flag){
    return dispatch => {
        getListData(flag).then((data)=>{
            // 请求成功
            dispatch({
                type: actions.UPDATE_DATA,
                payLoad: data
            });
        }).catch(()=>{
            // 请求出错， error
            dispatch({
                type: actions.UPDATE_DATA,
                payLoad: {
                    loading: false,
                    error: true
                }
            });
        });
    }
}

export function changeLoading() {
    return {
        type: actions.CHANGE_LOADING
    }
}