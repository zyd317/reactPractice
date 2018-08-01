/**
 * Created by yidi.zhao on 2017/12/26.
 * ota页的reducer
 * combineReducers会先判断这些reducer的key和value的格式是否正确。再把reducer转存到finalReducer
 * 返回的reducers是combination，执行reducers的时候，传入action,会遍历执行所有的reducer
 */
import {combineReducers} from 'redux';
import home from './reducer/Home/reducer';
import queryParam from './reducer/QueryParam/reducer';

const reducers = combineReducers({
    home: home,
    queryParam: queryParam
});
export default reducers;
