/**
 * Created by yidi.zhao on 2018/5/16.
 */
'use strict';
import React, {Component} from 'react';
var ReactDOM = require('react/lib/ReactDOM');
var ReactElement = require('react/lib/ReactElement');
var CSSCore = require('fbjs/lib/CSSCore');

export default class ReactTransition extends Component {
    constructor(props) {
        super(props);
        this.transition = this.transition.bind(this);
        this.state = {
            children: {}
        };
        let child = _extends({}, this.props.children);
        child.keyName = this.props.keyName;
        this.state.children[this.props.keyName] = child;
        this.state.showChild = child;
        return this;
    }

    componentWillReceiveProps(next) {
        var showChild = _extends({}, next.children);
        this.finishTransition = false;
        var children = this.state.children;
        for (var i in children) {
            var ckd = children[i];
            if (ckd && ckd.content) {
                ckd.action = 'leave';
                ckd.finishHide = true;
                ckd.transitioned = false;
            }
        }

        var newChild = _extends({action: 'enter', transitioned: false, finishHide: false}, next.children);
        newChild.keyName = next.keyName;
        children[next.keyName] = newChild;
        this.setState({
            children: children,
            showChild: showChild
        });
    }

    componentDidUpdate() {
        if (this.finishTransition !== true) {
            //开始动画
            this.transition();
            this.finishTransition = true;
        }
    }

    //动画完成,删除需要隐藏的节点
    transitionDone(key) {
        var children = this.state.children;
        if (children[key] && children[key].finishHide) {
            delete children[key];
            this.setState({
                children: children
            });
        }
    }

    //动画控制方法
    transition() {
        var me = this;
        var children = _extends([], me.state.children);
        for (var i in children) {
            var ckd = children[i];
            if (ckd && ckd.content && !ReactElement.isValidElement(ckd.content) && ckd.transitioned !== true) {
                me.refs[ckd.keyName].transitionStart(me.transitionDone.bind(me, ckd.keyName), me.props.transitionTime);
                ckd.transitioned = true;
            }
        }
    }

    render() {
        var children = [];
        for (var i in this.state.children) {
            var ckd = this.state.children[i];
            if (ckd && ckd.content && !ReactElement.isValidElement(ckd.content)) {
                children.push(_react2.default.createElement(ReactTransitionChild, {
                    params: ckd.params,
                    content: ckd.content,
                    key: ckd.keyName,
                    ref: ckd.keyName,
                    routerDir: this.props.routerDir,
                    action: ckd.action,
                    finishTransition: ckd.finishTransition
                }));
            }
        }
        return <div className="router-wrapper">{children}</div>
    }
}

class ReactTransitionChild extends Component{
    constructor(props){
        super(props);
        this.requestAnimationFramePolyfill();
        this.addClass = this.addClass.bind(this);
    }

    addClass() {
        var node = ReactDOM.findDOMNode(this);
        var className = 'page-' + this.props.routerDir + '-' + this.props.action;
        var activeClassName = className + '-active';
        CSSCore.addClass(node, className);
        window.requestAnimationFrame(function () {
            CSSCore.addClass(node, activeClassName);
        });
    }

    transitionStart(done, transitionTime) {
        var me = this;
        var time = parseInt(transitionTime);
        if (me.props.finishTransition !== true) {
            me.addClass();
            setTimeout(function () {
                me.transitionEnd(done);
            }, time);
        }
    }

    transitionEnd(done) {
        var node = ReactDOM.findDOMNode(this);
        var className = 'page-' + this.props.routerDir + '-' + this.props.action;
        var activeClassName = className + '-active';
        CSSCore.removeClass(node, className);
        CSSCore.removeClass(node, activeClassName);
        done();
    }

    render() {
        return <div params={this.props.params}>{this.props.content}</div>
    }

    requestAnimationFramePolyfill() {
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        var TICK = 17;
        var lastTime = 0;
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(TICK, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }
}