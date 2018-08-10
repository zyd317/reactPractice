/**
 * Created by yidi.zhao on 2018/5/16.
 */
'use strict';
import React, {Component} from 'react';
// var ReactTransition = require('./reactTransition');
var routerDir;

/**
 * 根节点路径
 */
export class Router extends Component{
    constructor(props){
        super(props);
        var hash = this.getHash();
        this.state = {
            hash: '/' // 当前hash值，当前页面为根结点
        };
        this.initPath = this.initPath.bind(this);
        this.matchRouter = this.matchRouter.bind(this);
        this.certainRouterMatch = this.certainRouterMatch.bind(this);
        this.eventListener = this.eventListener.bind(this);
        this.matcher = this.matcher.bind(this);
        this.certainPaths = {}; // 保存当前应用，路径-components的关系
        this.params = {}; // 组件的参数
        this.initPath(); // 根据当前的dom结构，构建path树
        this.content = {};
        this.matchRouter(hash, true); // 判断当前路径对应的组件
    }

    componentDidMount() {
        this.eventListener();
    }

    render(){
        if (this.props.showTransition === true) {
            // return <ReactTransition children: this.content key={this.state.hash} routerDir={routerDir} transitionTime={this.props.transitionTime}/>
        } else {
            return <div className="router-wrapper"><this.content.content params={this.props.params}/></div>
        }
    }

    /**
     * 监听hashchange事件，展示对应的组件
     */
    eventListener() {
        var me = this;
        window.addEventListener('hashchange', function (e) {
            var hash = me.getHash();
            me.detectBackOrForward(e);
            me.matchRouter(hash);
        }, false);
    }

    //判断浏览器前进或后退操作
    detectBackOrForward(e) {
        var hashReg = /\?ts=(\d+)/;
        var oldR = hashReg.exec(e.oldURL) || [0, 0];
        var newR = hashReg.exec(e.newURL) || [0, 0];
        var isBack = +oldR[1] > +newR[1];
        if (isBack) {
            routerDir = 'back';
        } else {
            routerDir = 'go';
        }
    }
    /**
     * *初始化path树方法，得到整个应用完整的path树*
     * paths树状结构
     *  {
            component: xxx,     // 当前的component
            certain: paths,     // 完全匹配的子节点
            props: [paths],     // 属性匹配的子节点  如:/{:id}/
            vague: [paths],     // 模糊匹配的子节点  如:/ * /
            path: 'xxx'         // 路径
     *   }
     */
    initPath() {
        var children = React.Children.toArray(this.props.children); // 所有子节点,子组件，需要被控制的节点
        var index = this.props.component; // 当前节点的组件
        this.paths = {};
        if (index) {
            // 如果当前节点有组件
            this.certainPaths['/'] = index;
            this.paths = {
                path: '',
                component: index,
                certain: {},
                props: [],
                vague: []
            };
        }
        // 遍历每一条子节点，得到路由信息,建立paths树
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            var path = child.props.path; // 当前子节点的路径
            var pList = path.split('/'); // ["", "Calendar", ":id"]得到每一层节点
            var component = child.props.component; // 当前子节点对应的组件
            // 对精确路由建立精确匹配对象(路径中有查询参数或者二级路径的,匹配：*)
            if (!/:|\*/.test(path)) {
                this.certainPaths[path] = component;
            }
            if (!path || !component) {
                continue;
            }
            pList.shift(); // 删除第一个空格
            var leaf = this.buildingPath(this.paths, pList);
            leaf.component = component;
        }
    }

    /**
     * 递归建立path树
     * @param pathsTree    path树的某个节点
     * @param pList        路径列表
     * @returns {*}
     */
    buildingPath(pathsTree, pList) {
        if (!pList.length) {
            return pathsTree;
        }
        // 当前节点的路径树
        var path = {
            path: '',
            certain: {},
            props: [],
            vague: []
        };
        //vague，模糊匹配
        if (pList[0] === '*') {
            path.path = '*';
            pathsTree.vague.push(path);
            pList.shift();
            return this.buildingPath(path, pList);
        }
        //props :id查询类
        else if (pList[0][0] === ':') {
            path.path = pList[0].substring(1);
            pathsTree.props.push(path);
            pList.shift();
            return this.buildingPath(path, pList);
        }
        //certain
        else {
            path.path = pList[0];
            pathsTree.certain[pList[0]] = path;
            pList.shift();
            return this.buildingPath(path, pList);
        }
    }

    //递归匹配
    matcher(pathTree, hList) {
        var certain = pathTree.certain;
        var props = pathTree.props;
        var vague = pathTree.vague;
        var subList = hList.slice(1, hList.length);
        if (!hList.length) {
            return pathTree;
        }
        //首先进行精确匹配
        for (var cer in certain) {
            if (cer === hList[0]) {
                hList.shift();
                return this.matcher(certain[cer], hList); // 递归，得到真正需要渲染的组件
            }
        }
        //其次进行属性匹配
        for (var i = 0, len = props.length; i < len; i++) {
            var p = props[i];
            var result = this.matcher(p, subList); // 递归，得到真正需要渲染的组件
            //匹配成功
            if (result !== false) {
                var toProps = p.path;
                var value = hList[0];
                this.params[toProps] = value;
                return result;
            }
        }
        //最后进行模糊匹配
        for (var _i = 0, _len = vague.length; _i < _len; _i++) {
            var v = vague[_i];
            var _result = this.matcher(v, subList);
            if (_result !== false) {
                return _result;
            }
        }
        return false;
    }

    /**
     * 精确匹配路由，判断当前hash值在跟路径下是否存在，存在返回该组件
     * @param hash  hash值
     * @returns {*}
     */
    certainRouterMatch(hash) {
        if (this.certainPaths && this.certainPaths[hash]) {
            return {
                component: this.certainPaths[hash]
            };
        } else {
            return false;
        }
    }

    /**
     * 路由匹配
     * @param hash      当前路径的hash值
     * @param isInit    是否初始化
     *
     * 如果是一打开页面的路径的话，需要this.state.hash = hash;设置hash值
     */
    matchRouter(hash, isInit) {
        var hList = hash.split('/'),
            mResult = this.certainRouterMatch(hash);
        hList.shift();
        if (!mResult) {
            mResult = this.matcher(this.paths, hList); // 通过递归matcher。得到最终要展示的组件
        }
        //没匹配上
        if (mResult === false) {
            this.content = {
                content: 'div'
            };
        } else {
            //完成匹配
            this.content = {
                content: mResult.component, // 要展示的组件
                params: this.params // /calendar/:ID要传的参数-id
            };
            if (!isInit) {
                // this.state.hash = hash;
            // } else {
                this.setState({ hash: hash });
            }
            return;
        }
    }

    /**
     * 获取初始的hash值
     * @return {string} 当前hash值
     */
    getHash() {
        var hash = location.hash.replace(/#/g, '');
        if (hash.indexOf('?') >= 0) {
            hash = hash.substring(0, hash.indexOf('?'));
        }
        if (hash[0] !== '/') {
            hash = '/' + hash;
        }
        return hash;
    }
}

/**
 * 子路径
 */
export class Route extends Component {
    constructor(props) {
        super(props);
    }
}


export class Link extends Component{
    constructor(props){
        super(props);

        if (/^#\//.test(this.props.to)) {
            this.to = this.props.to;
        } else if (/^\//.test(this.props.to)) {
            this.to = '#' + this.props.to;
        } else {
            this.to = '#/' + this.props.to;
        }
        return this;
    }

    render() {
        return _react2.default.createElement(
            'a',
            {href: this.to + '?ts=' + new Date().getTime()},
            this.props.children
        );
    }
}

export let hashHistory = {
    goBack: function goBack(step) {
        routerDir = 'back';
        if (step) {
            history.go(step);
        } else {
            history.back();
        }
    },
    push: function push(path) {
        path = '#' + (path[0] === '/' ? '' : '/') + path;
        //location.href = path;
        routerDir = 'go';
        window.location.hash = path + '?ts=' + new Date().getTime();
    }
};