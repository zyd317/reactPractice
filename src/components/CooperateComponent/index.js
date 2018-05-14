/**
 * Created by yidi.zhao on 2018/5/11.
 * 用来控制组件的按需加载
 */
import React from 'react';
import {createEvent,dispatchEvent} from "./eventUtils";

/**
 * 将open|update|close挂载到window.COMPONENT下方便调用
 */
window.COMPONENT = {
    open: function (comp, config) {
        this._action(comp, config, 'open', true, '#' + comp);
    },
    update: function (comp, config) {
        this._action(comp, config, 'update');
    },
    close: function (comp) {
        this._action(comp, {}, 'close', true, '');
    },

    /**
     * dispatchEvent("componentchange")
     * @param comp 组件名称
     * @param config 组件配置
     * @param action 组件动作 pen|update|close
     * @param isHashChange 是否需要改变hash值
     * @param hash hash的具体值
     * @private 私有方法
     */
    _action: function (comp, config, action, isHashChange, hash) {
        if(comp) {
            let evt = createEvent('componentchange', {
                name: comp,
                action: action,
                config: config
            });
            if(isHashChange) {
                let url = window.location.href;
                url = url.replace(/(\#+[a-zA-Z]*)/g, "");
                window.location.replace(url+'#'+hash); // 在历史记录中删除本条记录，方便页面返回
            }
            dispatchEvent(window, evt);
        }

    }
};

/**
 * hash值改变 当发现hash值删除之后，执行COMPONENT.close
 */
window.addEventListener('hashchange', function (e) {
    let hashReg = /\#([a-z]+)/;
    let oldArr = e.oldURL.match(hashReg);
    let newArr = e.newURL.match(hashReg);
    if ( (oldArr && oldArr.length > 1) && !newArr ){
        let componentName = oldArr[1];
        window.COMPONENT.close(componentName);
    }
}, false);

export default class CompWrapper extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        self.state = {
            renderCompName: '' // 组件名称
        };
        /**
         * 注册component变更事件
         */
        window.addEventListener('componentchange', function (e) {
            let {action, config, name} = e.detail || {};
            if(name && action && props[name]) {
                // 如果有这个组件，执行this.refs[comName][action](config)
                if(self.refs[name]) {
                    self.refs[name][action](config);
                }
                // 如果没有这个组件，设置renderCompName再执行
                else {
                    self.setState({
                        renderCompName: name
                    },function () {
                        self.refs[name][action](config);
                    })
                }
            }
        });
    }

    /**
     * 渲染组件并设置ref = renderCompName
     * @return {XML}
     */
    render() {
        let self = this;
        let {state, props} = self;
        let {renderCompName} = state;
        let comp = renderCompName && props[renderCompName];
        return (
            <div>{ comp ? React.createElement(props[renderCompName],{ ref: renderCompName }) : ''}</div>
        )
    }
}