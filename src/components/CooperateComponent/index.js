/**
 * Created by yidi.zhao on 2018/5/11.
 */
import React from 'react';
import {createEvent,dispatchEvent} from "./eventUtils";

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

window.addEventListener('hashchange', function (e) {
    let hashReg = /\#([a-z]+)/;
    let oldArr = e.oldURL.match(hashReg);
    let newArr = e.newURL.match(hashReg);

    //关闭
    if ( (oldArr && oldArr.length > 1) && !newArr ){
        let componentName = oldArr[1];
        COMPONENT.close(componentName);
    }
}, false);
export default class CompWrapper extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        self.state = {
            renderCompName: ''
        };
        //注册component变更事件
        window.addEventListener('componentchange', function (e) {
            let {action, config, name} = e.detail || {};
            if(name && action && props[name]) {
                if(self.refs[name]) {
                    self.refs[name][action](config);
                }
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