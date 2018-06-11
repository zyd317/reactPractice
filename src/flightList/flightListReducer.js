/**
 * Created by yidi.zhao on 2017/12/26.
 * ota页的reducer
 */
import {combineReducers} from 'redux';
import home from './reducer/Home/reducer';

const reducers = combineReducers({
    home: home
});
export default reducers;
