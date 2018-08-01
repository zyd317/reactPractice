/**
 * 加载和初始化中间件,生成store
 * rootReducer就是combineReducer生产的combination
 * createStore在进行变量检查，中间件初始化之后，会dispatch({ type: ActionTypes.INIT });
 * combination就会去执行每个reducer，每个reducer的action都匹配不上，则会走默认的state，就构建出来了一颗state树就是store
 * 所以初始的时候，所有的reducer都会被执行一遍
 * 添加thunk，支持dispatch异步操作
 */
import {createStore, applyMiddleware} from 'redux';
let thunk = require('redux-thunk').default;

export default function InitStore(rootReducer, initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
