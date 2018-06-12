/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { getListData } from '../../../common/request';
import { parseData } from '../../dataModule/dataModule';
export const actions = {
    UPDATE_DATA: 'home.updateDate'
};

export function updateFlightList(flag){
    return dispatch => {
        getListData(flag).then((data)=>{
            // 请求成功
            dispatch({
                type: actions.UPDATE_DATA,
                payLoad: parseData(data, flag)
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