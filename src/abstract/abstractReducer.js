/**
 * Created by yidi.zhao on 2018/2/10.
 * 提供receive方法，将对应正确的module的值保存在store中对应的key里面
 */
import { ReducerFactory } from '../utils/reducerUtil';

let initialState = {};
let abstractReducer = ReducerFactory(initialState);

//从远程接收新数据后更新
abstractReducer.action("receive", function(state, action){
    //模块名称
    let name = this.name;
    //更新模块配置,只有module的值和当前调用的reducer是一个的时候才会修改state.存储到对应name的reducer中
    if(action.payLoad.module === name){
        return Object.assign({}, state, action.payLoad.config);
    } else {
        return state;
    }
});

abstractReducer.action("done", function(state, action){
    //模块名称
    let name = this.name;
    //更新模块配置
    if(action.payLoad.module === name){
        state.config = Object.assign({}, state.config, action.payLoad.config);
        return Object.assign({}, state);
    } else {
        return state;
    }
});

export {abstractReducer};