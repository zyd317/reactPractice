/**
 * 加载和初始化中间件,生成store
 */
import {createStore, applyMiddleware, compose} from 'redux';
let thunk = require('redux-thunk').default;

export default function InitStore(rootReducer, initialState) {
    let finalCreateStore;
    if(process.env.NODE_ENV === 'production'){
        finalCreateStore = compose(
            applyMiddleware(thunk)
        )(createStore);
    }else{
        finalCreateStore = compose(
            applyMiddleware(thunk),  //初始化中间件
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )(createStore);
    }
    return finalCreateStore(rootReducer, initialState)
}
