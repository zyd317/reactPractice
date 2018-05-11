# 工程
### 描述
    基于react搭建。主要是为了学习react包括redux,webpack,node等知识。
    对应的node工程地址为：git+https://github.com/zyd317/demo_cp_node.git

### 启动
    npm i
    webpack 编译打包资源
    webpack-dev-server -w --port 8008 将webpack作为启动qzz的服务器
    资源地址如：http://webresource1.c-ctrip.com/demo_cp/build/index.bundle.js

### 目录搭建
```bash
.
├── app
│   ├── actions 组件actions
│   ├── components 公共组件
│   ├── containers 组件
│   ├── contants 常量
│   ├── index.js 首页js入口
│   ├── index.scss 首页的样式，也会把该页面js引入的css,一起打包在这个文件里
│   ├── indexReducer.js 首页的combineReducers
│   ├── initStore.js 初始化每个页面store的配置文件
│   ├── pages 每个页面的入口组件
│   │   └── index
│   │       ├── index.js
│   │       └── index.scss
│   ├── reducers 每个组件的reducer
│   │   └── Head
│   │       └── reducer.js
│   └── utils 根据函数
│       └── reducerUtil.js 一个reducer的基类
├── build webpack打包输出文件
│   ├── index.bundle.js
│   └── indexStyle.bundle.js
├── LICENSE 证书
├── package.json
├── reame.md
└── webpack.config.js webpack的配置文件
```

### 说明
- 模块化：module.exports={};require('file');    export {};require {} from 'file';
- redux: abstractReducer -> reducerFactory(return reducer(形如{name: 'moduleName', receive: func})) -> reducerX(extend abstractReducer) -> combineReducer(return combination(负责执行调用reducer)) -> store(构造了combine的store结构(store.getState()={reducerX: {state}}, store.dispatch等))
- reducerUtil: 
- dispatch: 使用this.props.dispatch(this.props已经通过mapDispatchToProps)或者store.dispatch