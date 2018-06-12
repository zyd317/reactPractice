/**
 * Created by yidi.zhao on 2017/12/26.
 * ota页的reducer
 */
import {combineReducers} from 'redux';
import home from './reducer/Home/reducer';
import queryParam from './reducer/QueryParam/reducer';

const reducers = combineReducers({
    home: home,
    queryParam: queryParam
});
export default reducers;
