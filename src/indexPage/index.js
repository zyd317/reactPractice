/**
 * index
 * 初始化store， 设置reducer
 * 调用render页面
 */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import InitStore from '../initStore';
import Reducers from './indexReducer';
import Touch from './Touch';

window.store = InitStore(Reducers);
let loading = true;
let error = false;
render(
    <Provider store={store}>
        <Touch loading={loading} error={error} />
    </Provider>,
    document.getElementById('app')
);
window.receive = (data)=>{
    console.log(data)
};