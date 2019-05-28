# 工程
### 描述
    基于react搭建。主要是为了学习react包括redux,webpack,node等知识。
    对应的node工程地址为：https://github.com/zyd317/reactPracticeNode#readme

### 启动
    npm i webpack@3 -g
    npm i webpack-dev-server@2.9.7 -g // 版本可能会导致跑不起来
    npm i hiproxy -g // 一个用于代替nginx的转发网络请求工具
    npm i
    webpack 编译打包资源
    webpack-dev-server -w --port 8008 将webpack作为启动qzz的服务器
    hiproxy start -o 启动代理服务器-替换nginx
    资源地址如：http://hah.test.com/build/index.bundle.js
    访问demo页：http://hah.test.com/demoName
    list: http://hah.test.com/flightList?goDate=2018-06-13&depCity=%E5%8C%97%E4%BA%AC&arrCity=%E4%B8%8A%E6%B5%B7&searchKey=flightCity&activeIndex=0&from=undefined

### 目录搭建
```bash
.
├── src
│   ├── components 公共组件(日常收集一些日常编写的组件，具体使用方式见齐readme)
│   ├── initStore.js 初始化每个页面store的配置文件
│   ├── lib.js 合并打包react等库文件
│   ├── indexPage 每个页面的入口组件, 每个页面都是一个工程
│   │   └── index
│   │       ├── index.js
│   │       └── index.scss 首页的样式，也会把该页面js引入的css,一起打包在这个文件里
│   └── utils 根据函数
│       └── reducerUtil.js 一个reducer的基类
├── build webpack 打包输出文件
│   ├── index.bundle.js
│   └── indexStyle.bundle.js
├── LICENSE 证书
├── package.json
├── reame.md
└── webpack.config.js webpack的配置文件
```

### 执行过程
    构造reducer(如home.reducer) -> ReducerFactory构造reducer -> return reducer(reducer.action将所有的handler存储在context) -> extend abstractReducer,使每个reducer都新增receive／done两个处理
    initStore -> diapatch({type: '@@redux/INIT"}) -> conbination(state, action) -> 执行所有的reducer的action，return的state构建store树
    <Provider store={store}>构造provider，将store作为props传给provider -> connect的时候subsribe-onstatechange
    window.receive((data)=>
        {dispatch({type: "receive", payload: data})}) -> 
        遍历调用每个reducer，使用reducer判断该action调用哪个方法 -> 
        执行对应方法，return state -> dispatch之后执行listener(即，执行subsribe里注册的所有listener) -> 
        通知container的props发生变化(通过mapStateToProps,mapDispatchToProps)，reRender

### 说明
- 使用hiproxy进行nginx模拟，转发请求。具体配置见./rewrite
- 模块化：module.exports={};require('file');    export {};require {} from 'file';
- redux: abstractReducer -> reducerFactory(return reducer(形如{name: 'moduleName', receive: func})) -> reducerX(extend abstractReducer) -> combineReducer(return combination(负责执行调用reducer)) -> store(构造了combine的store结构(store.getState()={reducerX: {state}}, store.dispatch等))
- reducerUtil: 
- dispatch: 使用this.props.dispatch(this.props已经通过mapDispatchToProps)或者store.dispatch

### todos
- LIST转为redux