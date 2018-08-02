/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { ReducerFactory } from '../../../utils/reducerUtil';
import {abstractReducer} from '../../../abstract/abstractReducer';
import { actions } from './action';
import { parseData } from '../../dataModule/dataModule';

let initialState = {
    loading: true,
    error: false,
    errorInfo:'',
    flightList: []
};

let reducer = ReducerFactory(initialState, 'flightList').extends(abstractReducer);

reducer.action(actions.UPDATE_DATA, function(state, action) {
    const data = parseData(action.payLoad);
    return Object.assign({}, state, data);
});

reducer.action(actions.CHANGE_LOADING, function(state) {
    return Object.assign({}, state, initialState);
});

export default reducer;