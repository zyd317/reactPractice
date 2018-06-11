/**
 * Created by yidi.zhao on 2018/6/11.
 */
import { ReducerFactory } from '../../../utils/reducerUtil';
import {abstractReducer} from '../../../abstract/abstractReducer';
import { actions } from './action';

let initialState = {
    config: {
        loading: true,
        error: false,
        errorInfo:''
    },
    fields: {
        hasShowAlert: false
    }
};

let reducer = ReducerFactory(initialState, 'home').extends(abstractReducer);

reducer.action(actions.SHOW_CHANGE_ALERT,function(state, action) {
    return Object.assign({}, state, {fields: {hasShowAlert: action.payload}})
});

export default reducer;