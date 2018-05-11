/**
 * index
 * 初始化store， 设置reducer
 * 调用render页面
 */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import InitStore from '../initStore';
import Reducers from './indexReducer'; // combineReducers
import Home from './Home';
import CompWrapper from '../components/CooperateComponent';
import Animation from '../components/Animation';
import Calendar from '../components/Calendar/calendar';

window.store = InitStore(Reducers);
let hideLoading = false;
let showError = false;
render(
    <Provider store={store}>
        <Home hideLoading={hideLoading} showError={showError} />
    </Provider>,
    document.getElementById('app')
);

let CalendarAnimation = new Animation(Calendar);
render(
    <CompWrapper Calendar={CalendarAnimation}/>,
    document.getElementById('component')
);
/**
 * bigpipe接收数据
 * @param data ={module: "flight", config: {...}}
 * dispatch一个action{type: "receive", payLoad: data},调用receive的reducer
 */
window.receive = function(data){
    window.store.dispatch({type: "receive", payLoad: data});
};

window.endFlag = function(data){
    if(data.done){
        hideLoading = true;
    }else{
        showError = true;
    }
};

