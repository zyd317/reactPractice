/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { ReducerFactory } from '../../../utils/reducerUtil';
import {abstractReducer} from '../../../abstract/abstractReducer';
import { actions } from './action';
import { getQueryParam } from '../../../common/utils';
const queryParam = getQueryParam();

let initialState = {
    goDate: queryParam.goDate,
    depCity: queryParam.depCity,
    arrCity: queryParam.arrCity,
    searchKey: queryParam.searchKey,
    isAirCode: !!queryParam.airCode,
    airCode: queryParam.airCode,
    isShowFilter: !queryParam.airCode,
    activeIndex: queryParam.activeIndex,
    from: queryParam.from,
    sort: 0
};

let reducer = ReducerFactory(initialState, 'queryParam').extends(abstractReducer);

reducer.action(actions.UPDATE_QUERY,function(state, action) {
    return Object.assign({}, state, action.payload);
});

export default reducer;