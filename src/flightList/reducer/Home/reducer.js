/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { ReducerFactory } from '../../../utils/reducerUtil';
import {abstractReducer} from '../../../abstract/abstractReducer';
import { actions } from './action';


let initialState = {
    loading: true,
    error: false,
    flightList: []
};

let reducer = ReducerFactory(initialState, 'home').extends(abstractReducer);

reducer.action(actions.UPDATE_FLIGHT_LIST, function(state, action) {
    return Object.assign({}, state, action.payload);
});

export default reducer;