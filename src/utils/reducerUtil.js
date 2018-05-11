/**
 * 优化很多的switch case写法
 * @param defState 初始的state
 * @param name 该组件的name, 必须与data.module的值对应
 *
 * 调用ReducerFactory(defState, name)的时候先缓存context={name: name; }
 * return 一个 reducer(defState, action),此时action为空的，不会执行.
 * 之后extend会将两个reducer合并
 * 再执行.action，context={name: name; actionType: handle}
 * 之后在store里形成了reducer的map，当components dispatch时：
 * window.store.dispatch({type: "receive", payLoad: data}); 会传入action={type: "receive", payLoad: data}
 */

export function ReducerFactory(defState, name) {
    let context = {};
    name && ( context.name = name ); // 缓存当前reducer模块名称

    /**
     * context[action.type](state, action) 简化switch case
     * @param state 前一个state，初始的state的值
     * @param action action对象{type: xxx, data: {}}
     * @return {*} 更新之后的state
     *
     * context[action.type]不能匹配 return defState
     */
    let reducer = function (state = defState, action) {
        if (context[action.type]) {
            return context[action.type](state, action);
        }
        return state;
    };

    reducer.action = function (type, handle) {
        context[type] = handle;
    };

    /**
     * 拼接两个reducer的context：.action和传入的context
     * @param r 是一个reducer
     * @return {reducer} 返回合并之后的reducer的context
     */
    reducer.extends = function(r){
        Object.assign(context, r.getContext());
        return reducer;
    };

    reducer.getAction = function(type){
        return context[type] || null;
    };

    reducer.getContext = function(){
        return context;
    };

    /**
     * return 一个function的时候还不会执行呢
     */
    return reducer;
}