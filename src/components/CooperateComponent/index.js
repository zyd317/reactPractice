/**
 * Created by yidi.zhao on 2018/5/11.
 * 高阶组件-控制组件按需加载-是否展示render
 */
import React from 'react';
import { createEvent, dispatchEvent } from "./eventUtils";

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
        window.history.back(); // 取消该组件在浏览器历史中的足迹
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
                window.location.hash = hash;
            }
            dispatchEvent(window, evt);
        }
    }
};

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